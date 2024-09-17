import React from 'react';
import styles from './RegisterForm.module.css';

function RegisterForm({ form, message, handleInputChange, handleOnSubmit, errors }) {
    
    return (
      
        <form onSubmit={handleOnSubmit} className={styles.registerForm }>
          <h2>REGISTRO</h2>
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              value={form.name}
              name="name"
              onChange={handleInputChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={form.email}
              name="email"
              onChange={handleInputChange}
            />
             {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div>
            <label>Fecha de nac: </label>
            <input
              type="date"
              value={form.birthdate}
              name="birthdate"
              onChange={handleInputChange}
            />
             {errors.birthdate && <p className={styles.error}>{errors.birthdate}</p>}
          </div>
          <div>
            <label>DNI: </label>
            <input
              type="text"
              value={form.nDni}
              name="nDni"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Usuario: </label>
            <input
              type="text"
              value={form.username}
              name="username"
              onChange={handleInputChange}
            />
             {errors.username && <p className={styles.error}>{errors.username}</p>}
          </div>
          <div>
            <label>Contraseña: </label>
            <input
              type="password"
              value={form.password}
              name="password"
              onChange={handleInputChange}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>
          <div>
            <label>Confirma contraseña: </label>
            <input
              type="password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={handleInputChange}
            />
             {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
          </div>
          <button type="submit">Registrarme</button>
          {message && <p>{message}</p>}
        </form>
        
      );

}

export default RegisterForm;