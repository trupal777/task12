// src/pages/BookmarkedTab.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unbookmarkUser } from '../redux/userSlice';
import UserCard from '../components/UserCard';

const BookmarkedTab = () => {
  const [search, setSearch] = useState('');
  const bookmarked = useSelector(state => state.user.bookmarked); // Make sure to access the correct state path
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredBookmarks = bookmarked.filter(user =>
    user.login.toLowerCase().includes(search)
  );

  const handleUnbookmark = (user) => {
    dispatch(unbookmarkUser(user));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Bookmarked Users"
        value={search}
        onChange={handleSearch}
      />
      <div className="user-list">
        {filteredBookmarks.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isBookmarked={true}
            onBookmark={handleUnbookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkedTab;
