import React, { createContext, useEffect, useState } from 'react';

// Dependencies
import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MdManageSearch } from "react-icons/md";
import { TiTags } from "react-icons/ti";

function AppPage() {

  return (
    <main className="mx-auto justify-center flex">
      <div className='w-full md:container flex justify-around'>
        <Link href={"/tracker"} className='mr-5'>
          <Card>
            <CardHeader>
              <MdManageSearch style={{ fontSize: "150px" }} />
              <CardTitle>Tracker</CardTitle>
              <CardDescription>Track your records</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href={"/tags"} className='ml-5'>
          <Card>
            <CardHeader>
              <TiTags style={{ fontSize: "150px" }} />
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add Global tags</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  )
}

export default AppPage