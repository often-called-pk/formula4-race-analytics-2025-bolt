import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Upload, 
  BarChart3, 
  Clock, 
  Zap, 
  TrendingUp,
  Activity,
  FileText,
  Users
} from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      name: 'Total Sessions',
      value: '12',
      change: '+2 this week',
      icon: FileText,
      color: 'text-neon-blue'
    },
    {
      name: 'Fastest Lap',
      value: '1:23.456',
      change: 'Silverstone GP',
      icon: Clock,
      color: 'text-racing-yellow'
    },
    {
      name: 'Avg Speed',
      value: '187 km/h',
      change: '+5.2% vs last session',
      icon: TrendingUp,
      color: 'text-neon-green'
    },
    {
      name: 'Active Drivers',
      value: '4',
      change: 'Team members',
      icon: Users,
      color: 'text-racing-red'
    }
  ]

  const quickActions = [
    {
      name: 'Upload Telemetry',
      description: 'Upload new CSV telemetry files for analysis',
      href: '/upload',
      icon: Upload,
      color: 'bg-gradient-to-r from-racing-red to-racing-orange'
    },
    {
      name: 'View Analysis',
      description: 'Compare driver performance and lap times',
      href: '/analysis',
      icon: BarChart3,
      color: 'bg-gradient-to-r from-neon-blue to-neon-purple'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-racing-red/10 to-racing-orange/10 border border-racing-red/20 p-8">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 racing-gradient rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome to F4 Analytics
              </h1>
              <p className="text-muted-foreground">
                Advanced telemetry analysis for Formula 4 racing
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Upload your AiM RaceStudio3 CSV files and get instant insights into driver performance, 
            lap times, and racing techniques with our advanced comparison tools.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-racing-orange/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-xl bg-card border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.name}
              to={action.href}
              className="group relative overflow-hidden rounded-xl bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {action.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              action: 'Uploaded telemetry data',
              details: 'Silverstone GP - Practice Session 2',
              time: '2 hours ago',
              status: 'completed'
            },
            {
              action: 'Compared lap times',
              details: 'Driver A vs Driver B - Fastest laps',
              time: '4 hours ago',
              status: 'completed'
            },
            {
              action: 'Generated analysis report',
              details: 'Sector performance breakdown',
              time: '1 day ago',
              status: 'completed'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="w-2 h-2 bg-neon-green rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.details}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {activity.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard