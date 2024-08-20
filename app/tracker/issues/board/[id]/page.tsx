import React from 'react'

// Dependencies
import {NoStyleBackButton} from '@/components/button/BackButton';
import { FaUserInjured } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { BsBugFill } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { MDXRemote } from 'next-mdx-remote/rsc'

// DB
import prisma from "@/prisma/client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function IssueBoard({ params }: { params: { id: string } }) {

  const issue = await prisma.issue.findUniqueOrThrow({
    include: {
      Owner: true,
      Assigned: true,
    },
    where: { id: Number(params.id) }
  })

  return (
    <main className='min-w-3/4'>
      <div className="max-w-2xl mx-auto shadow overflow-hidden sm:rounded-lg">
        <h3 className="px-4 py-5 sm:px-6 text-lg leading-6 font-medium capitalize flex">
          <BsBugFill className="self-center mr-1" />
          {issue.title}
        </h3>
        <div className="pb-1 sm:px-6 flex justify-between">
          <div>
            <p className="max-w-2xl text-sm text-slate-400 flex">
              <FaUserInjured className="self-center mr-2 h-4 w-4" /> {issue.Owner?.firstname}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-slate-400 flex">
              <CiCalendar className="self-center mr-1 h-5 w-5" /> {issue.createdAt.toLocaleString()}
            </p>
          </div>
          <div className="mt-1 max-w-2xl text-sm text-slate-400 self-end">
            Assigned To: {issue.Assigned ? issue.Assigned.firstname : "None"}
          </div>
        </div>
        <div className="border-t border-gray-200 p-3 text-justify">
          <MDXRemote source={issue.description} />
        </div>
        <div className='flex mt-5 mx-auto w-full justify-center'>
          <NoStyleBackButton />
          <Link href={`/tracker/issues/update?id=${issue.id}`} className='ml-3'>
            <Button>
              <MdOutlineEdit className='mr-1'/>
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default IssueBoard