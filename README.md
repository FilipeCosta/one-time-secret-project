# one-time-secret-project
A project where people can share secrets and see them temporarily for x times

# How To run it

1) First important thing is to install the microsoft community tools: https://dev.mysql.com/downloads/mysql/ Include them all (Workbench, server) and start the server when finish installing
also match the same user, password and port that is specified in the .env file here: /server/.env.

2) Create a one-time-secret schema at workbench

3) Jump to /server and install dependencies, run the server: npm install && npm run start-server (run it in background with nodemon)

4) Jump to /client and run: npm install && npm start

# Improvements technical

1) Automate the application with docker compose, there is one step failing that doesn't allow the server to communicate with the database, with this we could skip all the steps before 
specially the step number 2.

2) Add typescript with prettier, husky, stylelint and tslint, to improve code quality

3) Add CI/CD create a pipeline and atleast 2 environments for it

4) Separate the api logic from the files and create a custom hook to deal with those calls


# Improvements product

1) Allow someone to share secret images/video and not just 

2) Extend the website funcionality to share secret documents (maybe we can use it for CIA :D)

3) Add authentication and a markting web page (integrate with NextJS)

4) Two password step, maybe phone number to cover better the secret

