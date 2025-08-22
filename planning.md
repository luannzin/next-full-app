# Waitlist Page Implementation Plan

This document outlines the step-by-step plan to create a minimalist, dark-themed waitlist page. The page will feature custom 3D effects and will be built using the existing Next.js and Elysia stack, with Shadcn/UI components and a Zinc color palette.

## 1. Core Objectives

*   **Functionality:** Capture user emails for a waitlist.
*   **Technology:** Utilize Next.js for the frontend, Elysia for the backend API, Shadcn/UI for components, and a suitable library for 3D effects (e.g., `react-three-fiber`).
*   **Aesthetics:** Implement a minimalist, dark-mode UI using Zinc shades from Tailwind CSS.
*   **User Experience:** Provide clear feedback to the user upon form submission (success, error, loading states).

## 2. File Structure

1.  **Frontend Page:** Create a new route for the waitlist page.
    *   `src/app/(frontend)/(routes)/waitlist/page.tsx`
    *   `src/app/(frontend)/(routes)/waitlist/layout.tsx` (if a specific layout is needed)

2.  **Backend API Route:** Add a new route handler within the existing Elysia setup.
    *   The logic will be added to `src/app/(backend)/api/[[...slugs]]/route.ts` to handle `POST /api/waitlist`.

3.  **3D Component:** A dedicated component for the 3D visualization.
    *   `src/components/canvas/scene.tsx` (A new `components` directory may be needed).

## 3. Component Breakdown (Shadcn/UI)

The page will be composed of the following Shadcn/UI components:

*   **Layout:** A main container will center the content vertically and horizontally.
*   **Typography:**
    *   `h1` or `h2` for the main headline.
    *   `p` for the descriptive text.
*   **Form Elements:**
    *   **Input:** For the user's email address.
    *   **Button:** To submit the form.
    *   **Label:** To associate with the email input for accessibility.
*   **User Feedback:**
    *   **Toast:** To display non-intrusive success or error messages after form submission.
    *   A loading spinner/state on the `Button` to indicate submission is in progress.

## 4. Theming and Styling (Minimalist Dark Mode)

*   **Color Palette:** The primary color scheme will be based on the **Zinc** shades from Tailwind CSS to achieve the desired dark, minimalist aesthetic.
*   **Configuration:**
    *   Update `tailwind.config.ts` to ensure the Zinc palette is correctly configured.
    *   Modify `src/app/(frontend)/(routes)/globals.css` to set the base background and foreground colors using CSS variables derived from the Zinc palette, as per Shadcn/UI theme conventions. This will ensure all components adopt the theme.

## 5. Functionality and Logic

### Frontend (`/waitlist/page.tsx`)

*   This will be a Client Component (`'use client'`) to handle user interaction and state.
*   **State Management (`useState`):**
    *   `email`: To store the value of the email input.
    *   `isLoading`: A boolean to manage the form's submission state.
    *   `error`: To store any error messages from the API.
    *   `success`: A boolean to indicate a successful submission.
*   **Form Handling:**
    *   Use `react-hook-form` for robust form state management.
    *   Use `zod` to define a schema for email validation.
*   **API Interaction:**
    *   On form submission, an asynchronous function will be called.
    *   This function will send a `POST` request to the `/api/waitlist` endpoint with the user's email.
    *   It will handle the response, setting the `success` or `error` state accordingly, and trigger a `Toast` notification.

### Backend (`/api/waitlist`)

*   A new `POST` handler will be added to the Elysia instance in `route.ts`.
*   **Validation:** It will use Elysia's built-in validation powered by `zod` or a similar library to ensure the request body contains a valid email address.
*   **Business Logic:**
    *   Process the validated email (e.g., save it to a database, a file, or an external service).
    *   Return a `200 OK` response on success.
    *   Return an appropriate error response (e.g., `400 Bad Request` for invalid data, `500 Internal Server Error` for processing failures).

## 6. 3D Effects Integration

*   **Library:** `react-three-fiber` and `drei` will be used to integrate a Three.js scene declaratively within the React component tree.
*   **Component:** The 3D scene will be encapsulated in its own component (`src/components/canvas/scene.tsx`).
*   **Performance:**
    *   The 3D component will be dynamically imported using `next/dynamic`.
    *   It will be wrapped in a `Suspense` boundary with a fallback loader to prevent it from blocking the initial page render.
*   **Placement:** The canvas will be rendered as a background element, positioned using CSS (`z-index`, `position: absolute`) to not interfere with the UI content.

## 7. Step-by-Step Implementation Plan

1.  **Project Setup:** Create the new directories and files outlined in the **File Structure** section.
2.  **Theme Configuration:** Adjust `globals.css` and `tailwind.config.ts` to implement the Zinc dark theme.
3.  **Backend Development:** Implement the `POST /api/waitlist` endpoint in the Elysia server, including validation and placeholder logic for saving the email.
4.  **Frontend Layout:** Build the static UI for the waitlist page using the planned Shadcn/UI components.
5.  **Frontend Logic:** Wire up the form with `react-hook-form`, `zod`, and implement the state management and API call logic.
6.  **3D Integration:** Install 3D dependencies, create the `scene.tsx` component, and integrate it into the waitlist page using dynamic import and `Suspense`.
7.  **Styling & Polish:** Refine the layout, spacing, and responsive behavior to ensure a clean, minimalist presentation.
8.  **Feedback Implementation:** Integrate the `Toast` component to provide clear feedback to the user on form submission.
