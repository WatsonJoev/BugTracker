import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const createorgSchema = z.object({
    name : z.string().min(1),
    strength : z.string().min(1),
    username : z.string().min(1)
})


export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createorgSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    const neworg = await prisma.org.create({
        data: body
    })

    const addedOrgToProfile = await prisma.profile.update({
        where: {
            id: body.Owning.connect.id
        },
        data: {
            OrgID: {
                connect: {
                    id: neworg.id,
                },
            },
        }
    })

    return NextResponse.json(addedOrgToProfile, { status: 200 })
}


export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const profileId = String(searchParams.get("pro_id"));
    const uid = String(searchParams.get("uid"));

    const addedOrgToProfile = await prisma.profile.update({
        where: {
            id: profileId
        },
        data: {
            OrgID: {
                connect: {
                    id: uid,
                },
            },
        }
    })

    return NextResponse.json(addedOrgToProfile, { status: 201 })
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = String(searchParams.get("id"));

    let getorgs;

    getorgs = await prisma.org.findMany({
        where: {
            id: id,
        }
    })

    return NextResponse.json(getorgs, { status: 200 })
}