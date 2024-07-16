# Fire Alert Native App

Fire Alert is a React Native application designed for volunteer firefighting coordination. The app leverages Firebase for authentication, Firestore for database management, and various geolocation services to report and track fire incidents.

## Features

- User authentication and email verification
- Multi-level user authorization
- Real-time fire reporting and tracking using Google Maps
- User profiles with geolocation data
- Integration with MODIS/VIIRS for wildfire data

## Prerequisites

- Node.js and npm
- Expo CLI
- Firebase project setup
- NASA Earthdata account for MODIS/VIIRS API

## Project Structure

```plaintext
fire-alert-app/
├── assets/
├── components/
│   ├── Auth/
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   ├── Profile/
│   │   ├── ProfileScreen.tsx
│   │   ├── LocationInput.tsx
│   ├── Map/
│   │   ├── MapScreen.tsx
├── hooks/
│   ├── useReverseGeocoding.ts
├── navigation/
│   ├── _layout.tsx
│   ├── _layout.auth.tsx
│   ├── Home.tsx
│   ├── Map.tsx
│   ├── Profile.tsx
├── store/
│   ├── userSlice.ts
│   ├── index.ts
├── App.tsx
├── firebase.config.ts
├── package.json
└── README.md
```

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/fire-alert-app.git
cd fire-alert-app
npm install
```
