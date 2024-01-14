import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
	const { message, discussionId } = await req.json();

	try {
		const currentUser = await getCurrentUser();
		console.log(currentUser);

		if (!currentUser) {
			return NextResponse.json(
				{ message: "You must be logged in to perform this action!" },
				{ status: 403 }
			);
		}

		if (!message) {
			return NextResponse.json(
				{ message: "Message is required." },
				{ status: 400 }
			);
		}

		const discussion = await prisma?.reply.create({
			data: {
				message,
				discussionId,
				userId: currentUser.id,
			},
		});

		return NextResponse.json(discussion, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{
				message:
					"Something went wrong while adding your reply! Please try again.",
			},
			{ status: 500 }
		);
	}
}
