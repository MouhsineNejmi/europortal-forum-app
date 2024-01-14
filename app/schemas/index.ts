import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

export const RegisterSchema = z.object({
	username: z
		.string({
			required_error: "Username is required",
		})
		.min(1, {
			message: "Username must be at least 1 character",
		}),
	email: z.string().email({
		message: "Email is required",
	}),
	password: z.string().min(6, {
		message: "Password must be 6 characters minimum",
	}),
	role: z.string(),
});

export const CreateDiscussion = z.object({
	heading: z.string().min(1, {
		message: "Heading is required",
	}),
	description: z.string().min(1, {
		message: "Description is required",
	}),
});
