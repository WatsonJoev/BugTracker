import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(
    z.object({ value: z.string(), label: z.string(), disabled: z.boolean() })
  ),
});

const updateIssueSchema = z.object({
  status: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(
    z.object({ value: z.string(), label: z.string(), disabled: z.boolean() })
  ).optional(),
});

const getIDFromParams = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const param = Number(searchParams.get("id"));
  return param;
};

export async function POST(request: NextRequest) {
  let body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  let orgID = await prisma.profile.findUniqueOrThrow({
    where: {
      id: body.Owner.connect.id
    }
  }).then(user => user.orgId)
  
  body = {
    ...body,
    org: {
      connect: {
        id: orgID
      }
    }
  }  

  const newIssue = await prisma.issue.create({
    data: body,
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const param = getIDFromParams(request);
  const body = await request.json();
  const validation = updateIssueSchema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const updatedIssue = await prisma.issue.update({
      where: {
        id: param,
      },
      data: body,
    });
    return NextResponse.json(updatedIssue, { status: 202 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 401 });
  }
}

export async function DELETE(request: NextRequest) {
  const param = getIDFromParams(request);

  if (param) {
    try {
      const deleteIssue = await prisma.issue.delete({
        where: {
          id: param,
        },
      });
      return NextResponse.json(deleteIssue, { status: 202 });
    } catch (error) {
      return NextResponse.json(error, { status: 401 });
    }
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const type = searchParams.get("type");

  let getIssues;

  if (type === "all") {
    getIssues = await prisma.issue.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } else if (type === "NotClosed") {
    getIssues = await prisma.issue.findMany({
      where: {
        NOT: {
          status: "CLOSE",
        },
      },
      orderBy: {
        id: "desc",
      },
    });
  } else {
    getIssues = await prisma.issue.findMany({
      skip: page > 1 ? page * 10 - 10 : 0,
      take: 10,
      orderBy: {
        id: "desc",
      },
    });
  }

  return NextResponse.json(getIssues, { status: 200 });
}
