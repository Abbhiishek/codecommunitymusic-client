# Stop all running containers
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)

# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create my_network

# Build dev
# Note: Keep v1 command until "Use Docker Compose v2" is enabled by default for Docker Desktop for Linux
# Docker aliases `docker-compose` (v1 command) to `docker compose` (v2 command), but not the other way around
docker-compose -f dev.docker-compose.yml up --build --force-recreate --renew-anon-volumes

