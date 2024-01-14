import React from "react";

import RegisterForm from "@/components/auth/register-form";

const RegisterPage = () => {
	return (
		<div className='flex w-full'>
			<div className='md:hidden'>
				<div className='block w-full h-screen bg-gray-950 dark:hidden' />
				<div className='hidden w-full h-screen bg-gray-950 dark:block' />
			</div>
			<div className='container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<div className='relative h-full hidden flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
					<div className='absolute inset-0 bg-zinc-900' />
					<h4 className='relative z-20 flex items-center text-lg font-medium'>
						Forum App
					</h4>
				</div>

				<div className='lg:p-8 h-screen flex items-center justify-center'>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
