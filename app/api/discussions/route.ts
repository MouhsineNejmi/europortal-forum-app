import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
	const { heading, description } = await req.json();

	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) {
			return NextResponse.json(
				{ message: "You must be logged in to perform this action!" },
				{ status: 403 }
			);
		}

		if (!heading || !description) {
			return NextResponse.json(
				{ message: "Heading and description fields are required." },
				{ status: 400 }
			);
		}

		const discussion = await prisma.discussion.create({
			data: {
				heading,
				description,
				userId: currentUser.id,
			},
		});

		return NextResponse.json(discussion, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{
				message:
					"Something went wrong while creating your discussion! Please try again.",
			},
			{ status: 500 }
		);
	}
}
