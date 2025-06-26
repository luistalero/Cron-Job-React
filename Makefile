dev:
	docker-compose -f docker-compose.yml up --build -d

start:
	docker-compose start

stop:
	docker-compose stop

log:
	docker compose logs react-cron-job   
down:
	docker-compose down -v

clean:
	docker system prune -a