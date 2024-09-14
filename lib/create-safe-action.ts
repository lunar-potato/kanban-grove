import { z } from "zod";

// Defining a type for validation errors field in a form or input
//* 'K' represents property from 'T' input, and its value is an array of error messages
export type FieldErrors<T> = {
    [K in keyof T]?: string[];
};

// Defining a type to represent the possible states of action
export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>; // field-level validation errors
    error?: string | null; // general error message
    data?: TOutput; // result of the action (if successful)
}

// function with two arguments
export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>, // zod schema which validates the input 'TInput'
    handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>> // Function that processes validated input and returns a Promise of the action state
) => {

    // Returning async function which accepts the input data and returns an ActionState
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        // Validating input data using schema 'safeParse'
        const validationResult = schema.safeParse(data); // returns object containning 'success' and either 'data' or 'error'
        // if validation fails, returning the filed-level errors from the validation result
        if (!validationResult.success) {
            return {
                fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
            };
        }

        // if validation succeeds, passing validated data to handler for futher processing.
        return handler(validationResult.data);
    }
}