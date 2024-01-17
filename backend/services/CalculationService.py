import time
import concurrent.futures
import threading
from controllers.transaction import find_max_id
from controllers.profit import calculate_portoflio

last_transaction_id = 0

# Function to process transactions
def background_task(app):
    with app.app_context():
        log_message = 'Updating users portfolios'
        print(f'127.0.0.1 - - [{time.strftime("%d/%b/%Y %H:%M:%S")}] "{log_message}"')
        calculate_portoflio()

# Periodically run the background task
def periodic_task(app):
    def job():
        background_task(app)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        while True:
            future = executor.submit(job)
            time.sleep(5)  # Sleep for 5 seconds before the next iteration

# Start the scheduling in a separate thread
def start_periodic_task(app):
    global periodic_thread
    if 'periodic_thread' not in globals() or not periodic_thread.is_alive():
        periodic_thread = threading.Thread(target=periodic_task, args=(app,))
        periodic_thread.start()
        return True
    else:
        return False
