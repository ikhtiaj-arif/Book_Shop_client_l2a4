import { Button } from "antd";
import { ButtonProps } from "antd/es/button";

interface CustomButtonProps extends ButtonProps {
    text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    onClick,
    loading = false,
    disabled = false,
    type = "primary",
    ...props
}) => {
    return (
        <Button
            {...props}
            htmlType="submit"
            type={type}
            style={{
                background: "linear-gradient(to right, #5ab1b6, #44cad2)",
                borderColor: "transparent",
                color: "white",
                transition: "background 0.3s ease",
            }}
            className="w-full py-2 h-10 px-4 text-[0.95rem] mt-auto font-semibold rounded-3xl shadow-md"
            onMouseOver={(e) => {
                e.currentTarget.style.background = "linear-gradient(to right, #44cad2, #5ab1b6)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = "linear-gradient(to right, #5ab1b6, #44cad2)";
            }}
            onClick={onClick}
            loading={loading}
            disabled={disabled}
            block
        >
            {text}
        </Button>
    );
};

export default CustomButton;
