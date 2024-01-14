import {
	Avatar as AvatarContainer,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";

interface IAvatarProps {
	src?: string;
	alt?: string;
	className?: string;
}

const Avatar = ({ src, alt, className }: IAvatarProps) => {
	return (
		<AvatarContainer className={className}>
			<AvatarImage
				src={
					src ||
					"https://gravatar.com/avatar/ac447fc970080acc58f3fad587cd61c7?s=400&d=mp&r=x"
				}
				alt={alt || "Avatar"}
			/>
			<AvatarFallback>{alt}</AvatarFallback>
		</AvatarContainer>
	);
};

export default Avatar;
