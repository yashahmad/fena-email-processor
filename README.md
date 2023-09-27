# fena-email-processor
A Nestjs application, which has Queue implementation using Kafka, Websockets, MySQL, TypeORM and Reactjs on frontend.

## Architecture Diagram
![FenaTask](https://github.com/yashahmad/fena-email-processor/assets/26409771/2fa91d13-5de5-4930-bd41-bdbbeabab0b2)

## Description
1. Create a simple input box with number (e.g. 100000) of emails to send and send button in frontend, which calls the backend to trigger the process
2. The request handler should respond with some sort of job id / email sending id right away
3. The request handler adds the job in the Kafka queue (or other) 
4. Which eventually is picked up by workers to send emails. Note it doesn't need to send the actual email, just write a worker and comment out the last send part
5. Update the user browser with the status of how many emails are sent in near realtime
6. User can close the browser and come back and should be able to see the status of a job

## Getting Started
Make sure you have docker-compose and docker, preinstalled.
```
git clone https://github.com/yashahmad/fena-email-processor.git
cd fena-email-processor
docker-compose up --build
```