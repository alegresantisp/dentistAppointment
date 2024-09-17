import styles from './Home.module.css'
import { useSelector } from 'react-redux'

const Home = () => {
    const username = useSelector((state) => state.user.username); 
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    return (
        <>
            <div className={styles.homeContainer}>
                {isAuthenticated && <p className={styles.homeText}>Hola, {username}.</p>}
                <h1 className={styles.homeTitle}>
                    Bienvenido a <span className={styles.nombre}>SAS</span> Dentista
                </h1>
                
                {!isAuthenticated && (
                    <p className={styles.homeText}>
                        La plataforma donde gestionar tus turnos de manera eficiente.
                    </p>
                )}
             </div>
        </>
    )
    
   
}

export default Home;