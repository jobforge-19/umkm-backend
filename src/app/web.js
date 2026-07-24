import express from "express";

const web = express();


web.use(express.json())



// test enpoint
web.get('/', async(req, res) => {
    res.status(200).json({
        message: "success"
    })
})

export {
    web
}