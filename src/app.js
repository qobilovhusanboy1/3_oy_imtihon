
const {connect} = require('mongoose')
const express = require('express');
const fileUpload = require("express-fileupload");
const  config  = require("../config");
const app = express();
const routes = require("./routes")

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(fileUpload());
app.use(express.static(`${process.cwd()}/uploads`));
app.use('/api',routes)


const bootstrap = async () => {
    await connect(config.db_url);
  
    console.log("Connect to DB...");
  
    app.listen(config.port, () => {
      console.log(config.port);
    });
};
  

bootstrap();
