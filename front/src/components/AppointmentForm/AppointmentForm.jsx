import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addAppointment } from '../../redux/reducers/userSlice';
import styles from './AppointmentForm.module.css';

const AppointmentForm = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');


    const isValidAppointment = (date, time) => {
        const appointmentDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayOfWeek = appointmentDate.getDay();
        const appointmentHour = parseInt(time.split(':')[0], 10);

        // Validar que la fecha sea posterior a hoy
        if (appointmentDate <= today) {
            return "Los turnos deben ser desde el día siguiente en adelante.";
        }

        // Validar que no sea fin de semana (sábado=6, domingo=0)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return "No se pueden reservar turnos los fines de semana.";
        }

        // Validar que la hora sea entre las 9 y las 17
        if (appointmentHour < 9 || appointmentHour >= 17) {
            return "Los turnos deben ser entre las 9:00 y las 17:00.";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationError = isValidAppointment(date, time);
        if (validationError) {
            setError(validationError);
            return;
        }

        const appointmentData = {
            date: date,
            time: time,
            userId
        };

        try {
            setSubmitting(true);
            const response = await axios.post('http://localhost:3000/appointments/schedule', appointmentData);
            dispatch(addAppointment(response.data));
            alert('Turno creado exitosamente');
            setDate('');
            setTime('');
            setError('');

        } catch (error) {
            console.error('Error al crear turno:', error);
            alert('Error al crear turno. Por favor, intenta nuevamente.');

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.appointmentFormContainer}>
            <h2 className={styles.title}>Crear Nuevo Turno</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Fecha:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className={styles.input}/>
                </label>
                <label className={styles.label}>
                    Hora:
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className={styles.input}/>
                </label>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <button type="submit" disabled={submitting} className={styles.button}>Crear Turno</button>
                {submitting && <span className={styles.submitting}>Enviando turno...</span>}
            </form>
        </div>
    );
};

export default AppointmentForm;






