'use client';

import React from 'react';

// Dependencies
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const DropDownMenu = ({ userStatus }: any) => {
    const status: {} = {
        "OPEN": "Open",
        "CLOSE": "Close",
        "IN_PROGRESS": "Working",
        "HOLD": "Hold",
        "DELETE": "Delete",
    }

    const handleIssueStatusChange = async (selectedValue: string) => {
        const urlWithParams = "/api/issues?id=" + userStatus.getValue("id");
        if (selectedValue !== "DELETE") {
            const data = { status: selectedValue }
            axios.put(urlWithParams, data)
                .then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                })
        } else {
            axios.delete(urlWithParams)
                .then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    return (
        <div className="self-center h-full d-flex">
            <Select name='assignedTo' onValueChange={handleIssueStatusChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={Object(status)[userStatus.getValue("status")]} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Bug State</SelectLabel>
                        {Object.entries(status).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                {value as React.ReactNode}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default DropDownMenu