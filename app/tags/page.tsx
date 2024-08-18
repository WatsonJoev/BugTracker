// Modules
import TagForm from "@/components/forms/Tag"

// DB
import prisma from "@/prisma/client";


interface TagsTypes {
    "id": number,
    "tagName": string,
  }

const Tags = async () => {
    let tagsData: TagsTypes[] = [];
    try {
        tagsData = await prisma.tags.findMany()
    } catch (error) {
        console.log("error", error)
    }

    return (
        <main className="container w-full md:w-2/3">
            <h2 className="leading-6 font-medium border-b text-muted-foreground pb-3 mb-3 subpixel-antialiased text-xl">Tags</h2>
            <div className="w-full">
                <TagForm existingData={tagsData}/>
            </div>
        </main>
    )
}

export default Tags