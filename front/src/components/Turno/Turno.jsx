import { useState } from 'react';
import styles from './Turno.module.css';
import { useDispatch} from 'react-redux';
import axios from "axios";
import { cancelAppointments } from '../../redux/reducers/userSlice';


const Turno = ({id,time, date, status }) =>{
    const dispatch = useDispatch();
    let statusClass = ''; 
    const [isCancelled, setIsCancelled] = useState(status === 'cancelled');

    if (status === 'active') {
        statusClass = styles.active; 
    } else if (status === 'cancelled') {
        statusClass = styles.cancelled; 
    }

    const formattedDate = new Date(date).toLocaleDateString('es-AR');

    const handleCancel = async () => {
        try {
            const appointmentDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            appointmentDate.setDate(appointmentDate.getDate() - 1); 

            if (today > appointmentDate) {
                alert('El turno sólo puede ser cancelado hasta el día anterior al día de la reserva');
                return;
            }

            await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
            dispatch(cancelAppointments({ id }));
            setIsCancelled(true);
            alert('Turno cancelado exitosamente');
        } catch (error) {
            console.error('Error al cancelar el turno:', error);
        }
    };

    return (
        <div className={styles.turno} >
            <h4>Hora: {time}</h4>
            <h4>Fecha: {formattedDate}</h4>
            <span className={statusClass}>{status}</span>
            {!isCancelled && status === 'active' && (
                <button onClick={handleCancel} className={styles.cancelButton}>Cancelar Turno</button>
            )}
        </div>
    )

}

export default Turno;