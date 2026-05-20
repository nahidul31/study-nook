"use client";
import { ArrowRight } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import Image from "next/image";
import Link from "next/link";
import { Icon, InlineIcon } from "@iconify/react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "react-toastify";

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    // const { data, error } = await authClient.signIn.email({
    //   email: userData.email, // required
    //   password: userData.password, // required
    //   callbackURL: "/",
    // });
    // if (error) {
    //   toast.error(error.message);
    // }
    // if (data) {
    //   toast.success("Log In Successfully!");
    //   e.currentTarget.reset();
    // }
  };
  // with google-------------
  const handleGoogleLogin = async () => {
    // const { data, error } = await authClient.signIn.social({
    //   provider: "google",
    //   callbackURL: "/",
    // });
    // if (error) {
    //   toast.error(error.message);
    // }
  };
  // with github------------
  const handleGithubLogin = async () => {
    // const { data, error } = await authClient.signIn.social({
    //   provider: "github",
    //   callbackURL: "/",
    // });
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left — Form */}
      <div className="flex-1 flex justify-center items-center p-6 sm:p-10 bg-teal-50 order-2 lg:order-1">
        <Form
          className="flex w-full max-w-md flex-col gap-4 bg-white border border-orange-100 p-6 sm:p-10 rounded-2xl shadow-sm"
          onSubmit={onSubmit}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-sky-800">
              StudyNook
            </span>
          </div>

          {/* Title */}
          <div className="mb-1">
            <h1 className="text-2xl font-bold text-orange-950">Welcome Back</h1>
            <p className="text-xs text-teal-800 opacity-70 mt-1">
              Sign in to your account to continue
            </p>
          </div>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                return "Please enter a valid email address";
              return null;
            }}
          >
            <Label className="text-sm font-medium text-orange-900">
              Email Address
            </Label>
            <Input
              placeholder="mail@example.com"
              className="rounded-xl border-orange-200"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Password */}
          <TextField isRequired name="password" type="password">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-orange-900">
                Password
              </Label>
              <a
                href="/forgot-password"
                className="text-xs text-orange-600 underline"
              >
                Forgot password?
              </a>
            </div>
            <Input
              placeholder="Enter your password"
              className="rounded-xl border-orange-200"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Submit */}
          <Button
            className="w-full bg-linear-to-r from-teal-400 via-cyan-500 to-sky-500 hover:bg-teal-600 text-white font-medium rounded-xl mt-2 transition"
            type="submit"
          >
            <ArrowRight />
            Sign In
          </Button>

          {/* Divider------------------------------------------------- */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-orange-100" />
            <span className="text-xs text-orange-400">or continue with</span>
            <div className="flex-1 h-px bg-orange-100" />
          </div>

          {/* Google Button -=============*/}

          <Button
            onClick={() => handleGoogleLogin()}
            className="w-full"
            variant="tertiary"
          >
            <InlineIcon icon="devicon:google" />
            Sign in with Google
          </Button>
          {/* GitHub Button */}
          <Button
            onClick={handleGithubLogin}
            className="w-full"
            variant="tertiary"
          >
            <Icon icon="mdi:github" />
            Sign in with GitHub
          </Button>

          {/* Register link */}
          <p className="text-xs text-center text-orange-700 opacity-70">
            Don`t have an account?{" "}
            <Link
              href="/signup"
              className="text-orange-600 font-medium underline"
            >
              Sign up free
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
