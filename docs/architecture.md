# Architecture Document

## High-Level Overview
The Retail Sales Management System follows a classic **Client-Server Architecture**.
- **Frontend**: Single Page Application (SPA) built with React.js (Vite).
- **Backend**: RESTful API built with Node.js and Express.

## Backend Architecture
The backend uses a layered MVC (Model-View-Controller) pattern, although "View" is strictly JSON responses.

### Layers
1.  **Entry Point (`index.js`)**: Initializes the Express app, middleware (CORS, JSON parsing), and routes.
2.  **Routes Layer (`routes/salesRoutes.js`)**: Maps HTTP endpoints (`GET /`, `GET /filters`) to controller functions.
3.  **Controller Layer (`controllers/salesController.js`)**: Contains the business logic:
    - **Search**: Case-insensitive substring matching.
    - **Filter**: Multi-condition filtering using array intersections and range checks.
    - **Sort**: Dynamic sorting based on field mapping.
    - **Pagination**: Slicing the data array based on `page` and `limit`.
4.  **Data Layer (`utils/mockDataGenerator.js`)**: Generates realistic seed data. In a production environment, this would be replaced by a database model (MongoDB/PostgreSQL).

## Frontend Architecture
The frontend is component-based, promoting reusability and separation of concerns.

### Component Tree
- `App` (Container/Controller View)
  - `SearchBar`: Controlled input component.
  - `FilterPanel`: Sidebar containing `FilterGroup` components.
  - `SortDropdown`: Select input for ordering.
  - `SalesTable`: Stateless presentation component for the data grid.
  - `Pagination`: Stateless component for navigation controls.

### State Management
- **Centralized State (`App.jsx`)**: The `params` state object holds the Single Source of Truth for the current view (search query, active filters, page number).
- **Data Fetching**: React `useEffect` hooks trigger API calls whenever `params` change.

## Data Flow
1.  User interacts with UI (types in search, checks a filter).
2.  Frontend Component calls a handler passed from `App`.
3.  `App` updates `params` state.
4.  `useEffect` detects change and calls `fetchSales(params)`.
5.  Service layer (`api.js`) constructs Query String (e.g., `?q=John&region=North&page=1`).
6.  Backend receives request, processes filters/sort/search on the dataset.
7.  Backend responds with `data` (array) and `meta` (pagination info).
8.  Frontend updates `data` state and re-renders `SalesTable`.

## Folder Structure
(See core `task.md` or file explorer for physical structure)
