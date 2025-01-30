import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    rules?: object
};

const BSInputLogin = ({
    type,
    name,
    label,
    placeholder,
    

}: TInputProps) => {
    return (
        <div className="mb-4">
            {/* Label */}
            {label && (
                <label
                    htmlFor={name}
                    className="block text-text font-medium mb-1"
                >
                    {label}
                </label>
            )}

            {/* Input Field */}
            <Controller
                name={name}

                render={({ field }) => (
                    <Form.Item


                    >
                        <Input
                            // rules={rules}
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default BSInputLogin;
