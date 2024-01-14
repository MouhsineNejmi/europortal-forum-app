"use client";

import * as z from "zod";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { LoginSchema } from "@/schemas";
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
import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { ReloadIcon } from "@radix-ui/react-icons";

const LoginForm = () => {
	const router = useRouter();
	const [error, setError] = React.useState<string>();
	const [success, setSuccess] = React.useState<string>();
	const [isLoading, setIsLoading] = React.useState<boolean>();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setIsLoading(true);

		signIn("credentials", {
			...values,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				setError("");
				setSuccess("Logged In Successfully!");
				router.refresh();
			}

			if (callback?.error) {
				setSuccess("");
				setError(callback.error);
			}
		});
	};

	return (
		<CardWrapper
			headerLabel='Welcome Back'
			backButtonLabel="Doesn't have an account?"
			backButtonHref='/register'
		>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isLoading}
											type='email'
											placeholder='john.doe@example.com'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isLoading}
											type='password'
											placeholder='******'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormError message={error} />
					<FormSuccess message={success} />

					<Button disabled={isLoading} type='submit' className='w-full'>
						{isLoading && <ReloadIcon className='animate-spin' />}
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default LoginForm;
