"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUp } from "./action";
import { Eye, EyeOff } from "lucide-react";
import { isValidEmail, isValidPassword } from "@/utils/validations";
import { signInWithGoogle } from "../signin/signInWIthGoogle";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .refine((val) => isValidEmail(val), "Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .refine(
        (val) => isValidPassword(val),
        "Password must be at least 8 characters long and contain letters and numbers"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const submissionData = new FormData();
      submissionData.append("name", data.name);
      submissionData.append("email", data.email);
      submissionData.append("password", data.password);
      submissionData.append("confirmPassword", data.confirmPassword);

      const res = await signUp(submissionData);

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Sign up successful");
      }
    } catch (error) {
      if (error instanceof Error && error.message === "NEXT_REDIRECT") {
        return;
      }
      toast.error(`Sign up error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Smith" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.smith@example.com" type="email" {...field} />
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
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-enter your password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-2 py-1"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="privacy"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-1"
              />
              <label htmlFor="privacy" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/legal#privacy" className="text-primary underline">
                  Privacy Policy
                </Link>{" "}
                and consent to the collection of my information for spam prevention.
              </label>
            </div>
            <div className="flex flex-col gap-5 pt-4">
              <Button type="submit" disabled={!agreed || isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
              <div className="h-px w-full bg-border" />
              <Button
                type="button"
                onClick={signInWithGoogle}
                variant="secondary"
                disabled={!agreed || isLoading}
              >
                Continue with Google
              </Button>
              <p className="text-sm text-center pt-2">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-blue-500 hover:underline">
                  sign in
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
