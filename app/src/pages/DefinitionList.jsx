import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import firebase from '../utils/firebase';

import Link from '../components/Link';
import Sidebar from '../components/Sidebar';
import Definition from '../components/Definition';
import Pagination from '../components/Pagination';

const Definitions = () => {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { word } = useParams();
  const cursor = new URLSearchParams(useLocation().search).get('cursor')

  useEffect(() => {
    setLoading(true);
    firebase.readDefinitions(
      definitions => {
        setDefinitions(definitions);
        setLoading(false);
      },
      { key: word, cursor },
    )
  }, [word, cursor]);
  useEffect(() => () => { }, []);

  const renderDefinitions = () => {
    if (loading) return <div className="text-center">Loading...</div>;
    if (!definitions.length) {
      return (
        <h4>
          No record for
          {' '}
          <code>{word}</code>
          ,
          {' '}
          <Link to={`/add?word=${word}`}>add definition</Link>
        </h4>
      );
    }

    return (
      <>
        {definitions.map(
          definition => <Definition definition={definition} key={definition.id} />,
        )}
        <Pagination definitions={definitions} />
      </>
    );
  }

  return (
    <div className="row">
      <div className="medium-12 columns">
        <main>
          <div className="row">
            <div className="medium-8 columns">
              {renderDefinitions()}
            </div>
            <div className="medium-4 columns">
              <Sidebar word={word} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

Definitions.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Definitions;
