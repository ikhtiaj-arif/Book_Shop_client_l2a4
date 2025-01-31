import { Button } from "antd";

interface CustomButtonLoginProps {
    isLogin: boolean;
}

const CustomButtonLogin: React.FC<CustomButtonLoginProps> = ({ isLogin }) => {
    return (
        <Button
            htmlType="submit"
            type="primary"
            style={{
                background: 'linear-gradient(to right, #5ab1b6, #44cad2)', // Example gradient colors
                borderColor: 'transparent',
                color: 'white',
                transition: 'background 0.3s ease',
            }}
            className="w-full h-10 px-4 text-[0.95rem] mt-auto font-semibold rounded-3xl shadow-md"
            onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #44cad2, #5ab1b6)'; // Reverse gradient on hover
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #5ab1b6, #44cad2)';
            }}
        >
            {isLogin ? 'Login' : 'Register'}
        </Button>
    );
};

export default CustomButtonLogin;