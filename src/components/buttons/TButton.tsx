// components/CustomButton.jsx

import React from 'react';

type CustomButtonProps = {
    text: string;
    onClick?: () => void;
    primaryColor?: string;
    accentColor?: string;
    className?: string;
    disabled?: boolean;
    type?: "submit" | "reset" | "button" | undefined
    htmlType?: string
};
const TButton: React.FC<CustomButtonProps> = ({
    text,
    onClick,
    className = '',
    disabled = false,
    type,
  
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            
            className={`w-full py-2 px-4 mt-auto max-w-[18rem] text-white font-semibold rounded-2xl shadow-md bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-dark transition-all ${className}`}
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
