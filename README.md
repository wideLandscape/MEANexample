# MEAN Example

Web application that allows employees to submit feedback toward each other's as a performance review.

### Backoffice view

- Add/remove/update/view employees
- Add/update/view performance reviews
- Assign employees to participate in another employee's performance review

### Employee view

- List of performance reviews requiring feedback
- Submit feedback

## Assumptions made:

- admin user is an employee with a _isAdmin_ property flagged
- user authentication with JWT, the signed token is stored in the localstorage
- at start server check if an admin exists, if not it creates an employee with the property _isAdmin_ flagged. _username_ and _password_ are "admin"
- performance review questions are hardcoded for simplicity

## Technology stack

### Frontend:

- Angular 7.2.0
- Bootstrap 4.3.1

_Angular-cli_ 7.3.9 has been used for code genaration/task execution

### BackEnd:

- NodeJs 8.11.4
- express 4.17.1
- MongoDB Community Edition 4.0.10

Node/Mongo integration with _mongoose_

## Server API:

Under the **/employees** path:

- GET:

  - /
    get the list of all employees
  - /get/:id
    get employee by id
  - /delete/:id
    remove the employee and all its assignments

- POST:

  - /authenticate
    authenticate user and if OK return the signed token
  - /add
    add an employee
  - /update/:id
    update an employee with the given id

Under the **/reviews** path:

- GET:

  - /
    get all the reviews with populated assignments
  - /get/:id
    get a review with the given id

- POST:

  - /add
    add a review
  - /update/:id
    update a review with the given id

Under the **/assignments** path:

- GET:

  - /reviewers/:id
    get all assignments of a review with given id
  - /by-reviewer/:id.:todo
    get all performance reviews assigned to an employee with a given id, filtered as done or not

  - /delete/:id.:from
    remove an assignment and pull it from review.assignments

- POST:

  - /add
    add a new assignment and push it into review.assignments

## TODO:

- feedback submission
- tests

## Installation and execution

Run MongoDB:

```
// windows
& 'C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe' --dbpath=".\data\db"
```

Open a new prompt and run the server

```
cd server

// do 'npm install' only once
npm install

npm run server

```

Open a new prompt and run the client

```
cd client

// do 'npm install' only once
npm install

npm run start

```

Login as Admin:
username: admin
password: admin
