import getDiscussionById from "@/actions/getDiscussionById";
import getRepliesByDiscussionId from "@/actions/getRepliesByDiscussionId";
import Avatar from "@/components/Avatar";
import ReplyCard from "@/components/replies/reply-card";
import { format } from "date-fns";

interface IParams {
	discussionId: string;
}

const DiscussionPage = async ({ params }: { params: IParams }) => {
	const discussion = await getDiscussionById(params);
	const replies = await getRepliesByDiscussionId(params);
	const publishDate = format(new Date(discussion?.createdAt!), "PP");

	console.log(replies);

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
				<p className='text-sm font-light text-zinc-600'>
					{discussion?.description}
				</p>
			</div>

			<div className='mt-4'>
				<h3>Replies:</h3>
				{/* {replies?.length === 0 && <Heading />} */}
				{/* {replies.map((reply: any) => (
					<ReplyCard reply={reply} />
				))} */}
			</div>
		</div>
	);
};

export default DiscussionPage;
