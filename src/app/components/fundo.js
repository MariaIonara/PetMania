import styles from "../page.module.css";
import IconLogo from "../image/logoo.png";

import Image from 'next/image'


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
                <Image className={styles.logoIMG} src={IconLogo} />
            </div>
        </>
    );
}
