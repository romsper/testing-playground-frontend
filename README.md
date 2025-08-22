# Frontend Playground – Frontend Service for Testing Purposes

## Description
This project is a frontend service designed for practicing automated UI testing.  
It works together with the [testing-playground-backend](https://github.com/romsper/testing-playground-backend).  
If you are able to run this project, you have probably already read the README.  
Feel free to use this playground to improve your UI automation skills, experiment with the code, or contribute new features and improvements.

## Technologies Used
- Vue 3
- TypeScript
- Vite
- Pinia
- Docker (for easy containerized deployment)

## How to Run using Docker

### Docker Compose
This project provides a `docker-compose.yml` file for quick startup.

1. Make sure you have Docker or Docker Desktop installed.
2. Open a terminal and navigate to the root directory of the project.
3. Run:
```sh
   docker compose up
```
4. The frontend will be available at `http://localhost:4000`.

### Standalone Docker
You can also run the frontend using only Docker:
```sh
   docker build -t romsper/testing-playground-frontend .
   docker run -p 4000:4000 romsper/testing-playground-frontend
```

## How to Run Locally
1. Clone the repository.
2. Install dependencies:
```sh
   npm install
```
3. Start the development server:
```sh
   npx vite --port=4000
```
4. Open `http://localhost:4000` in your browser.

## Contribution
Don’t forget to star the project on GitHub, create Issues, and send Pull Requests with improvements!

## Telegram (RU)
This [romsper | QA Buddy](https://t.me/qa_api_playground) is my personal Telegram channel where I share my experience and knowledge about testing. I will be glad to see you there!

## License
This project is licensed under the MIT License.