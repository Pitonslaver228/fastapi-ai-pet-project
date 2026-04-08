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

## Примеры использования
<img width="1919" height="994" alt="image" src="https://github.com/user-attachments/assets/f26b309a-2cf0-4fc1-a8bd-d3cd9c906dd7" />

<img width="1919" height="993" alt="image" src="https://github.com/user-attachments/assets/771043ca-f46e-4782-8a4a-20597fad4812" />

<img width="1918" height="991" alt="image" src="https://github.com/user-attachments/assets/9852c000-d18a-44d5-8452-528d811761d1" />

<img width="1919" height="992" alt="image" src="https://github.com/user-attachments/assets/aa746681-adcd-45cb-8c28-f965dde1d04d" />




