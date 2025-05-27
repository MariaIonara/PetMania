//import "../login/login.css"
import styles from "../page.module.css";
import IconLogo from "../image/logoo.png";
import IconFrame from "../image/Framee.png";

import Image from 'next/image'


export default function Page() {
    return (
        <>
        {/*<Image className={styles.FrameIMG} src={IconFrame} />*/}
            <div className={styles.corDeFundo}>
                {/*<p>oi</p>*/}
                <div className={styles.corDeFundoAmarela}>
                    {/*<p>aaa</p>*/}
                    <Image className={styles.logoIMG} src={IconLogo} />
                    <p>PET SHOP</p>
        </div>
    
        <h1>Bem-vindo ao nosso site!</h1>
                    
                </div>

        </>
    );
}
