// components/LoginForm.jsx
import React from 'react';
import styles from './LoginForm.module.css';

function LoginForm({ userData, errors, message, handleInputChange, handleOnSubmit }) {
    return (
        <form className={styles["form-container"]} onSubmit={handleOnSubmit}>
            <h2>LOGIN</h2>
            <div>
                <label>Usuario: </label>
                <input
                    type="text"
                    value={userData.username}
                    name="username"
                    placeholder="ejemplo@mail.com"
                    onChange={handleInputChange}
                />
                {errors.username && <p className={styles["error-message"]}>{errors.username}</p>}
            </div>
            <div>
                <label>Contraseña: </label>
                <input
                    type="password"
                    value={userData.password}
                    name="password"
                    placeholder="********"
                    onChange={handleInputChange}
                />
                {errors.password && <span className={styles["error-message"]}>{errors.password}</span>}
            </div>
            <button type="submit">Login</button>
            {message && <p className={styles["success-message"]}>{message}</p>}
        </form>
    );
}

export default LoginForm;
