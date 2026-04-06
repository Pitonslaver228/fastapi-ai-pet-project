# FastAPI AI Pet Project

Небольшое веб-приложение с бэкендом на FastAPI и простым фронтендом на HTML/CSS/JavaScript.

## Что умеет
	•	отправляет текстовый запрос в Gemini
	•	получает ответ от модели
	•	сохраняет запрос и ответ в базу данных (SQLite) по IP юзера
	•	показывает историю чата (запрос-ответ) для текущего IP

## Стек
	•	FastAPI
	•	SQLAlchemy
	•	SQLite
	•	Google Gemini API
	•	HTML / CSS / JavaScript

## Переменные окружения

Создайте файл .env в корне проекта:

API_KEY=your_gemini_api_key

## Установка зависимостей

Если используется uv:

uv sync

Или установить зависимости вручную:

uv add fastapi uvicorn sqlalchemy google-genai python-dotenv

## Запуск бэкенда

uv run uvicorn main:app --reload

Сервер будет доступен по адресу:

http://127.0.0.1:8000

Swagger UI:

http://127.0.0.1:8000/docs

## Запуск фронтенда

Необходимо перейти в /frontend и запустить простой сервер:

python -m http.server 5500

После этого открыть:

http://localhost:5500

## API endpoints

## GET /requests

Возвращает историю запросов текущего пользователя.

## POST /requests

Отправляет prompt в Gemini, сохраняет результат и возвращает ответ.

Пример body:

{
  "prompt": "Привет, расскажи про FastAPI"
}

## PS
	•	файл .env должен быть добавлен в .gitignore
	•	для фронтенда должен быть разрешён CORS
	•	БД requests.db создаётся автоматически при запуске приложения
