import { Button } from "antd";

const SecondaryBtn = ({ text, onClick, loading = false, disabled = false, type = "primary" }) => {
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
            className="w-full py-2 h-10 px-4 text-[0.95rem] mt-auto font-semibold rounded-3xl shadow-md"
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

export default SecondaryBtn;
