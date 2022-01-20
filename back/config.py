from dotenv import load_dotenv
import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

def conf():
    load_dotenv(ROOT_DIR+"/.config")
    config = {
        "HOST": os.getenv('HOST'),
        "DATABASE": os.getenv('DATABASE'),
        "USERNAME": os.getenv('DBUSER'),
        "PASSWORD": os.getenv('PASSWORD'),
        "TOKEN_KEY": os.getenv('TOKEN_KEY'),
        "Authorization": os.getenv('Authorization'),
    }
    return config