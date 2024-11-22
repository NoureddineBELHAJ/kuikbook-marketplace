# Kuikbook Marketplace

A modern travel marketplace for booking activities and experiences.

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kuikbook-marketplace.git
cd kuikbook-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

## Deployment

The app automatically deploys to Firebase when pushing to the main branch.

Manual deployment:
```bash
npm run build && npm run deploy
```

## Firebase Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init
```

4. Deploy:
```bash
npm run deploy
```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_API_URL=
```

## Architecture

- Frontend: React + Vite
- Backend: Firebase
- Database: Firestore
- Storage: Firebase Storage
- Authentication: Firebase Auth
- Hosting: Firebase Hosting
- CI/CD: GitHub Actions

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run deploy`: Deploy to Firebase
- `npm run deploy:rules`: Deploy Firestore and Storage rules