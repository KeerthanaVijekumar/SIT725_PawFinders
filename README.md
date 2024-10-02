<div align="center">
  <a href="https://tridiamond.tech" target="_blank" rel="noopener noreferrer">
    <img width="120" alt="PawFinders Logo" src="/public/src/logo.png">
  </a>
  <br/>
  <h1> <b> PawFinders </b></h1>
  <strong>PawFinders is a platform dedicated to helping pet owners connect with reliable dog walkers and manage their pets' care with ease. With features like real-time updates, booking notifications, and reviews, PawFinders ensures a smooth experience for both dog owners and dog walkers.</strong>

</div>

<br/>

<p align="center">
  <img alt="NPM Version" src="https://img.shields.io/badge/npm-10.1.0-red">
  <img alt="NODE Version" src="https://img.shields.io/badge/NodeJS-20.9.0-red">
  <img alt="MongoDB Version" src="https://img.shields.io/badge/MongoDB-7.0.0-green">
</p>

This is a public repository for the SIT725 group project, PawFinders. The project aims to simplify pet care by providing a platform where pet owners can search for dog walkers based on location, book and manage dog walkers for the services they require. Dog walkers can register, offer their services, manage their profiles, and confirm bookings with ease.


## Team Members

1. Keerthana Vijekumar – 224719679
2. Sandali Samarawickrama – 224390537
3. Sakthia Rajapandian – 224789408
4. Prikshit Rai – 224689912
5. Bhavesh Arya – 223829694

## Features

## 1. Dog Owner Features
### 1.1. Signup and Login
- Users can create an account as a dog owner.
- The system validates the user.
- The system ensures the security of user credentials.
### 1.2. Profile Management
- Dog owners can view their profiles, including personal details.
### 1.3. Search for Dog Walkers
- Owners can search for dog walkers based on location.
### 1.4. Booking Services
- Owners can book service for the selected dog walker.
### 1.5 Booking Notifications
- Notifications for bookings, updates, and cancellations are sent to dog owner.
### 1.5. Real-Time View
- The profile information will be updated dynamically based on the logged-in user.
### 1.6. Reviews
- After a dog walk, owners can leave reviews and ratings for dog walkers.

## 2. Dog Walker Features
### 2.1. Signup and Login
- Users can create an account as a dog walker.
- The system validates the user.
- The system ensures the security of user credentials.
### 2.2. Profile Management
- Walkers can view their profiles, including personal details.
### 2.3. Confirm and View Bookings
- Walkers receive notifications when a new booking is made.
- They can confirm or decline bookings based on their availability.
- Confirmed bookings include all relevant details such as date, time, location, and services.


## Installation

To run the project locally, follow these steps:


##### Docker installation

01. cd /project/docker file
   cd into the path where docker file located in our project.
  ``` bash
  docker build -t pawfinders .
  ```

  ``` bash
  docker run -p 3041:3041 pawfinders
  ```
02. Then open your browser and go to 
  ```
  http://localhost:3041
  ```
##### Running program in the Linux/Windows system

01. Clone the repository:

   ```
   git clone https://github.com/KeerthanaVijekumar/SIT725_PawFinders.git
   ```
02. Under the root directory, execute: 

  ```
  npm start
  ```

03. Then open your browser and go to 
  ```
  http://localhost:3041
  ```

