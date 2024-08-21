import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { HtmlHTMLAttributes, HTMLInputTypeAttribute } from 'react';

interface InputFieldProps extends HtmlHTMLAttributes<HTMLElement>{
    name: string;
    label: string;
    type: HTMLInputTypeAttribute;
}

const InputField: React.FC<InputFieldProps> = (props) => {
    
    const [field, meta] = useField(props);
    return (
        <FormControl isInvalid={!!meta.error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input {...field} id={field.name} {...props}/>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
}

export default InputField;