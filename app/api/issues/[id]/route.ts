import authOptions from "@/app/auth/authOptios";
import { patchIssueSchema } from "@/app/createIssueSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    params: {
      id: string;
    };
  };
}



export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description, status } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      ...(assignedToUserId && { assignedToUserId }),
      ...(status && { status }),
    },
  });

  return NextResponse.json(updatedIssue);
}
