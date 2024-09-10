import { deleteBoard } from "@/actions/delete-Board";
import { Button } from "@/components/ui/button";

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
      <Button type="submit" variant="destructive" size="sm">
        Delete
      </Button>
    </form>
  );
};
