import React, {
	forwardRef,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react';
import './input.styles.css';

type InputProps = {
	label?: string;
	id: string;
	type?: string;
	labelClass?: string;
} & InputHTMLAttributes<HTMLInputElement> &
	TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	InputProps
>(({ id, label, type, labelClass, ...props }, ref) => {
	const InputElement = type === 'textarea' ? 'textarea' : 'input';

	return (
		<p>
			{label && (
				<label className={labelClass} htmlFor={id}>
					{label}
				</label>
			)}
			{React.createElement(InputElement, {
				ref: ref as React.Ref<HTMLInputElement & HTMLTextAreaElement>,
				type: type || 'text',
				id,
				name: id,
				...props,
			})}
		</p>
	);
});
