import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dig from 'object-dig';
import firebase, { PAGINATE_PER } from '../utils/firebase';
import history from '../utils/history';

import Link from '../components/Link';
import Sidebar from '../components/Sidebar';
import Definition from '../components/Definition';

class Definitions extends PureComponent {
  state = {
    cursor: null, word: null, definitions: [], loading: true,
  }

  componentDidMount() {
    const { match: { params: { word } } } = this.props;
    const search = new URLSearchParams(history.location.search);
    const cursor = search.get('cursor');
    this.getDefinitions(word, cursor);
  }

  componentWillReceiveProps(nextProps) {
    const nextKey = dig(nextProps, 'match', 'params', 'word');
    const search = new URLSearchParams(history.location.search);
    const nextCursor = search.get('cursor');
    const { word, cursor } = this.state;

    if (nextKey !== word || nextCursor !== cursor) {
      this.getDefinitions(nextKey, nextCursor);
    }
  }

  getDefinitions = (word, cursor) => {
    this.setState(
      {
        definitions: [], loading: true, word, cursor,
      },
      () => firebase.readDefinitions(
        definitions => this.setState({ definitions, loading: false }),
        { key: word, cursor },
      ),
    );
  }

  renderPaginination = () => {
    const { definitions } = this.state;
    if (definitions.length < PAGINATE_PER) return null;
    const cursor = definitions.slice(-1)[0].id;
    return (
      <ul className="pagination text-center" role="navigation" aria-label="Pagination">
        <li>
          <Link
            to={`?cursor=${cursor}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Next
            {' '}
            <i className="material-icons">keyboard_arrow_right</i>
          </Link>
        </li>
      </ul>
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

    return (
      <>
        {definitions.map(
          definition => <Definition definition={definition} key={definition.id} />,
        )}
        {this.renderPaginination()}
      </>
    );
  }

  render() {
    const { word } = this.state;
    return (
      <div className="row">
        <div className="medium-12 columns">
          <main>
            <div className="row">
              <div className="medium-8 columns">
                {this.renderDefinitions()}
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
}

Definitions.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Definitions;
