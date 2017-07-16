# csv-import

# What use this Starter App?
- **Mysql** for connection with database.
- **csv-parse** for manage data structured in text plain.
- **ES2015** with the last of javascript like promises and async/await
- **Environments** Local or Production

## Structure
```json
/lib
	/database (Connection and queries to database)
    /env (Database credentials)
    index.js (main function for populate database )
/csv (File with data to insert)
index.js (Script to run app)
```
## Edit the file ./lib/env/local or prod with your own settings:
```json
	{
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test'
    }
```
## Production
    npm run prod

## Local
    npm run local
