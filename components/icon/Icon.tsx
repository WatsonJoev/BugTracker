"use client";
import { LuCopy } from "react-icons/lu";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";

export default function IconBox({ OrgId }: any) {
  const { toast } = useToast();

  const toastAlert = (Message: string) => {
    var ts = new Date();
    toast({
      title: Message,
      description: ts.toUTCString(),
    })
  }

  return (
    <div className="cursor-pointer">
      <LuCopy size="18px" onClick={() => { navigator.clipboard.writeText(OrgId), toastAlert(`OrgId copied to clipboard`)}} />
    </div>
  )
}
