import styles from './page.module.css';
export default ({ text }) => {
    return <div style={{ height: '100vh', width: '100vw', background: 'rgba(0,0,0,0.4)', position: 'fixed', top: 0, left: 0, display: 'flex', flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
        {
            text ?
            <>
                <p style={{ fontFamily: 'Jaro', fontSize: '2rem', color: 'white', marginBottom: 10}}>{text}</p>
                <div className={styles.loader}></div>   
            </>
            :
            <>
                 <div className={styles.loader}></div>
            </>

        }
    </div>
}