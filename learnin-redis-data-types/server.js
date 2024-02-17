import express from "express"
import axios from "axios"
import redis from "ioredis"
const app = express()

const client = new redis()

app.get("/", async (req, res) => {
    const cacheValue = await client.get("todos")
    if (cacheValue) {
        return res.json(JSON.parse(cacheValue))
    }
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos")
    await client.set("todos", JSON.stringify(data))
    await client.expire("todos", 30)
    return res.json(data)
})

app.listen(8080)