"use client";
import { Button } from "@/app/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import { orpc } from "@/app/rpc/orpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowRight,
  Eye,
  EyeClosed,
  Key,
  Loader,
} from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { redirect, useParams, useRouter } from "vinext/shims/navigation";
import z from "zod";

const formSchema = z.object({
  password: z
    .string()
    .min(3, "Mínimo de 3 caracteres")
    .max(12, "Máximo de 12 caracteres."),
});

export default function PasswordForm({ code }: { code: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  const router = useRouter();
  const { mutateAsync } = useMutation(
    orpc.url.check.mutationOptions({
      onSuccess: async (a) => {
        router.push(a.url);
      },
      onError: (e) => {
        form.setError("password", { message: e.message });
      },
    }),
  );
  const [isSee, setSee] = useState(false);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    await mutateAsync({
      password: data.password,
      code,
    });
  }

  return (
    <form id="form-password" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">
                Senha de acesso
              </FieldLabel>
              <InputGroup className="bg-background/50 h-12">
                <InputGroupInput
                  {...field}
                  id="form-rhf-demo-title"
                  type={isSee ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="Digitar senha..."
                  autoComplete="off"
                />
                <InputGroupAddon>
                  <Key />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => setSee((e) => !e)}
                  >
                    {isSee ? <Eye /> : <EyeClosed />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type="submit"
          className="h-12 text-white"
          disabled={form.formState.isSubmitting}
          aria-disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            <div className="flex items-center">
              <ArrowRight />
              Acessar link
            </div>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
