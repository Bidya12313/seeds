from dotenv import dotenv_values


config = {
    **dotenv_values('.env_prod')
}


secret_key = config.get('SECRET_KEY')