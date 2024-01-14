import getAllDiscussions from "./actions/getAllDiscussions";
import getCurrentUser from "./actions/getCurrentUser";
import Heading from "./components/Heading";
import DiscussionCard from "./components/discussion/discussion-card";

export default async function Home() {
	const discussions = await getAllDiscussions();
	const currentUser = await getCurrentUser();

	if (discussions.length === 0) {
		return (
			<div className='container'>
				<Heading
					title='No discussions found!'
					subtitle='Start a new discussion.'
				/>
			</div>
		);
	}

	return (
		<div className='container'>
			<h1 className='font-semibold text-lg'>Latest Discussions:</h1>
			<div className='space-y-4 mt-3'>
				{discussions.map((discussion: any) => (
					<DiscussionCard
						key={discussion.id}
						discussion={discussion}
						author={discussion.user}
						userRole={currentUser?.role}
					/>
				))}
			</div>
		</div>
	);
}
