import React from 'react'

// Dependencies
import BackButton from '@/components/button/BackButton';
import { FaUserInjured } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { BsBugFill } from "react-icons/bs";

// DB
import prisma from "@/prisma/client";

async function IssueBoard({ params }: { params: { id: string } }) {

  const issue = await prisma.issue.findUniqueOrThrow({
    include: {
      Owner: true,
      Assigned: true,
    },
    where: { id: Number(params.id) }
  })

  return (
    <main>
      <div className="max-w-2xl mx-auto shadow overflow-hidden sm:rounded-lg">
        <h3 className="px-4 py-5 sm:px-6 text-lg leading-6 font-medium capitalize d-flex">
          <BsBugFill className="self-center mr-1" />
          {issue.title}
        </h3>
        <div className="pb-1 sm:px-6 d-flex justify-between">
          <div>
            <p className="max-w-2xl text-sm text-slate-400 d-flex">
              <FaUserInjured className="self-center mr-2 h-4 w-4" /> {issue.Owner?.fullname}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-slate-400 d-flex">
              <CiCalendar className="self-center mr-1 h-5 w-5" /> {issue.createdAt.toLocaleString()}
            </p>
          </div>
          <div className="mt-1 max-w-2xl text-sm text-slate-400 self-end">
            Assigned To: {issue.Assigned ? issue.Assigned.fullname : "None"}
          </div>
        </div>
        <div className="border-t border-gray-200 p-3 text-justify">
          {issue.description}
        </div>
        <BackButton />
      </div>
    </main>
  )
}

export default IssueBoard