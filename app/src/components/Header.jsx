import React, { useState, useEffect } from 'react';
import Link from './Link';
import history from '../utils/history';
import firebase from '../utils/firebase';

const hideSearchIn = [
  '/u/edit',
  '/sign_in',
  '/sign_up',
  '/recover',
  '/password',
];

const Header = () => {
  const [nonce, setNonce] = useState(Date.now());
  const [active, setActive] = useState(false);
  const [word, setWord] = useState('');
  const [user, setUser] = useState('');
  const [
    searchVisibility,
    setSearchVisibilitiy,
  ] = useState(!hideSearchIn.includes(history.location.pathname));

  useEffect(() => {
    firebase.auth.onAuthStateChanged((signedUser) => {
      setUser(signedUser);
    });
  }, []);
  useEffect(() => () => { }, []);

  useEffect(() => {
    history.listen((location) => {
      setSearchVisibilitiy(!hideSearchIn.includes(location.pathname));
    });
  }, []);
  useEffect(() => () => { }, []);

  const inputValueChange = (e) => {
    const { value } = e.target;

    setWord(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/w/${word}`);
  };

  const signOut = () => {
    firebase.auth.signOut()
      .then(() => history.push('/'));
  };

  const renderUserMenu = () => {
    if (!user) {
      return (
        <li>
          <Link className="button icon" to="/sign_in"><i className="material-icons">account_circle</i></Link>
        </li>
      );
    }

    return (
      <li>
        <ul className="dropdown menu">
          <li role="menuitem" className="is-dropdown-submenu-parent opens-left is-active" aria-haspopup="true" aria-label="menu">
            <a role="presentation" className="button icon" onClick={() => setActive(!active)}>
              <i className="material-icons">menu</i>
            </a>
            <ul
              className={`menu vertical is-dropdown-submenu submenu first-sub ${active ? 'js-dropdown-active' : ''}`}
              role="menu"
              onClick={() => setActive(!active)}
            >
              <li className="separator is-submenu-item is-dropdown-submenu-item" role="menuitem" />
              <li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
                <Link to="/u/edit">Manage account</Link>
              </li>
              <li className="separator is-submenu-item is-dropdown-submenu-item" role="menuitem" />
              <li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
                <a role="presentation" onClick={signOut}>Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    );
  };

  const renderSearchForm = () => {
    if (!searchVisibility) return null;
    return (
      <div className="top-bar">
        <div className="row">
          <div className="middle-12 columns">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={word}
                placeholder="Search"
                onChange={inputValueChange}
              />
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header>
      <div className="top-bar">
        <div className="row">
          <div className="middle-12 columns">
            <div className="top-bar-title">
              <Link to="/">
                <strong>Kamus</strong>
                Kita
              </Link>
            </div>
            <div className="top-bar-right">
              <ul className="menu">
                <li>
                  <Link className="button icon" to="/add"><i className="material-icons">add</i></Link>
                </li>
                <li>
                  <Link onClick={() => setNonce(Date.now())} className="button icon" to={`/random?nonce=${nonce}`}><i className="material-icons">shuffle</i></Link>
                </li>
                {renderUserMenu()}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {renderSearchForm()}
    </header>
  );
};

export default Header;
