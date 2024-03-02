import React from 'react'

// Components
import IssueForm from '@/components/issue/form';


const CreateIssue = () => {
    
    return (
        <div className='container w-full md:w-1/2'>
            <h2 className="text-xl border-b border-gray-900/10 pb-3 font-semibold leading-7 subpixel-antialiased">Create Issue</h2>
            <IssueForm />
        </div>
    )
}

export default CreateIssue