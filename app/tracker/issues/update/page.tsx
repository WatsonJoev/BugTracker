import React from 'react'

// Components
import IssueForm from '@/components/forms/Issue';

// DB
import prisma from "@/prisma/client";

type Props = {
    params: {},
    searchParams: { [key: string]: string | string[] | undefined },
}

const UpdateIssue = async (props: Props) => {
    const id = Number(props.searchParams.id);
    let requestedIssues;
    let userList;
    let tagsList: any[] = [];

    try {
        requestedIssues = await prisma.issue.findUniqueOrThrow({
            where: { id: id },
            select: {
                title: true,
                description: true,
                tags: true,
                Assigned: {
                    select: {
                        firstname: true,
                        id: true
                    },
                },
            }
        })
        userList = await prisma.profile.findMany({
            orderBy: {
                id: 'desc',
            }
        })
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
                <h2 className="leading-6 font-medium border-b text-muted-foreground pb-3 subpixel-antialiased text-xl">Update Issue</h2>
                <IssueForm requestedIssues={requestedIssues} userList={userList} tagsList={tagsList} />
            </main>
        </div>
    )
}

export default UpdateIssue