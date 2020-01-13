import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from './Link';

const Sidebar = ({ word }) => {
  const [nonce, setNonce] = useState(Date.now());

  return (
    <>
      <div className="row">
        <div className="columns small-12">
          <Link to={`/add?word=${word}`} className="button jumbo">Add definition</Link>
        </div>
      </div>
      <footer>
        <div className="row">
          <div className="columns small-12">
            <div className="expanded button-group">
              <a href="https://facebook.com/kamuskita" className="button facebook">facebook</a>
              <a href="https://twitter.com/twtkamuskita" className="button twitter">twitter</a>
            </div>
          </div>
        </div>
        <div className="text-center links">
          <Link onClick={() => setNonce(Date.now())} to={`/random?nonce=${nonce}`}>random</Link>
          <Link to="/browse">browse</Link>
          <Link to="/privacy">privacy</Link>
        </div>
      </footer>
    </>
  );
}

Sidebar.propTypes = {
  word: PropTypes.string,
};

Sidebar.defaultProps = {
  word: '',
};

export default Sidebar;
