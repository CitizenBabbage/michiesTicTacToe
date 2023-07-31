import learnFromGame from "../components/Updater.js"
import {db} from "./databaseFormatted.js"
let gameResult = 'X';
const database = db.slice(); 
const gameLog = [
    [null, null, null, null, null, null, null, null, null]
    ,[null, null, 'X', null, null, null, null, null, null]
    ,[null, 'O', 'X', null, null, null, null, null, null]
    ,[null, 'O', 'X', null, null, null, 'X', null, null]
    ,['O', 'O', 'X', null, null, null, 'X', null, null]
    ,['O', 'O', 'X', null, null, null, 'X', 'X', null]
    ,['O', 'O', 'X', null, null, 'O', 'X', 'X', null]
]