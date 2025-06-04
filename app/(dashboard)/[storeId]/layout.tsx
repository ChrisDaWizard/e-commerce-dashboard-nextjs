import NavBar from "@/components/NavBar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode; //tipo de TypeScript que representa cualquier cosa que React pueda renderizar.
    params: { storeId: string}
}) {
    const { userId } = await auth();//Usa Clerk para verificar que el usuario esté logueado. Si no lo está, lo manda a la página de inicio de sesión.

    if(!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({ //confirms that store id exist with current userId
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) { //if there's not store, redirect to root
        redirect ("/")
    }

    return ( //if there's store, we render navbar and children
        <>
            <NavBar />
            { children }
        </>
    )
}