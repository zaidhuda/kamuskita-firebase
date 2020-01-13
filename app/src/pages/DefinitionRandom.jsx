import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import dig from 'object-dig';
import firebase from '../utils/firebase';

import Sidebar from '../components/Sidebar';
import Definition from '../components/Definition';

const Definitions = () => {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const nonce = new URLSearchParams(useLocation().search).get('nonce')

  useEffect(() => {
    setLoading(true);
    firebase.readWords((words) => {
      const { length } = words;
      const pos = Math.floor(Math.random() * length);
      getDefinitions(words[pos].id);
    });
  }, [nonce]);
  useEffect(() => () => { }, []);

  const getDefinitions = (word) => {
    firebase.readDefinitions(
      definitions => {
        setDefinitions(definitions);
        setLoading(false);
      },
      { key: word },
    )
  }

  const renderDefinitions = () => {
    if (loading) return <div className="text-center">Loading...</div>;
    return definitions.map(
      definition => <Definition definition={definition} key={definition.id} />,
    );
  }

  return (
    <main>
      <div className="row">
        <div className="medium-12 columns">
          <div className="row">
            <div className="medium-8 columns">
              {renderDefinitions()}
            </div>
            <div className="medium-4 columns">
              <Sidebar word={dig(definitions[0], 'word')} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Definitions;
