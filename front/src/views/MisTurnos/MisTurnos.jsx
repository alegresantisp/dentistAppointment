import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom'; // Importar useNavigate
import Turno from "../../components/Turno/Turno";
import styles from './MisTurnos.module.css';
import axios from "axios";
import { setUserAppointments } from "../../redux/reducers/userSlice";
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';


const MisTurnos = () => {
    
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const userAppointments = useSelector(state => state.user.userAppointments);
    const userId = useSelector(state => state.user.userId); 
      

    useEffect(() => {
        if (isAuthenticated && userId) {
            axios.get("http://localhost:3000/appointments")
                .then(res => {
                    const userSpecificAppointments = res.data.filter(appointment => appointment.userId === userId);
                    dispatch(setUserAppointments(userSpecificAppointments)); 
                })
                .catch(error => {
                    console.error('Error al obtener los turnos:', error);
                });
        }
    }, [dispatch, isAuthenticated, userId]); 

    if (!isAuthenticated) {
        return <Navigate to="/home" />;
    }
    
    return (
        <>
             <div className={styles.misTurnosContainer}>
            <div className={styles.formContainer}>
                <AppointmentForm />
            </div>
            <div className={styles.turnoContainer}>
                {userAppointments.length > 0 ? (
                    userAppointments.map(turno => (
                        <Turno
                            key={turno.id}
                            id={turno.id}
                            date={turno.date}
                            time={turno.time}
                            status={turno.status}
                        />
                    ))
                ) : (
                    <p>No hay turnos agendados para este usuario.</p>
                )}
            </div>
            </div>
        </>
    )

}

export default MisTurnos;