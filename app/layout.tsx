import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { ThemeProvider } from "@/components/context/theme-provider";
import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Forum App",
	description: "Forum App Technical Challenge for europortals.de",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<Navbar currentUser={currentUser} />
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
