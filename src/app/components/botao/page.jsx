'use client'
import { useState } from 'react';
import styles from './page.module.css'
import "react-day-picker/style.css";

export default function Page() {
    const [servicoSel, setServicoSel] = useState("");

    return (
        <div className={styles.fundo}>
            <div className={styles.alinhar}>
                <button className={styles.botoes} onClick={() => {
                    setServicoSel("Tosa")
                }}>Tosa</button>
            </div>

            <div className={styles.alinhar} onClick={() => {
                    setServicoSel("Banho")
                }}>
                <button className={styles.botoes}>Banho</button>
            </div>

            <div className={styles.alinhar} onClick={() => {
                    setServicoSel("Banho e Tosa")
                }}>
                <button className={styles.botoes}>Banho e Tosa</button>
            </div>

            <div className={styles.alinhar} onClick={() => {
                    setServicoSel("Tosa Higiência")
                }}>
                <button className={styles.botoes}>Tosa Higiênica</button>
            </div>
        </div>

    );
}