import prisma from "@/lib/prismadb";

interface IParams {
	discussionId?: string;
}

export default async function getDiscussionById(params: IParams) {
	const { discussionId } = params;

	try {
		const discussion = await prisma.discussion.findUnique({
			where: {
				id: discussionId,
			},
			include: {
				user: true,
			},
		});

		if (!discussion) {
			return null;
		}

		return discussion;
	} catch (error: any) {
		throw new Error(error);
	}
}
