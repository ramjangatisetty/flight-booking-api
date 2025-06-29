# Flight Booking API

A RESTful API for a mock flight booking system built using **Node.js**, **Express**, and **MongoDB**.

## ✈️ Features

* Search available flights
* Book a flight
* Cancel a booking
* User registration and authentication
* MongoDB-based storage

## 🧰 Tech Stack

* Node.js
* Express
* MongoDB
* Mongoose
* dotenv
* MongoDB Compass (for GUI access)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ramjangatisetty/flight-booking-api.git
cd flight-booking-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flight-booking
```

> You can change `MONGODB_URI` based on your local or cloud MongoDB setup.

### 4. Start the Server

```bash
npm start
```

Server will be running at `http://localhost:5000`

## 📊 MongoDB Compass Setup

### Download Compass

* [MongoDB Compass Download](https://www.mongodb.com/try/download/compass)

### Connect Compass to Local DB

* Connection String:

  ```
  mongodb://localhost:27017/flight-booking
  ```
* Open `flights`, `users`, `bookings` collections

## 🌱 Seed Sample Data

### Seed Using CLI

```bash
mongoimport --db flight-booking --collection flights --file seed/flights.json --jsonArray
```

> Make sure MongoDB is running before executing the above.

### Seed Using Mongo Shell

```bash
mongo
use flight-booking
db.flights.insertMany(require('./seed/flights.json'))
```

## 🔎 Sample API Endpoints

### Get All Flights

```http
GET /api/flights
```

### Book a Flight

```http
POST /api/bookings
Content-Type: application/json

{
  "userId": "123456",
  "flightId": "abcdef"
}
```

### Cancel Booking

```http
DELETE /api/bookings/:bookingId
```

## 🚀 Future Improvements

* Add payment gateway integration
* Improve user session management with JWT refresh tokens
* Add Swagger/OpenAPI documentation

## 🤝 Contributions

Feel free to fork this repo and raise a pull request.

## 📄 License

MIT
