/*
 * Created on Sat Jan 10 2026 01:22:09
 * File name : validation.util.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sat Jan 10 2026 01:22:09
 * 2026 Ankur Gangwar
 */


class ValidationError extends Error {

    private statusCode: number | 400;

    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

const validate = (payload:any, rules: any) => {
    for (const field in rules) {
        
        const { required, regex, message } = rules[field];
        const value = payload[field];

        // required check
        if (required && (!value || value.toString().trim() === '')) {
            throw new ValidationError(
                message || `${field} is required`
            );
        }

        // regex check
        if (regex && value) {
            if (!regex.test(value.toString())) {
                throw new ValidationError(
                    message || `${field} format is invalid`
                );
            }
        }
    }
};


export default validate;