import styles from "./page.module.css";
import BackgroundDividido from "../components/fundo.js"

export default function Page() {
    return (
        <BackgroundDividido>
            <div className={styles.inicio}>
                <h1 className={styles.titulo}>Pet Mania</h1>
                <div className={styles.caixaCentralizadaInicio}>
                    <button className={styles.botao} type="submit">Iniciar</button>
                </div>
            </div>
        </BackgroundDividido>
    );
}
