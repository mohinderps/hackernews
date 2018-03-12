import React from 'react';

const Button = ({children, className, onClick}) => (
	<button type="button"
		className={className}
		onClick={onClick}>
		{children}
	</button>
);


export default Button;