require("dotenv").config();

const express = require('express')
const server = express()

server.use(express.json())

// conect to database
const pg = require("pg")
const {Pool} = pg

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

server.post("/user", async (req, res) => {
    try{
        const {full_name, email, phone, password} = req.body
        const value = [full_name, email, phone, password]
        const sql = `insert into coffeshop.user (full_name, email, phone, password) values ($1, $2, $3, $4)`
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

server.get("/user", async (req, res) => {
    try {
        const sql = `select * from coffeshop.user`
        const result = await db.query(sql)
        res.status(200).json({
            msg: "Success",
            result: result.rows
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error",
            error: error
        })
    }
})

server.patch("/user/:id_user", async (req, res) => {
    try {
        const {address} = req.body
        const {id_user} = req.params
        const value = [address, id_user]
        const sql = `update coffeshop.user set address = $1 where id_user = $2`
        const result = db.query(sql, value)
        res.status(200).json({
            msg: "Success",
            result: result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error",
            error: error
        })
    }
})

server.delete("/user/:id_user", async (req, res) => {
    try {
        const {id_user} = req.params
        const value = [id_user]
        const sql = `delete from coffeshop.user where id_user = $1`
        const result = db.query(sql, value)
        res.status(200).json({
            msg: "Success",
            result: result
        })
    } catch (error) {
        console.log(error)
        res.status.json({
            msg: "Error",
            error: error
        })
    }
})

server.listen(8000, () => {
    console.log("Server is running")
})