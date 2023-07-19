# Username & Password Breach Checker

This is a simple web application that allows users to check if their username and password has been compromised in any security breaches. If the user's information has been compromised, the application will display details about where and when the breach occurred.

## Technologies Used

- React
- create-react-app
- Node.js
- Express.js
- Typescript
- Material UI
- Styled Components
- Jest (for unit testing)

## Installation

To install and run the application, follow these steps:

1. Install dependencies for the client:

```
cd ./frontend
npm install
```

2. Start the client application:

```
cd ./frontend
npm start
```

3. Install dependencies for the server:

```
cd ./backend
npm install
```

4. Start the server:

```
node ./backend/dist/index.js
```

The client application will be accessible at `http://localhost:3000` and the server will be accessible at `http://localhost:5000`.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.

2. You will see a form with a field for entering an email address. Enter your email address in the field.

3. Click the "Check Breaches" button. The application will verify that the email address is correctly formatted before making any network requests.

4. The server will make a request to the `haveibeenpwned` API to retrieve a list of breaches associated with the email address.

5. The breaches will be displayed in a sortable and searchable table on the client application.
