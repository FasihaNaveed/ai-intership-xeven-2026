"use client";

import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/services/authService";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const data = await login({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("USER:", data.user);

      // ==========================
      // Save JWT Token
      // ==========================

      localStorage.setItem(
        "token",
        data.access_token
      );

      // ==========================
      // Save Logged In User
      // ==========================

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      router.push("/dashboard");

    } catch (err: any) {

      console.log(err);

      setError(

        err.response?.data?.detail ||

        "Login failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthShell>

      <div className="space-y-2">

        <h1 className="text-2xl font-semibold tracking-tight">

          Welcome back

        </h1>

        <p className="text-sm text-gray-500">

          Sign in with your Xeven Solutions employee account.

        </p>

      </div>

      <form

        onSubmit={handleLogin}

        className="mt-8 space-y-5"

      >

        <div className="space-y-2">

          <Label htmlFor="email">

            Email

          </Label>

          <Input

            id="email"

            type="email"

            placeholder="name@xevensolutions.com"

            value={email}

            onChange={(e) =>

              setEmail(e.target.value)

            }

          />

        </div>

        <div className="space-y-2">

          <div className="flex items-center justify-between">

            <Label htmlFor="password">

              Password

            </Label>

            <Link

              href="#"

              className="text-xs font-medium text-blue-600 hover:underline"

            >

              Forgot Password?

            </Link>

          </div>

          <Input

            id="password"

            type="password"

            placeholder="••••••••"

            value={password}

            onChange={(e) =>

              setPassword(e.target.value)

            }

          />

        </div>

        {error && (

          <p className="text-sm text-red-500">

            {error}

          </p>

        )}

        <Button

          type="submit"

          className="w-full py-3"

          disabled={loading}

        >

          {

            loading

              ? "Logging in..."

              : "Login"

          }

        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-gray-500">

        Don't have an account?{" "}

        <Link

          href="/register"

          className="font-medium text-blue-600 hover:underline"

        >

          Create Account

        </Link>

      </p>

    </AuthShell>

  );

}