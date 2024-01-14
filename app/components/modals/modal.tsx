import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface IModalProps {
	triggerTitle: string;
	title: string;
	description: string;
	bodyContent: React.ReactNode;
	modalActionTitle: string;
	onAction?: () => void;
}

const Modal = ({
	triggerTitle,
	title,
	description,
	bodyContent,
	modalActionTitle,
	onAction,
}: IModalProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>{triggerTitle}</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div>{bodyContent}</div>
				{onAction && (
					<DialogFooter>
						<Button onClick={onAction}>{modalActionTitle}</Button>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
