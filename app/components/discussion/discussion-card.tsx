"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Discussion, User } from "@prisma/client";

import Avatar from "@/components/avatar";
import DeleteButton from "../admin/delete-button";
import { sliceText } from "@/helpers/sliceText";

interface IDiscussionCardProps {
	discussion: Discussion;
	author: User;
	userRole?: string;
}

const DiscussionCard = ({
	discussion,
	author,
	userRole,
}: IDiscussionCardProps) => {
	const router = useRouter();
	const publishDate = format(new Date(discussion.createdAt), "PP");
	const [isDeleting, setIsDeleting] = useState<boolean>();

	const deleteDiscussion = () => {
		setIsDeleting(true);

		axios
			.delete(`/api/discussions/${discussion.id}`)
			.then((response) => {
				if (response.status === 200) {
					toast.success("Discussion Deleted Successfully!");
					router.refresh();
				}
			})
			.catch((error: any) => {
				if (error.response) {
					toast.error(error.response.data.message);
				} else {
					toast.error("Something went wrong! Please try again.");
				}
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};

	return (
		<div
			className='relative p-4 border rounded-md cursor-pointer'
			onClick={() => router.push(`/discussion/${discussion.id}`)}
		>
			<div className='pb-3 space-y-1'>
				<h2 className='font-bold'>{discussion.heading}</h2>
				<p className='text-sm font-light text-zinc-600'>
					{sliceText(discussion.description)}
				</p>
			</div>

			<div className='flex relative items-center gap-x-2 mt-2 text-sm'>
				<Avatar src={author.image as string} alt={author.username} />
				<div>
					<p className='font-medium'>{author.username}</p>
					<p className='text-xs text-zinc-500'>{publishDate}</p>
				</div>
				<DeleteButton
					userRole={userRole}
					disabled={isDeleting}
					onDelete={deleteDiscussion}
					className='absolute right-4'
				/>
			</div>
		</div>
	);
};

export default DiscussionCard;
