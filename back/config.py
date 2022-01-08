from dotenv import load_dotenv
import os

def conf():
    load_dotenv(".config")
    config = {
        "HOST":os.getenv('HOST'),
        "DATABASE":os.getenv('DATABASE'),
        "USERNAME":os.getenv('DBUSER'),
        "PASSWORD":os.getenv('PASSWORD'),
        "TOKEN_KEY":os.getenv('TOKEN_KEY'),
    }
    return config