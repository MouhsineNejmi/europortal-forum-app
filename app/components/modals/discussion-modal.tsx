import React from "react";
import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";

import Modal from "@/components/modals/modal";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

import { CreateDiscussion } from "@/schemas";
import { User } from "@prisma/client";

interface IDiscussionModalProps {
	currentUser?: User | null;
}

const DiscussionModal = ({ currentUser }: IDiscussionModalProps) => {
	const router = useRouter();
	const [error, setError] = React.useState<string>();
	const [success, setSuccess] = React.useState<string>();
	const [isLoading, setIsLoading] = React.useState<boolean>();

	const form = useForm<z.infer<typeof CreateDiscussion>>({
		resolver: zodResolver(CreateDiscussion),
		defaultValues: {
			heading: "",
			description: "",
		},
	});

	if (!currentUser) {
		return <Button onClick={() => router.push("/login")}>Login</Button>;
	}

	const onSubmit = (values: z.infer<typeof CreateDiscussion>) => {
		setIsLoading(true);

		axios
			.post("/api/discussions", values)
			.then((response) => {
				if (response.status === 201) {
					setIsLoading(false);
					setError("");
					setSuccess("Discussion Created Succesfully!");
					router.refresh();
				}
			})
			.catch((error: any) => {
				if (error.response) {
					setError(error.response.data.message);
				} else {
					setError("Something went wrong! Please try again.");
				}

				setSuccess("");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = (
		<Form {...form}>
			<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<FormField
						control={form.control}
						name='heading'
						render={({ field }) => (
							<FormItem>
								<FormLabel>TItle</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isLoading}
										placeholder='Title example'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										disabled={isLoading}
										placeholder='Description example'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormError message={error} />
				<FormSuccess message={success} />

				<Button disabled={isLoading} type='submit' className='w-full space-x-2'>
					{isLoading && <ReloadIcon className='animate-spin' />}
					Ask A Question
				</Button>
			</form>
		</Form>
	);

	return (
		<Modal
			triggerTitle='Ask A Question'
			title='Start New Discussion'
			description='Fill the form below to get you started'
			bodyContent={bodyContent}
			modalActionTitle='Create Discussion'
		/>
	);
};

export default DiscussionModal;
