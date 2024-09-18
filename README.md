
## Goal

Modify the provided Vue 3 app to match [this mock](https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project) as closely as possible while utilizing best-practices to improve the codebase and implement the functional requirements outlined below.

- The provided exercise files are a starting point and they have room for improvement; feel free to modify
- Don't treat the mock as gospel -- if you see things that don't make sense, ask questions or implement what you think is right
- In the exercise you are utilizing a local API; however, code your submission as if you are using a production API, accounting for typical issues that can occur



## Functionality Overview

- Users can view the name, brief description, available versions, and additional information for each service as depicted in the mockups.
- Users can search for services using the provided search endpoint.To improve performance and reduce the number of requests made to the server, a debouncing mechanism is implemented. This ensures that the search is performed only after the user has stopped typing for a brief period.
- Each service card in the list is interactive. When a user clicks on a service, a detailed view of the service is presented. A modal or popup window appears with the detailed information about the selected service. This popup provides an overlay on the current view, ensuring that the user remains focused on the service details without navigating away from the current page.
- The application supports client-side pagination, allowing users to navigate through multiple pages.A pagination bar is fixed at the bottom of the service list, ensuring that users can easily access pagination controls without having to scroll down to the bottom.

## Additional Functionalities

- Automatic Service Details Popup via Query Parameter:A query parameter has been added to the application, allowing users to access detailed information about a specific service directly via the URL. When a user navigates to a URL containing a id query parameter, the application automatically triggers a popup displaying the details of the specified service.

- The service title has been added to the popup, providing users with a clear and immediate identification of the service they are viewing. This enhancement was not part of the given design but adds significant value by helping users quickly understand which service details they are accessing.
- The header navigation bar has been made interactive with the addition of settings and organisation pages. The active and inactive states of the header menu items are handled.For mobile users, the header menu is converted into a breadcrumb navigation.


## Design Considerations

- Component-Based Architecture : Each functional area, such as the header, service cards,search, modal and pagination, has been split into individual components.Components can be individually tested and repurposed in other parts of the application or future projects.

- Fixed Header and Pagination: The header has been fixed at the top of the page to ensure consistent access to navigation options, enhancing usability and reducing the need for repetitive scrolling. Similarly, the pagination bar has been fixed at the bottom of the service list, allowing users to easily navigate through pages of services without losing their place.

- Scrollable Services Area: The main area where service cards are displayed is designed to be scrollable. This approach allows for the presentation of a large number of services within a confined space, avoiding excessive vertical scrolling.

- Responsiveness: The entire page has been designed to be fully responsive. This means that all elements, including the header, service cards, search bar, modal and pagination bar, adapt dynamically to different viewport sizes. Media queries and flexible layout techniques have been employed.

## Assumptions

- Client-Side Pagination: The application uses client-side pagination to navigate through services. It is assumed that this approach is suitable for the expected volume of data. For larger datasets or more complex requirements, server-side pagination or additional optimizations may be necessary.

- It is assumed that the performance of the application will be acceptable for the typical usage scenarios. This includes managing search queries, pagination, and rendering of service details. Performance optimizations, such as debouncing search queries, have been implemented.

- Error handling and Edge Cases: Basic error handling is assumed to be implemented, but it is expected that edge cases and error scenarios will be addressed as they arise. The application is designed to handle typical use cases and user interactions but may require additional handling for unforeseen issues.

## Trade Offs

- Non-functional "Create Service Package" button in the current phase.

## Technical Implementation

#### CSS Variables and Styling
- CSS Variables: All colors are managed through a variables.css file using CSS variables. This approach allows for easy updates and consistent color management by defining root-level variables.
- Global Styles: General styles, including text sizes and font styles, are defined in a global.css file. This file contains standard classes and styles applicable throughout the application, ensuring a uniform appearance.
- Scoped Styles: Component-specific styles are defined within individual Vue components using scoped CSS. This ensures that styles are applied only to their respective components, avoiding style conflicts and maintaining modularity.

#### State Management with Pinia

- The application utilizes Pinia for state management. Pinia is used to handle data fetching and manage application state, including pagination support. This centralized approach to state management enhances reactivity and maintainability. Pagination support is integrated into the store for efficient data navigation.

### Composables

Shared Functionality: Various composable functions are used to encapsulate reusable logic:
-  Debounced Search: Implements search optimization by delaying search queries until the user stops typing, improving performance.
- Extracting Developers: A function to extract and format developer-related information, used across multiple components for consistency.
- Date to Timeago: Converts dates to a "time ago" format for a user-friendly display of relative time.

### Component and Page Organization
- Views: Main pages are stored in the views folder, clearly separating page-level components from other application parts.
- Components: Reusable UI components are organized in the components folder. Components are managed with props and followed TypeScript type definitions to ensure type safety and clarity.

### Routing

- Vue Routers for Navigation: Vue Router is utilized to handle navigation within the application. This allows users to navigate between different views seamlessly.

- Default Route:By default, users land on the Home page, which renders the ServiceCatalog component, displaying the list of available services.


- Empty pages for "Settings" and "Organisations" have been created.These pages support the active/inactive states in the header navigation. They demonstrate the router setup and how navigation between different views works in the application.

### Component Testing

Tests for ServiceCatalog Component

- Renders Loading State Correctly: Tests the component's ability to render a loading indicator or message when services are being fetched.Ensures that the UI provides appropriate feedback to the user while data is being loaded.

- Renders Services Correctly: Verifies that the component displays the list of services accurately once the data is fetched. Checks if all service details, like name, description, and other relevant information, are rendered as expected.

- Opens and Closes the Modal Correctly:Tests the interaction where clicking on a service opens a modal with detailed information.Ensures that the modal can be opened and closed without any issues.
- Handles Empty Service State Correctly: Simulates the scenario where no services are available or the search returns no results.Verifies that the component handles this state gracefully, showing a user-friendly message or indicator instead of leaving the area blank or causing errors.

## Demo

[Demo Video](https://www.loom.com/share/c4fc3cf1379949819461a5087669df24?sid=3359e042-2cd0-41f2-90d2-15b2073c8c60)

## Project Setup

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Clone the repository

```sh
git clone git@github.com:Kong/konnect-team-interview-frontend-exercise.git
```

### pnpm

This repository uses [`pnpm`](https://pnpm.io) rather than `npm` or `yarn`. [See here for instructions on installing pnpm](https://pnpm.io/installation).

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `pnpm dev:server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
  id: string;
  name: string;
  description: string;
  type: string;
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
```

### Linting and fixing the code

#### ESLint

```sh
# Run the linter
pnpm lint

# Fix linting errors
pnpm lint:fix
```

#### Stylelint

```sh
# Run stylelint
pnpm stylelint

# Fix stylelint errors
pnpm stylelint:fix
```

### Run Component and Unit Tests with [Vitest](https://vitest.dev/) and optionally [Vue Test Utils](https://test-utils.vuejs.org/)

Component and unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`. In the starter project, see `src/components/ServiceCatalog.spec.ts` for an example.

```sh
# Run tests
pnpm test

# or run the tests in the Vitest UI
pnpm test:open
```

### Build and Minify for Production

```sh
pnpm build
```

### Preview your built application

First, you'll need to build the app

```sh
pnpm build
```

Next, run the API server

```sh
pnpm dev:server
```

Now run the `preview` command

```sh
pnpm preview
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar with conventional commits, it is **recommended** to use the following command in order to create your commits:

```sh
# Stage your changes
git add -A

# Trigger the commitizen CLI to help compose your commit message
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.
