import React from 'react'

// Dependencies
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BackButton from '@/components/button/BackButton';

import IconBox from "@/components/icon/Icon"

// DB
import prisma from "@/prisma/client";

async function UserPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/user/login");
  }
  const user = data.session?.user.user_metadata;

  const userProfile = await prisma.profile.findUnique({
    where: {
      id: data.session?.user.id
    }
  })

  const profileOrg = await prisma.org.findUnique({
    where: {
      id: String(userProfile?.orgId)
    }
  })

  return (
    <main>
      <div className="bg-white max-w-2xl mx-auto shadow overflow-hidiven sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details and informations about user.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">
                Full name
              </div>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {user.fullname}
              </div>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">
                Role
              </div>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.role}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">
                Email adivress
              </div>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data.session?.user.email}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">
                Organization
              </div>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {profileOrg?.name}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-5">
              <div className="flex justify-between mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {profileOrg?.id}
                <IconBox OrgId={profileOrg?.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackButton />
    </main>
  )
}

export default UserPage