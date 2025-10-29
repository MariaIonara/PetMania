import styles from "./page.module.css";
import BackgroundDividido from "../components/fundo.js"
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";


export default function Page() {

  const { data: session } = useSession();

  if (session) {
    router.replace("/telaPrincipal");
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        senha
      });
      if (res?.ok) route.push("/telaPrincipal");
      else alert("Email e senha inválidos");
    } catch (error) {
      console.error(error)
      alert('Erro de conexão')
    }
  }

  return (
    <BackgroundDividido>
      <div className={styles.caixaCentralizada}>
        <h2 className={styles.tituloLogin}>LOGIN</h2>
        <input className={styles.caixaDeTexto} type="text" placeholder="Nome" />
        <input className={styles.caixaDeTexto} type="password" placeholder="Senha" />
        <Link href="">Esqueceu a senha?</Link>
        <button className={styles.botaoLogin}> Login </button>
        <div className={styles.blocoRegistrar}>
          <Link href="">Ainda não possui nenhuma conta?</Link>

        </div>

        <button className={styles.botaoregistrar}> Registre-se </button>
        <Link href="" className={styles.linkGoogle}> <img src="/google.png" alt="Google" onClick={() => signIn("google")}  className={styles.iconGoogle} />
          Continuar com o Google
        </Link>

      </div>

    </BackgroundDividido>
  )
};