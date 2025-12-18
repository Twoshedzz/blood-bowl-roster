/**
 * Star Player Data Scraper for Blood Bowl Base
 * 
 * This script scrapes star player data from bloodbowlbase.ru and saves it
 * in a format compatible with the refactored team data structure.
 * 
 * Usage:
 *   npm install cheerio axios
 *   node scripts/scrape-star-players.js
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://bloodbowlbase.ru/bb2025/starplayers/';

/**
 * Fetch the list of star player URLs from the main page
 */
async function getStarPlayerLinks() {
  try {
    console.log('Fetching star player list from main page...');
    const response = await axios.get(BASE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const links = [];
    
    // Find all links in navigation (class md-nav__link)
    // Star players are listed in the sidebar navigation
    $('.md-nav__link').each((i, el) => {
      const href = $(el).attr('href');
      const name = $(el).text().trim();
      
      // Filter for star player links (relative paths with underscores/text)
      if (href && 
          !href.startsWith('http') && 
          !href.startsWith('..') && 
          !href.startsWith('#') &&
          href !== './' &&
          name.length > 2 && // Has actual name
          !name.includes('Rules') && // Not a rules page
          !name.includes('Journal') && // Not journal
          !name.includes('Teams') && // Not teams
          !name.includes('Cheat')) { // Not cheat sheet
        
        // Clean up the slug
        const slug = href.replace(/\/$/, ''); // Remove trailing slash
        
        if (slug && !links.find(l => l.slug === slug)) {
          links.push({ slug, name });
        }
      }
    });
    
    console.log(`Found ${links.length} star player links`);
    
    if (links.length === 0) {
      console.log('⚠️  No links found with CSS selector. Trying alternative method...');
      // Try finding all relative links that look like player pages
      $('a[href]').each((i, el) => {
        const href = $(el).attr('href');
        const name = $(el).text().trim();
        if (href && 
            href.match(/^[A-Z][a-z_]+/) && // Starts with capital letter
            !href.includes('..') &&
            name.length > 3) {
          const slug = href.replace(/\/$/, '');
          if (!links.find(l => l.slug === slug)) {
            links.push({ slug, name });
          }
        }
      });
      console.log(`Found ${links.length} links using alternative method`);
    }
    
    return links;
    
  } catch (error) {
    console.error('Error fetching star player list:', error.message);
    return [];
  }
}

/**
 * Fetch and parse a star player page
 */
async function scrapeStarPlayer(slug) {
  try {
    const url = `${BASE_URL}${slug}/`;
    console.log(`Fetching ${url}...`);
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract player name (from h1 or title)
    const name = $('h1').first().text().trim() || slug.replace(/_/g, ' ');
    
    // Extract stats from table
    // Table structure: 
    // Row 1: 170K | MA | ST | AG | PA | AV  (headers, cost is first cell)
    // Row 2:   5  |  3 | 3+ | 4+ | 10+      (values, 5 cells - no cost column)
    let cost = 0;
    let ma = '', st = '', ag = '', pa = '', av = '';
    
    const table = $('table').first();
    const rows = table.find('tr');
    
    if (rows.length >= 2) {
      // First row - get cost from first cell
      const headerCells = $(rows[0]).find('td, th');
      if (headerCells.length > 0) {
        const costCell = $(headerCells[0]).text().trim();
        const costMatch = costCell.match(/(\d+)K/);
        if (costMatch) {
          cost = parseInt(costMatch[1]) * 1000;
        }
      }
      
      // Second row - get stat values
      // NOTE: This row has 6 cells (first cell is empty for alignment), values are in cells 1-5
      const dataCells = $(rows[1]).find('td');
      if (dataCells.length >= 6) {
        ma = $(dataCells[1]).text().trim(); // Cell 1: MA
        st = $(dataCells[2]).text().trim(); // Cell 2: ST
        ag = $(dataCells[3]).text().trim(); // Cell 3: AG
        pa = $(dataCells[4]).text().trim(); // Cell 4: PA
        av = $(dataCells[5]).text().trim(); // Cell 5: AV
      }
    }
    
    // Build stats string
    const statsString = `${ma}/${st}/${ag}/${pa}/${av}`;
    
    // Extract skills from the content
    // Skills are in the first UL after the table, each as an <li> with <a> link
    // The last item with <strong> is the special rule (not a regular skill)
    let skills = [];
    let specialRuleName = '';
    let specialRuleDescription = '';
    
    // Find the main article content
    const article = $('article').first();
    
    // Get the first UL in the article (should be skills list)
    const firstUL = article.find('ul').first();
    
    if (firstUL.length > 0) {
      const listItems = firstUL.find('li');
      
      listItems.each((i, el) => {
        const $li = $(el);
        
        // Check if this item has <strong> tag (special rule)
        const strongTag = $li.find('strong');
        if (strongTag.length > 0) {
          // This is the special rule
          specialRuleName = strongTag.text().trim();
        } else {
          // Regular skill - get the full text
          const skillText = $li.text().trim();
          if (skillText) {
            skills.push(skillText);
          }
        }
      });
      
      // Get the special rule description from the <p> right after this <ul>
      const nextP = firstUL.next('p');
      if (nextP.length > 0) {
        specialRuleDescription = nextP.text().trim();
      }
    }
    
    const skillsString = skills.join(', ');
    
    // Extract "Plays For" and "Accept to play for" sections
    let playsFor = [];
    let acceptToPlayFor = [];
    
    // Find the "Plays For" section
    $('h3').each((i, el) => {
      const heading = $(el).text().trim();
      
      if (heading === 'Plays For') {
        // Get the next ul element
        const list = $(el).next('ul');
        if (list.length) {
          list.find('li').each((j, li) => {
            playsFor.push($(li).text().trim());
          });
        } else {
          // If no list, check for paragraph
          const para = $(el).next('p');
          if (para.length) {
            playsFor.push(para.text().trim());
          }
        }
      } else if (heading === 'Accept to play for...') {
        // Get the next ul element for accepted teams
        const list = $(el).next('ul');
        if (list.length) {
          list.find('li').each((j, li) => {
            acceptToPlayFor.push($(li).text().trim());
          });
        }
      }
    });
    
    // Special rule extraction is now done above in the skills section
    
    return {
      slug,
      name,
      cost,
      stats: statsString,
      skills: skillsString || 'No skills found',
      playsFor: playsFor.length > 0 ? playsFor : ['Any team'],
      acceptToPlayFor: acceptToPlayFor,
      specialRule: {
        name: specialRuleName || 'None',
        description: specialRuleDescription || ''
      }
    };
    
  } catch (error) {
    console.error(`Error scraping ${slug}:`, error.message);
    return {
      slug,
      name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      cost: 0,
      stats: 'Error fetching data',
      skills: 'Error fetching data',
      playsFor: ['Error'],
      specialRule: 'Error fetching data',
      error: error.message
    };
  }
}

/**
 * Scrape all star players with rate limiting
 */
async function scrapeAllStarPlayers() {
  // First, get the list of actual star player URLs
  const starPlayerLinks = await getStarPlayerLinks();
  
  if (starPlayerLinks.length === 0) {
    console.error('❌ No star player links found. Check if the website structure has changed.');
    return [];
  }
  
  console.log(`\nStarting to scrape ${starPlayerLinks.length} star players...`);
  console.log('This may take a few minutes...\n');
  
  const results = [];
  
  for (let i = 0; i < starPlayerLinks.length; i++) {
    const { slug, name } = starPlayerLinks[i];
    console.log(`[${i + 1}/${starPlayerLinks.length}] Processing ${name} (${slug})...`);
    
    const data = await scrapeStarPlayer(slug);
    results.push(data);
    
    // Rate limiting: wait 500ms between requests to be respectful
    if (i < starPlayerLinks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  return results;
}

/**
 * Save results to JSON file
 */
function saveResults(results) {
  const outputDir = path.join(__dirname, '..', 'src', 'data', 'star-players');
  const outputPath = path.join(outputDir, 'scraped-data.json');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Save full results
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Saved ${results.length} star players to ${outputPath}`);
  
  // Save summary
  const summary = {
    totalPlayers: results.length,
    playersWithErrors: results.filter(p => p.error).length,
    playersWithData: results.filter(p => !p.error && p.cost > 0).length,
    scrapedAt: new Date().toISOString()
  };
  
  const summaryPath = path.join(outputDir, 'scrape-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`✅ Saved summary to ${summaryPath}`);
  
  // Log summary
  console.log('\n📊 Scraping Summary:');
  console.log(`   Total players: ${summary.totalPlayers}`);
  console.log(`   Successfully scraped: ${summary.playersWithData}`);
  console.log(`   Errors: ${summary.playersWithErrors}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🏈 Blood Bowl Star Players Scraper\n');
  console.log('Target: https://bloodbowlbase.ru/bb2025/starplayers/\n');
  
  try {
    const results = await scrapeAllStarPlayers();
    saveResults(results);
    
    console.log('\n✅ Scraping complete!');
    console.log('\nNext steps:');
    console.log('1. Review the scraped data in src/data/star-players/scraped-data.json');
    console.log('2. Manually clean up any "Data not found" entries');
    console.log('3. Convert to proper TypeScript/JavaScript module format');
    console.log('4. Add to your application');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { scrapeStarPlayer, scrapeAllStarPlayers };

