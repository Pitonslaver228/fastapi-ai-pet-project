from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    gemini_api_key: str = os.getenv("API_KEY", "")

config_obj = Config()

client = genai.Client(api_key=config_obj.gemini_api_key)


def get_answer_from_gemini(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
    )

    return response.text
