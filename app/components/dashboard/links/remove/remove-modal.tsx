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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/app/rpc/orpc";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { isDefinedError } from "@orpc/client";

export default function RemoveModal() {
  const { open, linkId, closeModal } = useConfirmDeleteModal();
  const [isLoading, startRemove] = useTransition();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    orpc.url.remove.mutationOptions({
      onError: async (error) => {
        closeModal();
        toast.error("Ocorreu um erro ao remover URL", {
          description: error.message,
        });
      },
      onSuccess: async () => {
        closeModal();
        await queryClient.refetchQueries({
          queryKey: orpc.url.getById.infiniteKey({
            initialPageParam: undefined,
            input: (pageParam: any) => ({
              limit: 10,
              cursor: pageParam,
            }),
          }),
        });
        toast.success("URL removida com sucesso");
      },
    }),
  );
  const removeURL = () =>
    startRemove(async () => {
      if (linkId != null)
        await mutateAsync({
          id: linkId,
        });
    });
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
          <Button
            variant="destructive"
            size={"lg"}
            aria-disabled={isLoading}
            disabled={isLoading}
            onClick={removeURL}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Remover"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
