import chalk from 'chalk'

export const getQuery = (tblName) => {
    switch(tblName) {

        case 'sample.csv':
            return `INSERT INTO ${tblName.split('.')[0]} (text) VALUES ?`

        default:
            throw  ('Query is not created!!')

    }
}
