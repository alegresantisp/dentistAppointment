import React from 'react';
import styles from './Footer.module.css';
import linke from '../../assets/linke.png';
import insta from '../../assets/insta.png';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <p>Aplicación creada por el grupo SAS. Derechos reservados. Año 2024</p>
                <div className={styles.socialIcons}>
                    <a href="https://www.instagram.com/" target="_blank" rel="noo">
                    <img src={insta} alt="Instagram" className={styles.icon} />
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noop">
                    <img src={linke} alt="LinkedIn" className={styles.icon} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;