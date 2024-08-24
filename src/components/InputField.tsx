import { FormControl, FormLabel, Input, FormErrorMessage, Textarea, chakra } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { HtmlHTMLAttributes, HTMLInputTypeAttribute } from 'react';

interface InputFieldProps extends HtmlHTMLAttributes<HTMLElement>{
    name: string;
    label: string;
    type: HTMLInputTypeAttribute;
    textarea?: boolean
}

const InputField: React.FC<InputFieldProps> = (props) => {
    const [field, meta] = useField(props);
    let Component = Input;
    if (props.textarea)
        Component = Textarea;
    return (
        <FormControl isInvalid={!!meta.error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Component {...field} id={field.name} {...props}/>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
}

export default chakra(InputField);