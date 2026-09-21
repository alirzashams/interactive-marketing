# Interactive Marketing System

A gamified marketing system that bridges online engagement with offline in-store experience. Users interact with a web-based quiz to receive a personalized menu item recommendation and a unique, time-limited discount code. Staff can validate the code at the point of sale.

## Features

- **Online to Offline Conversion**: Engages users online and drives them to visit the physical store.
- **Decision Fatigue Reduction**: Simplifies choice through a guided quiz.
- **Targeted Upselling**: Recommends specific items based on user responses.
- **Brand Memorability**: Creates a memorable, interactive experience.
- **Exclusivity Feeling**: Unique, one-time-use codes create a sense of exclusivity.
- **Cost Control**: Each code is unique, single-use, and trackable to prevent misuse.

## Architecture

- **Backend**: Node.js with Express and SQLite3
  - API endpoints for quiz flow and code validation
  - Generates unique discount codes with expiration
  - Tracks code usage to prevent reuse
- **Frontend**: React with Vite
  - Interactive quiz interface
  - Displays personalized results and discount code
  - Simple, thematic UI

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Setup

1. Clone the repository (or copy the files to your machine).

2. Install dependencies for both backend and frontend:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

## Running the Application

### Development Mode

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

   The server will run on `http://localhost:5000`.

2. In a new terminal, start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or another port shown in the terminal).

3. Open your browser and navigate to the frontend URL (usually `http://localhost:5173`).

### Building for Production

To build the frontend for production:

```bash
cd frontend
npm run build
```

The built files will be in the `dist` directory. You can serve these static files with any web server (e.g., Nginx, Apache, or serve them from the Express backend by configuring static middleware).

## API Endpoints

### Backend (running on `http://localhost:5000`)

- `GET /` - Health check
- `GET /api/start` - Get initial quiz question and options
- `POST /api/answer` - Submit an answer and receive a personalized recommendation and discount code
- `GET /api/validate/:code` - Validate a discount code (check if valid, not used, within time limit)
- `POST /api/validate` - Mark a discount code as used (request body: `{ "code": "YOUR_CODE" }`)

## Database

The backend uses an SQLite database file located at `backend/database.db`. It contains a single table `discount_codes` with the following schema:

- `id`: Integer (primary key)
- `code`: Text (unique) - the discount code
- `item_recommended`: Text - the recommended menu item
- `discount_value`: Text - the discount (e.g., "20%")
- `valid_from`: Datetime - when the code becomes valid
- `valid_until`: Datetime - when the code expires
- `used`: Integer (0 or 1) - whether the code has been used
- `used_at`: Datetime - when the code was marked as used (if used)

## Customization

### Modifying the Quiz

To change the quiz questions or the mapping of answers to items/discounts, edit the backend `server.js`:

- The `/api/start` endpoint returns the question and options.
- The `/api/answer` endpoint contains the `itemMap` object that maps answers to items and discounts.

### Changing the Theme

To modify the frontend appearance, edit the frontend `src/index.css` file.

## Notes

- The discount codes are valid for 24 hours from generation.
- Each code can only be used once.
- The system is designed for demonstration purposes; for production use, consider adding more robust security, authentication, and scalability measures.

## Troubleshooting

- If the backend fails to start, ensure port 5000 is available or change the `PORT` in the backend `.env` file.
- If the frontend cannot connect to the backend, verify the backend is running and reachable at `http://localhost:5000`.
- For CORS issues during development, the backend already includes CORS middleware.

## License

This project is for educational and demonstration purposes.