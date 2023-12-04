'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@mantine/core';

const SubmitButton = ({
	defaultValue,
	valueInRequest,
}: {
	defaultValue: string;
	valueInRequest: string;
}) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			aria-disabled={pending}
			aria-busy={pending}
			mt="xl"
			fullWidth
			data-cy="submit"
		>
			{pending ? valueInRequest : defaultValue}
		</Button>
	);
};

export default SubmitButton;
