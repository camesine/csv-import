import db from './database/db'
import queries from './database/queries'
import csv from 'csv-parse'
import transform from 'stream-transform'
import fs from 'fs'
import chalk from 'chalk'
import inquirer from 'inquirer'

const transformer = transform((row, next) => {

    values.push(row)
    
    if (values.length % 1000 === 0 && values.length !== 0){

        total += 1000
        console.log(chalk.cyan(`${total} rows inserted...`))
        let insert = JSON.parse(JSON.stringify(values))
        values.length = 0
        db.query(conn, query, insert).then(() => next())
    
    }else{
        next()
    }
},{
    parallel: 1000
})

export default (answer) => {
    try {

        let values = []
        let total = 0
        const stream = fs.createReadStream('./csv/' + answer.option)
        const query = queries.getQuery(answer.option)
        
        stream
        .pipe(csv({delimiter: ';'}))
        .pipe(transformer)
        .on('data', (row) => {
            console.log(row)
        })
        .on('end', () => {
            if(values.length > 0){
                total += values.length
                db.query(conn, query, values)
                .then(() => {
                    console.log(chalk.cyan(`${total} rows inserted...`))
                    db.end(conn)
                    process.exit(1)
                })
            }else{
                db.end(conn)
                process.exit(1)
            }
        })

    }catch(err){
        console.log(chalk.red.bold(error))
        db.end(conn)
        process.exit(1)
    }
}