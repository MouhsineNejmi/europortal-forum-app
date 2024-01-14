"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Reply, User } from "@prisma/client";
import { formatDistance } from "date-fns";

import Avatar from "@/components/avatar";
import DeleteButton from "@/components/admin/delete-button";
import toast from "react-hot-toast";

interface IReplyCardProps {
	reply: Reply;
	user: User;
	userRole?: string;
}

const ReplyCard = ({ reply, user, userRole }: IReplyCardProps) => {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState<boolean>();

	const publishDate = formatDistance(reply.createdAt, new Date(), {
		addSuffix: true,
	});

	const deleteReply = () => {
		setIsDeleting(true);

		axios
			.delete(`/api/reply/${reply.id}`)
			.then((response) => {
				if (response.status === 200) {
					toast.success("Reply Deleted Successfully!");
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
		<div className='border rounded-sm p-2 text-sm'>
			<div className='relative flex items-center gap-x-2'>
				<Avatar src={user.image as string} alt={user.username} />
				<div>
					<p className='font-medium'>{user.username}</p>
					<p className='text-xs text-zinc-500'>{publishDate}</p>
				</div>

				<DeleteButton
					userRole={userRole}
					onDelete={deleteReply}
					disabled={isDeleting}
					className='absolute right-4'
				/>
			</div>

			<div className='pt-3 space-y-1'>
				<p className='font-normal'>{reply.message}</p>
			</div>
		</div>
	);
};

export default ReplyCard;
