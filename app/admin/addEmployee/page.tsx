
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast";
import { PrismaClient } from '@prisma/client'

export default function AddEmployeePage() {
    const prisma = new PrismaClient()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const employee = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            position: formData.get('position') as string,
            startDate: new Date(formData.get('startDate') as string),
            department: formData.get('department') as string,
        }

        try {
            await prisma.employee.create({
                data: employee,
            })

            toast({
                title: "Success",
                description: "Employee added successfully",
            })
            router.push('/employees')
        } catch (error) {
            console.log('Failed to add employee:', error)
            toast({
                title: "Error",
                description: "Failed to add employee. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select name="position" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="software_engineer">Software Engineer</SelectItem>
                            <SelectItem value="senior_software_engineer">Senior Software Engineer</SelectItem>
                            <SelectItem value="tech_lead">Tech Lead</SelectItem>
                            <SelectItem value="project_manager">Project Manager</SelectItem>
                            <SelectItem value="business_analyst">Business Analyst</SelectItem>
                            <SelectItem value="ux_designer">UX Designer</SelectItem>
                            <SelectItem value="qa_engineer">QA Engineer</SelectItem>
                            <SelectItem value="devops_engineer">DevOps Engineer</SelectItem>
                            <SelectItem value="data_scientist">Data Scientist</SelectItem>
                            <SelectItem value="consultant">Consultant</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" name="startDate" type="date" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select name="department" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="qa">Quality Assurance</SelectItem>
                            <SelectItem value="data">Data</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Employee'}
                </Button>
            </form>
        </div>
    )
}