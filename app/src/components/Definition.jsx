import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import firebase from '../utils/firebase';

const countLikes = votes => Object.values(votes).filter(like => like).length;
const countDisikes = votes => Object.values(votes).filter(like => !like).length;

const Definition = ({
  definition: def,
  hideMenu,
  hideRating,
}) => {
  const {
    id,
    key,
    word,
    definition,
    example,
    // tags,
    createdAt,
    user = {},
    userVotes = {},
  } = def;

  const {
    displayName: userName,
    uid: userId,
  } = user;

  const [active, setActive] = useState(false);
  const [likes, setLikes] = useState(countLikes(userVotes));
  const [dislikes, setDislikes] = useState(countDisikes(userVotes));

  const updateLikes = (votes) => {
    setLikes(countLikes(votes));
    setDislikes(countDisikes(votes));
  };

  const handleLike = () => {
    firebase.voteDefinition(id, true, votes => updateLikes(votes));
  };

  const handleDislike = () => {
    firebase.voteDefinition(id, false, votes => updateLikes(votes));
  };

  const canonical = `${window.location.origin}/d/${id}`;
  const time = new Date(createdAt.seconds * 1000);

  const renderRating = () => {
    if (hideRating) return null;
    return (
      <div className="definition-likes">
        <div className="ligtsaber-container">
          <div className="lightsabers">
            <div className="lightsaber-bar left" style={{ width: `${likes / (likes + dislikes) * 100}%` }} />
            <div className="lightsaber-bar right" style={{ width: `${dislikes / (likes + dislikes) * 100}%` }} />
          </div>
        </div>
        <button onClick={handleLike} type="button">
          <span className="text-color-gray pointer icons"><i className="material-icons">thumb_up</i></span>
          {' '}
          {likes}
        </button>
        &nbsp; &nbsp;
        <button onClick={handleDislike} type="button">
          <span className="text-color-gray pointer icons"><i className="material-icons">thumb_down</i></span>
          {' '}
          {dislikes}
        </button>
      </div>
    );
  };

  const renderMenu = () => {
    if (hideMenu) return null;
    return (
      <div className="definition-actions">
        <ul className="dropdown menu">
          <li role="menuitem" className="is-dropdown-submenu-parent opens-left" aria-haspopup="true" aria-label="">
            <i className="material-icons text-color-light-gray pointer" onClick={() => setActive(!active)} role="presentation">more_vert</i>
            <ul
              className={`menu vertical is-dropdown-submenu submenu first-sub ${active ? 'js-dropdown-active' : ''}`}
              role="menu"
              onClick={() => setActive(!active)}
            >
              <li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
                <a href={`https://www.facebook.com/sharer/sharer.php?t=${word}&amp;u=${canonical}`} target="blank">
                  Share to Facebook
                </a>
              </li>
              <li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
                <a href={`https://twitter.com/intent/tweet?text=${word}&amp;url=${canonical}&amp;hashtags=kamuskita`} target="blank">
                  Share to Twitter
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="callout definition">
      <Link to={`/w/${key}/d/${id}`} className="text-color-gray">
        <time dateTime={time}>{time.toLocaleDateString()}</time>
      </Link>
      <h1><Link to={`/w/${key}`}>{word}</Link></h1>
      <p className="pre-line">{definition}</p>
      <p className="pre-line"><em>{example}</em></p>
      <p>
        by
        {' '}
        { userId
          ? <Link to={`/u/${userId}`}>{userName || 'anonymous'}</Link>
          : 'anonymous'
        }
      </p>
      {renderRating()}
      {renderMenu()}
    </div>
  );
};

Definition.propTypes = {
  definition: PropTypes.object.isRequired,
  hideMenu: PropTypes.bool,
  hideRating: PropTypes.bool,
};

Definition.defaultProps = {
  hideMenu: false,
  hideRating: false,
};

export default Definition;
