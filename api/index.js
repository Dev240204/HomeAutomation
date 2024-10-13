if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require('express');
const cors = require("cors");
const connect  = require('./connect');
const AuthRouter = require('../routes/authRouter')
const RelayRouter = require('../routes/relayRouter')
const DeviceRouter = require('../routes/deviceRouter')
const EspRouter = require('../routes/espRouter')

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors())

connect()
.then(() => {
    console.log("Server started to take data")
}).catch((err) => {
    console.log("Error Connecting Database",err)
})

app.use('/auth',AuthRouter)
app.use('/relay',RelayRouter)
app.use('/device',DeviceRouter)
app.use('/esp',EspRouter)

app.get('/', (req, res) => {
    res.send('Listening on my IOT server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app