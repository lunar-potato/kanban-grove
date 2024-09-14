import { useState, useCallback } from "react";
import { ActionState, FieldErrors } from "@/lib/create-safe-action";

//* Defining type for action which takes the input and returns a promise of the actionstate which contains the input and output
type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

// options for the useAction hook, optional callbacks but to see if the execution is a success, error, or completed i dont know
interface UseActionOptions<TOutput> {
    onSuccess?: (data:TOutput) => void;
    onError?: (data: string) => void;
    onComplete?: () => void;
};
 
// Custom hook that handles the action and managing its state
export const useAction = <TInput, TOutput> (
    action: Action<TInput, TOutput>, // action to be executed
    options: UseActionOptions<TOutput> = {} // callbacks
) => {
    // states to store field level validation errors, if any
    const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(
        undefined
    );

    // states to store any general error messages, data returned from action, if currently loading
    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<TOutput | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // execute function triggers the actions 
    // function with useCallback to rpevent unnecessary rerenders
    const execute = useCallback(
        async(input: TInput) => {
            setIsLoading(true); // setting loading state

            try {
                // awaiting result from action
                const result = await action(input);

                if (!result) {
                    return; // if no result, exit
                }

                if (result.fieldErrors) {
                    setFieldErrors(result.fieldErrors); // if there are field specific errors, it updates the 'fieldErrors'
                }

                if (result.error) { // if there is a general error, updates the error state and calling onError callback
                    setError(result.error);
                    options.onError?.(result.error) // executes the onError callback
                }

                if (result.data) { // if successful and returns data, updates the data state and calling the onSuccess callback
                    setData(result.data);
                    options.onSuccess?.(result.data); // executes the onSuccess callback
                }
            } finally {
                // after action is completed, reset loading state and call onComplete
                setIsLoading(false); 
                options.onComplete?.();
            }
        },
        [action, options] //* dependencies, recreating execute only if action or options change
    );

    return {
        execute,
        fieldErrors,
        error,
        data,
        isLoading,
    };
};