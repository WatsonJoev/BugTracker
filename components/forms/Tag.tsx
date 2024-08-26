"use client";

import { useState, useContext } from "react";
import axios from "axios";

// Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IoTrashOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";


const TagForm = ({ existingData, currentUser }: any) => {
    const [tagData, setTagData] = useState(existingData)
    const [tagInput, setTagInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault(); // Prevent the page reload

        try {
            setTagData([...tagData, {
                id: tagData.length + 1,
                tagName: tagInput,
                createdBy: currentUser
            }])
            let response;
            const urlWithParams = "/api/tags";
            response = await axios.post(urlWithParams, {
                tagName: tagInput,
                Owner: {
                    connect:{
                        id: currentUser
                    }
                }
            });
            setTagInput("")
            console.log(response)
            toast({
                title: "Success",
                description: "Tag added successfully",
            })
        } catch (error) {
            console.log('Error:', error);
            toast({
                title: "Error",
                description: "Failed to add tag. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    };

    const onDelete = async (id: number) => {
        try {
            let tempList = tagData.filter(function (each: any) {
                return each.id !== id;
            });
            setTagData(tempList)
            let response;
            const urlWithParams = "/api/tags?id="+id;
            response = await axios.delete(urlWithParams);
            console.log(response)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="w-full justify-center flex container">
            <div className="w-full md:w-2/3">
                <form onSubmit={onSubmit} className="flex max-w-md items-center space-x-2">
                    <Input type="text" placeholder="Add Tags..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
                    <Button disabled={tagInput && isLoading!==false ? false : true} type="submit">
                        <FaPlus style={{fontSize: "15px"}} />
                    </Button>
                </form>
                <div className="mt-3 rounded-md max-w-md">
                    {tagData.map((each: any) =>
                        <div key={each.id} className="rounded-md border p-2 m-2 flex justify-between align-middle">
                            <div className="capitalize">
                                {each.tagName}
                            </div>
                            <div>
                                <IoTrashOutline style={{fontSize: "20px"}} className="cursor-pointer hover:text-lg" onClick={() => onDelete(each.id)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TagForm
