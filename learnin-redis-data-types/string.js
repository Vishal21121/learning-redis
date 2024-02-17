import { Redis } from "ioredis"

const client = new Redis()

async function init() {
    await client.set("msg:2", "Hello, World!")
    // we can also set the expiration time in seconds
    await client.expire("msg:2", 10)
    const result = await client.get("msg:2")
    console.log("Result -> ", result);
}

init()
