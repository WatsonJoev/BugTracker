import React, { createContext, useEffect, useState } from 'react';

// Dependencies
import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


// Icons
import { MdManageSearch } from "react-icons/md";
import { MdPersonAddAlt } from "react-icons/md";
import { TiTags } from "react-icons/ti";
import { IoMdLogIn } from "react-icons/io";

function AppPage() {

  return (
    <main className="mx-auto justify-center flex">
      <div className='w-full md:container justify-around grid grid-cols-4 gap-6'>
        <Link href={"/tracker"} className='h-fit'>
          <Card>
            <CardHeader>
              <MdManageSearch style={{ fontSize: "150px" }} />
              <CardTitle>Tracker</CardTitle>
              <CardDescription>Track your records</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href={"/tags"} className='h-fit'>
          <Card>
            <CardHeader>
              <TiTags style={{ fontSize: "150px" }} />
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add Global tags</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href={"/tags"} className='h-fit'>
          <Card>
            <CardHeader>
              <MdPersonAddAlt style={{ fontSize: "150px" }} />
              <CardTitle>Add Employee</CardTitle>
              <CardDescription>Add Employees to org</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href={"/tags"} className='h-fit'>
          <Card>
            <CardHeader>
              <IoMdLogIn style={{ fontSize: "150px" }} />
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Register your entry</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  )
}

export default AppPage