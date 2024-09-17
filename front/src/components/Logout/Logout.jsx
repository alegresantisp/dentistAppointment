import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { logoutUser } from '../../redux/reducers/userSlice';
import { Link } from 'react-router-dom';
import styles from './Logout.module.css'

const Logout = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);   
  
    const handleLogout = () => {
      dispatch(logoutUser());
    };

    if (!isAuthenticated) {
        return null; // No renderizar el botón si el usuario no está autenticado
      }
  
    return (
      <Link to="/home">
        <button onClick={handleLogout} className={styles["logout-button"]}>
          Logout
        </button>
      </Link>
    );
  };
  
  export default Logout;