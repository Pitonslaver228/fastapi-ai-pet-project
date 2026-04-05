from contextlib import contextmanager

from fastapi import FastAPI, Body, Request

from gemini_client import get_answer_from_gemini

from contextlib import asynccontextmanager

from db import Base, engine, get_user_requests


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(engine)
    print("Все таблицы созданы")
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/requests")
def get_my_requests(request: Request):
    user_ip_address = request.client.host
    user_requests = get_user_requests(ip_address=user_ip_address)

    return user_requests


@app.post("/requests")
def send_prompt(
        prompt = Body(embed=True)
):
    answer = get_answer_from_gemini(prompt)

    return {"answer": answer}
