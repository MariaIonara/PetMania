'use client'

import styles from "./page.module.css";
import Fundo from "../components/background"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Carregar from "../components/ui/carregar";

export default function TelaPrincipal () {
    const { data: session, status } = useSession();
    const usuario = session?.user;

    const router = useRouter();
    const [pets, setMeusPets] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [carregandoSignOut, setCarregandoSignOut] = useState(false);

    useEffect(() => {
        async function fetchPet() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/meuspets`);
                const data = await res.json();
                setMeusPets(data || []);
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
            {carregandoSignOut ? <Carregar /> : null}
           <div className={styles.cabecalho}>

           </div>
           <div className={styles.mainpage}>
                <div className={styles.meuspets}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                        <p style={{ fontSize: 32, color: 'white', fontFamily: 'Jaro', marginBottom: 10}}>Seus Pets</p>
                        { carregando ?  <div className={styles.spinnermenor}></div> : null}
                       
                    </div>
                    <div style={{ display: 'flex', gap: 50, flexWrap: 'wrap'}}>
                        {
                            carregando ? <>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: 10}}>
                                    <SkeletonPet id={1}/>
                                    <SkeletonPet id={2}/>
                                    <SkeletonPet id={3}/>
                                    <SkeletonPet id={4}/>
                                    <SkeletonPet id={5}/>
                                </div>
                            </>
                            : null
                        }
                        {
                            (!pets.length && !carregando) ?
                             <p style={{ fontSize: 16, color: 'white', fontWeight: '100', fontFamily: 'Inknut Antiqua', background: 'rgba(0,0,0,0.1)', padding: 5}}>
                                Você não tem nenhum pet cadastrado. Por favor, clique no botão no canto inferior direito para adicionar um</p>
                            : null
                        }
                        {
                            pets.map((pet, id) => {
                                return (
                                    <div key={id+`pet`}style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <p style={{ fontSize: 23, color: '#422A13', fontFamily: 'Jaro', marginTop: 8 }}>{pet.nomedopet}</p>
                                        <div style={{ width: 150, height: 150, background: '#FFE99D',
                                            backgroundImage: `url(${pet.imagempet})`, backgroundSize: 'cover',
                                            backgroundPosition: 'center center'
                                        }}>

                                        </div>
                                        <button  style={{ 
                                            width: 100, height: 40, background: '#FFE99D', 
                                            fontSize: 23, color: '#422A13', fontFamily: 'Jaro',
                                            padding: 5, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                                            outline: 'none', border: 'none', marginTop: 15
                                            }}
                                            
                                            onClick={() => {
                                                router.push("/agendamento/"+pet.id);
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
                <div style={{ fontSize: 23, color: 'white', fontFamily: 'Jaro', position: 'absolute', top: 45, right: 15}}>
                    <p style={{ background: 'rgba(0,0,0,0.2)', padding: 5, borderRadius: '5px', cursor: 'pointer'}}
                    onClick={() => {
                        setCarregandoSignOut(true);
                        try {
                            signOut({ callbackUrl: "/loginUsuario" })
                        } catch (err) {
                            console.error('Erro ao sair da conta', err);
                        } finally {
                          setCarregandoSignOut(false);
                        }
                    }}
                    >Sair da conta</p>
                </div>
           </div>
        </section>
    )
}

function SkeletonPet({ id }) {
  return (
    <div
      key={id + `pet`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        className={styles.shimmer}
        style={{
          width: 120,
          height: 28,
          borderRadius: 6,
          marginTop: 8
        }}
      />

      <div
        className={styles.shimmer}
        style={{
          width: 150,
          height: 150,
          borderRadius: 12,
          marginTop: 10
        }}
      />

      <div
        className={styles.shimmer}
        style={{
          width: 100,
          height: 40,
          borderRadius: 10,
          marginTop: 15
        }}
      />
    </div>
  );
}