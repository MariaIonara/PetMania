import styles from "../page.module.css";
import Image from 'next/image';
import logo from "../image/logoo.png";

export default function Page(props) {
    return (
        <>
            <div className={styles.corAmareloInvertido}>
                <div className={styles.corAzulInvertido}>
                    {props.children}
                </div>
                <Image 
                src={logo}
                alt="logo"
                />
            </div>
        </>
    );
}