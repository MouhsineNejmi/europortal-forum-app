import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface IDeleteButtonProps {
	onDelete: () => void;
	disabled?: boolean;
	userRole?: string;
	className?: string;
}

const DeleteButton = ({
	onDelete,
	userRole,
	disabled,
	className,
}: IDeleteButtonProps) => {
	return userRole === "admin" ? (
		<button
			disabled={disabled}
			onClick={onDelete}
			className={cn("text-red-500 p-2 rounded-lg", className)}
		>
			<TrashIcon className='w-4 h-4' />
		</button>
	) : null;
};

export default DeleteButton;
