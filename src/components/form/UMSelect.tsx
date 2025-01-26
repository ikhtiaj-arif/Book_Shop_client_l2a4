import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type UMSelectProps = {
    label: string
    name: string
    options: { value: string, label: string, disabled?: boolean }[] | undefined;
    disabled?:boolean
}

const UMSelect = ({ name, label, options, disabled }: UMSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item >
                    {label && <label style={{ marginBottom: '4px', fontSize: '14px', fontWeight: '500' }} htmlFor={label}>{label}:</label >}
                    <Select
                        style={{ width: '100%' }}
                        {...field}
                        options={options}
                        disabled={disabled}
                    />
                    {error && <small style={{ color: "red" }}>{error.message}</small>}
                </Form.Item>
            )}
        />

    );
};

export default UMSelect;