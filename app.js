require("dotenv").config();

const express = require('express')
const server = express()

// conect to database
const pg = require("pg")
const {Pool} = pg

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

server.get("/:user_id/:full_name", async (req, res) => {
    try{
        let {user_id, full_name} = req.params
        full_name = `%${full_name}%`
        console.log(user_id, full_name, req.params)
        const random = 1
        const value = [user_id, full_name]
        const sql = `select * from coffeshop.user where id_user = $1 or full_name ilike $2`
        const result = await db.query(sql, value)
        res.status(200).json({
            msg: "Success",
            result: result.rows,
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Error",
        })
    }
})

server.listen(8000, () => {
    console.log("Server is running")
})