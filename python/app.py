from flask import Flask, request, jsonify
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

# Initialize Sentry
sentry_sdk.init(
    dsn="https://b18ee639bbf61c970c22a007b3f8ea20@sentry.prod.services.adup.dev/233",  # Replace with your actual Sentry DSN
    integrations=[FlaskIntegration()],
    traces_sample_rate=1.0  # Adjust this rate to control performance monitoring sampling
)

app = Flask(__name__)

# Level 1: Basic Error Identification
@app.route('/error')
def trigger_error():
    division_by_zero = 1 / 0  # This will cause a ZeroDivisionError
    return str(division_by_zero)

# Level 2: Context and Breadcrumbs
@app.route('/api-call')
def api_call():
    try:
        response = requests.get('http://invalid-url')  # This will fail
        response.raise_for_status()
    except Exception as e:
        sentry_sdk.capture_exception(e)  # Capture the exception in Sentry
        return jsonify({"error": "API call failed!"}), 500

    return jsonify(response.json())

# Level 3: Performance Monitoring
@app.route('/slow-route')
def slow_route():
    # Simulating a slow response
    import time
    time.sleep(5)  # Wait for 5 seconds
    return "This route is slow due to simulated delay!"

# Level 4: Alerts and Issue Management
@app.route('/custom-alert')
def custom_alert():
    # This route will generate a custom alert in Sentry
    raise ValueError("This is a custom ValueError!")

# Level 5: Advanced Error Debugging
@app.route('/conditional-error')
def conditional_error():
    input_value = request.args.get('input', '')
    if input_value == 'trigger':
        raise RuntimeError("Conditional Error Triggered!")
    return "No error triggered."

if __name__ == "__main__":
    app.run(debug=True)
