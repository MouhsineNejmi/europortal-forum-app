import prisma from "@/lib/prismadb";

export default async function getAllDiscussions() {
	try {
		const discussions = await prisma.discussion.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				user: true,
			},
		});

		return discussions;
	} catch (error: any) {
		throw new Error(error);
	}
}
