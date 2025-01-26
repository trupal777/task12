import React from 'react';

const UserCard = ({ user, isBookmarked, onBookmark }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt="Avatar" className="avatar" />
      <span>{user.login}</span>
      <button onClick={() => onBookmark(user)}>
      {isBookmarked ? '★ Unbookmark' : '☆ Bookmark'}
      </button>
    </div>
  );
};

export default UserCard;