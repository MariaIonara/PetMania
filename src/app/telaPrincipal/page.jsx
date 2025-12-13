'use client'

import styles from "./page.module.css";
import Fundo from "../components/background"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function TelaPrincipal () {
    const { data: session, status } = useSession();
    const usuario = session?.user;

    const router = useRouter();
    const [pets, setMeusPets] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function fetchPet() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/meuspets`);
                const data = await res.json();
                setMeusPets(data);
            } catch (error) {
                console.error('Erro ao buscar pet', error);
            } finally {
                setCarregando(false);
            }
        }
        fetchPet();
    }, [])



    return (
        <section className={styles.telaprincipal}>
           <div className={styles.cabecalho}>

           </div>
           <div className={styles.mainpage}>
                <div className={styles.meuspets}>
                    <p style={{ fontSize: 25, color: 'white', fontFamily: 'Jaro', marginBottom: 10}}>Seus Pets</p>
                    <div style={{ display: 'flex', gap: 50, flexWrap: 'wrap'}}>
                        {
                            carregando ?
                             <p style={{ fontSize: 21, color: '#FFE99D', fontFamily: 'Jaro'}}>Carregando seus pets...</p>
                            : null
                        }
                        {
                            (!pets.length && !carregando) ?
                             <p style={{ fontSize: 21, color: 'color', fontFamily: 'Jaro'}}>Você não tem nenhum pet cadastrado.</p>
                            : null
                        }


                        {
                            pets.map((pet, id) => {
                                return (
                                    <div key={id+`pet`}style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <p style={{ fontSize: 23, color: '#422A13', fontFamily: 'Jaro', marginTop: 8 }}>{pet.nomedopet}</p>
                                        <div style={{ width: 150, height: 150, background: '#FFE99D'}}>

                                        </div>
                                        <button  style={{ 
                                            width: 100, height: 40, background: '#FFE99D', 
                                            fontSize: 23, color: '#422A13', fontFamily: 'Jaro',
                                            padding: 5, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                                            outline: 'none', border: 'none', marginTop: 15
                                            }}
                                            
                                            onClick={() => {
                                                router.push("/agendamento");
                                            }}
                                            >
                                            Serviços
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{ marginTop: 20}}>
                    <p style={{ fontSize: 23, color: 'white', fontFamily: 'Jaro'}}>Informações sobre a empresa</p>
                    <ul style={{ color: 'white'}}>
                        <li>
                            <p style={{ fontSize: 21, color: 'white', fontFamily: 'Jaro'}}>Endereço: Rua João Mendez, n° 473. Esperança, PB</p>
                        </li>
                        <li>
                            <p style={{ fontSize: 21, color: 'white', fontFamily: 'Jaro'}}>Contato: (83) 99193-0405</p>
                        </li>
                    </ul>
                </div>

                <button className={styles.add} onClick={() => {
                    router.push("/registrarPet");
                }}>+</button>

                <p style={{ fontSize: 23, color: 'white', fontFamily: 'Jaro', position: 'absolute', top: 15, right: 15}}>{ (usuario?.id ? 
                    `Seja bem vindo(a) ${usuario?.name}!`: "Carregando...")}</p>
           </div>
        </section>
    )
}