"use client";
import { useState, useEffect } from "react";

// Dependencies
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { Button } from "@/components/ui/button";
import MultiSelect from 'react-tailwindcss-select';
// import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { LuLoader2 } from "react-icons/lu";
import SimpleMDE from "react-simplemde-editor";

const IssueForm = ({ requestedIssues, userList, tagsList }: any) => {
  const router = useRouter();
  const { toast } = useToast()
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState(
    requestedIssues
      ? requestedIssues
      : {
        title: "",
        description: "",
        tags: []
      }
  );
  const [currentUser, setCurrentUser] = useState({ id: "" });
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      console.log(data);
      setCurrentUser(data.user ? data.user : { id: "" });
    };
    getSession();
  }, [router, supabase.auth]);

  // Function to go to the previous page
  const goBack = () => {
    router.back();
  };

  const toastAlert = (Message: string) => {
    var ts = new Date();
    toast({
      title: Message,
      description: ts.toUTCString(),
      // action: (
      //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      // ),
    })
  }

  const onSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the page reload
    setLoader(true)
    try {
      let response;
      if (id) {
        const urlWithParams = "/api/issues?id=" + id;
        if(formData.Assigned.connect.id){
          response = await axios.put(urlWithParams, formData);
        }else{
          delete formData.Assigned;
          response = await axios.put(urlWithParams, formData);
        }
      } else {
        response = await axios.post("/api/issues", {
          title: formData.title,
          description: formData.description,
          tags: formData.tags,
          Owner: {
            connect: {
              id: currentUser.id, // Connect the post to the user by user ID
            },
          },
        });
      }
      console.log(response)
      if (response.status === 201) {
        console.log("Response from the server:", response.data);
        toastAlert("Issue created successfully!")
        setFormData({
          title: "",
          description: "",
          tags: []
        });
        router.push(`/tracker/issues/board/${response.data.id}`)
      } else if (response.status === 202) {
        console.log("Response from the server:", response.data);
        toastAlert("Issue updated successfully!")
        router.push(`/tracker/issues/board/${response.data.id}`)
      } else {
        console.log("Response from the server:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoader(false)
  };

  const handleMultiSelect = (value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      tags: value,
      Assigned: {
        connect: {
          id: requestedIssues && requestedIssues.Assigned
            ? requestedIssues.Assigned.id
            : "",
        },
      },
    }));
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // Update the form data state when an input field changes
    setFormData((prevData: any) => ({
      ...prevData,
      Assigned: {
        connect: {
          id: requestedIssues && requestedIssues.Assigned
            ? requestedIssues.Assigned.id
            : "",
        },
      },
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      description: value,
      Assigned: {
        connect: {
          id: requestedIssues && requestedIssues.Assigned
            ? requestedIssues.Assigned.id
            : "",
        },
      },
    }));
  };

  const handleAssignment = (AssignedId: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      Assigned: {
        connect: {
          id: AssignedId,
        },
      },
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b pb-12 mx-auto">
            <hr className="text-secondary-foreground" />
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6"
                >
                  Title
                </label>
                <Input
                  value={formData.title}
                  name="title"
                  onChange={handleChange}
                  className="block w-full border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 rounded-md"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium leading-6"
                >
                  Tags
                </label>
                <MultiSelect
                  primaryColor="blue"
                  value={formData.tags}
                  onChange={handleMultiSelect}
                  options={tagsList}
                  isMultiple={true}
                />
              </div>
              {requestedIssues && (
                <div className="col-span-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6"
                  >
                    Assigned To
                  </label>
                  <Select name="assignedTo" onValueChange={handleAssignment}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          requestedIssues.Assigned
                            ? requestedIssues.Assigned.firstname
                            : ""
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Assigned to</SelectLabel>
                        {userList?.map((each: any) => (
                          <SelectItem key={each.id} value={each.id}>
                            {each.firstname}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6"
                >
                  Description
                </label>
                <SimpleMDE
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
                <p className="text-sm text-slate-500 leading-6">
                  Detailed description will help to the slove quicker.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6 mx-auto sticky">
            <Button type="button" variant="outline" onClick={goBack}>
              Cancel
            </Button>
            {loader ?
            
            <Button disabled>
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          :
            <Button type="submit" variant="default">
              Submit
            </Button>

            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
