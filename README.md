# Voting Application

This is a backend application for a voting system where users can vote for candidates. It provides functionalities for user authentication, candidate management, and voting.

## Features

- User sign up and login with ID Card Number and password
- User can view the list of candidates
- User can vote for a candidate (only once)
- Admin can manage candidates (add, update, delete)
- Admin cannot vote

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   https://github.com/abbasibneakram/voting-app.git


# API Endpoints

## Authentication

### Sign Up
- `POST /api/v1/users/signup`: Sign up a user

### Login
- `POST /api/v1/users/login`: Login a user

## Candidates

### Get Candidates
- `GET /api/v1/candidates/`: Get the list of candidates

### Add Candidate
- `POST /api/v1/candidates/addCandidate`: Add a new candidate (Admin only)

### Update Candidate
- `PUT /api/v1/candidates/:id`: Update a candidate by ID (Admin only)

### Delete Candidate
- `DELETE /api/v1/candidates/:id`: Delete a candidate by ID (Admin only)

## Voting

### Get Vote Count
- `GET /api/v1/votes`: Get the count of votes for each candidate

### Vote for Candidate
- `POST /api/v1/votes/:id`: Vote for a candidate (User only)

## User Profile

### Get Profile
- `GET /api/v1/users/profile`: Get user profile information

### Change Password
- `PUT /api/v1/users/profile/password`: Change user password
