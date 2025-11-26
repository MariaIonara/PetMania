'use client'

import styles from "./page.module.css";
import Fundo from "../components/background"

import { useEffect, useState  } from "react";


export default function Page() {
    const [pet, setPet] = useState([]);
    const [carregando, setCarregando] = useState(true);


    useEffect(() => {
        async function fetchPet() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/cadastrarPet`);
                const data = await res.json();
                setPet(data);
            } catch (error) {
                console.error('Erro ao buscar pet', error);
            } finally {
                setCarregando(false);
            }
        }
        fetchPet();
    }, [])


    return (
        <Fundo>
            <div>
                {pet.length === 0 && <p>Nada agendado</p>}

                {pet.map((a) => (
                    <div key={a.id}>
                        <div className={styles.texto}>
                            <p>{a.nomedopet}</p>
                            {/*<p>{a.idadedopet}</p>*/}
                            
                            
                        </div>
                    </div>
                    ) 
                )}
            </div>
        </Fundo>
    );
}