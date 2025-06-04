"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@/lib/generated/prisma";
import { Trash } from "lucide-react";

interface SettingFormProps {
    initialData: Store;
}

export const SettingsForm: React.FC<SettingFormProps> = ({
    initialData
}) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store preferences" />
                <Button variant={"destructive"} size="sm" onClick={() => { }}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
        </>
    )
};