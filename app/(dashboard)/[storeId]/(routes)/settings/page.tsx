import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps { //interface se usa al ser un projecto con typescript EXCLUSIVO, si fuera vanilla js, no se definen tipos estaticos, asi TS define objetos
    params: {
        storeId: string;
    }
};

const SettingsPage: React.FC<SettingsPageProps> = async({ //react.fc es functional component
    params
}) => {
    const { userId} = await auth(); //Saca el user del usuario autenticado con Clerk, si no hay sesión, sera null

    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({ //busca en la base de datos una tienda que pertenezca al usuario
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) { //si no existe, redirige a home
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store}/>
            </div>
        </div>
    )
}

export default SettingsPage