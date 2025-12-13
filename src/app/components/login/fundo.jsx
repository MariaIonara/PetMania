import styles from "./Fundo.module.css";
import Image from "next/image";

export default function Page(props) {
    return (
        <>
            <div className={styles.corDeFundo}>
                <div className={styles.corDeFundoAmarela}>
                    <img src="/bemvindos.png" alt="foi" style={{ position: 'absolute', bottom: 0}}/>

                </div>
                {props.children}
            </div>
        </>
    );
}
    