#  Sample project to utilize github search API and MongoDb

# Prerequsites
Docker must be installed on your machine as well as docker-compose

## Manual Setup

### Build Search API Docker Image

To ochestrate the whole Search and Posts API, execute the `start.sh` bash script in the bin directory using the command below:
This would take you into the bash terminal within the container and dispose the conatiner after it's exited:

    $ ./bin/start.sh

The `start.sh` command is expected to build the image if it doesn't exist and pull/use all other services images needed by the application. To clean up your system of the images built, run the `clean.sh` bash script:

    $ ./bin/clean.sh

To stop the server started by pm2 at anytime run the command below: 
    $ npm run stop

### Using the API
To start the app simply run npm start and it would call the neccesary commands needed to start the server using `pm2` and ready for use.
For development, you can also run nodemon to keep the server alive after code changes happen. Stop the `pm2` instances before running nodemon to free the pre-defined port

### Using the API
The app components are mapped to specific static Ports which can beused to access them over localhost. **It assumes the porst `9090` and `27017` are free to be mapped to**

	http://localhost:6969

### Accessing Mysql Database

The local monodb database can be accessed on localhost on port `27017` 

### Testing

Due to time constraints, only regression tests and linting where written for this project. To run the tests use the command below:

	$ npm run regression

### Endpoints

To access the endpoints, a token is needed and can be gotten by calling the register or login endpoints `auth/register` and `auth/login` passing valid parameters.

Base URL : `http://localhost:33311`


Check the [Swagger Docs](https://app.swaggerhub.com/apis/johnxy84/SearcherAPI/1.0.0)
for a complete analysis