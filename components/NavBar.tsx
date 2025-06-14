import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./Main-Nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const NavBar = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in")
    }

    const stores = await prismadb.store.findMany({ //busca en la base de datos todas las tiendas que pertenezca al usuario
        where:{
            userId,
        }
    })

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher  items={stores} />
                <MainNav className="mx-6"/>
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
}

export default NavBar;