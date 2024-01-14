import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IUserMenuProps {
	currentUser?: User | null;
}

const UserMenu = ({ currentUser }: IUserMenuProps) => {
	const router = useRouter();

	const logout = async () => {
		await signOut();
		router.refresh();
	};

	return (
		<div className='flex items-center'>
			<DropdownMenu>
				<DropdownMenuTrigger>
					{currentUser ? (
						<Avatar className='w-8 h-8'>
							<AvatarImage
								src={currentUser.image as string}
								alt={currentUser.username}
							/>
							<AvatarFallback>{currentUser.username}</AvatarFallback>
						</Avatar>
					) : (
						<div className='flex gap-x-2 items-center'>
							<Avatar className='w-6 h-6'>
								<AvatarImage
									src='https://gravatar.com/avatar/ac447fc970080acc58f3fad587cd61c7?s=400&d=mp&r=x'
									alt=''
								/>
							</Avatar>
							<HamburgerMenuIcon />
						</div>
					)}
				</DropdownMenuTrigger>
				{currentUser ? (
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>My Discussions</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				) : (
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Link href='/login'>Login</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href='/register'>Register</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				)}
			</DropdownMenu>
		</div>
	);
};

export default UserMenu;
