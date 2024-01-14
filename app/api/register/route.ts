import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
	const { email, username, password, role } = await req.json();

	try {
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

		const userExists = await prisma.user.findFirst({
			where: {
				OR: [{ email }, { username }],
			},
		});

		if (userExists) {
			return NextResponse.json(
				{ message: "Username or email already taken!" },
				{ status: 400 }
			);
		}

		const user = await prisma.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
				role: role,
			},
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong! Please try again." },
			{ status: 500 }
		);
	}
}
