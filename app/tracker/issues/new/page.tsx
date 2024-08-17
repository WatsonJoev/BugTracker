import React from 'react'

// Components
import IssueForm from '@/components/forms/Issue';

// DB
import prisma from "@/prisma/client";


const CreateIssue = async () => {
    let tagsList: any[] = [];

    try {
        let results = await prisma.issueTags.findMany({
            orderBy: {
                id: 'desc',
            }
        })
        results.map(each => tagsList.push({value: each.tagName, label: each.tagName}))
    } catch (error) {
        console.error('An error occurred:', error);
    }
    
    return (
        <div className='w-full md:w-1/2'>
            <h2 className="text-xl border-b border-gray-900/10 pb-3 font-semibold leading-7 subpixel-antialiased">Create Issue</h2>
            <IssueForm tagsList={tagsList} />
        </div>
    )
}

export default CreateIssue