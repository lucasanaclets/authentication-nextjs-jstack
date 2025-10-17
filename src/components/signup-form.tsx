import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignUpForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Cadastre-se</CardTitle>
        <CardDescription>
          Crie uma conta gratuita para utilizar a plataforma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                Nós usaremos para nos comunicar com você. Não compartilhamos seu
                e-mail com ninguem.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Deve possuir mais de 8 caractéres
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar senha
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Você deve confirmar sua senha</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Criar conta</Button>
                <Button variant="outline" type="button">
                  Criar conta com o Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Já tem uma conta? <a href="/signin">Acesse agora!</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
