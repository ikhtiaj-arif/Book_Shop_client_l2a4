import { Form, Input } from "antd";

type TextareaProps = {

    name: string;
    label?: string;
    placeholder?: string;
    rules?: object;
};

const BSTextarea = ({ name, label, placeholder, rules }: TextareaProps) => {
    return (
        <Form.Item name={name} label={label} rules={rules}>
            < Input.TextArea rows={4}
                placeholder={placeholder}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none" />
        </Form.Item>
    );
};

export default BSTextarea;
