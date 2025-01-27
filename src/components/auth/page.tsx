import SameupLogo from '@/assets/images/sameup-logo-2.png'
import JourneyImage from '@/assets/images/journey.png'

import { LoginForm } from "@/components/auth/login-form"

export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
              <img src={SameupLogo} className="size-4" />
            </div>
            SameUp Journey
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-background lg:block">
        <img
          src={JourneyImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage
