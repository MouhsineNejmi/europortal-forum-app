import getAllDiscussions from "./actions/getAllDiscussions";
import Heading from "./components/Heading";
import DiscussionCard from "./components/discussion/discussion-card";

export default async function Home() {
	const discussions = await getAllDiscussions();

	if (discussions.length === 0) {
		return (
			<Heading
				title='No discussions found!'
				subtitle='Start a new discussion.'
			/>
		);
	}

	return (
		<div className='container'>
			<h1 className='font-semibold text-lg'>Discussions:</h1>
			<div className='space-y-4 mt-3'>
				{discussions.map((discussion: any) => (
					<DiscussionCard
						key={discussion.id}
						discussion={discussion}
						author={discussion.user}
					/>
				))}
			</div>
		</div>
	);
}
