import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { emailSchema } from "@/lib/validation";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

const SignIn = () => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const { setEmail, setStep } = useAuth();

  function onSubmit(values: z.infer<typeof emailSchema>) {
    console.log(values);
    setStep("verify");
    setEmail(values.email);
  }

  return (
    <div className="w-full">
      <p className="text-center text-muted-foreground text-sm">
        Telegram is a messaging app with a focus on speed and security, it's
        super-fast, simple and free
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    className="bg-secondary"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"default"}
            className="bg-blue-500 w-full"
          >
            Submit
          </Button>{" "}
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
