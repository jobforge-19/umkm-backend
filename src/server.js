import { web } from "./app/web.js";
import "dotenv/config";

const port = process.env.APP_PORT;

web.listen(port, () => {
    console.log(`program berjalan di port: ${port}`);
});
