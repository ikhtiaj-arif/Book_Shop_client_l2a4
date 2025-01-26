import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
    type: string;
    name: string;
    label?: string
}

const PHInput = ({ type, name, label }: TInputProps) => {

    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ marginBottom: '4px', fontSize: '14px', fontWeight: '500' }} htmlFor={label}>{label}:</label >}
            <Controller
                name={name} render={({ field }) => (
                    <Form.Item>
                        <Input {...field} type={type} id={name} />
                    </Form.Item>
                )}
            />

        </div>
    );
};

export default PHInput;