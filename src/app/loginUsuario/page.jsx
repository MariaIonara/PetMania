'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, getSession, signOut } from "next-auth/react";

import Link from "next/link";
import BackgroundDividido from "../components/login/fundo";
import styles from "./page.module.css";
import Carregar from '../components/ui/carregar';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarModalErro, setMostrarModalErro] = useState(false);

  useEffect(() => {
    getSession().then(sess => {
      if (sess) {
        signOut({ callbackUrl: "/loginUsuario" });
      }
    });
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      router.replace(`/telaPrincipal`);
    }
  }, [status, session, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        senha,
      });

      if (res?.ok) {
        const sessionAtualizada = await getSession();

        if (sessionAtualizada?.user?.id) {
          router.push(`/telaPrincipal`);
        } else {
          setMostrarModalErro(true);
        }
      } else {
        setMostrarModalErro(true);
      }

    } catch (error) {
      console.error(error);
      setMostrarModalErro(true);
    } finally {
      setCarregando(false);
    }
  };

  if (status === "loading") {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 32,
        fontFamily: "Jaro, serif",
        width: "100vw",
        background: "#326b9aff",
        color: 'white',
        flexDirection: 'column',
        gap: 10,
      }}>
        <p>Carregando Sessão de Autenticação...</p>
        <div className={styles.loader}></div>
        
      </div>
    );
  }

  return (
    <BackgroundDividido>
      {carregando && <Carregar />}

      {mostrarModalErro && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2 className={styles.modalTitle}>Erro no login</h2>

            <p className={styles.modalText}>
              Não foi possível realizar o login.  
              Tente novamente.
            </p>

            <button
              className={styles.modalButton}
              onClick={() => setMostrarModalErro(false)}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      <div className={styles.caixaCentralizada}>
        <h2 className={styles.tituloLogin}>LOGIN</h2>

        <form className={styles.caixaCentralizada} onSubmit={handleLogin}>
          <input
            className={styles.caixaDeTexto}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className={styles.caixaDeTexto}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <p
            className={styles.inknut}
            onClick={() => alert("Função ainda não implementada")}
            style={{ cursor: 'pointer' }}
          >
            Esqueceu a senha?
          </p>

          <button className={styles.botaoLogin} type="submit">
            Login
          </button>

          <div className={styles.blocoRegistrar}>
            <p className={styles.inknut}>Ainda não possui nenhuma conta?</p>
            <Link href="../registro">
              <button className={styles.botaoregistrar}>Registre-se</button>
            </Link>
          </div>

          <div className={styles.linkGoogle}>
            <img
              src="/google.png"
              alt="Google"
              onClick={() => signIn("google")}
              className={styles.iconGoogle}
            />
            Continuar com o Google
          </div>
        </form>
      </div>
    </BackgroundDividido>
  );
}
