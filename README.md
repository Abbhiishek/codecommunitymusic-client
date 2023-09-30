## Code Community Music-Client Readme

Welcome to the Code Community Music-client. This Next.js application serves as the frontend for the Code Community Music. This README will guide you through the local setup process, including connecting with the backend server of this project.

## Prerequisites

- Node.js
- npm(node package manager)

## Setup Instructions

Open your terminal or command prompt.

Create a directory for your project:

```bash
  mkdir codeCommunityMmusic
  cd codeCommunityMusic
```

### Client

1. Clone the repository to your local machine.

```bash
  git clone https://github.com/Abbhiishek/codecommunitymusic-client.git
```

2. Go to the client directory

```bash
  cd codecommunitymusic-client
```

3. Install dependencies

```bash
  yarn
```

4. Start the server

```bash
  yarn dev
```

The client should be accessible at http://localhost:3000.

**_or_**

### Using docker

1. Clone the repository to your local machine.

```bash
  git clone https://github.com/Abbhiishek/codecommunitymusic-client.git
```

2. Go to the client directory

```bash
  cd codecommunitymusic-client
```

3. Build the docker image:

```bash
docker compose up
```

4.Run the docker container:

```bash
docker run -p 3000:3000 codecommunitymusic-client
```

### Server

For setting up the django backend server of this project, navigate to https://github.com/Abbhiishek/codecommunitymusic-server & follow the **Setup Instructions**.
