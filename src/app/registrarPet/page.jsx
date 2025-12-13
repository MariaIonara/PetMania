'use client'

import styles from "./page.module.css";
import BackgroundDividido from "../components/invertido.js"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { put } from "@vercel/blob";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Carregar from "../components/ui/carregar";

export default function Page() {
    const router = useRouter();
    const [nomedopet, setNomeDoPet] = useState("");
    const [idadedopet, setIdadeDoPet] = useState("");
    const [enderecocidade, setEnderecocidade] = useState("");
    const [raca, setRaca] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalTitulo, setModalTitulo] = useState("");
    const [modalSubtitulo, setModalSubtitulo] = useState("");
    const [modalSucesso, setModalSucesso] = useState(false);

    const [sexo, setSexo] = useState("");
    const [imagem, setImagem] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [racas, setRacas] = useState([]);
    const { data: session, status } = useSession();
    const usuario = session?.user;

    useEffect(() => {
        const fetchRacas = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/raca`)
            const data = await response.json()
            setRacas(data);
        };

        fetchRacas();
    }, []);

  
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usuario?.id) {
            alert("Você não está logado.");
            return;
        }

        setCarregando(true);
        try {
            const res2 = await fetch('/api/imagem', {
                method: 'POST',
                body: imagem,
            });
            const data = await res2.json();
            const imagemUrl = data.url;

            const formData = new FormData();
            formData.append('nomedopet', nomedopet);
            formData.append('idadedopet', idadedopet);
            formData.append('enderecocidade', enderecocidade);
            formData.append('raca', raca);
            formData.append('sexo', sexo);
            formData.append('idusuario', usuario?.id);
            formData.append('imagempet', imagemUrl);

            const res = await fetch('/api/cadastrarPet', {
                method: 'POST',
                body: formData,
            });

            if (res.ok && res2.ok) {
                
                setModalTitulo("Cadastro realizado!");
                setModalSubtitulo("Seu pet foi cadastrado com sucesso.");
                setModalSucesso(true);
                setMostrarModal(true);


                setNomeDoPet("");
                setIdadeDoPet("");
                setRaca("");
                setEnderecocidade("");
                setSexo("");
                setImagem(null);

            } else {
                //const err = await res.json();
                //setMensagem(`Erro: ${err.error || 'Não foi possível cadastrar.'}`);
                setModalTitulo("Erro no cadastro");
                setModalSubtitulo("Alguma coisa deu errado. Tente novamente.");
                setModalSucesso(false);
                setMostrarModal(true);

            }
        } catch (error) {
            console.error(error);

            setModalTitulo("Erro de conexão");
            setModalSubtitulo("Erro ao enviar os dados. Tente novamente.");
            setModalSucesso(false);
            setMostrarModal(true);
           
        } finally {
            setCarregando(false);
        }
    }

    return (

        <BackgroundDividido>
            {carregando && <Carregar />}
            {mostrarModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <h2 className={styles.modalTitle}>{modalTitulo}</h2>
                        <p className={styles.modalText}>{modalSubtitulo}</p>
                        <button
                            className={styles.modalButton}
                            onClick={() => {
                                setMostrarModal(false);
                                if (modalSucesso) router.push('/telaPrincipal');
                            }}
                        >
                            Certo!
                        </button>
                    </div>
                </div>
            )}

            <div>

                <h1 className={styles.titulo}>Cadastre seu Pet!</h1>

                <form onSubmit={handleSubmit}>

                    <fieldset className={styles.caixaCentralizada}>
                        <input type="file" style={{ background: 'white', padding: '10px', borderRadius: '15px', 
                        fontSize: '1.2rem', color: '#3C2A02', fontFamily: 'Jaro'}}
                        onChange={(e) => setImagem(e.target.files[0])} accept="image/png image/jpg image/jpeg" />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Nome do Pet" value={nomedopet} onChange={(e) => setNomeDoPet(e.target.value)} />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                         <input
                            className={styles.caixaDeTexto}
                            type="number"
                            placeholder="Idade do Pet"
                            value={idadedopet}
                            min={1}
                            onChange={(e) => {
                            const valor = e.target.value;
                            if (valor === "" || Number(valor) >= 1) {
                                setIdadeDoPet(valor);
                            }
                            }}
                            required
                        />
                    </fieldset>


                    <fieldset className={styles.caixaCentralizada}>
                        <select className={styles.caixaDeTexto} name="Raça" value={raca} onChange={(e) => setRaca(e.target.value)}>
                            <option value="Raça">Raça</option>
                            {racas.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
                        </select>
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input className={styles.caixaDeTexto} type="text" placeholder="Endereço (Cidade)" value={enderecocidade} onChange={(e) => setEnderecocidade(e.target.value)} required />
                    </fieldset>

                    <fieldset className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input type="radio" name="sexo" value="femea" checked={sexo === "femea"} onChange={(e) => setSexo(e.target.value)} 
                            style={{ fontFamily: 'Inknut Antiqua'}}/> Fêmea
                        </label>
                        <br />
                        <label className={styles.radioLabel}>
                            <input type="radio" name="sexo" value="macho" checked={sexo === "macho"} onChange={(e) => setSexo(e.target.value)} /> Macho
                        </label>
                    </fieldset>

                    <div className={styles.caixaCentralizada}>
                        <button className={styles.botao} type="submit">Registrar</button>
                    </div>
                </form>
            </div>
        </BackgroundDividido>
    );
}