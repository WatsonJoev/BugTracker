"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { VscCopy } from "react-icons/vsc";

const formSchema = z.object({
    orgID: z.string().length(36, {
        message: "Organization ID (orgID) must be a 36 characters.",
    })
})

export default function JoinForm() {
    const [currentUser, setCurrentUser] = useState({ id: "" });

    const supabase = createClientComponentClient();
    const router = useRouter();
    const { toast } = useToast()

    const toastAlert = (Message: string, id: string) => {
        var ts = new Date();
        toast({
            title: Message,
            description: ts.toUTCString(),
            action: (
                <ToastAction altText="CopyOrgId" onClick={() => {navigator.clipboard.writeText(id)}}>
                    <VscCopy />
                </ToastAction>
            ),
        })
    }

    useEffect(() => {
        const getSession = async () => {
          const { data } = await supabase.auth.getUser();
          setCurrentUser(data.session ? data.session.user : { id: "" });
        };
        getSession();
    }, [router, supabase.auth]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orgID: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            let response;
            const urlWithParams = `/api/org?pro_id=${currentUser.id}&uid=${form.getValues().orgID}`;
            response = await axios.put(urlWithParams);
            toastAlert(`OrgId: ${response.data.orgId}`, response.data.orgId)
            router.push("/")
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="orgID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organization ID</FormLabel>
                            <FormControl>
                                <Input placeholder="36 Digit Alphanumeric Characters" {...field} />
                            </FormControl>
                            <FormDescription>
                                {"If you don't have your organization ID (orgID) readily available, please contact your system administrator. They can also help you locate it if needed."}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Join</Button>
            </form>
        </Form>
    )
}
