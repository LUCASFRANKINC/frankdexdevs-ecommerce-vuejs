# Frank Dex Devs eCommerce Project (Vue 3 + TypeScript)

Simple e‑commerce demo built with Vue 3 Composition API, TypeScript, Pinia, Axios and Tailwind CSS.

Thanks to Laracasts, I came about learning Vue 3, but for the project, I went on to learn some more features, including:
- Typescript Usage for type safety
- Creating types to use as interfaces for TS and mapping them to the project
- RouterLink Usage
- using router.push, etc.

I was able to learn much more, since Laracasts was quite limited on the content, but that's crucially enough to get you up and running. This project will sure show you how to get quick into the framework and hopefully make you enjoy.

> Rank this project to be used by other Vuewers...It's got too much dedication to get here 🤩

## Key points
1. Framework: Vue 3 (Composition API) with TypeScript.
2. Styling: Tailwind CSS.
3. State: Pinia (cart store at `src/stores/cart.ts`).
4. Data: products fetched from `http://localhost:3001/products` (example uses Axios).
5. Routing: Vue Router — category filter syncs with route query.

## Features
1. Product listing with category filtering.
2. Modal-based filter UI (component: `src/components/ModalView.vue`).
3. Item rendering component: `src/components/products/ItemView.vue`.
4. Add to cart capabilities using Pinia.
5. Cart items increment/decrement capabilities
6. Decrement item to 0 clears it from cart map object
7. Allow removing item from map object by clicking on the 'x' button
8. Checkout cart clears all items and routes to products list
9. Listing Product items with proper category backtrack on breadcrumbs

## Project structure (important files)
1. `src/components/NavbarView.vue` — top navigation and counter display.
2. `src/components/products/ItemView.vue` — product list renderer.
3. `src/components/ModalView.vue` — generic modal used for filters.
4. `src/stores/cart.ts` — Cart Pinia store.
5. `@/types/products` — product TypeScript type definitions.
6. `src/components/products/CartView.vue` - cart items renderer

## Quick start
1. Prerequisites: Node.js and npm installed.
2. Clone the repo:
    - `git clone git@github.com:LUCASFRANKINC/frankdexdevs-ecommerce-vuejs.git`
3. Install:
    - `npm install`
4. Run the local server using `npm run dev`, which runs the json server as shown below:
    - `npx json-server db.json --port 3001`
    - Ensure `products.json` contains a `products` collection or point the app to another API.

## Notes & implementation details
1. Products are loaded using Axios in a `getProducts` function. Errors are currently logged to the console.
2. Categories are computed from products: `['all', ...new Set(products.map(...))]`.
3. `categorySelected` syncs with the route query on mount and via a `watch` that calls `router.replace`. This may replace other query params if present.
4. Modal open state is controlled by a `showModal` ref. Radio inputs bind to `categorySelected`.

## Known improvement areas
1. Handle API errors more robustly (return empty array on failure).
2. Preserve additional route query params when updating category.
3. Add unit tests & CI.
4. Add an explicit LICENSE file if open sourcing.

## Contributing
1. Open issues or PRs on the repository.
2. Follow existing TypeScript + Vue patterns and Tailwind classes.

## License
See repository for license information (not included in code headers).
