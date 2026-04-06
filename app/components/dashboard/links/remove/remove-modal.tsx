import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useConfirmDeleteModal } from "./remove-store";
import { Button } from "@/app/components/ui/button";

export default function RemoveModal() {
  const { open, linkId, closeModal } = useConfirmDeleteModal();
  return (
    <Dialog open={open} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>
            Essa ação não poderá ser desfeta, o link será excluido
            permanentemente dos nossos bancos de dados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" size={"lg"}>
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
