import React, { useState } from 'react';
import BookmarkedTab from './pages/BookmarkedTab';
import UsersTab from './pages/UserTab';

const App = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('bookmarked')}>Bookmarked</button>
      </div>
      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'bookmarked' && <BookmarkedTab />}
    </div>
  );
};

export default App;