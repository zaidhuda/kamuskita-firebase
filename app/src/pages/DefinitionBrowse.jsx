import React, { PureComponent } from 'react';
import firebase from '../utils/firebase';
import Link from '../components/Link';

import Sidebar from '../components/Sidebar';

class Definitions extends PureComponent {
  state = { loading: true, words: [] }

  componentDidMount() {
    this.getDefinitions();
  }

  getDefinitions = () => {
    this.setState(
      { words: [], loading: true },
      () => firebase.readWords(
        words => this.setState({ words, loading: false }),
      ),
    );
  }

  renderWords() {
    const { loading, words } = this.state;
    if (loading) return <div className="text-center">Loading...</div>;
    return (
      <div className="callout">
        <ul className="words-list">
          {words.map(({ id, word }) => <li key={id}><Link to={`/w/${id}`}>{word}</Link></li>)}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <main>
        <div className="row">
          <div className="medium-12 columns">
            <div className="row">
              <div className="medium-8 columns">
                {this.renderWords()}
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

export default Definitions;
