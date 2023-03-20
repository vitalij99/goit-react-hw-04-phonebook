import PropTypes from "prop-types";
import style from './ContactList.module.css';

export function ContactList({ contacts, deleteContact }) {
    return (
        <ul className={style.list}>
            {contacts.map(({ id, name, number }) => (
                <li className={style.item} key={id}>
                    <p>
                        {name}: {number}
                    </p>
                    <button className={style.button} type="button" onClick={() => deleteContact(id)} >Delete contact</button>
                </li>
            ))}
        </ul>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ),
    deleteContact: PropTypes.func.isRequired,
};