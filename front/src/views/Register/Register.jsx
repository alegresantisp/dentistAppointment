import axios from 'axios';
import { useState } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';  
import styles from './Register.module.css'
import { validateRegister } from '../../helpers/validateRegister';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
        confirmPassword: ''
    });

    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
          ...form,
          [name]: value
        });
        setMessage('');
        setErrors({});
      };
    
      const handleOnSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateRegister(form);
        setErrors(validationErrors);
    
        // Validar que todos los campos estén completos
     /*    for (let key in form) {
          if (form[key] === '') {
            setMessage('Por favor, completa todos los campos.');
            
            return;
          }
        } */
    
        // Validar que las contraseñas coincidan
        if (form.password !== form.confirmPassword) {
          setMessage('Las contraseñas no coinciden.');
          
          return;
        }
    
        // Eliminar confirmPassword antes de enviar la solicitud
        const { confirmPassword, ...formData } = form;
    
        if (Object.keys(validationErrors).length === 0) {
          try {
              const response = await axios.post('http://localhost:3000/users/register', form);
              setMessage('Registro exitoso');
              alert('Registro exitoso')
              setForm({
                  name: '',
                  email: '',
                  birthdate: '',
                  nDni: '',
                  username: '',
                  password: '',
                  confirmPassword: ''
              });
              navigate('/login');
          } catch (error) {
              setMessage('Error en el registro');
          }
      } else {
          setMessage('Por favor, completa todos los campos correctamente.');
      }
  };

      return (
        <div className={styles.registerContainer}>
          <RegisterForm
            form={form}
            message={message}
            errors={errors} 
            handleInputChange={handleInputChange}
            handleOnSubmit={handleOnSubmit}
          />
        </div>
      );
    };
    
    export default Register;