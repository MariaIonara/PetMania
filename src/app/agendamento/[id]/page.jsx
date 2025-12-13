'use client'

import styles from './page.module.css'
import { DayPicker, } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";
import Botao from '../../components/botao/page';

export default function Page() {
    const [selected, setSelected] = useState(new Date())
    const [texto, setTexto] = useState("");
    const [verfinalizar, setVerfinalizar] = useState(false);
    const [servicoSel, setServicoSel] = useState("");

    return (
        <div className={styles.fundo}>
            <div className={styles.cabecalho}>

           </div>
           
            {
                (verfinalizar) ?
                    <div className={styles.fundoBox + " " + ((verfinalizar ? styles.escuro : null))}>
                        <div className={styles.veropsoes}>
                            <div className={styles.inputVerSelCaixa}>
                                <p style={{ fontWeight: '500' }}>Tipo de Serviço</p>
                                <p className={styles.inputVerMenorSelCaixa}>{servicoSel}</p>
                            </div>
                            <div className={styles.inputVerSelCaixa}>
                                <p style={{ fontWeight: '500' }}>Descrição</p>
                                <p className={styles.inputVerMenorSelCaixa}>{texto}</p>
                            </div>
                            <div className={styles.inputVerSelCaixa}>
                                <p style={{ fontWeight: '500' }} >Data do agendamento</p>
                                <p className={styles.inputVerMenorSelCaixa}>{selected.toLocaleDateString()}</p>
                            </div>
                            <button style={{
                                fontFamily: 'geist', fontSize: 15, background: '#235f94ff',
                                color: 'white', borderRadius: 10, padding: 7, outline: 'none', cursor: 'pointer', border: 'none'
                            }} onClick={() => setVerfinalizar(false)}>Agendar</button>
                        </div>
                    </div>
                    : null
            }
            {/*<p className={styles.texto} style={{ marginLeft: 20}}>Pet Selecionado: Pollico</p>*/}
            <div className={styles.alinhar}>
                
                <p className={styles.texto} >Tipo de Serviço</p>
                <p className={styles.texto}>Observações</p>
                <p className={styles.texto}>Data de agendamento</p>
            </div>

            <div className={styles.alinhar}>
                <div className={styles.botoes}>
                    <Botao
                        servicoSel={servicoSel}
                        setServicoSel={setServicoSel}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column' }}>
                    <textarea
                        name="textAreaObs"
                        id="textAreaObs"
                        placeholder='Digite Aqui...'
                        className={styles.textdescricao}
                        onChange={(e) => setTexto(e.target.value)}
                    >
                    </textarea>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    className={styles.dayPicker}
                    classNames={{
                        caption: styles.caption,
                       
                        nav_button: styles.navButton,
                        table: styles.table,
                        head_cell: styles.headCell,
                        cell: styles.cell,
                        day: styles.day,
                        day_selected: styles.daySelected,
                        day_today: styles.dayToday,
                        day_outside: styles.dayOutside,
                        day_disabled: styles.dayDisabled,
                        footer: styles.footer
                    }}
                    footer={
                        selected
                        ? `Data Selecionada: ${selected.toLocaleDateString()}`
                        : "Escolha uma data"
                    }
                    />
                    <p className={styles.texto} >Horário de agendamento</p>
                    <input type="text" className={styles.inputHorario} placeholder='//PARA FAZER'
                    style={{ background: 'white', outline: 'none', border: 'none', padding: 10, borderRadius: 20, fontSize: '1.2rem', fontFamily: 'Jaro', color: '#3C2A02', marginTop: 10 }}
                    />
                </div>
                

            </div>
            <button
                onClick={() => {
                    if (selected && texto.length > 0 && servicoSel.length > 0) {
                        setVerfinalizar(true);
                    }
                }}
                className={
                    ` ` + (selected && texto.length > 0 && servicoSel.length > 0 ? styles.seguir : styles.seguirInativo)}>Seguir</button>


        </div>

    );
}