'use client'

import styles from "../page.module.css";
import BackgroundDividido from "../components/invertido.js"

import { useState } from "react";


export default function Page() {
    /* const [nome, setNome] = useState();*/
    /*const alunos = await db.query("select * from usuario")*/
    const [nomedopet, setNomeDoPet] = useState("");
    const [idadedopet, setIdadeDoPet] = useState("");
    const [raca, setRaca] = useState("");
    const [sexo, setSexo] = useState("");
    const [imagem, setImagem] = useState(null);
    const [mensagem, setMensagem] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nomedopet', nomedopet);
        formData.append('idadedopet', idadedopet);
        formData.append('raca', raca);
        formData.append('imagem', imagem);
        formData.append('sexo', sexo);

        try {
            const res = await fetch('/api/cadastrarPet', {
                method: 'POST',
                body: formData,
            });
    
            if (res.ok) {
                setMensagem('Pet cadastrado com sucesso!');
                setNomeDoPet("");
                setIdadeDoPet("");
                setRaca("");
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
                <form onSubmit={handleSubmit}>
                    <fieldset className={styles.caixaCentralizada}>
                        <input type="file" onChange={(e) => setImagem(e.target.files[0])} accept="image/png image/jpg image/jpeg"/>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Nome do Pet" value={nomedopet} onChange={(e) => setNomeDoPet(e.target.value)}/>

                        <fieldset className={styles.caixaCentralizada}>
                            <input className={styles.caixaDeTexto} type="number" placeholder="Idade do Pet" value={idadedopet} onChange={(e) => setIdadeDoPet(e.target.value)}/>
                        </fieldset>

                    </fieldset>
                    
                    <fieldset className={styles.caixaCentralizada}>
                        <select className={styles.caixaDeTexto} name="Raça" value={raca} onChange={(e) => setRaca(e.target.value)}>
                            <option value="Raça">Raça</option>
                            <option value="Puudle">Puudle</option>
                            <option value="Buldogue">Buldogue</option>
                            <option value="Yorkshire Terrier">Yorkshire Terrier</option>
                        </select>
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <label>
                            <input type="radio" name="sexo" value="femea" checked={sexo === "femea" } onChange={(e) => setSexo(e.target.value)}/> Fêmea
                        </label>
                        <br />
                         <label>
                            <input type="radio" name="sexo" value="macho" checked={sexo === "macho" } onChange={(e) => setSexo(e.target.value)}/> Macho
                        </label>
                    </fieldset>

                    <div className={styles.caixaCentralizada}>
                        <button className={styles.botao} type="submit">Registar</button>
                    </div>

                    {mensagem && <p>{mensagem}</p>}
                </form>
            </div>
        </BackgroundDividido>
    );
}