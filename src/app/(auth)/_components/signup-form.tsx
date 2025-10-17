"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { tuple } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z
  .object({
    fullname: z.string().min(1, "Informe o seu nome completo"),
    email: z.email("Informe um e-mail válido"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirm_password: z.string().min(8, "Confirme a senha"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirm_password"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

export function SignUpForm({ ...props }: React.ComponentProps<typeof Card>) {
  const route = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      setIsLoading(true);

      await axios.post("/api/auth/sign-up", formData);

      toast.success("Conta cadastrada com sucesso!", {
        description: (
          <span className="text-gray-700 dark:text-gray-200">
            Faça login agora mesmo
          </span>
        ),
      });

      route.push("/signin");
    } catch {
      toast.error("Erro ao criar a sua conta!", {
        description: (
          <span className="text-gray-700 dark:text-gray-200">
            Corrija as informações e tente novamente
          </span>
        ),
      });
      setIsLoading(false);
    }
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Cadastre-se</CardTitle>
        <CardDescription>
          Crie uma conta gratuita para utilizar a plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Form {...form}>
            <FieldGroup>
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Será usado para nos comunicarmos com você. Não
                      compartilhamos seu e-mail com ninguem.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={isLoading}>
                    {!isLoading && "Criar conta"}
                    {isLoading && "Criando sua conta"}
                  </Button>
                  <Button variant="outline" type="button">
                    Criar conta com o Google
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Já tem uma conta? <a href="/signin">Acesse agora!</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </Form>
        </form>
      </CardContent>
    </Card>
  );
}
