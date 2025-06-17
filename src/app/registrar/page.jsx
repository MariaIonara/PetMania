import styles from "../page.module.css";
import BackgroundDividido from "../components/invertido.js"
import db from "@/lib/db"

import Form from 'next/form'


export default async function Page() {
    /* const [nome, setNome] = useState();*/
    const alunos = await db.query("select * from usuario")

    return (
        <BackgroundDividido>
            <div styles={styles.texto}> 
                {
                    alunos.rows.map(
                        a => (
                            <div key={a.id} >
                                {a.nome}: {a.cargo}. 
                            </div>
                        )
                    )
                }
            </div>
            <div styles={styles.caixaDeTexto}>
                <Form >
                    <input type="text"/>
                </Form>
            </div>
        </BackgroundDividido>
    );
}