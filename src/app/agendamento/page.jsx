'use client'

import styles from './page.module.css'
import { DayPicker, } from "react-day-picker";
import "react-day-picker/style.css";


import { useState } from "react";
import Botao from '../components/botao/page';

export default function Page() {
    const [selected, setSelected] = useState(new Date())
    const [texto, setTexto] = useState("");
    const [verfinalizar, setVerfinalizar] = useState(false);
    const [servicoSel, setServicoSel] = useState("");

    return (
        <div className={styles.fundo}>
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
                            }}>Agendar</button>
                        </div>
                    </div>
                    : null
            }
            <div className={styles.alinhar}>
                <p className={styles.texto}>Tipo de Serviço</p>
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
                    <button
                        onClick={() => {
                            setVerfinalizar(true);
                        }}
                        style={{
                            fontFamily: 'geist', fontSize: 15, background: 'black',
                            color: 'white', borderRadius: 10, padding: 7, outline: 'none', cursor: 'pointer', border: 'none'
                        }}>Salvar</button>
                </div>


                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    style={{ zIndex: 2 }}
                    footer={
                        selected ? `Data Selecionada: ${selected.toLocaleDateString()}` : "Pick a day."
                    }
                />
            </div>


        </div>

    );
}