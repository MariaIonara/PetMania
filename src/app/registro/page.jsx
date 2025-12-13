'use client'

import styles from "./page.module.css";
import BackgroundDividido from "../components/fundoRegistro.js"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Carregar from "../components/ui/carregar";

export default function Page() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [tipo, setTipo] = useState("Cliente");
    const [telefone, setTelefone] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalTitulo, setModalTitulo] = useState("");
    const [modalSubtitulo, setModalSubtitulo] = useState("");
    const [modalSucesso, setModalSucesso] = useState(false);

    const handleSubmit = async (b) => {
        b.preventDefault();

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

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
                setModalTitulo("Cadastro realizado!");
                setModalSubtitulo("Sua conta foi criada com sucesso. Faça o login para continuar.");
                setModalSucesso(true);
                setMostrarModal(true);

                setNome("");
                setEmail("");
                setSenha("");
                setConfirmarSenha("");
                setTipo("");
                setTelefone("");
            } else {
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
                                if (modalSucesso) router.push('/loginUsuario');
                            }}
                        >
                            Certo!
                        </button>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
                <h1 className={styles.titulo}>REGISTRAR</h1>

                <form onSubmit={handleSubmit}>
                    <fieldset className={styles.caixaCentralizada}>
                        <input
                            className={styles.caixaDeTexto}
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input
                            className={styles.caixaDeTexto}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input
                            className={styles.caixaDeTexto}
                            type="text"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                        />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input
                            className={styles.caixaDeTexto}
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            minLength={8}
                            required
                        />
                    </fieldset>

                    <fieldset className={styles.caixaCentralizada}>
                        <input
                            className={styles.caixaDeTexto}
                            type="password"
                            placeholder="Confirmar senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            minLength={8}
                            required
                        />
                    </fieldset>

                    

                    <div className={styles.caixaCentralizada}>
                        <button className={styles.botao} type="submit">
                            Continuar
                        </button>
                    </div>
                </form>
            </div>
        </BackgroundDividido>
    );
}
