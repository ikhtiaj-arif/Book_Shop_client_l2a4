// components/CustomButton.jsx

import React from 'react';

type CustomButtonProps = {
    text: string;
    onClick: () => void;
    primaryColor?: string;
    accentColor?: string;
    className?: string;
    disabled?: boolean
};
const TButton: React.FC<CustomButtonProps> = ({
    text,
    onClick,
    primaryColor = 'primary',
    accentColor = 'accent',
    className = '',
    disabled = false,

    ...props
}) => {
    return (
        <button
            onClick={onClick}
            className={`w-full py-2 px-4 mt-auto text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-${primaryColor} to-${accentColor} hover:from-${primaryColor}-dark hover:to-${primaryColor}-fade transition-all ${className}`}
            {...props}
            disabled={disabled}
        >
            {text}
        </button>

    );
};

{/* <button
onClick={onClick}
className={`w-full py-2 px-4 mt-auto text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-${primaryColor} to-${accentColor} hover:from-${primaryColor}-dark hover:to-${accentColor}-dark transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${className}`}
{...props}
>
{text}
</button> */}
export default TButton;
