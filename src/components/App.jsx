import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const LOCALSTORAGE_KEY = 'contacts';

export const App = () => {
    const [contacts, setContacts] = useState(() =>
        JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY ?? []))
    );

    const [filterContacts, setFilter] = useState('');
    const firstLoad = useRef(false);

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);

    useEffect(() => {
        if (!firstLoad.current) {
            firstLoad.current = true;
        }
    }, []);

    const addContact = event => {
        event.preventDefault();

        const form = event.target;
        const { name, number } = form.elements;

        const contact = {
            name: name.value,
            number: number.value,
            id: nanoid(),
        };
        if (
            contacts.find(contact => contact.name === name.value) &&
            firstLoad
        ) {
            Report.warning(
                'Phonebook Warning',
                'The contact already exists with this name',
                'Okay'
            );
            return;
        }
        setContacts(prev => [...prev, contact]);
        form.reset();
    };
    const deleteContact = id => {
        setContacts(prevState =>
            prevState.filter(contact => contact.id !== id)
        );
    };
    const inputFilter = event => {
        setFilter(event.target.value);
    };
    const visibleContact = () => {
        const normalizeFilter = filterContacts.toLowerCase();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizeFilter)
        );
    };

    return (
        <>
            <Section title="Phonebook">
                <ContactForm onSubmit={addContact} />
            </Section>
            <Section title="Contacts">
                {contacts.length > 1 && (
                    <Filter value={filterContacts} onChange={inputFilter} />
                )}
                {contacts.length > 0 ? (
                    <ContactList
                        contacts={visibleContact()}
                        deleteContact={deleteContact}
                    />
                ) : (
                    firstLoad.current &&
                    Report.info(
                        'Phonebook Info',
                        'Contact book is empty!',
                        'Okay'
                    )
                )}
            </Section>
        </>
    );
};
