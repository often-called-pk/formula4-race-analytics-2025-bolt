# Formula 4 Race Analytics

Advanced telemetry analysis webapp for Formula 4 racing, built with React, Supabase, and modern web technologies.

## Features

- **Telemetry Upload**: Support for AiM RaceStudio3 CSV files
- **Driver Comparison**: Compare performance between two drivers
- **Interactive Visualizations**: Speed plots, lap deltas, 3D track maps
- **Real-time Analysis**: Synchronized cursor across all visualizations
- **Racing-themed UI**: Dark mode interface optimized for racing data

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Visualization**: Plotly.js
- **UI Components**: shadcn/ui, Lucide React
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd formula4-race-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your Supabase project:
   - Create a new Supabase project
   - Copy your project URL and anon key to `.env`
   - Run the database migrations (see `/database` folder)

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── lib/               # Utility libraries (Supabase client)
├── pages/             # Page components
├── utils/             # Utility functions
└── index.css          # Global styles
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details