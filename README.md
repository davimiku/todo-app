# Todo App

This repository contains a sample TODO app that runs in a web browser with a mocked API server.

## Setup Instructions

1. Clone this repository to a local folder

```sh
git clone git@github.com:davimiku/todo-app.git

# or, for HTTPS
git clone https://github.com/davimiku/todo-app.git

cd todo-app
```

2. Install Dependencies

```sh
npm install
```

3. Create an `.env` file at the root of the repository, i.e. at the same level as the "package.json"

Add the API key in this file using the `key=value` syntax where the key is `VITE_API_KEY`.

```ini
VITE_API_KEY=<api-key>
```

4. Run the application in the development server

```sh
npm run dev
```

## Technologies Used

- Language: TypeScript
- Framework: React
- Testing: Vitest
- Build Tooling: Vite
- Linting: ESLint
- Formatting: Prettier
