import { FieldError } from "../generated/graphql";

const toErrorMap = (errors: FieldError[]): Record<string, string> => {
    console.log(errors);
    const errorMap: Record<string, string> = {};
    errors.forEach(({field, message}: FieldError) => {
        errorMap[field] = message;
    });
    return errorMap;
}

export default toErrorMap;