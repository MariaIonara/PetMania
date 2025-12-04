
import styles from './page.module.css'
import "react-day-picker/style.css";

export default function Page() {

    return (
        <div className={styles.fundo}>
            <div className={styles.alinhar}>
                <button className={styles.botoes}>Tosa</button>
            </div>

            <div className={styles.alinhar}>
                <button className={styles.botoes}>Banho</button>
            </div>

            <div className={styles.alinhar}>
                <button className={styles.botoes}>Banho e Tosa</button>
            </div>

            <div className={styles.alinhar}>
                <button className={styles.botoes}>Tosa Higiênica</button>
            </div>
        </div>

    );
}