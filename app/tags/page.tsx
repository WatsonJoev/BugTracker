// Modules
import TagForm from "@/components/forms/Tag"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// DB
import prisma from "@/prisma/client";


interface TagsTypes {
    "id": number,
    "tagName": string | null,
    "createdBy": string | null,
    "Owning_Org": string | null
  }

const Tags = async () => {
    const supabase = createServerComponentClient({ cookies });
    let user = await supabase.auth.getUser();

    let tagsData: TagsTypes[] = [];
    try {
        tagsData = await prisma.tags.findMany({
            where:{
                createdBy: user?.data?.user?.id
            }
        })
    } catch (error) {
        console.log("error", error)
    }

    return (
        <main className="container w-full md:w-2/3">
            <h2 className="leading-6 font-medium border-b text-muted-foreground pb-3 mb-3 subpixel-antialiased text-xl">Tags</h2>
            <div className="w-full">
                <TagForm existingData={tagsData} currentUser={user?.data?.user?.id}/>
            </div>
        </main>
    )
}

export default Tags