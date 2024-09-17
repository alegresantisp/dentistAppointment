import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './NavBar.module.css'; 
import userPhoto from '../../assets/userPhoto.png';
import icon from '../../assets/icon.png';
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout';

const NavBar = () => {
   
    const [showMenu, setShowMenu] = useState(false);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);   

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return(

        <>
             <div className={styles.navBar}>
            <Link to="/home">
                <img src={icon} alt="IconD" className={styles.icon} />
            </Link>
            <ul className={styles.navLinks}>
                {isAuthenticated ? (
                    <>
                        <Link to="/mis-turnos" className={styles.navLink}>Mis Turnos</Link>
                        <Logout />
                    </>
                ) : (
                    <>
                        <div className={styles.userSection}>
                            <img 
                                src={userPhoto} 
                                alt="UserPhoto" 
                                className={styles.userPhoto} 
                                onClick={toggleMenu} 
                            />
                            {showMenu && (
                                <div className={styles.dropdownMenu}>
                                    <Link to="/login" className={styles.menuItem}>Login</Link>
                                    <Link to="/register" className={styles.menuItem}>Registrarse</Link>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </ul>
        </div>
        </>
    )

}

export default NavBar