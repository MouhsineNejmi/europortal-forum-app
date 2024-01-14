import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

interface IHeaderProps {
	label: string;
}

const Header = ({ label }: IHeaderProps) => {
	return (
		<div className='w-full flex flex-col gap-y-4 items-center'>
			<h1 className={cn("text-lg font-semibold", font.className)}>
				Europortal Forum
			</h1>
			<p className='text-muted-foreground text-sm'>{label}</p>
		</div>
	);
};

export default Header;
