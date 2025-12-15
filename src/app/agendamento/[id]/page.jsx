'use client'

import styles from './page.module.css'
import { DayPicker } from "react-day-picker";
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

    // Deve buscar no backend a cada vez que seleciono a data
    const [horariosJaSel, setHorariosJaSel] = useState([]);
    const [isFetchingHorarios, setIsFetchingHorarios] = useState(false);
    const [isFazendoAgendamento, setIsFazendoAgendamento] = useState(false);

    async function getHorariosJaSel () {
        setIsFetchingHorarios(true);
        try {
           
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetchingHorarios(false);
        }
    }

    async function fazerAgendamento () {
        setIsFazendoAgendamento(true); 
        try {
           
        } catch (err) {
            console.error(err);
        } finally {
            setIsFazendoAgendamento(false);
        }
    }

    function dizerHorario (ordemAtd) {
        switch (ordemAtd) {
            case 1: return "7:00 - 8:00";
            case 2: return "8:30 - 9:30";
            case 3: return "10:00 - 11:00";
            case 4: return "13:00 - 14:00";
            case 5: return "14:15 - 15:15";
            case 6: return "15:30 - 16:30";
            default: return "Selecione um horário";
        }
    }
    function diaJaPassou() {
        if (!selected) return false;

        const hoje = new Date();
        const dataSelecionada = new Date(selected);

        hoje.setHours(0, 0, 0, 0);
        dataSelecionada.setHours(0, 0, 0, 0);

        return dataSelecionada < hoje;
    }


    function horarioJaPassou(ordem) {
        if (!selected) return false;

        const hoje = new Date();
        const dataSelecionada = new Date(selected);

        hoje.setHours(0, 0, 0, 0);
        dataSelecionada.setHours(0, 0, 0, 0);

        if (dataSelecionada < hoje) {
            return true;
        }

        if (dataSelecionada > hoje) {
            return false;
        }

        const agora = new Date();
        const horaAtual = agora.getHours() + agora.getMinutes() / 60;

        const mapaHoras = {
            1: 7,
            2: 8.5,
            3: 10,
            4: 13,
            5: 14.25,
            6: 15.5
        };

        return horaAtual >= mapaHoras[ordem];
    }

    function horarioIndisponivel(ordem) {
        return (
            horariosJaSel.includes(ordem) || 
            horarioJaPassou(ordem)           
        );
    }

    return (
        <div className={styles.fundo}>
            <div className={styles.cabecalho}></div>

            {verfinalizar &&
                <div className={`${styles.fundoBox} ${styles.escuro}`}>
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
                            <p style={{ fontWeight: '500' }}>Data do agendamento</p>
                            <p className={styles.inputVerMenorSelCaixa}>
                                {selected.toLocaleDateString()}
                            </p>
                        </div>

                        <div className={styles.inputVerSelCaixa}>
                            <p style={{ fontWeight: '500' }}>Horário Selecionado</p>
                            <p className={styles.inputVerMenorSelCaixa}>
                                {dizerHorario(ordemAtd)}
                            </p>
                        </div>

                        <button
                            onClick={() => setVerfinalizar(false)}
                            style={{
                                fontFamily: 'Jaro',
                                fontSize: 23,
                                background: '#235f94ff',
                                color: 'white',
                                borderRadius: 10,
                                padding: 7,
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Finalizar Agendamento
                        </button>
                    </div>
                </div>
            }

            {/* ================= MODAL HORÁRIOS ================= */}
            {verOptAgendamento &&
                <div className={`${styles.fundoBox} ${styles.escuro}`}>
                    <div className={styles.veropsoes}>
                        <button style={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'red',
                            color: 'white',
                            width: 35,
                            height: 35,
                            borderRadius: 10,
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            border: 'none',
                            fontFamily: 'Jaro',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }} onClick={() => {
                            setVerOptAgendamento(false);
                        }}>x</button>

                        <div className={styles.inputVerSelCaixa}>
                            <p style={{ fontSize: '1.5rem', fontFamily: 'Jaro' }}>
                                Selecione um horário
                            </p>

                            <p style={{ fontSize: '1.3rem', fontFamily: 'Jaro' }}>Manhã</p>

                            {[1,2,3].map(h => (
                                <p
                                    key={h}
                                    className={`${styles.inputVerMenorSelCaixaDois}
                                    ${ordemAtd === h ? styles.estaSel : ''}
                                    ${horarioIndisponivel(h) ? styles.notSel : ''}`}
                                    onClick={() => {
                                        if (!horarioIndisponivel(h)) {
                                            setOrdemAtd(h);
                                        }
                                    }}
                                >
                                    {dizerHorario(h)}
                                </p>
                            ))}

                            <p style={{ fontSize: '1.3rem', fontFamily: 'Jaro' }}>Tarde</p>

                            {[4,5,6].map(h => (
                                <p
                                    key={h}
                                    className={`${styles.inputVerMenorSelCaixaDois}
                                    ${ordemAtd === h ? styles.estaSel : ''}
                                    ${horarioIndisponivel(h) ? styles.notSel : ''}`}
                                    onClick={() => {
                                        if (!horarioIndisponivel(h)) {
                                            setOrdemAtd(h);
                                        }
                                    }}
                                >
                                    {dizerHorario(h)}
                                </p>
                            ))}
                        </div>

                        <button
                            style={{
                                fontFamily: 'Jaro',
                                background: '#235f94ff',
                                color: 'white',
                                borderRadius: 10,
                                width: 120,
                                height: 50,
                                fontSize: '1.5rem',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={() => ordemAtd && setVerOptAgendamento(false)}
                        >
                            Agendar
                        </button>
                    </div>
                </div>
            }

            {/* ================= FORM ================= */}
            <div className={styles.alinhar}>
                <p className={styles.texto}>Tipo de Serviço</p>
                <p className={styles.texto}>Observações</p>
                <p className={styles.texto}>Data de agendamento</p>
            </div>

            <div className={styles.alinhar}>
                <div className={styles.botoes}>
                    <Botao servicoSel={servicoSel} setServicoSel={setServicoSel} />
                </div>

                <textarea
                    className={styles.textdescricao}
                    placeholder="Digite Aqui..."
                    onChange={e => setTexto(e.target.value)}
                />

                <div>
                    <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={(dia) => {
                        setSelected(dia);
                        setOrdemAtd(null);
                        // Deve buscar no backend os horarios disponiveis a cada vez que seleciono a data
                    }}
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

                    <p className={styles.texto}>Horário de agendamento</p>

                    <input
                        readOnly
                        className={styles.inputHorario}
                        placeholder={
                            diaJaPassou()
                                ? "Data inválida"
                                : horariosJaSel.length === 6
                                    ? "Não há horários disponíveis neste dia"
                                    : ordemAtd == null
                                        ? "Selecione um horário"
                                        : `${dizerHorario(ordemAtd)} do dia ${selected.toLocaleDateString()}`
                        }
                        style={{
                            cursor: diaJaPassou() ? 'not-allowed' : 'pointer',
                            opacity: diaJaPassou() ? 0.6 : 1
                        }}
                        onClick={() => {
                            if (!diaJaPassou() && horariosJaSel.length !== 6 && selected) {
                                setVerOptAgendamento(true);
                            }
                        }}
                    />
                </div>
            </div>

            <button
                onClick={() => {
                    if (selected && texto && servicoSel && ordemAtd) {
                        setVerfinalizar(true);
                    }
                }}
                className={
                    selected && texto && servicoSel && ordemAtd
                        ? styles.seguir
                        : styles.seguirInativo
                }
            >
                Seguir
            </button>
        </div>
    );
}
