import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode;
})  {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({ //we load the first store available of currently loged user
        where: {
            userId
        }
    });

    if (store) {
        redirect(`/${store.id}`); //if store existes, redirect to store id in dashboard/[storeId]
    }

    return(
        <>
            {children}
        </>
    )
}