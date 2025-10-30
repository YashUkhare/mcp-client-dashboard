# MCP Client Dashboard

An Angular 20 single-page application for managing Model Context Protocol (MCP) servers. The dashboard provides secure authentication, JWT-aware routing, and a responsive PrimeNG UI for monitoring registered servers at a glance.

## Features

- Login flow backed by JWT authentication with automatic session expiry handling.
- Protected server listing with rich status indicators, manual refresh, and logout actions.
- Standalone Angular components with lazy-loaded routes for optimal bundle sizes.
- Centralized Axios configuration that injects auth headers and reacts to 401 responses.
- Tailored styling using PrimeNG components and custom CSS for dark themed dashboards.

## Tech Stack

- [Angular 20](https://angular.dev/)
- [PrimeNG 17](https://primeng.org/) for UI components
- [Axios](https://axios-http.com/) for HTTP requests
- TypeScript, SCSS, and the new `@angular/build` application builder

## Prerequisites

- Node.js 18.19+ or 20.x
- npm 9+ (bundled with Node)
- Access to an MCP backend exposing REST endpoints (defaults to `http://localhost:8080/api`)

## Environment Variables

Environment values are loaded via `.env` files at build/serve time. Copy the example file and adjust as needed:

```bash
cp .env.example .env.local
```

| Name              | Description                                          | Default                    |
| ----------------- | ---------------------------------------------------- | -------------------------- |
| `NG_APP_API_URL`  | Base URL for the MCP API used by the dashboard.      | `http://localhost:8080/api` |

> Files named `.env`, `.env.local`, or `.env.*` are ignored by Git. Use `.env.local` for machine-specific overrides.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a local env file**
   ```bash
   cp .env.example .env.local
   # edit .env.local if your API is not running on the default URL
   ```

3. **Run the MCP API (required)**  
   Ensure the backend is reachable at the URL specified in `NG_APP_API_URL`.

4. **Start the dev server**
   ```bash
   npm start
   ```
   The app runs at [http://localhost:4200](http://localhost:4200) with hot reload.

## Useful npm Scripts

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `npm start`      | Serve the app in development mode.        |
| `npm run build`  | Produce an optimized production build.    |
| `npm run watch`  | Rebuild on file changes (development).    |
| `npm test`       | Execute unit tests with Karma.            |

## Project Structure

```
src/
├─ app/
│  ├─ auth/             # Login component, auth service, guards
│  ├─ core/interceptors # Axios setup and global HTTP interceptors
│  ├─ servers/          # Server list feature module
│  ├─ app.routes.ts     # Standalone lazy routes
│  └─ app.ts            # Root component bootstrapped via main.ts
├─ environments/        # Environment configuration
└─ main.ts              # Angular bootstrap entry point
```

## Testing & Builds

- **Unit tests**: `npm test`
- **Production build**: `npm run build` (artifacts emitted to `dist/mcp-dashboard`)

## Troubleshooting

- If you see a blank page or immediate redirect to the login screen, the JWT token is missing or expired—log in again.
- A 401 response from the API automatically clears the session and returns you to `/login`.
- Verify the API base URL in `.env.local` if network requests fail.

## License

This project is currently distributed for internal use. Add licensing details if required.
