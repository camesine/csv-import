import * as db from './database/db'
import * as queries from './database/queries'
import csv from 'csv-parse'
import transform from 'stream-transform'
import fs from 'fs'
import chalk from 'chalk'


export default (answer) => {
    return new Promise(async(resolve, reject) => {
     
        const conn = db.init()
        await db.connect(conn)
        
        try {
            let values = []
            let total = 0
            const stream = fs.createReadStream('./csv/' + answer.option)
            const query = queries.getQuery(answer.option)
            
            stream
            .pipe(csv({delimiter: ';'}))
            .pipe(transform((row, next) => {

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
            }))
            .on('data', (row) => {
                console.log(row)
            })
            .on('end', () => {

                if(values.length > 0){
                    total += values.length
                    db.query(conn, query, values)
                    .then(() => {
                        console.log(chalk.cyan(`${total} rows inserted...`))
                        resolve(db.end(conn))
                    })
                }else{
                    resolve(db.end(conn))
                }
                
            })

        }catch(error){
            console.log(chalk.red.bold(error))
            reject(db.end(conn))
        }
    })
}