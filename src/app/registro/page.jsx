'use client'

import styles from "./page.module.css";
import BackgroundDividido from "../components/fundoRegistro.js"

import { useState } from "react";
import Link from "next/link";

export default function Page() {
    /* const [nome, setNome] = useState();*/
    /*const alunos = await db.query("select * from usuario")*/
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [telefone, setTelefone] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (b) => {
        b.preventDefault();

        const formData = new FormData();

        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('tipo', tipo);
        formData.append('telefone', telefone);

        try {
            const res = await fetch('/api/cadastrarUsuario', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                setMensagem('Usuario cadastrado!');
                setNome("");
                setEmail("");
                setSenha("");
                setTipo("");
                setTelefone("");
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
        
                <h1 className={styles.titulo}>Cadastre-se</h1>

                <form onSubmit={handleSubmit}>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required/>
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required/>
                    </fieldset>

                    <div className={styles.caixaCentralizada}>
    
                            <button className={styles.botao} type="submit">Continuar</button>
                        
                    </div>

                    {mensagem && <p>{mensagem}</p>}
                </form>
            </div>
           
        </BackgroundDividido>
    );
}
