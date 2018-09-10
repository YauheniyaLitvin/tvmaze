# tvmaze

#Project Structure:

- dist                    distributable from TypeScript build
- log                     log is formed with winston logger
- public                  static assets that will be used client side
- src/import/show.ts      functions that get data from external service, transform data, and call data storage
- src/import/cast.ts      functions that get show with empty cast from db, get cast from external service and call update of data
- src/routes              functions that process httprequests  
- src/service             function that get data from external service
- src/storage             functions that interact with db
- test                    tests



#Project API:

## Get Show:
- URL: /shows?page=:num&limit=:count 
- Example: http://localhost:3000/shows?page=1&limit=10

##Get Show (strict mode):
- URL: /api/show?page=:num&limit=:count 
- Example: http://localhost:3000/api/show?page=1&limit=10