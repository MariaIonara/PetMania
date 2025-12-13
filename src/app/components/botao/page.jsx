'use client'
import { useState } from 'react';
import styles from './page.module.css'
import "react-day-picker/style.css";

export default function Page({ servicoSel, setServicoSel }) {
    return (
        <div className={styles.fundo}>
            <div className={styles.alinhar}>
                 <button className={styles.botoes + " " + 
                ((servicoSel=="Banho")?
                styles.selecionadoBotao:"")} 
                onClick={() => {
                    setServicoSel("Banho")
                }}>Banho</button>
                <p className={styles.preco}>R$ 35,00</p>
            </div>

            <div className={styles.alinhar}>
                <button className={styles.botoes + " " + 
                ((servicoSel=="Tosa")?
                styles.selecionadoBotao:"")} 
                onClick={() => {
                    setServicoSel("Tosa")
                }}>Tosa</button> 
                <p className={styles.preco}>R$ 40,00</p>
            </div>

            <div className={styles.alinhar}>
                <button className={styles.botoes + " " + 
                ((servicoSel=="Banho e Tosa")?
                styles.selecionadoBotao:"")} 
                onClick={() => {
                    setServicoSel("Banho e Tosa")
                }}>Banho e Tosa</button>
                <p className={styles.preco}>R$ 75,00</p>
            </div>

            <div className={styles.alinhar}>
                <button className={styles.botoes + " " + 
                ((servicoSel=="Tosa Higiênica")?
                styles.selecionadoBotao:"")} 
                onClick={() => {
                    setServicoSel("Tosa Higiênica")
                }}>Tosa Higiênica</button>
                <p className={styles.preco}>R$ 70,00</p>
            </div>
        </div>

    );
}