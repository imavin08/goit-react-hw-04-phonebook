import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList';
import Form from './Form';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  searchName = () => {
    const lowerCase = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCase)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parse = JSON.parse(contacts);
    if (parse) {
      this.setState({ contacts: parse });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts } = this.state;

    return (
      <div>
        <h1>Phoneboock</h1>
        <Form onSubmit={this.addContact} arr={contacts} />
        <h2>Contacts</h2>
        <Filter onChangeFilter={this.changeFilter} valueFilter={filter} />
        {contacts.length > 0 && (
          <ContactsList
            onClick={this.deleteContact}
            contacts={this.searchName()}
          />
        )}
      </div>
    );
  }
}

export default App;
