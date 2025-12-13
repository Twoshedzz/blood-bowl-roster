import React from 'react';
import ReactDOM from 'react-dom/client';

import BloodBowlRoster from './blood-bowl-roster.jsx'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Your component is rendered here! */}
    <BloodBowlRoster/>
  </React.StrictMode>,
);