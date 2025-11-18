'use client'

import styles from "./page.module.css";
import BackgroundDividido from "../components/invertido.js"

import { useEffect, useState } from "react";
import { put } from "@vercel/blob";
import Link from "next/link";

export default function Page() {
    /* const [nome, setNome] = useState();*/
    /*const alunos = await db.query("select * from usuario")*/
    const [nomedopet, setNomeDoPet] = useState("");
    const [idadedopet, setIdadeDoPet] = useState("");
    const [enderecocidade, setEnderecocidade] = useState("");
    const [raca, setRaca] = useState("");
    const [sexo, setSexo] = useState("");
    const [imagem, setImagem] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [racas, setRacas] = useState([]);

    useEffect(() => {
	  const fetchRacas = async () => {
	    const response = await fetch('/api/raca')
	    const data = await response.json()
	    setRacas(data);
	  };
	  
	  fetchRacas();
  }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nomedopet', nomedopet);
        formData.append('idadedopet', idadedopet);
        formData.append('enderecocidade', enderecocidade);
        formData.append('raca', raca);
        formData.append('sexo', sexo);

        try {
            const res = await fetch('/api/cadastrarPet', {
                method: 'POST',
                body: formData,
            }); 

            const res2 = await fetch('/api/imagem', {
                    method: 'POST',
                body: imagem,
            });

            if (res.ok && res2.ok) {
                setMensagem('Pet cadastrado com sucesso!');
                setNomeDoPet("");
                setIdadeDoPet("");
                setRaca("");
                setEnderecocidade("");
                setSexo("");
                setImagem(null);
                
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
        
                <h1 className={styles.titulo}>Cadastre seu Pet</h1>

                <form onSubmit={handleSubmit}>

                    <fieldset className={styles.caixaCentralizada}>
                        <input type="file" onChange={(e) => setImagem(e.target.files[0])} accept="image/png image/jpg image/jpeg" />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Nome do Pet" value={nomedopet} onChange={(e) => setNomeDoPet(e.target.value)} />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="number" placeholder="Idade do Pet" value={idadedopet} onChange={(e) => setIdadeDoPet(e.target.value)} />
                    </fieldset>


                    <fieldset className={styles.caixaCentralizada}>
                        <select className={styles.caixaDeTexto} name="Raça" value={raca} onChange={(e) => setRaca(e.target.value)}>
                            <option value="Raça">Raça</option>
                            {racas.map((item) => <option key={item.id} value={item.id}>{item.nome}</option> )}
                        </select>
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Endereço(cidade)" value={enderecocidade} onChange={(e) => setEnderecocidade(e.target.value)} required/>
                    </fieldset>

                    <fieldset className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input  type="radio" name="sexo" value="femea" checked={sexo === "femea"} onChange={(e) => setSexo(e.target.value)} /> Fêmea
                        </label>
                        <br />
                        <label className={styles.radioLabel}>
                            <input type="radio" name="sexo" value="macho" checked={sexo === "macho"} onChange={(e) => setSexo(e.target.value)} /> Macho
                        </label>
                    </fieldset>

                    <div className={styles.caixaCentralizada}>
                        <button className={styles.botao} type="submit">Registrar</button>   
                    </div>

                    {mensagem && <p>{mensagem}</p>}
                </form>
            </div>
        </BackgroundDividido>
    );
}