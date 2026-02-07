# Project Rules & Guidelines - MEDVIDA

## Tech Stack
*   **Framework:** React 19+ with TypeScript for type-safe development.
*   **Build Tool:** Vite for fast development and optimized builds.
*   **Styling:** Tailwind CSS for all UI styling (utility-first approach).
*   **Icons:** Lucide React for consistent vector iconography.
*   **Navigation:** Currently using state-based navigation; migrate to React Router for complex routing needs.
*   **Components:** Small, focused functional components (aim for < 100 lines).
*   **Design System:** shadcn/ui for high-quality, accessible UI components.

## Library & Implementation Rules

### 1. Styling & UI
*   Use **Tailwind CSS** classes exclusively. Avoid custom CSS files unless strictly necessary for complex animations.
*   Prefer **shadcn/ui** for complex components like Dialogs, Popovers, or Forms.
*   Maintain the project's "Premium Health" aesthetic: high contrast, large typography, and heavy use of rounded corners (`rounded-[3rem]`).

### 2. Icons
*   Always use **Lucide React** for icons. 
*   Avoid using external image-based icon services (like Icons8) for interface elements to ensure better loading performance and theme consistency.

### 3. File Structure
*   **Pages:** Place top-level views in `src/pages/`.
*   **Components:** Place reusable UI elements in `src/components/`.
*   **Types:** Maintain global interfaces and enums in `src/types.ts`.
*   **Constants:** Store mockup data and configuration in `src/constants.tsx`.

### 4. Development Patterns
*   Use **Functional Components** with hooks.
*   Implement **Responsive Design** for every component (Mobile-first).
*   Use the `PulseLoader` for significant page transitions to maintain the "ECG/Heartbeat" brand identity.
*   Keep `App.tsx` as the central hub for routing and global state management.

### 5. Data & Integration
*   Use **Supabase** for database, authentication, and server-side logic when required.
*   Handle errors gracefully by allowing them to bubble up for the global handler or using Toasts for user notification.