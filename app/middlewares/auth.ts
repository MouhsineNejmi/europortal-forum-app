import { User } from "@prisma/client";

export function isAdmin(userRole?: string) {
	return userRole === "admin";
}
