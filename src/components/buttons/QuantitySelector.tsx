import React from "react";

interface QuantitySelectorProps {
    quantity: number;
    maxQuantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onChange: (value: number) => void;
    className?: string

}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity, maxQuantity, onIncrease, onDecrease, onChange, className = 'w-20 h-8'
}) => {
    return (
        <div className={`flex items-center text-center mt-1 ${className}`}>
            {/* Decrease Button */}
            <button
                onClick={onDecrease}
                disabled={quantity <= 1}
                className="relative w-8 h-8 flex items-center justify-center text-text text-lg font-medium rounded-l-full border bg-gray-100 disabled:opacity-50"
            >
                <span className="absolute right-[6px] top-[-1px]">-</span>
            </button>

            {/* Input Field */}
            <input
                type="number"
                min={1}
                max={maxQuantity}
                value={quantity}
                className="w-8 text-center h-8 border text-text focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(e) => onChange(Number(e.target.value))}
            />

            {/* Increase Button */}
            <button
                onClick={onIncrease}
                disabled={quantity >= maxQuantity}
                className="w-8 h-8 relative flex items-center justify-center text-text text-lg font-medium rounded-r-full border bg-gray-100 disabled:opacity-50"
            >
                <span className="absolute right-[6px] top-[-1px]">+</span>
            </button>
        </div>
    );
};

export default QuantitySelector;
