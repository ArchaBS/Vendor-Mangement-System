# Vendor Management System

A full-stack Vendor Management System built with Django REST Framework (backend) and Angular (frontend).

## Features
- Vendor Registration and Login with JWT Authentication
- Protected API endpoints
- Product Management (Add, Edit, Delete, View)
- Each vendor manages their own products
- Product image support via URL
- Responsive UI with Bootstrap

## Technology
 Backend-- Django RESTAPI Framework
 Authorization--JWT (SimpleJWT)
 Frontend--Angular
 Styling--Bootstrap 5
 Database--SQLite (default)

## API Endpoints

 POST : /api/register/--> Vendor Registration 
 POST : /api/login/ --> Vendor Login (JWT)
 GET : /api/products/ --> List Products
 POST : /api/products/ --> Add Product
 PUT : /api/products/{id}/ --> Update Product 
 DELETE : /api/products/{id}/ --> Delete Product 


## Environment
- Backend runs on: http://127.0.0.1:8000
- Frontend runs on: http://localhost:4200

## Requirements

### Backend Requirements
  Python 3
  Django
  djangorestframework
  djangorestframework-simplejwt
  django-cors-headers


### Frontend Requirements
 Angular CLI


## Running the Project

### Backend

cd backend
python -m venv venv
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


### Frontend

cd frontend
npm install
ng serve


## Access
- Backend API: http://127.0.0.1:8000
- Frontend App: http://localhost:4200