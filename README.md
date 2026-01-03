🎮 GamesHub

GamesHub is a sleek, high-performance game discovery platform built with React and powered by the RAWG Video Games Database API. It offers a seamless way for users to explore over half a million games, search for specific titles, and view detailed information including metacritic scores, genres, and screenshot galleries.

🚀 Key Features

Live Search with Debouncing: Optimized search functionality that updates as you type. It utilizes a custom "debounce" logic to minimize API calls and ensure a smooth user experience.

Infinite Pagination: Browse an endless catalog of games using the "Load More" feature, which dynamically appends data batches of 20 games to the existing list.

Dynamic Discovery Grid: A responsive, dark-themed grid layout showcasing game posters, titles, and professional critic scores.

Interactive Details Modal: A "Big Div" overlay that provides an immersive look at specific games, including release dates, platform compatibility, and a dedicated screenshot gallery.

Metacritic Integration: Professional scores are color-coded (Green/Yellow/Red) to provide instant visual feedback on game quality.

🛠️ Tech Stack

Framework: React.js

API: RAWG API

Styling: Custom CSS (including Backdrop Blurs and Flexbox/Grid systems)

State Management: React Hooks (useState, useEffect)

📦 Getting Started

Follow these steps to get the project up and running locally:

1. Clone the repository

git clone [https://github.com/your-username/gameshub.git](https://github.com/ryuma04/GamesHub.git)
cd GamesHub


2. Install dependencies

npm install


3. Get your API Key

Go to RAWG.io and create a free account.

Generate your personal API Key.


4. Start the development server

npm run dev


📈 Learning Milestones

Building this project involved mastering several core React and Frontend concepts:

Asynchronous Data Handling: Fetching and parsing data from a third-party REST API.

Component Architecture: Creating reusable sub-components like SearchBar, GameCard, and GameDetail.

Prop Drilling & Lifting State: Synchronizing data flow between the search bar and the main application container.

Optimizing Performance: Implementing cleanup functions in useEffect to manage timers and prevent memory leaks.

Built with ❤️ as a React learning project.
