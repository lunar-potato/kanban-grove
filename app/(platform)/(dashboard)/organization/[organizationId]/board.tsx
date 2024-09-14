import { deleteBoard } from "@/actions/delete-Board";
import { FormDelete } from "./form-delete";

interface boardProps {
  title: string;
  id: string;
}

export const Board = ({
    title, 
    id 
}: boardProps) => {
    const deleteBoardWithId = deleteBoard.bind(null, id);
    
  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p>Board title: {title}</p>
      <FormDelete/>
    </form>
  );
};
