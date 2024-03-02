'use client';
import React from 'react'

// Dependencies
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"

const BackButton = () => {
    const router = useRouter();
    // Function to go to the previous page
    const goBack = () => {
        router.back();
    };
    return (
        <div className='w-full text-center py-5'>
            <Button type="button" onClick={goBack} variant="outline">
                Back
            </Button>
        </div>
    )
}

export default BackButton

