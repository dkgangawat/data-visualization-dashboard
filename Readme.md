# data visualization Dashboard

This project is a full-stack application with a React client and an Express server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

## Installing

1. download the code.

### Server setup

1. navigate to the server

```bash
cd server

```

2. install dependencies

```bash
npm install
```

3. make sure to add .env file if not exist

```
PORT = 8080
MONGO_URI = "Your mongoDB URL"
JWT_SECRET_KEY = " your jwt key"

```

4. start the server

```bash

npm run dev

```

or

```
node index.js
```

### client setup

1. now navigate to the Client folder

```bash
cd client
```

2. make sure .env file is also present in client folder if not create one

```
VITE_API_URL = http://localhost:8080

```

3. install dependencies

```bash

npm install
```

3. run the client

```bash
npm run dev

```
