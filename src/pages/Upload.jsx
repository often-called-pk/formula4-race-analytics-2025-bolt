import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { 
  Upload as UploadIcon, 
  File, 
  CheckCircle, 
  AlertCircle, 
  X,
  FileText,
  Clock,
  User
} from 'lucide-react'

const Upload = () => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Handle accepted files
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending',
      progress: 0,
      metadata: null,
      error: null
    }))

    setFiles(prev => [...prev, ...newFiles])

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      console.log('Rejected files:', rejectedFiles)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true
  })

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    
    for (const fileItem of files) {
      if (fileItem.status === 'completed') continue

      try {
        // Update file status
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'uploading', progress: 0 }
            : f
        ))

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100))
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id 
              ? { ...f, progress }
              : f
          ))
        }

        // Simulate processing
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { 
                ...f, 
                status: 'processing',
                metadata: {
                  driver: 'Driver A',
                  track: 'Silverstone GP',
                  session: 'Practice 2',
                  lapCount: 15,
                  fastestLap: '1:23.456'
                }
              }
            : f
        ))

        await new Promise(resolve => setTimeout(resolve, 2000))

        // Complete upload
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'completed' }
            : f
        ))

      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'error', error: error.message }
            : f
        ))
      }
    }

    setUploading(false)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-neon-green" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />
      case 'uploading':
      case 'processing':
        return <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Upload Complete'
      case 'error':
        return 'Upload Failed'
      case 'uploading':
        return 'Uploading...'
      case 'processing':
        return 'Processing...'
      default:
        return 'Ready to Upload'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Upload Telemetry Data
        </h1>
        <p className="text-muted-foreground">
          Upload your AiM RaceStudio3 CSV files for analysis and comparison
        </p>
      </div>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-primary bg-primary/5 scale-[1.02]' 
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center transition-colors ${
            isDragActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <UploadIcon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop CSV files'}
            </h3>
            <p className="text-muted-foreground">
              or <span className="text-primary font-medium">click to browse</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Supports AiM RaceStudio3 CSV format • Max 50MB per file
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Uploaded Files ({files.length})
            </h2>
            <button
              onClick={uploadFiles}
              disabled={uploading || files.every(f => f.status === 'completed')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? 'Processing...' : 'Process Files'}
            </button>
          </div>

          <div className="space-y-3">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className="flex items-center space-x-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex-shrink-0">
                  {getStatusIcon(fileItem.status)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {fileItem.file.name}
                    </p>
                    <button
                      onClick={() => removeFile(fileItem.id)}
                      className="p-1 hover:bg-muted rounded-md transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{(fileItem.file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <span>{getStatusText(fileItem.status)}</span>
                  </div>

                  {/* Progress Bar */}
                  {(fileItem.status === 'uploading' || fileItem.status === 'processing') && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${fileItem.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  {fileItem.metadata && (
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {fileItem.metadata.driver}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {fileItem.metadata.track}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {fileItem.metadata.fastestLap}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {fileItem.metadata.lapCount} laps
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {fileItem.error && (
                    <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
                      <p className="text-xs text-destructive">
                        {fileItem.error}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="rounded-xl bg-card border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          File Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-2">Supported Formats</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• AiM RaceStudio3 CSV files</li>
              <li>• Maximum file size: 50MB</li>
              <li>• Multiple files supported</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Required Data</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• GPS coordinates (Lat/Lon)</li>
              <li>• Speed and engine data</li>
              <li>• Throttle and brake inputs</li>
              <li>• Steering angle data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload