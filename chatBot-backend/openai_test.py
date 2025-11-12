import os
from dotenv import load_dotenv
from pathlib import Path
import openai
import traceback

# load .env next to this file
here = Path(__file__).resolve().parent
env_path = here / '.env'
if env_path.exists():
    load_dotenv(env_path)

openai.api_key = os.getenv('OPENAI_API_KEY')
try:
    resp = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{'role':'user','content':'Hello'}],
        max_tokens=1
    )
    print('OK')
    print(resp)
except Exception:
    traceback.print_exc()
