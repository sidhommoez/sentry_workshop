# Sentry Workshop Project

This project demonstrates a Sentry workshop in a gamified way with challenges in both **Node.js** and **Python**. The repository contains two separate directories:

- `/nodeJS`: Contains the Node.js application.
- `/python`: Contains the Python (Flask) application.

## Contents

- [Node.js Application Setup](#nodejs-application-setup)
- [Python (Flask) Application Setup](#python-flask-application-setup)

## Node.js Application Setup

The `nodeJS` directory contains a Node.js application with various routes designed to demonstrate Sentry's error-tracking and performance monitoring capabilities.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 16 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Navigate to the `nodeJS` directory:

    ```bash
    cd nodeJS
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

### Environment Configuration

Create a `.env` file in the `nodeJS` directory with your Sentry DSN:

```bash
SENTRY_DSN=YOUR_SENTRY_DSN
```

Replace YOUR_SENTRY_DSN with your actual Sentry DSN.

### Running the Application
Start the Node.js application:

```bash
node app.js
```

The application will run on [http://localhost:3000](http://localhost:3000).

### Available Routes

- **Basic Error Identification**: [http://localhost:3000/error](http://localhost:3000/error)
- **API Call Failure with Breadcrumbs**: [http://localhost:3000/api-call](http://localhost:3000/api-call)
- **Performance Monitoring Route**: [http://localhost:3000/slow-route](http://localhost:3000/slow-route)
- **Custom Alerts and Issue Management**: [http://localhost:3000/custom-alert](http://localhost:3000/custom-alert)
- **Advanced Error Debugging**: [http://localhost:3000/conditional-error?input=trigger](http://localhost:3000/conditional-error?input=trigger)

## Python (Flask) Application Setup


## Python (Flask) Application Setup

The `python` directory contains a Python application built with Flask that also demonstrates Sentry's error tracking and performance monitoring.

### Prerequisites

- [Python](https://www.python.org/) (version 3.7 or later)
- [pip](https://pip.pypa.io/en/stable/) (Python package installer)

### Installation

1. Navigate to the `python` directory:

    ```bash
    cd python
    ```

2. Create and activate a virtual environment:

    ```bash
    # On macOS
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

### Environment Configuration

Create a `.env` file in the `python` directory with your Sentry DSN:

```bash
SENTRY_DSN=YOUR_SENTRY_DSN
```

### Running the Application

Start the Flask application:

```bash
python app.py
```

The application will run on http://localhost:5000.

### Available Routes

- **Basic Error Identification**: [http://localhost:5000/error](http://localhost:5000/error)
- **API Call Failure with Breadcrumbs**: [http://localhost:5000/api-call](http://localhost:5000/api-call)
- **Performance Monitoring Route**: [http://localhost:5000/slow-route](http://localhost:5000/slow-route)
- **Custom Alerts and Issue Management**: [http://localhost:5000/custom-alert](http://localhost:5000/custom-alert)
- **Advanced Error Debugging**: [http://localhost:5000/conditional-error?input=trigger](http://localhost:5000/conditional-error?input=trigger)
