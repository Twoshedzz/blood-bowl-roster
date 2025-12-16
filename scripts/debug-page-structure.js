/**
 * Debug script to inspect the Blood Bowl Base star players page structure
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const BASE_URL = 'https://bloodbowlbase.ru/bb2025/starplayers/';

async function debugPageStructure() {
  try {
    console.log('Fetching page:', BASE_URL);
    
    const response = await axios.get(BASE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    console.log('\n=== Page Title ===');
    console.log($('title').text());
    
    console.log('\n=== All Links (first 20) ===');
    $('a').slice(0, 20).each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      console.log(`${i + 1}. ${text} -> ${href}`);
    });
    
    console.log('\n=== Links containing "starplayers" ===');
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('starplayers')) {
        const text = $(el).text().trim();
        console.log(`- ${text} -> ${href}`);
      }
    });
    
    console.log('\n=== Main content structure ===');
    console.log('Body classes:', $('body').attr('class'));
    console.log('Main element:', $('main').length > 0 ? 'Found' : 'Not found');
    console.log('Article elements:', $('article').length);
    console.log('Nav elements:', $('nav').length);
    
    console.log('\n=== Looking for player names from the list ===');
    const playerNames = ['Griff Oberwald', 'Morg', 'Hakflem', 'Deeproot', 'Akhorne'];
    playerNames.forEach(name => {
      const found = $(`*:contains("${name}")`).first();
      if (found.length > 0) {
        const link = found.closest('a').attr('href');
        console.log(`✓ Found "${name}" ${link ? `-> ${link}` : '(no link)'}`);
      } else {
        console.log(`✗ "${name}" not found`);
      }
    });
    
    // Save raw HTML for inspection
    fs.writeFileSync('debug-page.html', response.data);
    console.log('\n📄 Saved raw HTML to debug-page.html for manual inspection');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugPageStructure();
