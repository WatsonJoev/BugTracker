"use client";

import { useState } from "react";
import axios from "axios";

// Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IoTrashOutline } from "react-icons/io5";

const TagForm = ({ existingData }: any) => {
    const [tagData, setTagData] = useState(existingData)
    const [tagInput, setTagInput] = useState("")

    const onSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the page reload

        try {
            setTagData([...tagData, {
                id: tagData.length + 1,
                tagName: tagInput
            }])
            let response;
            const urlWithParams = "/api/tags";
            response = await axios.post(urlWithParams, {
                tagName: tagInput
            });
            setTagInput("")
            console.log(response)
        } catch (error) {
            console.error('Error:', error);
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
        <div className="w-full justify-center flex">
            <div className="w-full md:w-2/3">
                <form onSubmit={onSubmit} className="flex max-w-md items-center space-x-2">
                    <Input type="text" placeholder="Add Tags..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
                    <Button type="submit">+</Button>
                </form>
                <div className="mt-2 rounded-md">
                    {tagData.map((each: any) =>
                        <div key={each.id} className="rounded-md border p-3 flex justify-between align-middle">
                            <div className="capitalize">
                                {each.tagName}
                            </div>
                            <div>
                                <IoTrashOutline className="cursor-pointer hover:text-lg" onClick={() => onDelete(each.id)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TagForm
