'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
//import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import BackgroundDividido from "../components/login/fundo";
import styles from "./page.module.css";

export default function Page() {
  //const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  /*
   if (session) {
     router.replace("/telaPrincipal");
     return null;
   }
  
   const handleLogin = async (e) => {
     e.preventDefault();
     try {
       const res = await signIn("credentials", {
         redirect: false,
         email,
         senha,
       });
       if (res?.ok) router.push("/telaPrincipal");
       else alert("Email e senha inválidos");
     } catch (error) {
       console.error(error);
       alert("Erro de conexão");
     }
   };
 */
  return (
    <BackgroundDividido>
      <div className={styles.caixaCentralizada}>
        <h2 className={styles.tituloLogin}>LOGIN</h2>

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
      </div>
    </BackgroundDividido>
  );
}