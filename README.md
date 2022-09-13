# Records of Processing Activities GUI

## Description

An application for managing records of processing activities.

## Installation and Usage

- Required tools to run this project:
  - Node.js and npm to run locally on a host machine
  - Docker and Docker Compose to run locally in a container

### Running application locally on a host machine

- Install dependencies by running `npm install`
- Run `npm start` to start local development server

### Running application in a Docker container

- Build a Docker container using the following command:
  - `docker build -t records-of-processing-activities-gui .`
- Run the container using the following comand:
  - `docker run -d -p 8141:8080 -e OIDC_ISSUER -e RECORDS_OF_PROCESSING_ACTIVITIES_URL -e FDK_REGISTRATION_BASE_URI -e ORGANIZATION_CATALOG_URI records-of-processing-activities-gui`

### Running application using Docker Compose

Docker Compose contains all the necessary services to run records-of-processing-activities-gui locally.
Services:

- `records-of-processing-activities-gui` - Records of processing activities GUI (this app)
- `records-of-processing-activities` - Records of processing activities API
- `dataset-catalog` - Dataset Catalog API
- `organization-catalogue` - Organization Catalogue API
- `fdk-nginx-enhetsregisteret-proxy-mock` - Enhetsregisteret Mock
- `oidc-server-mock` - OIDC Server Mock
- `services-mock` - Services Mock (mocking fulltext search concept)
- `rabbitmq` - RabbitMQ
- `mongodb` - MongoDB

Run the application using the following command:

- `docker-compose up -d`

Open your browser and open the following url:

- `http://localhost:8140/910244132`

#### Configure role/permissions

Authorities claim has the following syntax `resource:resourceId:role`. It is possible to add multiple permissions seperated with comma. If you want the give the user system admin access use `system:root:admin`.

Example:

```
USERS_CONFIGURATION_INLINE: |
        [
          {
            "Claims": [
              {
                "Type": "authorities",
                "Value": "organization:910244132:admin"
              }
            ]
          }
        ]
```

## Environment Variables

- `OIDC_ISSUER` - OIDC issuer URI
- `RECORDS_OF_PROCESSING_ACTIVITIES_URL` - Base URL of Records of Processing Activities backend
- `FDK_REGISTRATION_BASE_URI` - Base URI for registration clients
- `ORGANIZATION_CATALOG_URI` - Base URL of Organization backend
- `SEARCH_HOST` - FDK portal main page URL
- `ADMIN_GUI_HOST` - FDK admin main page URL
- `USE_DEMO_LOGO` - Boolean variable determining demo logo
