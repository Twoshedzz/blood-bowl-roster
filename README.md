# Blood Bowl Roster Builder

A comprehensive web application for building Blood Bowl 2025 team rosters with full skill management, treasury tracking, and print-ready output.

![Blood Bowl](https://img.shields.io/badge/Blood%20Bowl-2025-red)
![React](https://img.shields.io/badge/React-18-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

## Features

### 🏈 Complete Roster Building
- **30 Official Teams** with accurate stats and costs
- **Player Purchase System** with position limits
- **Drag & Drop Reordering** for your roster
- **Real-time Treasury Tracking** with visual indicators

### ⚡ Skills Management
- **Comprehensive Skill Database** - All Blood Bowl 2025 skills
- **Smart Skill Selection** - Prevents duplicate/basic skills
- **Primary/Secondary Skills** - Color-coded for clarity
- **Skill Display** - Shows on player cards, roster table, and print view

### 💰 League & Tournament Modes
- **League Mode**: Fixed 1,000,000 gp treasury (official rules)
- **Tournament Mode**: Customizable starting treasury
- **Easy Toggle**: Switch modes with one click

### 📱 Fully Responsive
- **Desktop**: Optimal 3-column layout
- **Tablet**: Adaptive 2-column design
- **Mobile**: Single-column stacked layout
- **Touch-Friendly**: All controls optimized for mobile

### 🖨️ Professional Print View
- Clean, black & white layout
- Complete roster with all stats
- Skills clearly displayed
- Ready for league play

## Quick Start

### Online (Easiest)
Use directly in Claude.ai as an artifact - no installation needed!

### Local Development
```bash
# Clone or download the files
# Ensure you have Node.js installed

# Install dependencies
npm install react react-dom lucide-react

# Copy blood-bowl-roster.jsx to your project
# Extract team images to /public/images/

# Run your dev server
npm run dev
```

## How to Use

### Building Your Roster

1. **Select Your Team** from the dropdown (30 teams available)
2. **Choose League or Tournament Mode** with the toggle
3. **Purchase Players** by clicking position boxes
4. **Add Skills** by clicking the "+" button on any player
5. **Buy Inducements** using the increment/decrement buttons
6. **Reorder Players** by dragging and dropping in roster view
7. **Print Your Roster** with the printer button

### Adding Skills

1. Click the **"+"** button next to any player in Roster View
2. Select skills from dropdowns:
   - **Blue dropdown** = Primary skills (cheaper)
   - **Green dropdown** = Secondary skills (more expensive)
3. Basic skills you already have are disabled (marked "✓ Basic")
4. Skills you've added are disabled (marked "✓ Added")
5. Remove skills by clicking the **×** next to them

### League vs Tournament Mode

**League Mode** (Default)
- Treasury locked at 1,000,000 gp 🔒
- Official league play rules
- Cannot be edited

**Tournament Mode**
- Treasury is editable
- Click treasury to change amount
- Flexible for custom games

## File Structure

```
blood-bowl-roster/
├── blood-bowl-roster.jsx          # Main application
├── BLOOD-BOWL-PROJECT.md          # Detailed documentation
├── README.md                       # This file
└── public/
    └── images/                     # Team background images
        ├── Amazon.png
        ├── BlackOrcs.png
        ├── Human.png
        └── ... (30 total)
```

## Team Images

All 30 team background images are included:
- High quality PNG format
- ~150KB each, 3.6MB total
- Located in `/public/images/`
- Displayed in builder view only (hidden on mobile)

## Technical Details

**Built With:**
- React 18
- Vite
- Tailwind CSS
- Lucide React Icons

**Browser Support:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

**Performance:**
- 73KB main file
- Fast initial load
- Responsive at all breakpoints
- No external API calls

## Data Sources

All game data is based on official Blood Bowl 2025 rules:
- Player stats and costs
- Skill categories and access
- Team-specific inducements
- League structures

## Known Limitations

- Skill costs currently flat (20k) - should differentiate primary/secondary
- No data persistence (roster lost on refresh)
- No save/load functionality yet

See `BLOOD-BOWL-PROJECT.md` for full list of future enhancements.

## Contributing

This is a single-file React component. To add features:
1. Modify `blood-bowl-roster.jsx`
2. Test across all breakpoints
3. Ensure print view still works
4. Update documentation

## License

This is a fan-made tool for Blood Bowl. Blood Bowl is © Games Workshop.

## Support

For issues or questions:
1. Check `BLOOD-BOWL-PROJECT.md` for detailed documentation
2. Review the testing checklist
3. Verify images are in `/public/images/`

## Version

**Current Version**: v1.5
**Last Updated**: December 13, 2025
**Status**: Production Ready ✅

---

**May Nuffle Bless Your Dice! 🎲**
