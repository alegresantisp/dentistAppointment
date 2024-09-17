import { useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../redux/reducers/userSlice";
import { validate } from '../../helpers/validate';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './Login.module.css';
import { Link, useNavigate} from 'react-router-dom';


function Login() {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
      

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
        setErrors(validate({ ...userData, [name]: value }));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate(userData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:3000/users/login", {
                    username: userData.username,
                    password: userData.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    setMessage("Login exitoso.");
                    
                    const { userId, username } = response.data; 
                    dispatch(setUser({ userId, username }));
                    
                   
                    setUserData({
                        username: '',
                        password: ''
                    });
                    
                    navigate('/home');
                }
            } catch (error) {
                setMessage(error.response ? error.response.data.message : "Ocurrió un error al iniciar sesión.");
            }
        } else {
            setMessage("Por favor, completa todos los campos.");
        }
    };

   
    return (
        <div className={styles.loginContainer}>
        {!isAuthenticated && (
            <LoginForm
                userData={userData}
                errors={errors}
                message={message}
                handleInputChange={handleInputChange}
                handleOnSubmit={handleOnSubmit}
            />
        )}
       
    </div>
    );
}

export default Login;
