import styles from "./page.module.css";
import BackgroundDividido from "../components/fundo.js"
import Link from "next/link";


export default function Page() {
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
        <Link href="" className={styles.linkGoogle}> <img src="/google.png" alt="Google" className={styles.iconGoogle} />
          Continuar com o Google
        </Link>

      </div>

    </BackgroundDividido>
  )
};