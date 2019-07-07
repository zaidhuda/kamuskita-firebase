import React, { PureComponent } from 'react';
import firebase from '../utils/firebase';
import Link from '../components/Link';

import Sidebar from '../components/Sidebar';
import Definition from '../components/Definition';

class Definitions extends PureComponent {
  state = { word: null, definitions: [], loading: true }

  componentDidMount() {
    this.getWords();
  }

  componentWillReceiveProps() {
    this.getWords();
  }

  getWords = () => {
    firebase.readWords((words) => {
      const { length } = words;
      const pos = Math.floor(Math.random() * length);
      this.getDefinitions(words[pos].id);
    });
  }

  getDefinitions = (word) => {
    this.setState(
      { definitions: [], loading: true, word },
      () => firebase.readDefinitions(
        definitions => this.setState({ definitions, loading: false }),
        { key: word },
      ),
    );
  }

  renderDefinitions() {
    const { loading, definitions, word } = this.state;
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
    return definitions.map(
      definition => <Definition definition={definition} key={definition.id} />,
    );
  }

  render() {
    const { word } = this.state;
    return (
      <main>
        <div className="row">
          <div className="medium-12 columns">
            <div className="row">
              <div className="medium-8 columns">
                {this.renderDefinitions()}
              </div>
              <div className="medium-4 columns">
                <Sidebar word={word} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Definitions;
