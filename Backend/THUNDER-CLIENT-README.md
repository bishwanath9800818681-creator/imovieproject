# Thunder Client Collection for iMovieShow API

This repository includes a comprehensive Thunder Client collection for testing the iMovieShow API. The collection contains all available endpoints organized into logical folders for easy navigation and testing.

## Prerequisites

1. **VS Code** with the **Thunder Client** extension installed
2. **iMovieShow backend** running locally or accessible via network
3. **MongoDB** database running locally or accessible via network

## Initial Setup

Before using the Thunder Client collection, you need to set up the database with initial data:

1. Make sure your MongoDB database is running
2. Navigate to the Backend directory in your terminal
3. Run the seed script to populate the database with sample data:
   ```bash
   npm run seed
   ```

This will create the following default users:
- Admin user:
  - Email: admin@imovieshow.com
  - Password: admin123
- Regular user:
  - Email: john@example.com
  - Password: test1234

## How to Import the Collection

1. Open VS Code
2. Open the Thunder Client extension (lightning bolt icon in the sidebar)
3. Click on the "Collections" tab
4. Click the "Import" button
5. Select the `thunder-client-collection.json` file from this directory
6. The collection will be imported and ready to use

## Collection Structure

The collection is organized into the following folders:

- **Auth**: Authentication related endpoints (register, login, get current user)
- **Movies**: Movie management endpoints (CRUD operations)
- **Cinemas**: Cinema management endpoints (CRUD operations)
- **Showtimes**: Showtime management endpoints (CRUD operations)
- **Bookings**: Booking management endpoints (CRUD operations)
- **Feedback**: Feedback management endpoints (CRUD operations)

## Authentication

Most endpoints require authentication. To use these endpoints:

1. First use the "Login User" or "Login Admin" endpoint with the default credentials
2. Copy the JWT token from the response
3. Add it to the Authorization header as: `Bearer YOUR_JWT_TOKEN_HERE`

## Environment Variables

The collection uses the following base URL:
`http://localhost:5000`

If your backend is running on a different port or host, update the URLs accordingly.

## Placeholder Values

Several endpoints contain placeholder values that need to be replaced:

- `MOVIE_ID_HERE`: Replace with an actual movie ID
- `CINEMA_ID_HERE`: Replace with an actual cinema ID
- `SHOWTIME_ID_HERE`: Replace with an actual showtime ID
- `BOOKING_ID_HERE`: Replace with an actual booking ID
- `FEEDBACK_ID_HERE`: Replace with an actual feedback ID

## Testing the API

1. Start your iMovieShow backend server
2. Seed the database with sample data (`npm run seed`)
3. Import the collection into Thunder Client
4. Login with one of the default users to get a JWT token
5. Replace placeholder values with actual IDs from your database
6. Add authentication tokens where required
7. Execute requests to test the API functionality

## Common Testing Workflow

1. Login with "Login User" using default credentials (john@example.com / test1234)
2. Browse movies with "Get All Movies"
3. Create a booking with "Create Booking (User)"
4. View bookings with "Get User Bookings"

For admin operations:
1. Login with "Login Admin" using default credentials (admin@imovieshow.com / admin123)
2. Create movies, cinemas, showtimes with the respective create endpoints
3. View all bookings with "Get All Bookings (Admin)"
4. Manage feedback with "Get All Feedback (Admin)" and "Delete Feedback (Admin)"
   npm run seed
