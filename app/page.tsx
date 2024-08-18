import React from 'react'

// Dependencies
import Link from 'next/link'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// DB
import prisma from "@/prisma/client";
import { Button } from '@/components/ui/button';
import TagsBar from '@/components/charts/bar'

async function AppPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    redirect("/user/login");
  } else {
    redirect("/tracker");
  }
  
  return (
    <main className="mx-auto justify-center flex">
      <div className='w-full md:container'>
        <p className='h-1'>
          HomePage
        </p>
      </div>
    </main>
  )
}

export default AppPage