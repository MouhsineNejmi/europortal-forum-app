"use client";

import React from "react";
import { User } from "@prisma/client";

import ModeToggle from "@/components/mode-toggle";
import DiscussionModal from "@/components/modals/discussion-modal";
import UserMenu from "@/components/navbar/user-menu";
import Link from "next/link";

interface INavbarProps {
	currentUser?: User | null;
}

const Navbar = ({ currentUser }: INavbarProps) => {
	return (
		<nav className='flex items-center justify-between h-20 container'>
			<Link href='/' className='font-bold text-md'>
				Europortal Forum
			</Link>

			<div className='flex items-center gap-2'>
				<DiscussionModal />
				<UserMenu currentUser={currentUser} />
				<ModeToggle />
			</div>
		</nav>
	);
};

export default Navbar;
