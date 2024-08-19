import React from 'react'

// Components
import IssueForm from '@/components/forms/Issue';

// DB
import prisma from "@/prisma/client";


const CreateIssue = async () => {
    let tagsList: any[] = [];

    try {
        let results = await prisma.tags.findMany({
            orderBy: {
                id: 'desc',
            }
        })
        results.map(each => tagsList.push({ value: each.tagName, label: each.tagName }))
    } catch (error) {
        console.error('An error occurred:', error);
    }

    return (
        <div className="w-full md:container md:w-3/4">
            <main className="w-full md:container md:w-3/4">
                <h2 className="leading-6 font-medium border-b text-muted-foreground pb-3 subpixel-antialiased text-xl">Create Issue</h2>
                <IssueForm tagsList={tagsList} />
            </main>
        </div>
    )
}

export default CreateIssue