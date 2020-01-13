import React, { useState, useEffect } from 'react';
import firebase from '../utils/firebase';
import Link from '../components/Link';

import Sidebar from '../components/Sidebar';

const Definitions = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    firebase.readWords(
      words => {
        setWords(words);
        setLoading(false);
      },
    )
  }, []);
  useEffect(() => () => { }, []);

  const renderWords = () => {
    if (loading) return <div className="text-center">Loading...</div>;
    return (
      <div className="callout">
        <ul className="words-list">
          {words.map(({ id, word }) => <li key={id}><Link to={`/w/${id}`}>{word}</Link></li>)}
        </ul>
      </div>
    );
  }

  return (
    <main>
      <div className="row">
        <div className="medium-12 columns">
          <div className="row">
            <div className="medium-8 columns">
              {renderWords()}
            </div>
            <div className="medium-4 columns">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Definitions;
