# Reactivities

Reactivities is a web application built using .NET Core and the WebApi template (clean architecture) with React (TypeScript) for the user interface. It provides a platform for users to create, join, and manage activities.

[https://github.com/Mohammed-Zrirake/Reactivities](https://github.com/Mohammed-Zrirake/Reactivities)

## Features and Functionality

*   **Activity Management:**
    *   Create, edit, and delete activities.
    *   View details of individual activities.
    *   Attend or cancel attendance for activities.
    *   Filter activities based on various criteria (e.g., "I'm going," "I'm hosting," "all events").
    *   Pagination for activities list using cursor-based pagination.

*   **User Authentication and Authorization:**
    *   User registration and login using ASP.NET Identity.
    *   User profile management (edit display name and bio, upload/manage photos).
    *   Follow/unfollow other users and view followers/followings lists.
    *   Activities are protected by authentication; only logged-in users can create or join activities.
    *   Authorization policy to restrict editing and deleting activities to the host.

*   **Real-time Communication:**
    *   Real-time commenting on activities using SignalR.

*   **Profile Management:**
    *   View user profiles.
    *   Add, delete, and set main profile photo using Cloudinary.
    *   View user's upcoming, past, and hosted activities.

*   **Error Handling:**
    *   Global exception handling middleware to provide consistent error responses.
    *   FluentValidation integration for request validation.

## Technology Stack

*   **Backend:**
    *   .NET Core Web API
    *   ASP.NET Identity
    *   Entity Framework Core (with SQLite provider)
    *   MediatR for implementing CQRS pattern
    *   AutoMapper for object-object mapping
    *   FluentValidation for request validation
    *   Cloudinary for image storage
    *   SignalR for real-time communication

*   **Frontend:**
    *   React (TypeScript)
    *   MobX for state management
    *   React Router for navigation
    *   MUI (Material UI) for UI components
    *   React Hook Form and Zod for form management and validation
    *   Date-fns for date formatting
    *   React Query for data fetching and caching
    *   React Leaflet for Maps

*   **Database:**
    *   SQLite

## Prerequisites

*   .NET Core SDK (check `global.json` for the specific version).
*   Node.js and npm (or yarn)

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Mohammed-Zrirake/Reactivities.git
    cd Reactivities
    ```

2.  **Backend Setup (.NET Core API):**

    *   Navigate to the `API` directory:

        ```bash
        cd API
        ```

    *   Update the database connection string in `appsettings.json` if needed.  The default is SQLite.

    *   Apply Entity Framework Core migrations:

        ```bash
        dotnet ef database update
        ```

    *   Seed the database with initial data:  This is done automatically on application startup in `API/Program.cs` within the `try` block after `await context.Database.MigrateAsync();`.

    *   Run the API:

        ```bash
        dotnet run
        ```

3.  **Frontend Setup (React):**

    *   Navigate to the `Client` directory:

        ```bash
        cd ../Client
        ```

    *   Install dependencies:

        ```bash
        npm install  # or yarn install
        ```

    *   Configure environment variables:

        *   Create a `.env` file in the `Client` directory (if it doesn't exist).
        *   Add the API URL:

            ```
            VITE_API_URL=http://localhost:5000/api
            VITE_COMMENTS_URL=http://localhost:5000/comments
            ```

            *(Adjust the port number if your API is running on a different port.)*

    *   Start the React development server:

        ```bash
        npm run dev  # or yarn dev
        ```

## Usage Guide

1.  **Running the Application:**

    *   Start the .NET Core API (`dotnet run` in the `API` directory).
    *   Start the React development server (`npm run dev` in the `Client` directory).
    *   Open your browser and navigate to the React application URL (usually `http://localhost:3000`).

2.  **User Registration and Login:**

    *   Navigate to the `/register` page to create a new account. The Register form is using `registerSchema` for validation.
    *   Navigate to the `/login` page to log in with an existing account.  Login form is using `loginSchema` for validation.

3.  **Activity Management:**

    *   View activities on the `/activities` page. Activities are fetched using `useActivities` hook which uses `useInfiniteQuery` for pagination.
    *   Create a new activity by navigating to `/createActivity`. This route is protected by the `RequireAuth` component. The Activity form is using `activitySchema` for validation.
    *   Edit an activity by navigating to `/manage/:id`. This route is also protected by `RequireAuth`.
    *   View activity details on the `/activities/:id` page.

4.  **Profile Management:**

    *   Access your profile by navigating to `/profiles/:id`. You can reach it as well via UserMenu.tsx
    *   Edit your profile information (display name and bio) in the 'About' tab. The `editProfileSchema` is applied for the form.
    *   Add, delete, and set your main profile photo in the 'Photos' tab.

5.  **Real-time Comments:**

    *   View and add comments in real-time on the activity details page (`/activities/:id`).  SignalR handles the real-time communication.

## API Documentation

The API endpoints are defined in the `API/Controllers` directory. Here's a brief overview:

*   **AccountController.cs:**
    *   `POST /api/account/register`: Registers a new user.  Requires `RegisterDto`.
    *   `GET /api/account/user-info`: Gets the current user's information.
    *   `POST /api/account/logout`: Logs out the current user.

*   **ActivitiesController.cs:**
    *   `GET /api/activities`: Gets a list of activities (paginated).  Accepts query parameters for pagination and filtering (`ActivityParams`).
    *   `GET /api/activities/{id}`: Gets details of a specific activity.
    *   `POST /api/activities`: Creates a new activity.  Requires `CreateActivityDto`.
    *   `PUT /api/activities/{id}`: Edits an existing activity.  Requires `EditActivityDto`. Requires "IsActivityHost" authorization policy.
    *   `DELETE /api/activities/{id}`: Deletes an activity. Requires "IsActivityHost" authorization policy.
    *   `POST /api/activities/{id}/attend`: Attends or cancels attendance for an activity.

*   **ProfilesController.cs:**
    *   `POST /api/profiles/add-photo`: Adds a photo to the user's profile.
    *   `GET /api/profiles/{userId}/photos`: Retrieves photos for the specified user.
    *   `DELETE /api/profiles/{photoId}/photos`: Deletes a specific photo.
    *   `PUT /api/profiles/{photoId}/setMain`: Sets the specified photo as the main profile photo.
    *   `GET /api/profiles/{userId}`: Retrieves the profile information for the specified user.
    *   `PUT /api/profiles`: Updates the user's profile information.  Requires `EditProfile.Command`.
    *   `POST /api/profiles/{userId}/follow`: Follows or unfollows the specified user.
    *   `GET /api/profiles/{userId}/follow-list`: Retrieves the list of followers or followings for the specified user.
    *   `GET /api/profiles/{userId}/activities`: Gets a list of user's activities with filtering capability (past, hosting, future)

*   **BuggyController.cs:**

    *   `GET /api/buggy/not-found`: Returns a 404 Not Found error.
    *   `GET /api/buggy/bad-request`: Returns a 400 Bad Request error.
    *   `GET /api/buggy/unauthorized`: Returns a 401 Unauthorized error.
    *   `GET /api/buggy/server-error`: Returns a 500 Internal Server Error.

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Test your changes thoroughly.
5.  Submit a pull request to the `The_Master` branch.

## License Information

License is not specified. All rights reserved unless otherwise stated.

## Contact/Support Information

*   Repository Owner: Mohammed Zrirake
*   GitHub: [https://github.com/Mohammed-Zrirake](https://github.com/Mohammed-Zrirake)