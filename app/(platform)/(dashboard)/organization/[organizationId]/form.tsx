"use client"; // Running on client side

import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

export const Form = () => {
  // destructured execute function and filed errors from hook
  // createBoard passed as an action to be executed
  // onSuccess and onError handleres are defined to deal with the result of the action
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "Success!"); // logging data if successful board creation
    },
    onError: (error) => {
      console.error(error); // Logging error if it fails
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    console.log({ title }); // just checking, debugging

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput label="Board Title" id="title" errors={fieldErrors} />
      </div>
      <FormSubmit>Save</FormSubmit>
    </form>
  );
};
