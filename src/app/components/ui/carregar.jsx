import styles from './page.module.css';
export default () => {
    return <div style={{ height: '100vh', width: '100vw', background: 'rgba(0,0,0,0.4)', position: 'fixed', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className={styles.loader}></div>
    </div>
}