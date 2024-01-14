"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";

import { RegisterSchema } from "@/schemas";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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

const RegisterForm = () => {
	const router = useRouter();
	const [error, setError] = useState<string>();
	const [success, setSuccess] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			role: "user",
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setIsLoading(true);

		axios
			.post("/api/register", values)
			.then((response) => {
				if (response.status === 201) {
					setIsLoading(false);
					setError("");
					setSuccess("User Created Succesfully!");
					router.push("/login");
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
		<CardWrapper
			headerLabel='New To Our Platform'
			backButtonLabel='Already have an account?'
			backButtonHref='/login'
		>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isLoading}
											placeholder='John Doe'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

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

						<FormField
							control={form.control}
							name='role'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<FormControl>
										<Select disabled={isLoading}>
											<SelectTrigger>
												<SelectValue placeholder={form.getValues("role")} />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='user'>User</SelectItem>
													<SelectItem value='admin'>Admin</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormError message={error} />
					<FormSuccess message={success} />

					<Button disabled={isLoading} type='submit' className='w-full gap-x-2'>
						{isLoading && <ReloadIcon className='animate-spin' />}
						Create Account
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default RegisterForm;
