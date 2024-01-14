import React from "react";
import { Reply } from "@prisma/client";

import ReplyCard from "@/components/replies/reply-card";

interface IRepliesProps {
	replies: Reply[] | null;
	userRole?: string;
}

const RepliesList = ({ replies, userRole }: IRepliesProps) => {
	return (
		<div>
			<h1 className='font-bold text-lg mb-4'>Replies:</h1>
			{replies?.map((reply: any) => (
				<ReplyCard
					key={reply.id}
					reply={reply}
					userRole={userRole}
					user={reply.user}
				/>
			))}
		</div>
	);
};

export default RepliesList;
