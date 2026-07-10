import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
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

      <form className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            placeholder="name@xevensolutions.com"
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
          />
        </div>

        <Button className="w-full py-3">
          Login
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