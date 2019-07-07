import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dig from 'object-dig';
import firebase from '../utils/firebase';

import Sidebar from '../components/Sidebar';
import DefinitionCard from '../components/Definition';

class Definition extends PureComponent {
  state = { id: null, definition: {}, loading: true }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getDefinition(id);
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.state;
    const nextId = dig(nextProps, 'match', 'params', 'id');
    if (nextId !== id) {
      this.getDefinition(nextId);
    }
  }

  getDefinition = (id) => {
    this.setState(
      { definition: {}, loading: true, id },
      () => firebase.readDefinition(
        id,
        definition => this.setState({ definition, loading: false }),
      ),
    );
  }

  render() {
    const { definition, loading } = this.state;
    return (
      <main>
        <div className="row">
          <div className="medium-12 columns">
            <div className="row">
              <div className="medium-8 columns">
                { loading
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
}

Definition.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Definition;
