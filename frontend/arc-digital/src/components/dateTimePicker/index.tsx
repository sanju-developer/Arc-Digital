import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface DateTimePickerValueProps {
    value: Dayjs | null;
    setValue: (nweVal: Dayjs | null) => void
}
export default function DateTimePickerValue(props: DateTimePickerValueProps) {
    const { value, setValue } = props

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                <DateTimePicker
                    label="Controlled picker"
                    value={value}
                    onChange={(newValue: Dayjs | null) => setValue(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
