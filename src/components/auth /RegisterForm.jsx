"use client";

import { authClient } from "@/lib/auth-client";
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
import { FiLoader, FiUserPlus } from "react-icons/fi";

const RegisterForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const { email, name, image, password } = Object.fromEntries(
      formdata.entries(),
    );
    setIsPending(true);
    try {
      await authClient.signUp.email(
        { email, password, name, image, callbackURL: "/" },
        {
          onSuccess: () => {
            toast.success("Registration Successful");
            router.push("/login");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Registration Failed");
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
    <div className="relative min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg"
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
              Join the community. Train smarter. Transform faster.
            </p>
          </div>

          <Form className="grid grid-cols-1 gap-5" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                isRequired
                name="name"
                type="text"
                validate={(v) =>
                  !/^[a-zA-Z\s'-]{2,50}$/.test(v) ? "Invalid name" : null
                }
              >
                <Label className="text-sm font-semibold mb-1">Full Name</Label>
                <Input placeholder="Al Fahad" className="bg-field-background" />
                <FieldError className="text-danger text-xs mt-1" />
              </TextField>

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
                <Label className="text-sm font-semibold mb-1">Email</Label>
                <Input
                  placeholder="fahad@example.com"
                  className="bg-field-background"
                />
                <FieldError className="text-danger text-xs mt-1" />
              </TextField>
            </div>

            <TextField
              isRequired
              name="image"
              type="text"
              validate={(v) =>
                /\.(?:jpe?g|png|gif|svg|webp)$/i.test(v) ? "Invalid URL" : null
              }
            >
              <Label className="text-sm font-semibold mb-1">Photo URL</Label>
              <Input
                placeholder="https://image-link.com/photo.jpg"
                className="bg-field-background"
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              validate={(v) => {
                if (v.length < 8) return "Min 8 characters";
                if (!/[A-Z]/.test(v)) return "Need 1 uppercase";
                if (!/[0-9]/.test(v)) return "Need 1 number";
                return null;
              }}
            >
              <Label className="text-sm font-semibold mb-1">Password</Label>
              <Input placeholder="••••••••" className="bg-field-background" />
              <Description className="text-[10px] text-muted leading-tight">
                Min 8 chars, 1 uppercase, 1 number
              </Description>
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            <div className="flex flex-col gap-4 mt-2">
              <Button
                type="submit"
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
                isDisabled={isPending}
              >
                {isPending ? (
                  <FiLoader className="animate-spin text-xl" />
                ) : (
                  <div className="flex items-center gap-2">
                    <FiUserPlus size={20} />
                    <span>Create Account</span>
                  </div>
                )}
              </Button>

              <div className="flex items-center gap-3">
                <Separator className="flex-1 bg-separator" />
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">
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
            <div className="rounded-2xl bg-default-50 border border-default-100 p-4">
              <p className="text-sm font-semibold">
                🔥 Your strongest self starts today.
              </p>

              <p className="text-xs text-default-500 mt-1">
                Join Gymora and access classes, trainers, challenges, and a
                powerful fitness community.
              </p>
            </div>
            <p className="text-center text-sm text-muted">
              Already a Gymora member?{" "}
              <Link
                className="font-bold text-orange-500 hover:underline"
                href="/login"
              >
                Sign In
              </Link>
            </p>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
