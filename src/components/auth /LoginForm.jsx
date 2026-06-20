"use client";

import { authClient } from "@/lib/auth /auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaDumbbell } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { HiOutlineLogin } from "react-icons/hi";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const { email, password } = Object.fromEntries(formdata.entries());
    setIsPending(true);
    try {
      await authClient.signIn.email(
        { email, password, callbackURL: "/" },
        {
          onSuccess: () => {
            toast.success("Login Successful");
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Login Failed");
          },
        },
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogle = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Login successful with Google");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Login failed.");
        },
      },
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background text-foreground px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md "
      >
        <div
          className="
relative
bg-background/80
backdrop-blur-xl
p-8
rounded-3xl
border border-white/10
shadow-2xl
shadow-orange-500/10
overflow-hidden
"
        >
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 12,
              }}
              className="
      inline-flex items-center justify-center
      w-16 h-16 rounded-2xl
      bg-gradient-to-br
      from-blue-600
      via-violet-600
      to-orange-500
      text-white
      shadow-xl
      shadow-orange-500/20
      mb-4
    "
            >
              <FaDumbbell size={30} />
            </motion.div>

            <h3 className="text-3xl font-black">
              <span className="text-blue-600">GYM</span>
              <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                ORA
              </span>
            </h3>

            <p className="text-default-500 text-sm mt-3">
              Sign in and continue your fitness journey.
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-default-50 border border-default-100 p-4">
            <p className="text-sm font-semibold">
              💪 Every workout brings you closer to your goal.
            </p>

            <p className="text-xs text-default-500 mt-1">
              Join thousands of members training smarter with Gymora.
            </p>
          </div>

          <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
            {/* Email Field */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(v) =>
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v)
                  ? "Invalid email"
                  : null
              }
            >
              <Label className="text-sm font-semibold mb-1 block">
                Email Address
              </Label>
              <Input
                placeholder="fahad@example.com"
                className="bg-field-background text-field-foreground border-field-border focus:ring-2 ring-focus"
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            {/* Password Field */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(v) => (v.length < 8 ? "Too short" : null)}
            >
              <Label className="text-sm font-semibold mb-1 block">
                Password
              </Label>
              <Input
                placeholder="••••••••"
                className="bg-field-background text-field-foreground"
              />
              <Description className="text-[10px] text-muted leading-relaxed">
                8+ characters, 1 uppercase, 1 number
              </Description>
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full h-12 bg-accent text-accent-foreground font-bold rounded-[var(--radius)] shadow-md hover:opacity-90 transition-all"
                isDisabled={isPending}
              >
                {isPending ? (
                  <FiLoader className="animate-spin text-xl" />
                ) : (
                  <div className="flex items-center gap-2">
                    <HiOutlineLogin size={20} />
                    <span>Log In</span>
                  </div>
                )}
              </Button>

              <div className="flex items-center gap-3">
                <Separator className="flex-1 bg-separator" />
                <span className="text-[10px] font-black text-muted uppercase tracking-tighter">
                  OR
                </span>
                <Separator className="flex-1 bg-separator" />
              </div>

              <Button
                onClick={handleGoogle}
                type="button"
                variant="bordered"
                className="
w-full h-12
bg-gradient-to-r
from-blue-600
to-orange-500
text-white
font-bold
rounded-xl
shadow-lg
shadow-orange-500/20
hover:scale-[1.02]
transition-all
duration-300
"
              >
                <FaGoogle
                  className="
w-full h-12
border
border-default-200
hover:bg-default-100
font-semibold
rounded-xl
"
                />
              </Button>
            </div>

            {/* Footer Link */}
            <p className="text-center text-sm text-muted mt-2">
              Ready to transform your body?{" "}
              <Link
                className="font-bold text-link hover:underline underline-offset-4"
                href={"/register"}
              >
                Join Gymora
              </Link>
            </p>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
