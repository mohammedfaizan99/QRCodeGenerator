const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrcode = require('qrcode');
const app = express();
const port = process.env.port || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://1ds21mc056:faizan123@cluster0.tmoinxd.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json())
app.use(express.urlencoded({extended: false }));
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'view'));
app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.render('index');
});
app.post('/scan',(req, res, next) => {
    const input_text = req.body.text;
    console.log(input_text);
    qrcode.toDataURL(input_text,(err, src) => {
        res.render("scan", {
            qr_code: src,
        });
    });
});
app.listen(port, console.log(`Listening on port ${port}`));