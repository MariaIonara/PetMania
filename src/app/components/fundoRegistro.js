'use client'

import styles from "./page.module.css";
import Image from 'next/image';
import logo from "../image/logoo.png";
import cachorro from "../image/cachorro.png"
import { useRouter } from "next/navigation";

export default function Page(props) {
    const router = useRouter();
    return (
        <>
            <div className={styles.corAmareloInvertido}>
                <div className={styles.corAzulInvertido}>
                    {props.children}
                </div>
                <div className={styles.centralizar}>
                    <Image
                        className={styles.logoIMG}
                        src={logo}
                        alt="logo"
                        width={600}
                        height={300}
                    />
                    <div className={styles.titulo}>
                        <p>OLÁ, <br /> SEJA BEM VINDO!</p>
                    </div>
                    <div className={styles.Containerbotao}>
                        <button className={styles.botao} onClick={() => {
                            router.push('/loginUsuario');
                        }}>LOGIN</button>
                    </div>
                </div>
                
                          
            </div>
        </>
    );
}