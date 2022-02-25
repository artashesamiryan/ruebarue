const { default: axios } = require("axios");
const express = require("express");
const cors = require("cors")

const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(corsOptions))

app.get("/someurl", async (req, res) => {

    const { id, name } = req.query;
    let reqName = '';

    if (name === "rental") {
        reqName = "rentals"
    } else if (name === "guide") {
        reqName = "properties"
    } else {
        reqName = "guestbook"
    }
    try {
        let b = await axios.get(`https://www.ruebarue.com/api/${reqName}/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });
        const a = b.data
        res.status(200).json(a)

    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {

    console.log(`Server is listen to : ${PORT}`);
})