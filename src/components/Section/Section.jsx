import PropTypes from 'prop-types';
import styles from './Section.module.css';

export const Section = ({title, children}) => {
    return (
        <>
            <div className={styles.card}>
                <h2 className={styles.title}>{title}</h2>
                {children}
            </div>
        </>
    );
};
Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};