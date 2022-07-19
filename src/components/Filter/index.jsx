import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ onChangeFilter, valueFilter }) => {
  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        onChange={onChangeFilter}
        value={valueFilter}
        type="text"
      />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
  valueFilter: PropTypes.string.isRequired,
};
