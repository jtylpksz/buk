'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@mantine/core';

const SubmitButton = ({
	defaultValue,
	valueInRequest,
	mt,
	fullWidth,
	dataCy,
}: {
	defaultValue: string;
	valueInRequest: string;
	mt?: string;
	fullWidth?: boolean;
	dataCy?: string
}) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			aria-disabled={pending}
			aria-busy={pending}
			mt={mt}
			fullWidth={fullWidth}
			data-cy={dataCy}
		>
			{pending ? valueInRequest : defaultValue}
		</Button>
	);
};

export default SubmitButton;
