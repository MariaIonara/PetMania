import styles from "./Fundo.module.css";

export default function Page(props) {
    return (
        <>
        {/*<Image className={styles.FrameIMG} src={IconFrame} />*/}
            <div className={styles.corDeFundo}>
                {/*<p>oi</p>*/}
                <div className={styles.corDeFundoAmarela}>
                    {/*<p>aaa</p>*/}
                </div>
                {props.children}
            </div>
        </>
    );
}
    