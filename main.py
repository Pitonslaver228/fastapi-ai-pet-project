from contextlib import contextmanager

from fastapi import FastAPI, Body

from gemini_client import get_answer_from_gemini

from contextlib import asynccontextmanager

from db import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(engine)
    print("Все таблицы созданы")
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/requests")
def get_my_requests():
    return "Hello, World!"

@app.post("/requests")
def send_prompt(
        prompt = Body(embed=True)
):
    answer = get_answer_from_gemini(prompt)

    return {"answer": answer}
