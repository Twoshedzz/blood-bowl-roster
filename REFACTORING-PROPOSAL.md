# Blood Bowl Roster Builder - Refactoring Proposal

## Executive Summary

**Current State**: 2,365-line monolithic React component (124KB)  
**Goal**: Modular, testable, scalable architecture supporting future features  
**Timeline**: 4-6 week phased approach  
**Risk**: Medium (requires careful data migration, no existing tests)

---

## 🎯 New Features Requirements

### 1. Team Information Enhancement
- Detailed team lore/background
- Play style descriptions
- Strengths/weaknesses
- Strategy tips

### 2. Retailer Integration
- Miniature purchase links
- Automated link health checking (CI/CD)
- Multiple retailer support
- Affiliate tracking (optional)

### 3. Star Player Images
- Image assets for all star players
- Lazy loading optimization
- Responsive image sizing
- Fallback placeholders

### 4. Mobile App
- Progressive Web App (PWA) first
- Potential React Native later
- Offline functionality
- Native device features

### 5. User Accounts & Data Persistence
- User registration/authentication
- Save multiple rosters
- Cloud synchronization
- Share rosters via links

---

## 🚨 Current Architecture Issues

### Critical Problems

#### 1. **Monolithic Component** (2,365 lines)
**Impact**: HIGH  
**Issues**:
- Impossible to test individual features
- High cognitive load for developers
- Merge conflicts in team environments
- Performance issues (re-renders entire app)
- Cannot lazy-load features

**Evidence**: `blood-bowl-roster.jsx` contains:
- 30+ team definitions (lines 404-434)
- 600+ lines of skill access data (lines 21-100+)
- All UI components (build, roster, print views)
- All business logic (calculations, state management)
- Event handlers, utilities, formatters

#### 2. **No Test Coverage** (0%)
**Impact**: HIGH  
**Issues**:
- Cannot safely refactor
- Bugs discovered in production
- No regression prevention
- No documentation through tests

**Evidence**: Zero test files in `/src`

#### 3. **Hard-Coded Data** (Mixed with Logic)
**Impact**: MEDIUM  
**Issues**:
- Team data embedded in component (lines 404+)
- Adding teams requires code changes
- No content management system
- Difficult to update/maintain

#### 4. **No Backend Architecture**
**Impact**: HIGH (for user accounts)  
**Issues**:
- No data persistence
- No user authentication
- No roster sharing
- Link testing must be manual

#### 5. **Large Bundle Size**
**Impact**: MEDIUM  
**Issues**:
- 124KB main file + 3.6MB images
- No code splitting
- No lazy loading
- Slow initial load on mobile

---

## 🏗️ Proposed Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Features   │  │  Components  │  │     Pages    │     │
│  │   (Lazy)     │  │   (Shared)   │  │   (Routes)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌────────────────────────────────────────────────────┐    │
│  │         State Management (Zustand/Redux)          │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │            API Layer (React Query)                 │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/WebSocket
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Auth     │  │   Rosters    │  │    Links     │     │
│  │   Service    │  │   Service    │  │   Checker    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Database (PostgreSQL)                 │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Proposed File Structure

```
blood-bowl-roster/
├── .github/
│   └── workflows/
│       ├── test.yml                    # Run tests on PR
│       ├── link-checker.yml            # Daily link health check
│       └── deploy.yml                  # Deploy to production
│
├── public/
│   ├── images/
│   │   ├── teams/                      # Team background images
│   │   └── star-players/               # NEW: Star player portraits
│   ├── manifest.json                   # PWA manifest
│   └── service-worker.js               # NEW: Offline support
│
├── src/
│   ├── api/                            # NEW: API client layer
│   │   ├── client.js                   # Axios/Fetch wrapper
│   │   ├── auth.js                     # Authentication endpoints
│   │   ├── rosters.js                  # Roster CRUD
│   │   ├── teams.js                    # Team data endpoints
│   │   └── links.js                    # Retailer link data
│   │
│   ├── assets/                         # Static assets
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/                     # NEW: Reusable components
│   │   ├── ui/                         # Base UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.test.jsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Input/
│   │   │   └── Badge/
│   │   │
│   │   ├── roster/                     # Roster-specific components
│   │   │   ├── PlayerCard/
│   │   │   ├── PlayerList/
│   │   │   ├── PositionGrid/
│   │   │   ├── StatDisplay/
│   │   │   └── SkillModal/
│   │   │
│   │   ├── team/                       # Team-specific components
│   │   │   ├── TeamSelector/
│   │   │   ├── TeamInfo/              # NEW: Team lore/background
│   │   │   └── TeamBackground/
│   │   │
│   │   ├── inducements/
│   │   │   ├── InducementList/
│   │   │   └── StarPlayerCard/        # NEW: With images
│   │   │
│   │   └── layout/                     # Layout components
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       └── Footer/
│   │
│   ├── data/                           # Static data (move from code)
│   │   ├── teams/
│   │   │   ├── teams.json              # Team definitions
│   │   │   ├── positions.json          # Player positions
│   │   │   ├── skills.json             # Skill access by position
│   │   │   └── lore.json               # NEW: Team descriptions
│   │   │
│   │   ├── star-players/
│   │   │   ├── scraped-data.json       # Existing
│   │   │   └── images.json             # NEW: Image mappings
│   │   │
│   │   ├── inducements.json
│   │   ├── skills.json                 # Skill definitions
│   │   └── retailers.json              # NEW: Miniature retailers
│   │
│   ├── features/                       # Feature-based modules
│   │   ├── auth/                       # NEW: Authentication
│   │   │   ├── components/
│   │   │   │   ├── LoginForm/
│   │   │   │   ├── RegisterForm/
│   │   │   │   └── PasswordReset/
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.js
│   │   │   │   └── useUser.js
│   │   │   └── authSlice.js           # State management
│   │   │
│   │   ├── roster/                     # Roster building feature
│   │   │   ├── components/
│   │   │   │   ├── BuildView/
│   │   │   │   ├── RosterView/
│   │   │   │   └── PrintView/
│   │   │   ├── hooks/
│   │   │   │   ├── useRoster.js
│   │   │   │   ├── usePlayers.js
│   │   │   │   └── useTreasury.js
│   │   │   └── rosterSlice.js
│   │   │
│   │   ├── retailers/                  # NEW: Miniature retailers
│   │   │   ├── components/
│   │   │   │   ├── RetailerLinks/
│   │   │   │   └── LinkStatus/
│   │   │   └── hooks/
│   │   │       └── useRetailers.js
│   │   │
│   │   └── profile/                    # NEW: User profile
│   │       ├── components/
│   │       │   ├── SavedRosters/
│   │       │   └── Settings/
│   │       └── hooks/
│   │           └── useProfile.js
│   │
│   ├── hooks/                          # Shared custom hooks
│   │   ├── useLocalStorage.js
│   │   ├── useDebounce.js
│   │   ├── useMediaQuery.js
│   │   └── useIntersectionObserver.js
│   │
│   ├── pages/                          # NEW: Page components
│   │   ├── Home/
│   │   ├── RosterBuilder/
│   │   ├── MyRosters/                  # NEW: User's saved rosters
│   │   ├── TeamBrowser/                # NEW: Browse teams
│   │   ├── Login/
│   │   ├── Register/
│   │   └── NotFound/
│   │
│   ├── store/                          # NEW: State management
│   │   ├── index.js                    # Store configuration
│   │   ├── slices/
│   │   │   ├── rosterSlice.js
│   │   │   ├── authSlice.js
│   │   │   └── uiSlice.js
│   │   └── middleware/
│   │       └── logger.js
│   │
│   ├── styles/                         # Global styles
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   └── themes/
│   │       ├── default.css
│   │       └── dark.css               # NEW: Dark mode
│   │
│   ├── utils/                          # Utility functions
│   │   ├── calculations/
│   │   │   ├── treasury.js
│   │   │   ├── teamValue.js
│   │   │   └── skillCosts.js
│   │   ├── formatters/
│   │   │   ├── currency.js
│   │   │   ├── stats.js
│   │   │   └── dates.js
│   │   ├── validators/
│   │   │   ├── roster.js
│   │   │   └── team.js
│   │   └── constants.js
│   │
│   ├── App.jsx                         # REFACTORED: Route container
│   ├── main.jsx                        # Entry point
│   └── Router.jsx                      # NEW: Route definitions
│
├── backend/                            # NEW: Backend service
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── rosters.routes.js
│   │   │   │   ├── teams.routes.js
│   │   │   │   └── links.routes.js
│   │   │   └── middleware/
│   │   │       ├── auth.middleware.js
│   │   │       └── validation.middleware.js
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── roster.service.js
│   │   │   └── linkChecker.service.js  # NEW: Check retailer links
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Roster.js
│   │   │   └── RetailerLink.js
│   │   │
│   │   ├── database/
│   │   │   ├── migrations/
│   │   │   └── seeds/
│   │   │
│   │   └── server.js
│   │
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   └── package.json
│
├── tests/                              # Frontend tests
│   ├── unit/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── integration/
│   │   ├── roster-building.test.jsx
│   │   ├── skill-management.test.jsx
│   │   └── treasury-calculation.test.jsx
│   └── e2e/
│       ├── user-journey.spec.js
│       └── mobile-experience.spec.js
│
├── scripts/
│   ├── scrape-star-players.js
│   ├── check-links.js                  # NEW: Link health checker
│   ├── migrate-data.js                 # NEW: Data migration script
│   └── optimize-images.js              # NEW: Image optimization
│
├── docs/
│   ├── API.md                          # NEW: API documentation
│   ├── ARCHITECTURE.md                 # NEW: Architecture guide
│   ├── CONTRIBUTING.md
│   └── TESTING.md                      # NEW: Testing guide
│
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── jest.config.js                      # NEW: Test configuration
├── playwright.config.js                # NEW: E2E test config
├── docker-compose.yml                  # NEW: Local development
└── package.json
```

**Stats**:
- **Before**: 1 file (2,365 lines)
- **After**: ~80+ focused files (avg 50-100 lines each)
- **Testability**: 0% → 80%+ target
- **Bundle Size**: 124KB → 30KB initial (lazy loaded features)

---

## 🧪 Testing Strategy

### Current State
- **0 tests**
- Manual testing only
- No CI/CD verification
- High risk for regressions

### Proposed Testing Pyramid

```
      /\
     /  \    E2E Tests (10%)
    /____\   - Playwright for user journeys
   /      \  Integration Tests (30%)
  /        \ - React Testing Library
 /__________\ Unit Tests (60%)
              - Jest for pure functions
              - Component testing
```

### Test Coverage Targets

| Category | Current | Target | Tools |
|----------|---------|--------|-------|
| Utils | 0% | 90% | Jest |
| Components | 0% | 80% | Jest + RTL |
| Hooks | 0% | 85% | @testing-library/react-hooks |
| Integration | 0% | 70% | RTL + MSW |
| E2E | 0% | Critical paths | Playwright |

### Key Test Files to Create

```javascript
// Example: utils/calculations/treasury.test.js
describe('calculateTotalSpent', () => {
  it('should include player costs', () => {
    const players = [{ c: 50000 }, { c: 75000 }];
    expect(calculateTotalSpent(players, {}, 0)).toBe(125000);
  });
  
  it('should include inducement costs', () => {
    const inducements = { Bribes: 2, Apothecary: 1 };
    expect(calculateInducementCost(inducements, 'Goblin')).toBe(140000);
  });
});

// Example: components/roster/PlayerCard/PlayerCard.test.jsx
describe('PlayerCard', () => {
  it('should render player stats correctly', () => {
    const player = { n: 'Lineman', s: '6/3/3+/4+/9+', c: 50000 };
    render(<PlayerCard player={player} />);
    
    expect(screen.getByText('Lineman')).toBeInTheDocument();
    expect(screen.getByText(/MA 6/)).toBeInTheDocument();
  });
  
  it('should call onRemove when delete button clicked', () => {
    const onRemove = jest.fn();
    render(<PlayerCard player={player} onRemove={onRemove} />);
    
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🔌 Backend Architecture

### Technology Stack

**Recommended**:
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js or Fastify
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **Cache**: Redis (for sessions)
- **Storage**: S3-compatible (for images)
- **Queue**: BullMQ (for link checking)

### Database Schema

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Rosters
CREATE TABLE rosters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  team_name VARCHAR(100) NOT NULL,
  roster_name VARCHAR(255) NOT NULL,
  treasury INT NOT NULL,
  play_mode VARCHAR(20) NOT NULL, -- 'league' or 'tournament'
  roster_data JSONB NOT NULL,     -- Full roster state
  is_public BOOLEAN DEFAULT false,
  share_token VARCHAR(50) UNIQUE, -- For sharing rosters
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rosters_user_id ON rosters(user_id);
CREATE INDEX idx_rosters_share_token ON rosters(share_token);

-- Retailer Links
CREATE TABLE retailer_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_name VARCHAR(255) NOT NULL,
  team_name VARCHAR(100),          -- NULL = general store
  url TEXT NOT NULL,
  category VARCHAR(50),             -- 'team', 'star-player', 'accessories'
  status VARCHAR(20) DEFAULT 'unchecked', -- 'active', 'broken', 'unchecked'
  last_checked_at TIMESTAMP,
  http_status_code INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_retailer_links_team ON retailer_links(team_name);
CREATE INDEX idx_retailer_links_status ON retailer_links(status);

-- Link Check History (for monitoring trends)
CREATE TABLE link_check_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id UUID REFERENCES retailer_links(id) ON DELETE CASCADE,
  checked_at TIMESTAMP DEFAULT NOW(),
  status_code INT,
  response_time_ms INT,
  is_successful BOOLEAN
);
```

### API Endpoints

```
Authentication:
POST   /api/auth/register          # Create account
POST   /api/auth/login             # Login
POST   /api/auth/logout            # Logout
POST   /api/auth/refresh           # Refresh JWT
GET    /api/auth/me                # Get current user

Rosters:
GET    /api/rosters                # List user's rosters
POST   /api/rosters                # Create new roster
GET    /api/rosters/:id            # Get specific roster
PUT    /api/rosters/:id            # Update roster
DELETE /api/rosters/:id            # Delete roster
GET    /api/rosters/shared/:token  # Get shared roster (public)

Teams:
GET    /api/teams                  # List all teams
GET    /api/teams/:name            # Get team details (with lore)
GET    /api/teams/:name/positions  # Get team positions
GET    /api/teams/:name/retailers  # Get retailer links for team

Star Players:
GET    /api/star-players           # List all star players
GET    /api/star-players/:name     # Get star player details

Retailer Links:
GET    /api/retailers              # List all retailers
GET    /api/retailers/links        # Get all links (with status)
POST   /api/retailers/links/check  # Trigger manual link check (admin)
```

### Link Checker Service

```javascript
// services/linkChecker.service.js
import axios from 'axios';
import { queue } from '../queue/linkCheckQueue.js';

export class LinkCheckerService {
  async checkAllLinks() {
    const links = await db.retailerLinks.findMany();
    
    for (const link of links) {
      await queue.add('check-link', { linkId: link.id });
    }
  }
  
  async checkSingleLink(linkId) {
    const link = await db.retailerLinks.findUnique({ where: { id: linkId } });
    
    try {
      const startTime = Date.now();
      const response = await axios.head(link.url, {
        timeout: 10000,
        maxRedirects: 5
      });
      const responseTime = Date.now() - startTime;
      
      await db.retailerLinks.update({
        where: { id: linkId },
        data: {
          status: 'active',
          httpStatusCode: response.status,
          lastCheckedAt: new Date()
        }
      });
      
      await db.linkCheckHistory.create({
        data: {
          linkId,
          statusCode: response.status,
          responseTimeMs: responseTime,
          isSuccessful: true
        }
      });
      
      return { success: true, status: response.status };
    } catch (error) {
      await db.retailerLinks.update({
        where: { id: linkId },
        data: {
          status: 'broken',
          httpStatusCode: error.response?.status || 0,
          lastCheckedAt: new Date()
        }
      });
      
      await db.linkCheckHistory.create({
        data: {
          linkId,
          statusCode: error.response?.status || 0,
          responseTimeMs: 0,
          isSuccessful: false
        }
      });
      
      return { success: false, error: error.message };
    }
  }
}
```

### GitHub Actions for Link Checking

```yaml
# .github/workflows/link-checker.yml
name: Daily Link Health Check

on:
  schedule:
    - cron: '0 9 * * *'  # Run at 9 AM UTC daily
  workflow_dispatch:      # Allow manual trigger

jobs:
  check-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check Retailer Links
        run: |
          curl -X POST https://api.bloodbowlroster.com/api/retailers/links/check \
            -H "Authorization: Bearer ${{ secrets.ADMIN_API_KEY }}" \
            -H "Content-Type: application/json"
      
      - name: Get Link Status Report
        run: |
          curl https://api.bloodbowlroster.com/api/retailers/links?status=broken \
            -H "Authorization: Bearer ${{ secrets.ADMIN_API_KEY }}" \
            > broken-links.json
      
      - name: Create Issue if Broken Links Found
        if: ${{ hashFiles('broken-links.json') != '' }}
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const brokenLinks = JSON.parse(fs.readFileSync('broken-links.json', 'utf8'));
            
            if (brokenLinks.length > 0) {
              github.rest.issues.create({
                owner: context.repo.owner,
                repo: context.repo.repo,
                title: `⚠️ ${brokenLinks.length} Broken Retailer Link(s) Detected`,
                body: brokenLinks.map(link => 
                  `- **${link.retailerName}**: ${link.url} (Status: ${link.httpStatusCode})`
                ).join('\n'),
                labels: ['broken-links', 'automated']
              });
            }
```

---

## 📱 Mobile Strategy

### Phase 1: Progressive Web App (PWA)

**Benefits**:
- Works on all devices immediately
- Installable to home screen
- Offline support
- Push notifications
- Lower development cost than native

**Implementation**:
```javascript
// public/service-worker.js
const CACHE_NAME = 'blood-bowl-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/images/teams/',  // Pre-cache team images
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

**manifest.json**:
```json
{
  "name": "Blood Bowl Roster Builder",
  "short_name": "BB Roster",
  "description": "Build and manage Blood Bowl team rosters",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#dc2626",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Phase 2: React Native (Future)

**When to Consider**:
- Need native features (camera, NFC, deep OS integration)
- Performance requirements exceed web capabilities
- App store presence is important

**Shared Code Strategy**:
- Use React Native Web for maximum code sharing
- Share business logic (store, utils, hooks)
- Platform-specific UI components only

---

## 🗺️ Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)

**Goals**: Setup infrastructure, begin decoupling

**Tasks**:
1. **Project Setup**
   - [ ] Initialize test framework (Jest + RTL)
   - [ ] Setup ESLint/Prettier with strict rules
   - [ ] Add TypeScript (optional but recommended)
   - [ ] Configure path aliases (`@/components`, `@/utils`)

2. **Data Extraction**
   - [ ] Move team data to `/src/data/teams/teams.json`
   - [ ] Move skill access to separate file
   - [ ] Create data loading utilities
   - [ ] Write migration script from current format

3. **Component Library Start**
   - [ ] Extract and test `Button` component
   - [ ] Extract and test `Card` component
   - [ ] Extract and test `Modal` component
   - [ ] Extract `formatStatsDisplay()` to `StatDisplay` component

4. **Testing Infrastructure**
   - [ ] Write first 10 tests for utility functions
   - [ ] Setup test coverage reporting
   - [ ] Add pre-commit hooks (Husky) to run tests

**Deliverable**: Tests passing, 2-3 components extracted, data in JSON files

### Phase 2: Component Decomposition (Weeks 3-4)

**Goals**: Break monolith into feature modules

**Tasks**:
1. **Roster Feature Module**
   - [ ] Extract `BuildView` component
   - [ ] Extract `RosterView` component
   - [ ] Extract `PrintView` component
   - [ ] Create `useRoster` hook for state management
   - [ ] Write integration tests for roster building flow

2. **Player Management**
   - [ ] Extract `PlayerCard` component
   - [ ] Extract `PlayerList` component
   - [ ] Extract `PositionGrid` component
   - [ ] Create `usePlayers` hook
   - [ ] Test player add/remove functionality

3. **Treasury & Calculations**
   - [ ] Extract all calculation functions to `/utils/calculations/`
   - [ ] Create `useTreasury` hook
   - [ ] Write comprehensive tests for treasury logic
   - [ ] Test edge cases (negative balance, max players, etc.)

4. **State Management**
   - [ ] Setup Zustand or Redux Toolkit
   - [ ] Create `rosterSlice` for roster state
   - [ ] Migrate useState calls to global store
   - [ ] Add Redux DevTools

**Deliverable**: 50%+ test coverage, major components extracted

### Phase 3: Backend Development (Weeks 5-6)

**Goals**: Build API, user accounts, data persistence

**Tasks**:
1. **Backend Setup**
   - [ ] Initialize Node.js/Express project
   - [ ] Setup PostgreSQL database
   - [ ] Configure Prisma ORM
   - [ ] Create database migrations

2. **Authentication**
   - [ ] Implement JWT auth
   - [ ] Create register/login endpoints
   - [ ] Add password hashing (bcrypt)
   - [ ] Write auth middleware

3. **Roster API**
   - [ ] Create roster CRUD endpoints
   - [ ] Add roster sharing via tokens
   - [ ] Implement roster validation
   - [ ] Write API tests

4. **Frontend Integration**
   - [ ] Create API client layer
   - [ ] Setup React Query for data fetching
   - [ ] Build login/register UI
   - [ ] Implement save/load roster functionality

**Deliverable**: Working auth, rosters save to database

### Phase 4: New Features (Weeks 7-8)

**Goals**: Team info, retailer links, star player images

**Tasks**:
1. **Team Information**
   - [ ] Create `lore.json` with team descriptions
   - [ ] Build `TeamInfo` component
   - [ ] Add strategy tips and playstyle info
   - [ ] Create team detail pages

2. **Retailer Integration**
   - [ ] Populate `retailers.json` with links
   - [ ] Create `RetailerLinks` component
   - [ ] Build link checker service
   - [ ] Setup GitHub Actions for daily checks
   - [ ] Create admin dashboard for link management

3. **Star Player Images**
   - [ ] Source/create star player portraits
   - [ ] Optimize images (WebP, multiple sizes)
   - [ ] Implement lazy loading
   - [ ] Update `StarPlayerCard` component
   - [ ] Add image fallbacks

4. **PWA Setup**
   - [ ] Create service worker
   - [ ] Add manifest.json
   - [ ] Implement offline support
   - [ ] Test installability

**Deliverable**: All new features working, app installable as PWA

### Phase 5: Polish & Performance (Weeks 9-10)

**Goals**: Optimize, finalize, deploy

**Tasks**:
1. **Performance Optimization**
   - [ ] Implement code splitting
   - [ ] Lazy load feature modules
   - [ ] Optimize images (WebP, srcset)
   - [ ] Add performance monitoring
   - [ ] Lighthouse score >90

2. **Testing & QA**
   - [ ] Achieve 80%+ test coverage
   - [ ] Write E2E tests for critical flows
   - [ ] Cross-browser testing
   - [ ] Mobile device testing
   - [ ] Accessibility audit (WCAG AA)

3. **Documentation**
   - [ ] API documentation (Swagger/OpenAPI)
   - [ ] Architecture guide
   - [ ] Contribution guidelines
   - [ ] User guide

4. **Deployment**
   - [ ] Setup production environment
   - [ ] Configure CI/CD pipeline
   - [ ] Setup monitoring (Sentry, etc.)
   - [ ] Database backups
   - [ ] CDN for images

**Deliverable**: Production-ready app, deployed and monitored

---

## 🔧 Technology Recommendations

### State Management
**Recommended**: **Zustand**

**Why**:
- Simpler than Redux
- Less boilerplate
- Better TypeScript support
- Easier testing
- Can migrate incrementally

**Example**:
```javascript
// store/slices/rosterSlice.js
import create from 'zustand';

export const useRosterStore = create((set, get) => ({
  selectedTeam: null,
  purchasedPlayers: [],
  treasury: 1000000,
  
  selectTeam: (teamName) => set({ 
    selectedTeam: teamName,
    purchasedPlayers: [],
    treasury: 1000000
  }),
  
  addPlayer: (position) => set((state) => ({
    purchasedPlayers: [...state.purchasedPlayers, {
      id: generateId(),
      ...position,
      addedSkills: { primary: [], secondary: [] }
    }]
  })),
  
  removePlayer: (playerId) => set((state) => ({
    purchasedPlayers: state.purchasedPlayers.filter(p => p.id !== playerId)
  }))
}));
```

### Data Fetching
**Recommended**: **TanStack Query (React Query)**

**Why**:
- Automatic caching
- Background refetching
- Optimistic updates
- Loading/error states built-in
- DevTools

**Example**:
```javascript
// hooks/useRosters.js
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/api/client';

export function useRosters() {
  return useQuery({
    queryKey: ['rosters'],
    queryFn: () => api.rosters.list()
  });
}

export function useSaveRoster() {
  return useMutation({
    mutationFn: (roster) => api.rosters.create(roster),
    onSuccess: () => {
      queryClient.invalidateQueries(['rosters']);
    }
  });
}
```

### Routing
**Recommended**: **React Router v6**

**Routes**:
```javascript
// Router.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const RosterBuilder = lazy(() => import('./pages/RosterBuilder'));
const MyRosters = lazy(() => import('./pages/MyRosters'));
const TeamBrowser = lazy(() => import('./pages/TeamBrowser'));

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/build', element: <RosterBuilder /> },
  { path: '/rosters', element: <MyRosters /> },
  { path: '/rosters/:id', element: <RosterBuilder /> },
  { path: '/teams', element: <TeamBrowser /> },
  { path: '/teams/:teamName', element: <TeamDetail /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);

export default function Router() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
```

### TypeScript
**Recommended**: **Gradual adoption**

**Why**:
- Better autocomplete
- Catch errors before runtime
- Self-documenting code
- Easier refactoring

**Start with**:
```typescript
// types/roster.ts
export interface Player {
  id: string;
  n: string;  // name
  c: number;  // cost
  s: string;  // stats
  k: string;  // basic skills
  addedSkills: {
    primary: string[];
    secondary: string[];
  };
}

export interface Roster {
  id: string;
  teamName: string;
  rosterName: string;
  treasury: number;
  playMode: 'league' | 'tournament';
  players: Player[];
  inducements: Record<string, number>;
}
```

---

## 📊 Success Metrics

### Technical Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Test Coverage | 0% | 80% | Week 10 |
| Bundle Size (initial) | 124KB | <50KB | Week 6 |
| Lighthouse Score | Unknown | >90 | Week 9 |
| Time to Interactive | Unknown | <3s | Week 9 |
| Number of Files | 1 | ~80 | Week 6 |
| Lines per File | 2,365 | <150 avg | Week 6 |
| Build Time | Fast | <30s | Week 6 |
| API Response Time | N/A | <200ms p95 | Week 8 |

### User Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Mobile Usability | Good | Excellent | Week 9 |
| User Accounts | 0 | Available | Week 8 |
| Saved Rosters | 0 | Unlimited | Week 8 |
| Offline Support | No | Yes (PWA) | Week 9 |
| Load Time (3G) | Unknown | <5s | Week 9 |

---

## ⚠️ Risks & Mitigation

### Risk 1: Breaking Changes During Refactor
**Impact**: HIGH  
**Probability**: MEDIUM

**Mitigation**:
- Write tests BEFORE refactoring
- Use feature flags for new components
- Maintain current working version in separate branch
- Gradual rollout (beta testing)

### Risk 2: Data Migration Issues
**Impact**: MEDIUM  
**Probability**: LOW

**Mitigation**:
- Write comprehensive migration scripts
- Test migrations on copy of production data
- Keep old format readers for 1-2 versions
- Add data validation

### Risk 3: Backend Complexity
**Impact**: HIGH  
**Probability**: MEDIUM

**Mitigation**:
- Start with minimal viable API
- Use proven technologies (PostgreSQL, Express)
- Thorough API testing
- Database backups from day 1

### Risk 4: Performance Regression
**Impact**: MEDIUM  
**Probability**: LOW

**Mitigation**:
- Performance benchmarks before refactor
- Continuous Lighthouse monitoring
- Bundle size tracking in CI
- Code splitting from day 1

### Risk 5: Scope Creep
**Impact**: HIGH  
**Probability**: HIGH

**Mitigation**:
- Stick to phased roadmap
- MVP features only in each phase
- Say "no" to nice-to-haves
- Backlog for future iterations

---

## 💰 Cost Estimate (if hosted)

### Infrastructure Costs (Monthly)

| Service | Purpose | Est. Cost |
|---------|---------|-----------|
| Vercel/Netlify | Frontend hosting | $0-20 |
| Railway/Render | Backend API | $5-15 |
| PostgreSQL | Database (managed) | $5-10 |
| Redis | Session cache | $0-5 |
| S3/R2 | Image storage | $1-5 |
| **Total** | | **$11-55/mo** |

**Note**: Can start with free tiers (Vercel free, Railway free tier, etc.)

### Development Time

| Phase | Estimated Hours | Notes |
|-------|----------------|-------|
| Phase 1: Foundation | 40-60 hrs | Data extraction, testing setup |
| Phase 2: Components | 60-80 hrs | Biggest effort, core refactor |
| Phase 3: Backend | 40-60 hrs | If using proven stack |
| Phase 4: Features | 40-60 hrs | Team info, images, links |
| Phase 5: Polish | 20-40 hrs | Testing, optimization |
| **Total** | **200-300 hrs** | ~6-10 weeks |

---

## 🎯 Quick Wins (Can Do Now)

### Week 1 Quick Wins

**Before starting full refactor**, these provide immediate value:

1. **Add Test Infrastructure** (2-4 hours)
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```
   - Write first 5-10 tests for utility functions
   - Sets foundation for safe refactoring

2. **Extract Data to JSON** (4-6 hours)
   - Move `T` object to `src/data/teams/teams.json`
   - Move `SKILLS_BY_CATEGORY` to `src/data/skills.json`
   - Keeps code cleaner, easier to update teams

3. **Extract 3 Components** (6-8 hours)
   - `Button.jsx` (used everywhere)
   - `PlayerCard.jsx` (complex, reusable)
   - `StatDisplay.jsx` (pure display logic)
   - Proves concept, provides templates

4. **Add TypeScript** (2-4 hours)
   - Just type definitions, no conversion yet
   - `types/roster.ts`, `types/team.ts`
   - Better IDE autocomplete immediately

5. **Setup Git Pre-commit Hooks** (1-2 hours)
   ```bash
   npm install --save-dev husky lint-staged
   ```
   - Runs tests before commit
   - Prevents broken code from being committed

**Total Time**: 15-24 hours  
**Impact**: HIGH (enables safe refactoring)

---

## 📚 Recommended Reading

### Architecture & Patterns
- [Feature-Sliced Design](https://feature-sliced.design/) - Modular architecture
- [Bulletproof React](https://github.com/alan2207/bulletproof-react) - Project structure guide
- [Testing Library Docs](https://testing-library.com/) - Testing philosophy

### State Management
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Redux Toolkit Best Practices](https://redux-toolkit.js.org/)

### Performance
- [React Performance Optimization](https://kentcdodds.com/blog/usememo-and-usecallback)
- [Web.dev - Performance](https://web.dev/performance/)

### Backend
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [PostgreSQL Performance](https://wiki.postgresql.org/wiki/Performance_Optimization)

---

## 🤝 Next Steps

### Decision Points

1. **Approve this plan?**
   - Modify timeline/scope as needed
   - Adjust based on available time/resources

2. **Start with quick wins?**
   - Low risk, immediate benefit
   - Proves concept before full commitment

3. **Backend requirements?**
   - User accounts priority?
   - Can defer to Phase 4-5 if needed

4. **TypeScript adoption?**
   - Gradual (recommended) vs full migration
   - Affects timeline

### How to Begin

**Recommended First Steps**:

1. **Create branch**: `git checkout -b refactor/phase-1-foundation`
2. **Install test tools**: `npm install --save-dev jest @testing-library/react`
3. **Write first test**: Start with `utils/calculations/treasury.test.js`
4. **Extract data**: Move team data to JSON
5. **Extract one component**: Start with `Button` or `Card`

**Then**:
- Review progress after 1 week
- Adjust plan based on learnings
- Continue with Phase 2

---

## ❓ Questions & Discussion

### Open Questions

1. **Priority ranking**: Which features are most important?
   - User accounts?
   - Team information?
   - Retailer links?
   - Star player images?

2. **Timeline flexibility**: 6-10 weeks realistic?

3. **Resources**: Solo development or team?

4. **Hosting**: Self-hosted or cloud platform?

5. **Mobile app**: PWA sufficient or React Native needed?

### Feedback Welcome

This is a living document. Please provide feedback on:
- Scope (too ambitious/conservative?)
- Timeline (realistic?)
- Technology choices (alternatives?)
- Priority (what to focus on first?)
- Concerns (what am I missing?)

---

**Document Version**: 1.0  
**Created**: December 17, 2025  
**Author**: AI Assistant (Claude)  
**Status**: DRAFT - Awaiting Review

