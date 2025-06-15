import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap,
  Settings,
  Download,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

const Analysis = () => {
  const [selectedSessions, setSelectedSessions] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)

  const sessions = [
    {
      id: 1,
      driver: 'Driver A',
      track: 'Silverstone GP',
      session: 'Practice 2',
      fastestLap: '1:23.456',
      date: '2024-01-15',
      status: 'processed'
    },
    {
      id: 2,
      driver: 'Driver B', 
      track: 'Silverstone GP',
      session: 'Practice 2',
      fastestLap: '1:23.892',
      date: '2024-01-15',
      status: 'processed'
    }
  ]

  const comparisonMetrics = [
    {
      name: 'Lap Time Delta',
      value: '+0.436s',
      description: 'Driver B vs Driver A',
      trend: 'negative'
    },
    {
      name: 'Top Speed',
      value: '312 km/h',
      description: 'Sector 2 straight',
      trend: 'positive'
    },
    {
      name: 'Avg Corner Speed',
      value: '187 km/h',
      description: 'Technical sections',
      trend: 'neutral'
    },
    {
      name: 'Braking Distance',
      value: '89m',
      description: 'Turn 1 average',
      trend: 'positive'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Telemetry Analysis
          </h1>
          <p className="text-muted-foreground">
            Compare driver performance and analyze racing data
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Session Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Select Sessions to Compare</h2>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center space-x-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSessions(prev => [...prev, session.id])
                    } else {
                      setSelectedSessions(prev => prev.filter(id => id !== session.id))
                    }
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-foreground">{session.driver}</p>
                    <span className="text-sm text-muted-foreground">{session.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.track} • {session.session}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-racing-yellow" />
                      <span className="text-sm font-mono">{session.fastestLap}</span>
                    </div>
                    <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                    <span className="text-xs text-muted-foreground capitalize">{session.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Metrics */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Comparison Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comparisonMetrics.map((metric) => (
              <div
                key={metric.name}
                className="p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.name}
                  </p>
                  <div className={`w-2 h-2 rounded-full ${
                    metric.trend === 'positive' ? 'bg-neon-green' :
                    metric.trend === 'negative' ? 'bg-racing-red' :
                    'bg-racing-yellow'
                  }`} />
                </div>
                <p className="text-xl font-bold text-foreground mb-1">
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visualization Controls */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Lap Progress:</span>
          <div className="w-32 bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-1/3 transition-all duration-300" />
          </div>
          <span className="text-sm font-mono text-foreground">33%</span>
        </div>
      </div>

      {/* Visualization Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Speed Chart Placeholder */}
        <div className="h-80 rounded-xl bg-card border border-border p-6 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Speed vs Distance</h3>
            <p className="text-muted-foreground">Select sessions to view comparison</p>
          </div>
        </div>

        {/* Delta Chart Placeholder */}
        <div className="h-80 rounded-xl bg-card border border-border p-6 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Lap Delta</h3>
            <p className="text-muted-foreground">Time gained/lost visualization</p>
          </div>
        </div>

        {/* Track Map Placeholder */}
        <div className="h-80 rounded-xl bg-card border border-border p-6 flex items-center justify-center">
          <div className="text-center">
            <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">3D Track Map</h3>
            <p className="text-muted-foreground">Interactive racing line visualization</p>
          </div>
        </div>

        {/* Actions Timeline Placeholder */}
        <div className="h-80 rounded-xl bg-card border border-border p-6 flex items-center justify-center">
          <div className="text-center">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Driver Actions</h3>
            <p className="text-muted-foreground">Throttle, brake, and steering timeline</p>
          </div>
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="rounded-xl bg-card border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Analysis Summary</h3>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">
            Select two telemetry sessions above to begin comparison analysis. The system will automatically 
            identify the fastest laps and provide detailed insights into driver performance differences, 
            including speed variations, braking points, throttle application, and racing line analysis.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Analysis