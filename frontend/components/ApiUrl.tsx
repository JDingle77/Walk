import * as dotenv from "dotenv"

dotenv.config({path:'../../.env'})
const IP_ADDRESS = process.env.IP_ADDRESS
const PORT = process.env.PORT

export const backend_URL = `http://${IP_ADDRESS}:${PORT}`