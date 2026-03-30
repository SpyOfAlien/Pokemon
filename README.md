# Pokemon SSR

## 🛠 Tech Stack

*   **Framework:** Next.js 16 (App Router)
*   **Architecture:** React Server Components (RSC)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **Package Manager:** pnpm

## 🏗 Architecture & Design Decisions

### UI & Component Structure
The UI is strictly built using the **Composition Pattern**, promoting reusability and keeping components decoupled.
*   **Components:** `PageHeader`, `TypeFilterList` (composing `TypeFilterItem`), `PokemonGrid`, `PokemonCard`, and `Pagination`.
*   **Responsive Design:** Uses an adaptive CSS grid (`grid-cols-2` scaling up to `grid-cols-6` on large screens) for displaying Pokemon cards.

### Data Layer (PokeAPI)
*   **Data Source:** Fetches directly from [PokeAPI v2](https://pokeapi.co/api/v2) during the server-render phase.
*   **Multi-Type Filtering (Intersection):** Since the standard PokeAPI does not support filtering by multiple types via a single REST call, the server uses `Promise.all` to fetch all selected types concurrently. It then performs an **intersection (AND logic)** between the results. For example, selecting both "fire" and "water" will only return Volcanion.

## 🚀 Getting Started

First, install the dependencies using pnpm:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
