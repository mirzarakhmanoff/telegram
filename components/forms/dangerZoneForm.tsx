import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { confirmTextSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { generateToken } from "@/lib/generate.token";
import { signOut, useSession } from "next-auth/react";
import { axiosClient } from "@/http/axios";

const DangerZoneForm = () => {
  const form = useForm<z.infer<typeof confirmTextSchema>>({
    resolver: zodResolver(confirmTextSchema),
    defaultValues: { confirmText: "" },
  });
  const { data: session } = useSession();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const token = await generateToken(session?.currentUser?._id);
      const { data } = await axiosClient.delete("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess() {
      signOut();
    },
  });

  const onSubmit = () => {
    mutate();
  };
  return (
    <>
      <p className="text-xs text-muted-foreground text-center text-white">
        Are you sure you want delete your account? This action cannot be undone
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="mt-2 w-full font-spaceGrotesk font-bold"
            variant={"destructive"}
          >
            Delete permantily
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="confirmText"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>
                      Please type <span className="font-bold">DELETE</span> to
                      confirm.
                    </FormDescription>
                    <FormControl>
                      <Input
                        className="bg-secondary"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} className="w-full font-bold">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DangerZoneForm;
