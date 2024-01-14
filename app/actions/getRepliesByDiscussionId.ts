import prisma from "@/lib/prismadb";

interface IParams {
	discussionId: string;
}

export default async function getRepliesByDiscussionId(params: IParams) {
	const { discussionId } = params;

	try {
		const replies = await prisma.reply.findMany({
			where: {
				discussionId,
			},
			include: {
				user: true,
			},
		});

		if (!replies) {
			return null;
		}

		return replies;
	} catch (error: any) {
		throw new Error(error);
	}
}
