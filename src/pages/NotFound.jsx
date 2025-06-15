import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Zap } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="w-16 h-16 mx-auto mb-6 racing-gradient rounded-2xl flex items-center justify-center">
          <Zap className="w-8 h-8 text-white" />
        </div>

        {/* 404 Error */}
        <div className="mb-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-racing-red to-racing-orange bg-clip-text text-transparent mb-2">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-accent hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Racing Theme Decoration */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-racing-red rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-racing-yellow rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default NotFound