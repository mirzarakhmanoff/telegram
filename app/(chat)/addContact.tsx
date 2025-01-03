import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/hooks/use-loading";
import { emailSchema } from "@/lib/validation";
import { Label } from "@radix-ui/react-label";
import React, { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaTelegram } from "react-icons/fa";
import { z } from "zod";

interface Props {
  contactForm: UseFormReturn<z.infer<typeof emailSchema>>;
  onCreateContact: (values: z.infer<typeof emailSchema>) => void;
}

const AddContact: FC<Props> = ({ contactForm, onCreateContact }) => {
  const { isCreating } = useLoading();
  return (
    <div className="h-screen w-full flex relative z-40">
      <div className="flex justify-center items-center z-50 w-full">
        <div className="flex flex-col items-center gap-4">
          <FaTelegram size={120} className="dark:text-blue-400 text-blue-500" />
          <h1 className="text-3xl font-bold">Add contact to start messaging</h1>
          <Form {...contactForm}>
            <form
              onSubmit={contactForm.handleSubmit(onCreateContact)}
              className="space-y-2"
            >
              <FormField
                control={contactForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        className="bg-secondary"
                        disabled={isCreating}
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
                disabled={isCreating}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
