"use client";

import * as React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import BackButton from "./back-button";

interface ICardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
}

const CardWrapper = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
}: ICardWrapperProps) => {
	return (
		<Card className='w-[400px] border-none shadow-none'>
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};

export default CardWrapper;
