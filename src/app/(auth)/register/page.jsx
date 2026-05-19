"use client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Icon, InlineIcon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const userData = Object.fromEntries(formData.entries());
  //   // const { data, error } = await authClient.signUp.email({
  //   //   name: userData.name, // required
  //   //   email: userData.email, // required
  //   //   password: userData.password, // required
  //   //   image: userData.imgUrl,
  //   //   callbackURL: "/signin",
  //   // });
  //   // if (error) {
  //   //   toast.error(error.message);
  //   // }
  //   // if (data) {
  //   //   toast.success("Register Successfully!");
  //   //   e.currentTarget.reset();
  //   // }
  // };
  // // with google-------------
  // const handleGoogleLogin = async () => {
  //   // const { data, error } = await authClient.signIn.social({
  //   //   provider: "google",
  //   //   callbackURL: "/",
  //   // });
  //   // if (error) {
  //   //   toast.error(error.message);
  //   // }
  // };
  // // with github------------
  // const handleGithubLogin = async () => {
  //   // const { data, error } = await authClient.signIn.social({
  //   //   provider: "github",
  //   //   callbackURL: "/",
  //   // });
  //   // if (error) {
  //   //   toast.error(error.message);
  //   // }
  // };
  return (
    <div>
      {" "}
      <div className="flex-1 flex justify-center items-center p-6 sm:p-10 bg-teal-50 order-2 lg:order-1">
        <Form
          className="flex w-full max-w-md flex-col gap-4 bg-white border border-orange-100 p-6 sm:p-10 rounded-2xl shadow-sm"
          // onSubmit={onSubmit}
        >
          {/* Title */}
          <div className="mb-1">
            <h1 className="text-2xl font-bold text-orange-950">
              Create Account
            </h1>
            <p className="text-xs text-teal-700 opacity-70 mt-1">
              Connect with StudyNook
            </p>
          </div>

          {/* Name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) return "Name must be at least 3 characters";
              return null;
            }}
          >
            <Label className="text-sm font-medium text-orange-900">
              Full Name
            </Label>
            <Input
              placeholder="Your full name"
              className="rounded-xl border-orange-200"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField isRequired name="imgUrl" type="text">
            <Label className="text-sm font-medium text-orange-900">
              Profile Image URL
            </Label>
            <Input
              placeholder="image url"
              className="rounded-xl border-orange-200"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

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
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8)
                return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value))
                return "Must contain at least one uppercase letter";
              if (!/[0-9]/.test(value))
                return "Must contain at least one number";
              return null;
            }}
          >
            <Label className="text-sm font-medium text-orange-900">
              Password
            </Label>
            <Input
              placeholder="Enter your password"
              className="rounded-xl border-orange-200"
            />
            <Description className="text-xs text-orange-600 opacity-70 mt-1">
              Min 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Submit */}
          <Button
            className="w-full bg-linear-to-r from-teal-400 via-cyan-500 to-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl mt-2 transition"
            type="submit"
          >
            <Check />
            Create Account
          </Button>
          {/* Divider------------------------------------------------- */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-orange-100" />
            <span className="text-xs text-orange-400">or continue with</span>
            <div className="flex-1 h-px bg-orange-100" />
          </div>

          <Button
            // onClick={() => handleGoogleLogin()}
            className="w-full"
            variant="tertiary"
          >
            <InlineIcon icon="devicon:google" />
            Sign Up with Google
          </Button>
          {/* GitHub Button */}
          <Button
            // onClick={handleGithubLogin}
            className="w-full"
            variant="tertiary"
          >
            <Icon icon="mdi:github" />
            Sign Up with GitHub
          </Button>
          {/* Login link */}
          <p className="text-xs text-center text-orange-700 opacity-70">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-orange-600 font-medium underline"
            >
              Sign in
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
