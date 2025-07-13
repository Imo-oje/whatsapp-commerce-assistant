import { useState, type ComponentPropsWithRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { cn } from "~/lib/utils";
import { GalleryVerticalEnd, Loader2 } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { forgotPassword, type ForgotPassword } from "~/api/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link } from "react-router";

export default function ForgotPassword({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  const [isSent, setIsSent] = useState(false);
  const schema = z.object({
    email: z
      .string()
      .min(3, { message: "Email must be at least 3 characters" }),
  });

  const { register, reset, handleSubmit } = useForm<ForgotPassword>({
    resolver: zodResolver(schema),
  });

  const { mutate: sendResetEmail, isPending } = useMutation({
    mutationFn: forgotPassword,
    onError: (data: any) => {
      // Type properly later
      toast.error(data.data.message);
    },
    onSuccess: () => {
      setIsSent(true);
      reset();
      toast("Reset Instructions sent.");
    },
  });

  const onSubmit: SubmitHandler<ForgotPassword> = (data) =>
    sendResetEmail(data);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Link to="/" className="flex items-center gap-2 self-center font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Store Inc.
      </Link>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isSent ? "Check your Inbox" : "Reset Password"}
            </CardTitle>
            <CardDescription>
              {isSent
                ? "A password reset link was sent to the provided email address."
                : "Enter your email below to reset your password."}{" "}
              {isSent && (
                <Link to="/auth/login" className="underline">
                  Back to login
                </Link>
              )}
            </CardDescription>
            <CardContent>
              {!isSent && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <span className="flex items-center justify-center gap-4">
                          <Loader2 className="animate-spin" /> Loading...
                        </span>
                      ) : (
                        "Send reset link"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
