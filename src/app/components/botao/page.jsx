'use client'
import { useState } from 'react';
import styles from './page.module.css'
import "react-day-picker/style.css";

export default function Page({ servicoSel, setServicoSel }) {
    return (
        <div className={styles.fundo}>
            <div className={styles.alinhar}>
                <button className={styles.botoes + " " + 
                ((servicoSel=="Tosa")?
                styles.selecionadoBotao:"")} 
                onClick={() => {
                    setServicoSel("Tosa")
                }}>Tosa</button>
            </div>

            <div className={styles.alinhar}>
                 <button className={styles.botoes + " " + 
                ((servicoSel=="Banho")?
                styles.selecionadoBotao:"")} 
                onClick={() => {
                    setServicoSel("Banho")
                }}>Banho</button>
            </div>

            <div className={styles.alinhar}>
                <button className={styles.botoes + " " + 
                ((servicoSel=="Banho e Tosa")?
                styles.selecionadoBotao:"")} 
                onClick={() => {
                    setServicoSel("Banho e Tosa")
                }}>Banho e Tosa</button>
            </div>

            <div className={styles.alinhar}>
                <button className={styles.botoes + " " + 
                ((servicoSel=="Tosa Higiênica")?
                styles.selecionadoBotao:"")} 
                onClick={() => {
                    setServicoSel("Tosa Higiênica")
                }}>Tosa Higiênica</button>
            </div>
        </div>

    );
}