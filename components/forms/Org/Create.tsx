"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { VscCopy } from "react-icons/vsc";

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Name should have more than 4 characters",
    }),
    username: z.string().min(4, {
        message: "Username is unavailable",
    }),
    strength: z.string(),
    Owning: z.object({ connect: z.object({ id: z.string() }) }).optional()
})

export default function CreateJoin() {
    const [currentUser, setCurrentUser] = useState({ id: "" });

    const strengthOptions = ["0-50", "50-100", "100-500", "500+"]
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
          setCurrentUser(data.user ? data.user : { id: "" });
        };
        getSession();
    }, [router, supabase.auth]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            strength: "",
            Owning: {
                connect: {
                    id: currentUser.id,
                },
            },
        },
    })

    // 2. Define a submit handler.
    async function onSubmit (values: z.infer<typeof formSchema>) {
        try {
            let response;
            const urlWithParams = "/api/org";
            let tempForm = form.getValues();
            tempForm.Owning = {
                connect: {
                    id: currentUser.id,
                },
            }
            response = await axios.post(urlWithParams, tempForm);
            toastAlert(`OrgId: ${response.data.orgId}`, response.data.orgId)
            router.push("/")
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="my-4">
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Unique username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="strength"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Strength</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" {...field} />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                        {strengthOptions.map((each) => <SelectItem key={each} value={each}>{each}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="my-5" type="submit">Create</Button>
            </form>
        </Form>
    )
}
