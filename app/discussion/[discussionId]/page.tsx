import { format } from "date-fns";

import getDiscussionById from "@/actions/getDiscussionById";
import getRepliesByDiscussionId from "@/actions/getRepliesByDiscussionId";

import Avatar from "@/components/avatar";
import Heading from "@/components/Heading";
import ReplyForm from "@/components/replies/reply-form";
import RepliesList from "@/components/replies/replies-list";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
	discussionId: string;
}

const DiscussionPage = async ({ params }: { params: IParams }) => {
	const currentUser = await getCurrentUser();
	const discussion = await getDiscussionById(params);
	const replies = await getRepliesByDiscussionId(params);
	const publishDate = format(new Date(discussion?.createdAt!), "PP");

	return (
		<div className='container'>
			<div className='flex items-center gap-x-2 text-sm'>
				<Avatar
					src={discussion?.user.image as string}
					alt={discussion?.user.username}
				/>
				<div>
					<p className='font-medium'>{discussion?.user.username}</p>
					<p className='text-xs text-zinc-500'>{publishDate}</p>
				</div>
			</div>

			<div className='pt-3 space-y-1'>
				<h2 className='font-bold'>{discussion?.heading}</h2>
				<p className='text-sm font-light'>{discussion?.description}</p>
			</div>

			<div className='my-12'>
				{replies?.length === 0 ? (
					<Heading
						title='No Replies Found!'
						subtitle='Be the first to reply.'
						center
					/>
				) : (
					<RepliesList userRole={currentUser?.role} replies={replies} />
				)}
			</div>

			<ReplyForm discussionId={discussion?.id} />
		</div>
	);
};

export default DiscussionPage;
