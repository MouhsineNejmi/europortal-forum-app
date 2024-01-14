"use client";

import React from "react";
import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";

import { AddReply } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";

interface IReplyFormProps {
	discussionId?: string;
}

const ReplyForm = ({ discussionId }: IReplyFormProps) => {
	const router = useRouter();
	const [error, setError] = React.useState<string>();
	const [success, setSuccess] = React.useState<string>();
	const [isLoading, setIsLoading] = React.useState<boolean>();

	const form = useForm<z.infer<typeof AddReply>>({
		resolver: zodResolver(AddReply),
		defaultValues: {
			message: "",
		},
	});

	const onSubmit = (values: z.infer<typeof AddReply>) => {
		setIsLoading(true);

		axios
			.post("/api/reply", { ...values, discussionId })
			.then((response) => {
				if (response.status === 201) {
					setIsLoading(false);
					setError("");
					setSuccess("Message Added Succesfully!");
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

	return (
		<Form {...form}>
			<form className='space-y-6 my-3' onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									{...field}
									disabled={isLoading}
									placeholder='Your reply'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormError message={error} />
				<FormSuccess message={success} />

				<Button disabled={isLoading} type='submit' className='w-full space-x-2'>
					{isLoading && <ReloadIcon className='animate-spin' />}
					Reply
				</Button>
			</form>
		</Form>
	);
};

export default ReplyForm;
