import { useEffect, useState, type ComponentPropsWithRef } from "react";
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
import { resetPassword } from "~/api/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router";

export default function ResetPassword({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  const [isReset, setIsReset] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") as string;
  const exp = searchParams.get("exp");

  useEffect(() => {
    if (exp) {
      const expTime = parseInt(exp, 10);
      if (isNaN(expTime)) {
        setIsExpired(true);
      } else {
        setIsExpired(Date.now() > expTime);
      }
    }
  }, [exp]);

  const schema = z.object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  type ResetPasswordForm = z.infer<typeof schema>;

  const { register, reset, handleSubmit, formState } =
    useForm<ResetPasswordForm>({
      resolver: zodResolver(schema),
    });

  const { mutate: sendNewPassword, isPending } = useMutation({
    mutationFn: resetPassword,
    onError: (data: any) => {
      // Type properly later
      toast.error(data.data.message);
    },
    onSuccess: () => {
      setIsReset(true);
      reset();
      toast("Reset successfull.");
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    console.log({ ...data, code });
    return sendNewPassword({ ...data, verificationCode: code });
  };

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
              {!code || !exp
                ? "Invalid Link!"
                : !isReset && !isExpired && "Reset password"}
              {isExpired && "Link Expired"}
            </CardTitle>
            <CardDescription>
              {isReset
                ? "Password was reset successfully."
                : !isExpired && code && "Enter a new password below."}{" "}
              {isReset && (
                <Link to="/auth/login" className="underline">
                  Back to login.
                </Link>
              )}
              {(!code || !exp) && (
                <p>
                  Please try again.{" "}
                  <Link to="/auth/login" className="underline text-center">
                    Back to login.
                  </Link>
                </p>
              )}
              {isExpired && (
                <p>
                  Please{" "}
                  <Link
                    to="/auth/forgot-password"
                    className="underline text-center"
                  >
                    Request a new one.
                  </Link>
                </p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isReset && !isExpired && code && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Input
                      {...register("password")}
                      id="password"
                      type="password"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      {...register("confirmPassword")}
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <span className="flex items-center justify-center gap-4">
                        <Loader2 className="animate-spin" /> Loading...
                      </span>
                    ) : (
                      "Reset"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
