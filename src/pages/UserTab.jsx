import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, nextPage, bookmarkUser, unbookmarkUser } from '../redux/userSlice';
import UserCard from '../components/UserCard';

const UsersTab = () => {
  const [search, setSearch] = useState('');
  const { users, bookmarked, page } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.github.com/users?per_page=10&page=${page}`);
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
      setLoading(false);
    };
  
    fetchUsers();
  }, [page, dispatch]); 

  const handleLoadMore = () => {
    dispatch(nextPage());
  };

  const handleSearch = e => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(user => user.login.toLowerCase().includes(search));

  const handleBookmark = user => {
    if (bookmarked.some(b => b.id === user.id)) {
      dispatch(unbookmarkUser(user));
    } else {
      dispatch(bookmarkUser(user));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Users"
        value={search}
        onChange={handleSearch}
      />
      <div className="user-list">
        {filteredUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            isBookmarked={bookmarked.some(b => b.id === user.id)}
            onBookmark={handleBookmark} />
        ))}
      </div>
      <button onClick={handleLoadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default UsersTab;
