"use client";

import { FastForward, Loader, Loader2, Plus } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { FieldGroup } from "../../ui/field";
import { Input } from "../../ui/input";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { orpc } from "@/app/rpc/orpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const formSchema = z.object({
  url: z.string(),
});

export default function AddLinkModal() {
  const [isLoading, startAddUrl] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useMutation(
    orpc.url.add.mutationOptions({
      onError: (e) =>
        toast.error("Ocorreu um erro ao tentar encurtar URL.", {
          description: e.message,
        }),
      onSuccess: ({ ok }) =>
        ok && toast.success("URL encurtado com sucesso!") && setIsOpen(false),
    }),
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    startAddUrl(() => {
      const parser = z.url().safeParse("https://" + data.url);
      if (!parser.success)
        form.setError("url", {
          message: "Url inválida",
        });
      else {
        mutate({
          url: parser.data,
        });
      }
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogTrigger asChild>
        <Button size={"xl"}>
          <Plus color="white" className="size-7" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Encurtar link</DialogTitle>
          <DialogDescription>
            Insira o link que deseja encurtar
          </DialogDescription>
        </DialogHeader>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="url"
              control={form.control}
              render={({
                field: { onChange },
                field,
                fieldState,
                formState: { errors },
              }) => (
                <div className="space-y-2">
                  <span className="text-destructive">
                    {errors.url?.message}
                  </span>
                  <div className="relative">
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      type="text"
                      className="peer pl-15"
                    />
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-sm peer-disabled:opacity-50">
                      https://
                    </span>
                  </div>
                  <br />
                </div>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            {isLoading ? (
              <Button
                className="w-1/2 md:w-1/3 text-white bg-primary/80"
                type="button"
                disabled
              >
                <Loader2 className="animate-spin" />
              </Button>
            ) : (
              <Button
                className="w-1/2 md:w-1/3 text-white bg-primary/80"
                type="submit"
              >
                <FastForward />
                Encurtar
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
