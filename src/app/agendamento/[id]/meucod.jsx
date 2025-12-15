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
    const [verOptAgendamento, setVerOptAgendamento] = useState(false);
    const [ordemAtd, setOrdemAtd] = useState(null);

    // Horários que JÁ foram 
    const [horariosJaSel, setHorariosJaSel] = useState([]);
    const [isFetchingHorarios, setIsFetchingHorarios] = useState(false);
    const [isFazendoAgendamento, setIsFazendoAgendamento] = useState(false);

    // Função para buscar horários que já foram agendados
    async function getHorariosJaSel () {
        setIsFetchingHorarios(true);
        try {
            
        } catch (err) {
            console.error(err);

        } finally {
            setIsFetchingHorarios(false);
        }
    }
    // Função para fazer agendamento
    async function fazerAgendamento () {
        isFazendoAgendamento(true);
        try {
            
        } catch (err) {
            console.error(err);

        } finally {
            isFazendoAgendamento(false);
        }
    }

    function dizerHorario (ordemAtd) {
        switch (ordemAtd) {
            case 1:
                return "7:00 - 8:00";
            case 2:
                return "8:30 - 9:30";
            case 3:
                return "10:00 - 11:00";
            case 4:
                return "13:00 - 14:00";
            case 5:
                return "14:15 - 15:15";
            case 6:
                return "15:30 - 16:30";
            default:
                return "Selecione um horário"
        }
    }

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
                                fontFamily: 'Jaro', fontSize: 15, background: '#235f94ff',
                                color: 'white', borderRadius: 10, padding: 7, outline: 'none', cursor: 'pointer', border: 'none'
                            }} onClick={() => setVerfinalizar(false)}>Escolher dia</button>
                        </div>
                    </div>
                    : null
            }
            {
                (verOptAgendamento) ?
                    <div className={styles.fundoBox + " " + ((verOptAgendamento ? styles.escuro : null))}>
                        <div className={styles.veropsoes}>
                            <div className={styles.inputVerSelCaixa}>
                                <p style={{ fontWeight: '500', fontSize: '1.5rem', fontFamily:'Jaro' }}>Selecione um horário</p>

                                <p style={{ fontWeight: '500', fontSize: '1.3rem', fontFamily:'Jaro' }}>Manhã</p>
                                    <p className={styles.inputVerMenorSelCaixaDois + " " 
                                    + ((ordemAtd == 1) ? styles.estaSel : "") + " " +
                                    (horariosJaSel.includes(1) ? styles.notSel : "")} 

                                    style={{ fontFamily:'Jaro', fontSize: '1.1rem' }} 
                                    onClick={() => {
                                        if (!horariosJaSel.includes(1)) {
                                            setOrdemAtd(1);
                                        }

                                    }}>7:00 - 8:00</p>

                                    <p className={styles.inputVerMenorSelCaixaDois + " " 
                                    + ((ordemAtd == 2) ? styles.estaSel : "") + " " +
                                    (horariosJaSel.includes(2) ? styles.notSel : "")} 

                                    style={{ fontFamily:'Jaro', fontSize: '1.1rem' }}
                                    onClick={() => {
                                         if (!horariosJaSel.includes(2)) {
                                            setOrdemAtd(2);
                                        }
                                    }}
                                    >8:30 - 9:30</p>


                                    <p className={styles.inputVerMenorSelCaixaDois + " " 
                                    + ((ordemAtd == 3) ? styles.estaSel : "") + " " +
                                    (horariosJaSel.includes(3) ? styles.notSel : "")} 

                                    style={{ fontFamily:'Jaro', fontSize: '1.1rem' }}
                                    onClick={() => {
                                         if (!horariosJaSel.includes(3)) {
                                            setOrdemAtd(3);
                                        }
                                    }}
                                    >10:00 - 11:00</p>

                                <p style={{ fontWeight: '500', fontSize: '1.3rem', fontFamily:'Jaro' }}>Tarde</p>

                                    <p  
                                        className={styles.inputVerMenorSelCaixaDois + " " 
                                        + ((ordemAtd == 4) ? styles.estaSel : "") + " " +
                                        (horariosJaSel.includes(4) ? styles.notSel : "")} 

                                        style={{ fontFamily:'Jaro', fontSize: '1.1rem'}}
                                        onClick={() => {
                                             if (!horariosJaSel.includes(4)) {
                                            setOrdemAtd(4);
                                        }
                                        }}
                                    >13:00 - 14:00</p>

                                    <p 
                                        className={styles.inputVerMenorSelCaixaDois + " " 
                                        + ((ordemAtd == 5) ? styles.estaSel : "") + " " +
                                        (horariosJaSel.includes(5) ? styles.notSel : "")} 

                                    style={{ fontFamily:'Jaro', fontSize: '1.1rem' }}
                                    onClick={() => {
                                         if (!horariosJaSel.includes(5)) {
                                            setOrdemAtd(5);
                                        }
                                    }}>
                                    14:15 - 15:15</p>

                                    <p 

                                    className={styles.inputVerMenorSelCaixaDois + " " 
                                    + ((ordemAtd == 6) ? styles.estaSel : "") + " " +
                                    (horariosJaSel.includes(6) ? styles.notSel : "")} 

                                    style={{ fontFamily:'Jaro', fontSize: '1.1rem' }}
                                    onClick={() => {
                                        if (!horariosJaSel.includes(6)) {
                                            setOrdemAtd(6);
                                        }
                                    }}
                                    >
                                    15:30 - 16:30</p>
                            </div>
                            


                            <button style={{
                                fontFamily: 'Jaro', fontSize: 15, background: '#235f94ff',
                                color: 'white', borderRadius: 10, padding: 7, outline: 'none', cursor: 'pointer', 
                                border: 'none', width: 120, height: 50, fontSize: '1.5rem'
                            }} onClick={() => { 
                                if (ordemAtd !== null) {
                                    setVerOptAgendamento(false) 
                                }    
                            }}>Agendar</button>
                        </div>
                    </div>
                    : null
            }




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
                    <input type="text" className={styles.inputHorario} placeholder={
                        (horariosJaSel.length == 6) ? "Não há horários disponíveis neste dia" : `${dizerHorario(ordemAtd)} do dia ${selected.toLocaleDateString()}`
                    }
                    readOnly
                    style={{ background: 'white', outline: 'none', border: 'none', padding: 10, borderRadius: 20, fontSize: '1.2rem', fontFamily: 'Jaro', color: '#3C2A02', marginTop: 10, cursor: 'pointer' }}
                    onClick={() => { 
                        if (!horariosJaSel.length == 6) {
                            setVerOptAgendamento(true)
                        }
                    }}
                    />
                </div>
                

            </div>
            <button
                onClick={() => {
                    if (selected && texto.length > 0 && servicoSel.length > 0 && ordemAtd) {
                        setVerfinalizar(true);
                    }
                }}
                className={
                    ` ` + (selected && texto.length > 0 && servicoSel.length > 0 && ordemAtd ? styles.seguir : styles.seguirInativo)}>Seguir</button>


        </div>

    );
}