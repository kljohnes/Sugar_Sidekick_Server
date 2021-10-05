# SUGAR SIDEKICK SERVER

## DEPLOYED URL: https://sugar-sidekick-client.herokuapp.com/

This is the server side for Sugar Sidekick, an app designed to assist with the management of information related to diabetes. Please see the Sugar Sidekick Client readme for further information.

## The server establishes the following tables: 
1. Users
2. Logs
3. Prescriptions
4. Profile
### The server establishes full CRUD capabilities for each of these tables. Some of these capabilities have yet to be implemented on the client side.

## Database Associations
Users have many logs and prescriptions. A user has only one profile.

## Role Based Access Control
Only admins have access to get a list of all users. Admins can edit and delete users.

## Technologies Used
* JavaScript
* PostgreSQL
* Node
* Express
* Sequelize
* JWT
* Bcrypt

## Start script
node app.js

 