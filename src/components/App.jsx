import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList';
import Form from './Form';
import Filter from './Filter';

function App() {
  const [contacts, SetContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? ''
  );
  const [filter, SetFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    SetContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = id => {
    SetContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    SetFilter(e.currentTarget.value);
  };

  const searchName = () => {
    const lowerCase = filter.toLowerCase();
    return contacts.filter(cont => cont.name.toLowerCase().includes(lowerCase));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phoneboock</h1>
      <Form onSubmit={addContact} arr={contacts} />
      <h2>Contacts</h2>
      <Filter onChangeFilter={changeFilter} valueFilter={filter} />
      {contacts.length > 0 && (
        <ContactsList onClick={deleteContact} contacts={searchName()} />
      )}
    </div>
  );
}

export default App;
