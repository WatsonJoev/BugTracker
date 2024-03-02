import React from 'react'

// Dependencies
import Link from 'next/link'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// DB
import prisma from "@/prisma/client";
import { Button } from '@/components/ui/button';

async function AppPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/user/login");
  }

  let allIssues: number = 0;
  let openIssues: number = 0;
  let inProgressIssues: number = 0;
  let closedIssues: number = 0;

  try {
    allIssues = await prisma.issue.count()

    openIssues = await prisma.issue.count({
      where: { status: "OPEN" }
    })

    inProgressIssues = await prisma.issue.count({
      where: { status: "IN_PROGRESS" }
    })

    closedIssues = await prisma.issue.count({
      where: { status: "CLOSE" }
    })
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="mx-auto justify-center d-flex">
      <div>
        <Link className="d-flex justify-center w-fit mx-auto" href="/issues/new">
          <Button variant={'default'} className="btn btn-wide my-3">
            Raise a Issue
          </Button>
        </Link>
        <div className="stats shadow my-10 py-5 hidden md:flex">
          <Link href="/issues" className="stat hover:cursor-pointer">
            <div className="stat-figure">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="stat-title">Open Issues</div>
            <div className="stat-value">{openIssues}</div>
            <div className="stat-desc">21% more than last month</div>
          </Link>
          <Link href="/issues" className="stat hover:cursor-pointer">
            <div className="stat-figure">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="stat-title">In Progress Issues</div>
            <div className="stat-value">{inProgressIssues}</div>
            <div className="stat-desc">21% more than last month</div>
          </Link>
          <Link href="/issues" className="stat hover:cursor-pointer">
            <div className="stat-figure">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="stat-value">{closedIssues && allIssues ? Math.round(closedIssues / allIssues * 100) : 0}%</div>
            <div className="stat-title">Issues Resolved</div>
            <div className="stat-desc">{openIssues + inProgressIssues} tasks remaining</div>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default AppPage