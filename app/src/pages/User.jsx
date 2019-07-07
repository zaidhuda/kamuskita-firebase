import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dig from 'object-dig';
import firebase from '../utils/firebase';

import Sidebar from '../components/Sidebar';
import Definition from '../components/Definition';

class User extends PureComponent {
  state = { user: null, definitions: [], loading: true }

  componentDidMount() {
    const { match: { params: { user } } } = this.props;
    this.getDefinitions(user);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.state;
    const nextUser = dig(nextProps, 'match', 'params', 'user');
    if (nextUser !== user) {
      this.getDefinitions(nextUser);
    }
  }

  getDefinitions = (user) => {
    this.setState(
      { definitions: [], loading: true, user },
      () => firebase.readDefinitions(
        definitions => this.setState({ definitions, loading: false }),
        { user },
      ),
    );
  }

  render() {
    const { definitions, loading } = this.state;
    return (
      <main>
        <div className="row">
          <div className="medium-12 columns">
            <div className="row">
              <div className="medium-8 columns">
                { loading
                  ? <div className="text-center">Loading...</div>
                  : definitions.map(
                    definition => <Definition definition={definition} key={definition.id} />,
                  )
              }
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
}

User.propTypes = {
  match: PropTypes.object.isRequired,
};

export default User;
