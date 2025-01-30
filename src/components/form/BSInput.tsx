import { Form, Input } from "antd";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    rules?: object;
};

const BSInput = ({ type, name, label, placeholder, rules }: TInputProps) => {
    return (
        <Form.Item name={name} label={label} rules={rules}>
            <Input type={type}
                placeholder={placeholder}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none" />
        </Form.Item>
    );
};

export default BSInput;
