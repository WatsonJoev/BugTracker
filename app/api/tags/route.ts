import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';

const createIssueTagsSchema = z.object({
    tagName: z.string().min(1).max(255),
})


const getIDFromParams = (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const param = Number(searchParams.get("id"));
    return param;
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueTagsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    console.log(body)

    let orgID = await prisma.profile
      .findUniqueOrThrow({
        where: {
          id: body.Owner.connect.id,
        },
      })
      .then((user) => user.orgId);

    const newIssueTags = await prisma.tags.create({
      data: {
          ...body,
          org: {
            connect:{
                id: orgID
            }
          }
      }
    });

    return NextResponse.json(newIssueTags, { status: 201 })

}

export async function DELETE(request: NextRequest) {
    const param = getIDFromParams(request)

    if (param) {
        try {
            const deleteIssueTags = await prisma.tags.delete({
                where: {
                    id: param
                }
            })
            return NextResponse.json(deleteIssueTags, { status: 202 })
        } catch (error) {
            return NextResponse.json(error, { status: 401 })
        }
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page"));
    const type = searchParams.get("type");

    let getIssueTagss;

    getIssueTagss = await prisma.tags.findMany({
        orderBy: {
            id: 'desc',
        }
    })

    return NextResponse.json(getIssueTagss, { status: 200 })
}