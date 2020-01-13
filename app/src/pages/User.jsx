import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import firebase from '../utils/firebase';

import Sidebar from '../components/Sidebar';
import Definition from '../components/Definition';
import Pagination from '../components/Pagination';

const User = () => {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useParams();
  const cursor = new URLSearchParams(useLocation().search).get('cursor')

  useEffect(() => {
    setLoading(true);
    firebase.readDefinitions(
      definitions => {
        setDefinitions(definitions);
        setLoading(false);
      },
      { user, cursor },
    )
  }, [user, cursor])
  useEffect(() => () => { }, []);

  const renderDefinitions = () => {
    if (loading) return <div className="text-center">Loading...</div>;
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
    <main>
      <div className="row">
        <div className="medium-12 columns">
          <div className="row">
            <div className="medium-8 columns">
              {renderDefinitions()}
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

User.propTypes = {
  match: PropTypes.object.isRequired,
};

export default User;
