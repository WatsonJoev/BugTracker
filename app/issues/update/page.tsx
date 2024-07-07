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
        <div className="container w-full md:w-1/2">
            <h2 className="text-xl border-b border-gray-900/10 pb-3 font-semibold leading-7 subpixel-antialiased">Update Issue</h2>
            <IssueForm requestedIssues={requestedIssues} userList={userList} tagsList={tagsList} />
        </div>
    )
}

export default UpdateIssue