import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PerfilPage({ params }) {
  const session = await getServerSession(authOptions);
  const { id } = params;

  return (
    <div>
      <h1>Perfil do usuário {id}</h1>
      <p>Logado como: {session?.user?.email}</p>
    </div>
  );
}
