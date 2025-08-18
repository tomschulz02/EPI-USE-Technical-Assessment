EPI-USE Technical Assessment - Technical Documentation

Thomas Schulz

# Employee Management System

## Overview

The employee management system allows users to perform following actions on employee records:

- Manage employees (CRUD operations)
- Display organisation structure as a table and a hierarchical tree
- Search and sort employee records
- Gravatar integration for employee profiles

This application is a fully cloud-hosted solution to managing employees within your organisation.

## Architecture

The architecture of the application is split into a presentation, access, and service layer.

![Architecture Diagram](../imgs/Architectural%20Diagram.png)

### Presentation Layer

Users will interact with the application through the frontend on the presentation layer. A Model-View-Controller (MVC) pattern was chosen here to separate the frontend into three parts that each have their own purposes. This separation makes it easy to maintain, organise, and test the code and also helps delegate problems to the appropriate component that was created to handle them.

The frontend also makes direct API requests to the Gravatar API to fetch and display user profiles

### Access Layer

Within the access layer lies the API, which was created using the API Gateway architectural pattern. All requests to the service layer from the presentation layer, with exception of the Gravatar requests, will pass through the API. Therefore, the gateway pattern was used to help control access and the flow of requests to protect the backend.

### Service Layer

Similar to the frontend, the backend also follows a separation of parts into four different layers. Each of these parts play their own specific role, which again helps with maintainability, organisation, and testability, and each request will be passed through each layer as needed, gaining or providing more information as it goes. The different layers work as follows:

1. Routers - responsible for sending the request to the correct controller
2. Controllers - responsible for interacting with the actual HTTP request (retrieving data from the request body, setting response headers, etc.) as well as handling any errors encountered.
3. Services - perform any necessary business logic (e.g. formatting the employee data to view as a tree)
4. Repositories - handle all queries with the database and any interactions with other persistent storage

In addition to the layered architecture of the backend, it was also modelled using the microservices pattern. Although there is currently just one service active (Employees Service), it is set up using the microservices pattern so that any additional services that may be added in the future can be done so easily and seamlessly. This also allows each microservice to be scaled individually according to resource needs.

## Technology Choices

### Frontend - React

React uses a component-based architecture, meaning that applications can be built by creating small, reusable components and use high modularity to streamline the coding process. It also has built-in routing, making it simple to navigate between multiple pages.

React is also a very well-documented framework, which makes it easy to debug the code and find any errors.

#### Challenges:

One of the things that made working with React a bit challenging was how it manages state updates. State variable updates (through React's `useState`) are batched for performance reasons and therefore don't have immediate effect. This can lead to many bugs and errors if not handled correctly through checks and fallbacks

### Backend - Node.js & Express

Using an Express server in Node.js for the backend was a simple choice. It is very easy to setup and it is quite lightweight initially. Node.js also has an extensive library of packages (e.g. through npm) to choose from to enhance the backend, although this can also very quickly bloat up the server and nullify one fo the advantages of using Node.js in the first place.

Fortunately for the purposes of this assessment, not many packages were needed and it wasn't difficult to keep the server lightweight. I also didn't encounter any challenges when working on the backend with Node.js.

### Database - PostgreSQL

While the scale of this application is currently very small, the use of a PostgreSQL database allows fur future expansion by performing very well for write-heavy environments. It provides the reliabilty of something like MySQL databases, whilst also providing additional, more advanced features and queries.

#### Challenges:

While the simple queries (SELECT, INSERT, etc.) were just that, difficulties did arise when trying to take advantage of PostgreSQL's more advanced queries, specifically a recursive query to return employee data in a format that could be displayed as a tree.

In the end I did have to resort to formattig the data inthe service layer of the backend.

### Deployment

1. Render (frontend and backend):  
   Render offers free tiers for both static sites and web services, which made it easy to deploy both the frontend and the backend to one place. Render also has a very simple auto-deploy feature, making it easy to create and maintain a CI/CD pipeline.

2. Neon (Database):  
   I chose neon to host my database because it runs it serverless and makes connecting to the database from my backend very simple. They also offer integrated authentication services

## API Endpoints

1. GET /employees/  
   returns a list of all employees

2. GET /employees/:id  
   returns the details of a single employee
3. GET /employees/hierarchy  
   returns the list of all employees in a tree format
4. POST /employees/  
   inserts a new employee into the database
5. PUT /employees/:id  
   updates the details of a single employee
6. DELETE /employees/:id  
   removes a single employee from the database
