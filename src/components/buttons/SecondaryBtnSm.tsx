import { Button, ButtonProps } from "antd";
interface CustomButtonProps extends ButtonProps {
    text: string;
}

const SecondaryBtnSM: React.FC<CustomButtonProps> = ({ text, onClick, loading = false, disabled = false, type = "primary" }) => {
    return (
        <Button
            htmlType="submit"
            type={type}
            style={{
                // background: 'linear-gradient(to right, #5ab1b6, #44cad2)',
                borderColor: '#44cad2',
                color: '#44cad2',

                transition: 'background 0.3s ease',
            }}
            className="py-1 h-6 px-4 text-[0.7rem] mt-auto font-medium rounded-lg shadow-md"
            // onMouseOver={(e) => {
            //     e.currentTarget.style.background = 'linear-gradient(to right, #44cad2, #5ab1b6)';
            // }}
            // onMouseOut={(e) => {
            //     e.currentTarget.style.background = 'linear-gradient(to right, #5ab1b6, #44cad2)';
            // }}
            onClick={onClick}
            loading={loading}
            disabled={disabled}
            block
        >
            {text}
        </Button>
    );
};

export default SecondaryBtnSM;
