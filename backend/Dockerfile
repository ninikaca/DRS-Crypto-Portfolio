# Use a slim Python image as the base
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy just the requirements file and install dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port will listen on
EXPOSE 5001

ENV FLASK_APP=index.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5001

CMD ["flask", "run", "--host=0.0.0.0", "--port=5001"]