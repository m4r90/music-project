# Song Lyrics Website

A web application that displays song lyrics along with Spotify and YouTube statistics. This project combines song lyrics data with streaming platform metrics to provide comprehensive information about songs.

## Project Structure

The project consists of two main parts:
- Frontend: React application (song-lyrics-app)
- Backend: Flask API with PySpark data processing (programmation)

## Features

- Display song lyrics with metadata
- Show Spotify and YouTube statistics
- Real-time data processing with PySpark
- Responsive web interface

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v18.x or higher)
- Python (v3.8 or higher)
- PySpark
- Flask

## Installation

### Backend Setup

1. Navigate to the programmation directory:

bash
cd programmation
```

### Frontend Setup

1. Navigate to the song-lyrics-app directory:
```bash
cd song-lyrics-app
```

2. Install Node dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

1. From the programmation directory:
```bash
python app.py
```
The Flask server will start on http://localhost:5000

### Start the Frontend Development Server

1. From the song-lyrics-app directory:
```bash
npm start
```
The React application will start on http://localhost:3000

## Data Processing

The application uses PySpark for efficient data processing of song lyrics and streaming statistics. The data fusion process combines information from multiple sources:
- Song lyrics dataset
- Spotify and YouTube statistics

## API Endpoints

### GET /songs
Returns a list of all songs with their associated metadata and lyrics.

## Development

The frontend React application is built using Create React App and includes:
- Real-time data fetching
- Responsive design
- Component-based architecture

## Testing

To run the test suite:

```bash
# Frontend tests
cd song-lyrics-app
npm test

# Backend tests (if implemented)
cd programmation
python -m pytest
```

## Building for Production

To create a production build of the frontend:

```bash
cd song-lyrics-app
npm run build
```

This will create an optimized build in the `build` folder.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
