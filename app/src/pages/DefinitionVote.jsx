import React, { PureComponent } from 'react';
import firebase from '../utils/firebase';
import Link from '../components/Link';

import Definition from '../components/Definition';

class Definitions extends PureComponent {
  state = { definition: {}, loading: true }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(() => {
      this.getFirstUnvotedDefinition();
    });
  }

  componentWillReceiveProps() {
    firebase.auth.onAuthStateChanged(() => {
      this.getFirstUnvotedDefinition();
    });
  }

  getFirstUnvotedDefinition = () => {
    this.setState(
      { definition: {}, loading: true },
      () => firebase.readFirstUnvotedDefinition(
        definition => this.setState({ definition, loading: false }),
      ),
    );
  }

  handleDislike = () => { console.log('Dislike'); }

  handleIgnore = () => { console.log('Ignore'); }

  handleLike = () => { console.log('Like'); }

  render() {
    const { definition, loading } = this.state;
    if (loading) return <main><div className="text-center">Loading...</div></main>;
    if (!definition) return <main><div className="text-center">Good job! You've voted for all definitions. Come back again later.</div></main>;
    return (
      <main>
        <div className="row">
          <div className="medium-8 medium-offset-2 columns">
            <h3>
              Should this be in
              {' '}
              <strong>Kamus</strong>
              Kita?
            </h3>
            <Definition definition={definition} hideMenu hideRating />
            <div className="row">
              <div className="small-12 columns">
                <div className="expanded button-group">
                  <button type="button" className="button alert" onClick={this.handleDislike}>
                    <i className="material-icons">thumb_down</i>
                  </button>
                  <button type="button" className="button light-gray" onClick={this.handleIgnore}>
                    <i className="material-icons">visibility_off</i>
                  </button>
                  <button type="button" className="button success" onClick={this.handleLike}>
                    <i className="material-icons">thumb_up</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Definitions;
