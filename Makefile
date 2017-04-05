DOCKER_API_IMAGE_NAME = nap-api
DOCKER_WEBSTORE_IMAGE_NAME = nap-webstore

dev-build:
	docker-compose build

dev-up: dev-build
	docker-compose up #-d

dev-down:
	docker stop $(DOCKER_API_IMAGE_NAME) || true && \
 	docker rm $(DOCKER_API_IMAGE_NAME) || true && \
 	docker stop $(DOCKER_WEBSTORE_IMAGE_NAME) || true && \
	docker rm $(DOCKER_WEBSTORE_IMAGE_NAME) || true

ssh-api:
	docker exec -it $(DOCKER_API_IMAGE_NAME) /bin/sh

ssh-web:
	docker exec -it $(DOCKER_WEBSTORE_IMAGE_NAME) /bin/sh

reset:
	rm -rf apps/api/node_modules && \
	rm -rf apps/webstore/node_modules && \
	rm -rf apps/webstore/.next
