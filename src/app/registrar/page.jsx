'use client'

import styles from "../page.module.css";
import BackgroundDividido from "../components/invertido.js"
import db from "@/lib/db"

import Form from 'next/form'
import { useState } from "react";


export default async function Page() {
    /* const [nome, setNome] = useState();*/
    const alunos = await db.query("select * from usuario")
    const [nomeDoPet, setNomeDoPet] = useState();
    const [idadeDoPet, setIdadeDoPet] = useState();
    const [raca, setRaca] = useState();
    const [sexo, setSexo] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nomedopet', nomeDoPet);
        formData.append('idadedopet', idadeDoPet);
        formData.append('raca', raca);
        formData.append('sexo', sexo);

        try {
            const res = await fetch('/api/cadastrarPet', {
                method: 'POST',
                body: formData,
            });
    
            if (res.ok) {
                setMensagem('Pet cadastrado com sucesso!');
                setNomeDoPet();
                setIdadeDoPet();
                setRaca();
                setSexo();
            } else {
                const err = await res.json();
                setMensagem(`Erro: ${err.error || 'Não foi possível cadastrar.'}`);
            }
        } catch (error) {
            console.error(error);
            setMensagem("Erro ao enviar os dados.")
        }
    }


    return (
        <BackgroundDividido>
            <div>
                <Form onSubmit={handleSubmit}>
                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Nome do Pet" value={nomeDoPet} onChange={(e) => setNomeDoPet(e.target.value)}/>

                        <fieldset className={styles.caixaCentralizada}>
                            <input className={styles.caixaDeTexto} type="text" placeholder="Idade do Pet" value={idadeDoPet} onChange={(e) => setIdadeDoPet(e.target.value)}/>
                        </fieldset>

                    </fieldset>
                    
                    <fieldset className={styles.caixaCentralizada}>
                        <select className={styles.caixaDeTexto} name="Raça" value={raca} onChange={(e) => setRaca(e.target.value)}>
                            <option value="Puudle">Puudle</option>
                            <option value="Buldogue">Buldogue</option>
                            <option value="Yorkshire Terrier">Yorkshire Terrier</option>
                        </select>
                    </fieldset>

                    <div className={styles.caixaCentralizada}>
                        <button className={styles.botao} type="submit">Registar</button>
                    </div>
                </Form>
            </div>
        </BackgroundDividido>
    );
}