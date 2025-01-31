import { Form, Input, InputNumber } from "antd";

const { TextArea } = Input;

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    rules?: object[];
    min?: number;
};

const BSInput = ({ type, name, label, placeholder, rules, min }: TInputProps) => {
    return (
        <Form.Item name={name} label={label} rules={rules}>
            {type === "number" ? (
                <InputNumber
                    min={min}
                    placeholder={placeholder}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            ) : type === "textarea" ? (
                <TextArea
                    placeholder={placeholder}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                    rows={1}
                />
            ) : (
                <Input type={type} placeholder={placeholder} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none" />
            )}
        </Form.Item>
    );
};

export default BSInput;