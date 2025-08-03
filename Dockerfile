# 1. Використовуємо базовий образ Python 3.10
FROM python:3.10.9-slim

# 2. Встановлюємо робочу директорію в контейнері
WORKDIR /app

# 3. Копіюємо всі файли в контейнер
COPY . .

# 4. Встановлюємо залежності з requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 5. Виставляємо змінні середовища
ENV FLASK_APP=app/app.py
ENV FLASK_RUN_HOST=0.0.0.0

# 6. Відкриваємо порт
EXPOSE 5000

# 7. Запускаємо Flask
CMD ["flask", "run"]
