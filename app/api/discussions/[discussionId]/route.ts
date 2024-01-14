import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

import { isAdmin } from "@/middlewares/auth";

interface IParams {
	discussionId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	const { discussionId } = params;

	if (!discussionId) {
		throw new Error("Invalid ID");
	}

	if (!isAdmin(currentUser?.role)) {
		return NextResponse.json(
			{ message: "Only admin can perform this action!" },
			{ status: 403 }
		);
	}

	const discussion = await prisma.discussion.delete({
		where: {
			id: discussionId,
		},
	});

	return NextResponse.json(discussion, { status: 200 });
}
