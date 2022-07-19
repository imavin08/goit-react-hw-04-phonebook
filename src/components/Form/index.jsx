import { Component } from 'react';
import css from './Form.module.css';
import PropTypes from 'prop-types';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  hadleNameChange = e => {
    this.setState({
      name: e.currentTarget.value,
    });
  };

  handleNumberChange = e => {
    this.setState({
      number: e.currentTarget.value,
    });
  };

  alertSameName() {
    const { name, number } = this.state;
    const nameArr = this.props.arr.map(ar => ar.name.toLowerCase());
    if (nameArr.includes(name.toLowerCase())) {
      alert(`${name} is alredy in contacts`);
    } else {
      this.props.onSubmit(name, number);
      this.setState({ name: '', number: '' });
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.alertSameName();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className={css.form}>
        <label className={css.label}>
          Name
          <input
            value={this.state.name}
            onChange={this.hadleNameChange}
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label}>
          Number
          <input
            value={this.state.number}
            onChange={this.handleNumberChange}
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={css.btn} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  arr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
