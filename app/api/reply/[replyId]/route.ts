import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

import { isAdmin } from "@/middlewares/auth";

interface IParams {
	replyId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	const { replyId } = params;

	if (!replyId) {
		throw new Error("Invalid ID");
	}

	if (!isAdmin(currentUser?.role)) {
		return NextResponse.json(
			{ message: "Only admin can perform this action!" },
			{ status: 403 }
		);
	}

	const reply = await prisma.reply.delete({
		where: {
			id: replyId,
		},
	});

	return NextResponse.json(reply);
}
