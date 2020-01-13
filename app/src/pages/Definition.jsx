import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import firebase from '../utils/firebase';

import Sidebar from '../components/Sidebar';
import DefinitionCard from '../components/Definition';

const Definition = () => {
  const { id } = useParams();
  const [definition, setDefinition] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    firebase.readDefinition(
      id,
      definition => {
        setDefinition(definition);
        setLoading(false);
      },
    )
  }, [id]);
  useEffect(() => () => { }, []);

  return (
    <main>
      <div className="row">
        <div className="medium-12 columns">
          <div className="row">
            <div className="medium-8 columns">
              {loading
                ? <div className="text-center">Loading...</div>
                : <DefinitionCard definition={definition} id={definition.id} />
              }
            </div>
            <div className="medium-4 columns">
              <Sidebar word={definition.key} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

Definition.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Definition;
