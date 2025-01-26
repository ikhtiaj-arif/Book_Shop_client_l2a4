import { DatePicker, Form } from 'antd';
import { Controller } from 'react-hook-form';

type TDatePickerProps = {

    name: string;
    label?: string
}

const UMDatePicker = ({ name, label }: TDatePickerProps) => {

    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ marginBottom: '4px', fontSize: '14px', fontWeight: '500' }} htmlFor={label}>{label}:</label >}
            <Controller
                name={name} render={({ field }) => (
                    <Form.Item>
                        <DatePicker {...field}  style={{ width: '100%' }} />
                    </Form.Item>
                )}
            />

        </div>
    );
};

export default UMDatePicker;