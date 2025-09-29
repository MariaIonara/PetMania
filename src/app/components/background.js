import styles from "./page.module.css";

export default function Page(props) {
    return (
        <>
            <div className={styles.corDeFundo}>
                <div>
                    {props.children}
                </div>
            </div>
        </>
    );
}