## ![icons8-backend-64](https://github.com/mathieu-Glt/ApiMovieBackend/assets/84771497/35748efd-b449-4c0d-b238-f783b2179296)  Api movies server ![icons8-backend-64](https://github.com/mathieu-Glt/ApiMovieBackend/assets/84771497/35748efd-b449-4c0d-b238-f783b2179296)

## Introduce 
This app has been built with an mvc architecture, respecting good security practices. To achieve this, I've used javascript libraries. This application has been designed to be as scalable as possible.

## Objetcive best practicies 
I worked by using libraries such as express-validator, csrf-token and xss to make the api as secure as possible.

## Technologies 
<img src="https://miro.medium.com/v2/resize:fit:1400/1*i2fRBk3GsYLeUk_Rh7AzHw.png" width="80" />
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" width="80" />
<img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Postman_%28software%29.png" width="80" />
<img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width="80" />


## Get started !
List mservers :
- ms-express
- ms-main
- ms-nestjs
- 


First launch nats message-broker run  -> docker run -p 4222:4222 -ti nats:latest
Then launch each service run these operations below
For each microservices run
 -> npm install to download node_modules
Run
  -> docker-compose up -d for microservices ms-express and ms-main  for to get  images dockerHub phpmyadmin and mysql
To finish start each server
ms-express :
-> npm run dev 
ms-main : 
-> npm run dev

ms-nestjs : 
-> npm run start:dev




