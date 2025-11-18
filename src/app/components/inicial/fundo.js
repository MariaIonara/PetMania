import styles from "./Fundo.module.css";

export default function Page(props) {
    return (
        <>
            <div className={styles.corDeFundo}>
                <div className={styles.corDeFundoAmarela}>
                </div>
                {props.children}
            </div>
        </>
    );
}
    