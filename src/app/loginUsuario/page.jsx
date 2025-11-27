'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import BackgroundDividido from "../components/login/fundo";
import styles from "./page.module.css";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  console.log(session)


  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      router.replace(`/perfil/${session.user.id}`);
    }
  }, [status, session, router]);


  const handleLogin = async (e) => {
    e.preventDefault();
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
          alert("Erro ao obter dados do usuário.");
        }
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      console.error(error)
      alert('Erro de conexão')
    }
  }

  if (status === "loading") return null;

  return (
    <BackgroundDividido>
      <div className={styles.caixaCentralizada}>
        <h2 className={styles.tituloLogin}>LOGIN</h2>
        <form onSubmit={handleLogin}>
        <input
          className={styles.caixaDeTexto}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.caixaDeTexto}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Link href="">Esqueceu a senha?</Link>

        <button onClick={console.log("TESTE 2")} className={styles.botaoLogin}>
          Login
        </button>

        <div className={styles.blocoRegistrar}>
          <Link href="">Ainda não possui nenhuma conta?</Link>
        </div>

        <Link href='../registro'>
          <button className={styles.botaoregistrar}>Registre-se</button>
        </Link>

        <Link href="" className={styles.linkGoogle}>
          <img
            src="/google.png"
            alt="Google"
            onClick={() => console.log("TESTE")}
            className={styles.iconGoogle}
          />
          Continuar com o Google
        </Link>
        </form>
      </div>
    </BackgroundDividido>
  );
}