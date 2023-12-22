# MoustacheRepublic Developer Test

## Project Overview

This project has two main folders, frontend and backend. The frontend folder includes a nextjs app, using the pages router

The frontend and backend should both be run using docker, with the included docker-compose file

Live URL: https://tshirt-shop.vercel.app/

GitHub repo: https://github.com/jasontcrabtree/tshirt-shop

## Local Development

1. Install Docker https://www.docker.com/get-started/
2. Download the GitHub repository to your local machine using `gh repo clone jasontcrabtree/tshirt-shop`
3. Navigate into the folder using `cd tshirt-shop`
4. Start docker via cli command `docker-compose up --build`. We pass the --build flag to create a new build on our local machine
5. Add new packages within docker via `docker-compose exec next-app npm install <package-name>`.

## Deploying the project

The frontend application uses NextJS, which can be deployed via Vercel. When deploying on Vercel, select the GitHub repository and then edit the root directory from the default of `.` to `frontend`.

This ensures Vercel identifies the project as a NextJS project and deploys correctly.

## Requirements

- [x] Docker compose setup with Monorepo
- [ ] Frontend UI
- [ ] Shopping cart UI
- [ ] Frontend shopping cart state & hook, with error handling
- [ ] Mini Cart API (frontend/backend)
  - [ ] getCart()
  - [ ] createCart()
  - [ ] updateCart()
- [ ] Persist cart state in SQLite
- [ ] Automated tests (functional, unit)
