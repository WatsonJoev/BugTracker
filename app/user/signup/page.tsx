import Signup from "@/components/forms/Signup";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (data.session?.user) {
    redirect("/");
  }

  return (
    <div className="d-flex w-full max-w-lg m-auto">
      <main className="w-full m-auto justify-center self-center">
        <h1 className="text-2xl text-center font-bold mb-2 font-mono">Signup</h1>
        <Signup />
      </main>
    </div>
  );
}
