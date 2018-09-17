# tvmaze

# Project Structure:

- dist                    distributable from TypeScript build
- log                     log is formed with winston logger
- public                  static assets that will be used client side
- src/app                 web service  
- src/scrapper            scrapper service  
- src/service             function that get data from external service
- src/storage             functions that interact with db
- test                    tests



# Demo
- https://yauheniya-litvin-tvmaze.azurewebsites.net/index.html

# Web service API:

## Get shows:
- URL: /shows?page=:num&limit=:count 
- Example: https://yauheniya-litvin-tvmaze.azurewebsites.net/shows?page=1&limit=10

## Start import shows
- URL: /scrapper/start?page=:num
- Example: https://yauheniya-litvin-tvmaze.azurewebsites.net/scrapper/start?page=2

## Stop import shows
- URL: /scrapper/stop
- Example: https://yauheniya-litvin-tvmaze.azurewebsites.net/scrapper/stop

## Resume import shows
- URL: /scrapper/resume
- Example: https://yauheniya-litvin-tvmaze.azurewebsites.net/scrapper/resume

# Scrapper api

```node dist/scrapper start --page=[page]``` - start importing shows from page=[page]

```node dist/scrapper resume``` - resume importing shows


