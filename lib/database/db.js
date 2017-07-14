import mysql from 'mysql'

export const init = () => {

    const env = require(`../env/${process.argv[2] ? process.argv[2].split('=')[1] : 'local'}`).db()
    const conn = {}
    conn.host = env.host
    conn.user = env.user
    conn.password = env.password
    conn.database = env.database

    return mysql.createConnection(conn)
}

export const connect = (connection) => {
    return new Promise(resolve => {
        connection.connect(err => {
            if(err) console.error('Error connect to db', err)
            console.log('Connected to db!!');
            resolve()
        })
    })
}

export const end = (connection) => {
    connect.end()
}

export const query = (connection, query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, [values], (err, results) => {
            if(err) console.error(`Error for query:\n${query}`, err)
            resolve()
        })
    })
}
