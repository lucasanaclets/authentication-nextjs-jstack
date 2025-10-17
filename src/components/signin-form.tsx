"use client";

import { cn } from "@/lib/utils";
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

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const schema = z.object({
  email: z.email("Informe um e-mail válido"),
  password: z.string().min(1, "Informe a senha"),
});

type FormData = z.infer<typeof schema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Acesse a sua conta</CardTitle>
          <CardDescription>
            Faça login para continuar usando a plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Form {...form}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Senha</FormLabel>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Esqueceu sua senha?
                        </a>
                      </div>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Field>
                  <Button type="submit">Entrar</Button>
                  <Button variant="outline" type="button">
                    Entrar com o Google
                  </Button>
                  <FieldDescription className="text-center">
                    Não tem uma conta? <a href="/signup">Cadastre-se!</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </Form>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
