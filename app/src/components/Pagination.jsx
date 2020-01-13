import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import { PAGINATE_PER } from '../utils/firebase';

const Pagination = ({ definitions }) => {
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

Pagination.propTypes = {
  definitions: PropTypes.array.isRequired,
};

export default Pagination;
