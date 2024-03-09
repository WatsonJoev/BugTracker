import React from 'react'

// Dependencies
import DataTableShadcn from '@/components/data-table/shadcnDatatable'

// DB
import prisma from "@/prisma/client";

interface IssueTypes {
  "id": number,
  "title": string,
  "description": string,
  "status": "OPEN" | "IN_PROGRESS" | "HOLD" | "CLOSE"
  "createdAt": Date,
  "updatedAt": Date,
}

const Issues = async () => {
  let issueData: IssueTypes[] = [];
  try {
    issueData = await prisma.issue.findMany({
      where: {
        NOT: {
          status: 'CLOSE',
        }
      },
      orderBy: {
        id: 'desc',
      }
    })
  } catch (error) {
    console.log(error)
  }

  return (
    <div>
      <main className="w-full md:container md:w-2/3">
        <h2 className="leading-6 font-medium border-b text-muted-foreground pb-3 subpixel-antialiased text-xl">Issues</h2>
        <DataTableShadcn data={issueData} />
      </main>
    </div>
  )
}

export default Issues