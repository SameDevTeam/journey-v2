import { PageLayout } from '@/components/layout/PageLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import { BarChart3, Users, Activity, ArrowRight } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuthStore()

  return (
    <PageLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome back, {user?.name}! 👋</CardTitle>
            <CardDescription>
              Here's what's happening with your account today.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">
                +4% from last hour
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-muted-foreground">
                +8% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button>
            Primary Action
          </Button>
          <Button variant="secondary">
            Secondary Action
          </Button>
          <Button variant="outline">
            Outline Action
          </Button>
          <Button variant="ghost">
            Ghost Action
          </Button>
        </div>

        {/* Feature Card */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Themed Feature Card</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              This card uses the primary theme color to showcase the color scheme.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The colors of this card will change based on your selected theme color.
            </p>
            <Button variant="secondary" className="gap-2">
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
} 