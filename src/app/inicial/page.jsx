import styles from "./page.module.css";
import BackgroundDividido from "../components/inicial/fundo.js"
import Image from "next/image";
import logo from '../image/logoo.png';
import Link from "next/link";

export default function Page() {
    return (
        <BackgroundDividido>
            <div className={styles.inicio}>
                <Image src={logo} width={800} alt="logo" />
                <h1 className={styles.titulo}>Pet Mania</h1>
                <div className={styles.caixaCentralizadaInicio}>
                    <Link href='../loginUsuario'>
                        <button className={styles.botao} type="submit">Iniciar</button>
                    </Link>
                </div>
            </div>
        </BackgroundDividido>
    );
}
