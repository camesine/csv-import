import task from './lib/index'
import inquirer from 'inquirer'
import fs from 'fs'

let config = {}
config.type = 'list',
config.name = 'option',
config.message = 'Seleccione un archivo csv segun tabla a importar:',
config.choices = fs.readdirSync('./csv')

inquirer.prompt([config]).then(answer => task(answer))
