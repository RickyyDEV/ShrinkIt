"use client";

import {
  CalendarArrowDown,
  ChevronDownIcon,
  FastForward,
  KeyIcon,
  Link,
  Loader,
  Loader2,
  Plus,
} from "lucide-react";
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
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  url: z.url(),
  expiration: z.date().optional(),
  password: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(12, "Máximo de 12 caracteres.")
    .optional(),
});

export default function AddLinkModal() {
  const [isLoading, startAddUrl] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>();
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
      mutate(data);
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogTrigger asChild>
        <Button size={"xl"}>
          <Plus color="white" className="size-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Encurtar link</DialogTitle>
          <DialogDescription>
            Insira o link que deseja encurtar
          </DialogDescription>
        </DialogHeader>
        <form
          id="form-rhf-demo"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState, formState: { errors } }) => (
                <div className="w-full space-y-1">
                  <Label className="text-sm" htmlFor="url-input">
                    Website
                  </Label>
                  <div className="relative">
                    <Link className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="bg-background pl-9"
                      id="url-input"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://exemplo.com"
                      type="url"
                      {...field}
                    />
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Inclua https:// ou http://
                  </p>
                </div>
              )}
            />
          </FieldGroup>
          <div className="w-full">
            <div className="relative flex items-center gap-2">
              <Separator className="flex-1" />
              <span className="shrink-0 px-2 text-muted-foreground text-xs">
                Opções avançadas
              </span>
              <Separator className="flex-1" />
            </div>
          </div>
          <FieldGroup>
            <div className="container md:grid grid-cols-2 gap-5 w-full">
              <Controller
                name="expiration"
                control={form.control}
                render={({
                  field: { value },
                  fieldState,
                  formState: { errors },
                }) => (
                  <div className="w-full space-y-1">
                    <Label className="text-sm" htmlFor="calendar-input">
                      Data de expiração
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          aria-invalid={fieldState.invalid}
                          data-empty={!value}
                          className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground dark:bg-background "
                        >
                          <div className="flex items-center space-x-2">
                            <CalendarArrowDown />
                            {value ? (
                              <p>{format(value, "PPP")}</p>
                            ) : (
                              <p>Pick a date</p>
                            )}
                          </div>

                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          id="calendar-input"
                          mode="single"
                          selected={value}
                          onSelect={(e) => e && form.setValue("expiration", e)}
                          defaultMonth={value}
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-muted-foreground text-xs">Opcional</p>
                  </div>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState, formState: { errors } }) => (
                  <div className="w-full max-w-sm space-y-1">
                    <Label htmlFor="password-input" className="text-sm">
                      Senha
                    </Label>
                    <div className="relative">
                      <KeyIcon className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="bg-background pl-9"
                        id="password-input"
                        placeholder="Senha"
                        type="password"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                    </div>
                    {errors.password && (
                      <span className="text-destructive">
                        {errors.password.message}
                      </span>
                    )}
                    {!errors.password && (
                      <p className="text-muted-foreground text-xs">Opcional</p>
                    )}
                  </div>
                )}
              />
            </div>
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
