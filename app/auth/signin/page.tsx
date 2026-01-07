"use client";

import { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { signIn } from "./action";
import { signInWithGoogle } from "./signInWIthGoogle";
import { APP_URL } from "@/app/config/constants";

import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const res = await signIn(formData);

      if (res?.error) {
        toast.error(res.error);
        setIsLoading(false);
        return;
      }

      if (res?.success) {
        toast.success("Signed in successfully");
        window.location.href = APP_URL;
      }
    } catch (error) {
      toast.error(`Sign in error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center text-sm">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-2 py-1"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              <Link href="/auth/signin/reset-password" className="text-blue-500 hover:underline">
                reset password?
              </Link>
            </div>

            <div className="flex flex-col gap-5 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <div className="h-px w-full bg-border" />
              <Button
                type="button"
                onClick={signInWithGoogle}
                variant="secondary"
                disabled={isLoading}
              >
                Continue with Google
              </Button>
              <p className="text-sm text-center pt-2">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-blue-500 hover:underline">
                  sign up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
