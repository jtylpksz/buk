'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@mantine/core';

const SubmitButton = ({
	defaultValue,
	valueInRequest,
	...props
}: {
	defaultValue: string;
	valueInRequest: string;
	props: any;
}) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			aria-disabled={pending}
			aria-busy={pending}
			{...props}
		>
			{pending ? valueInRequest : defaultValue}
		</Button>
	);
};

export default SubmitButton;
