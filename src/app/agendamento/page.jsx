'use client'

import styles from './page.module.css'
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";


import { useState } from "react";
import Botao from '../components/botao/page';

export default function Page() {
    const [selected, setSelected] = useState(new Date())

    return (
        <div className={styles.fundo}>
            <div className={styles.alinhar}>
                <p className={styles.texto}>Tipo de Serviço</p>
                <p className={styles.texto}>Observações</p>
                <p className={styles.texto}>Data de agendamento</p>
            </div>

            <div className={styles.alinhar}>
                <div className={styles.botoes}>
                    <Botao />
                </div>
                
                <input className={styles.textdescricao} type='text' placeholder='  Digite Aqui...' />
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={
                        selected ? `Data Selecionada: ${selected.toLocaleDateString()}` : "Pick a day."
                    }
                />
            </div>

            
        </div>

    );
}