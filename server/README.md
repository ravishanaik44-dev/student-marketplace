# Second-Hand Student Marketplace - Backend 

REST API built with Node.js, Express, Sequelize ORM and MySQL.

## Setup
1. Install dependencies: npm install
2. Create a MySQL database named marketplace_db
3. Create a .env file with these lines:
   DB_NAME=marketplace_db
   DB_USER=root
   DB_PASS=
   DB_HOST=localhost
   PORT=5000
4. Add sample data: node seed.js
5. Start the server: npx nodemon app.js

## Database Design
- Users (id, name, email unique, phone)
- Items (id, title, description, price, category, status, UserId)
- Offers (id, amount, message, ItemId, UserId)

Associations:
- One User has many Items (1:M)
- One Item has many Offers (1:M)
- One User makes many Offers (1:M)

## Validations
- User email must be a valid and unique email
- Item price and offer amount must be at least 1
- Item status is either available or sold

## API Endpoints

### Users
| Method | Endpoint | Description | Success |
|---|---|---|---|
| GET | /api/users | Get all users | 200 |
| POST | /api/users | Create a user | 201 |

### Items
| Method | Endpoint | Description | Success |
|---|---|---|---|
| GET | /api/items | Get all items with seller | 200 |
| GET | /api/items/:id | Get one item | 200 (404 if not found) |
| POST | /api/items | Add an item | 201 (400 if invalid) |
| PUT | /api/items/:id | Update an item | 200 (404 if not found) |
| DELETE | /api/items/:id | Delete an item | 204 (404 if not found) |
| GET | /api/items/search?category=books&minPrice=100&maxPrice=500 | Advanced filter | 200 |
| GET | /api/items/top-offers | Raw SQL: highest offer and offer count per item | 200 |

Example body for POST /api/items:
{
  "title": "Study Table",
  "description": "Wooden, good condition",
  "price": 1200,
  "category": "furniture",
  "UserId": 1
}

### Offers
| Method | Endpoint | Description | Success |
|---|---|---|---|
| POST | /api/offers | Make an offer on an item | 201 (404 if item missing, 400 if invalid) |
| GET | /api/offers/item/:itemId | Get all offers on an item | 200 |
| DELETE | /api/offers/:id | Delete an offer | 204 (404 if not found) |

Example body for POST /api/offers:
{
  "amount": 1000,
  "message": "Can you do 1000?",
  "ItemId": 1,
  "UserId": 2
}

## Status Codes
- 200 OK, 201 Created, 204 No Content
- 400 Bad Request (validation failed)
- 404 Not Found
- 500 Server Error

## Postman
Import Marketplace.postman_collection.json into Postman to test all endpoints.