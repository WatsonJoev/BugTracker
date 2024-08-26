import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import JoinForm from "@/components/forms/Org/Join"
import CreateJoin from "@/components/forms/Org/Create"
import { UseUser } from '@/context/AppContext';

export default function OrgSelectionForm() {
    const { user} = UseUser();
    console.log(user)
    return (
        <div className="flex flex-col justify-between h-fit self-center md:flex-row">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create Organization</CardTitle>
                    <CardDescription>Own organization and invite your team.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateJoin />
                </CardContent>
            </Card>
            <div className="m-5 flex align-middle self-center">
                OR
            </div>
            <Card className="w-[350px] h-fit self-center">
                <CardHeader>
                    <CardTitle>Join Existing Organization</CardTitle>
                    <CardDescription>Join with your existing team.</CardDescription>
                </CardHeader>
                <CardContent>
                    <JoinForm />
                </CardContent>
            </Card>
        </div>
    )
}
