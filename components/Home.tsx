import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Warehouse from './Warehouse';
import Community from './Community';
import SupplierPanel from './Supplier';
import { UserRole } from '../types';
import './Home.css';

interface HomeProps {
  userRole: UserRole;
}

const Home: React.FC<HomeProps> = ({ userRole }) => {
  const [activePanel, setActivePanel] = useState<string>('dashboard');

  const panelOptions = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'warehouse', label: 'Warehouse', icon: '🏭' },
    { id: 'supplier', label: 'Supplier', icon: '🚚' },
    { id: 'community', label: 'Community', icon: '👥' },
  ];

  // Filter panels based on user role
  const availablePanels = panelOptions.filter(panel => {
    if (userRole === UserRole.COMMUNITY) {
      return panel.id === 'community';
    }
    if (userRole === UserRole.SUPPLIER) {
      return panel.id === 'supplier';
    }
    return true; // Admin/Warehouse can see all
  });

  const renderPanel = () => {
    switch (activePanel) {
      case 'dashboard':
        return <Dashboard />;
      case 'warehouse':
        return <Warehouse userRole={userRole} />;
      case 'supplier':
        return <SupplierPanel />;
      case 'community':
        return <Community />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="home-container">
      <div className="panel-tabs">
        {availablePanels.map(panel => (
          <button
            key={panel.id}
            className={`tab-button ${activePanel === panel.id ? 'active' : ''}`}
            onClick={() => setActivePanel(panel.id)}
          >
            <span className="tab-icon">{panel.icon}</span>
            <span className="tab-label">{panel.label}</span>
          </button>
        ))}
      </div>
      <div className="panel-content">
        {renderPanel()}
      </div>
    </div>
  );
};

export default Home;
