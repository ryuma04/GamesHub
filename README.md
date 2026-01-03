# 🎮 GamesHub

GamesHub is a sleek, gaming platform built with React and powered by the RAWG Video Games Database API. It offers a seamless way for users to explore different games based on its search for specific titles, and view detailed information including metacritic scores, genres, and screenshot galleries.

## 🚀 Key Features

- **Infinite Pagination**: Browse an endless catalog of games using the "Load More" feature, which dynamically appends data batches of 20 games to the existing list.

- **Dynamic Discovery Grid**: A responsive, dark-themed grid layout showcasing game posters, titles, and professional critic scores.

- **Metacritic Integration**: Professional scores are color-coded (Green/Yellow/Red) to provide instant visual feedback on game quality.

## 🛠️ Tech Stack

- **Framework**: React.js
- **API**: RAWG API
- **Styling**: Custom CSS 

## 📦 Getting Started

Follow these steps to get the project up and running locally:

### 1. Clone the repository

```bash
git clone https://github.com/ryuma04/GamesHub.git
cd GamesHub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get your API Key

1. Go to [RAWG.io](https://rawg.io/apidocs) and create a free account.
2. Generate your personal API Key.
3. Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_api_key_here
```

### 4. Start the development server

```bash
npm run dev
```

## 📈 Learning Milestones

Building this project involved mastering several core React and Frontend concepts:

- **Asynchronous Data Handling**: Fetching and parsing data from a third-party REST API.
- **Component Architecture**: Creating reusable sub-components like `SearchBar`, `GameCard`, and `GameDetail`.
- **Prop Drilling & Lifting State**: Synchronizing data flow between the search bar and the main application container.

---

Built as a React learning project.
