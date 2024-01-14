"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Discussion, User } from "@prisma/client";

import Avatar from "@/components/Avatar";

interface IDiscussionCardProps {
	discussion: Discussion;
	author: User;
}

const DiscussionCard = ({ discussion, author }: IDiscussionCardProps) => {
	const router = useRouter();
	const publishDate = format(new Date(discussion.createdAt), "PP");

	return (
		<div
			className='p-4 border rounded-md cursor-pointer'
			onClick={() => router.push(`/discussion/${discussion.id}`)}
		>
			<div className='flex items-center gap-x-2 text-sm'>
				<Avatar src={author.image as string} alt={author.username} />
				<div>
					<p className='font-medium'>{author.username}</p>
					<p className='text-xs text-zinc-500'>{publishDate}</p>
				</div>
			</div>

			<div className='pt-3 space-y-1'>
				<h2 className='font-bold'>{discussion.heading}</h2>
				<p className='text-sm font-light text-zinc-600'>
					{discussion.description}
				</p>
			</div>
		</div>
	);
};

export default DiscussionCard;
