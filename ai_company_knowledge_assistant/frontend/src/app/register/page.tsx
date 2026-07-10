import Link from 'next/link'
import { AuthShell } from '@/components/auth/auth-shell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { departments, roles } from '@/lib/data'

export default function RegisterPage() {
  return (
    <AuthShell>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Register with your Xeven Solutions work email to get started.
        </p>
      </div>

      <form className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Your Name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@xevensolutions.com" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <select
              id="department"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900"
            >
              <option>Select Department</option>
              <option>Engineering</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Operations</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900"
            >
              <option>Select Role</option>
              <option>Employee</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
          </div>
        </div>

        <Link href="/dashboard">
          <Button className="w-full py-2.5">
            Register
          </Button>
        </Link>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthShell>
  )
}
