
const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require('body-parser');
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

function convertTemperature(value , unit ){
    let celsius , kelvin , fahrenheit ;
    //1.celsius 
    if(unit === "celsius"){ 
    fahrenheit = value*(9/5) + 32 ;
    kelvin = value + 273.15 ;
    celsius = value ;
    }
    // 2. fahrenheit
    if(unit === "fahrenheit"){
    kelvin = (value-32)* (5/9) + 273.15 ;
    celsius= (value-32)* (5/9)  ;
    fahrenheit = value ;  
    }
    // 3.kelvin
    if(unit === "kelvin"){
    celsius= value - 273.15 ;
    fahrenheit = (value-273.15)* (9/5) + 32 ;
    kelvin = value ;
    }
    const result = {
        celsius : celsius , 
        fahrenheit : fahrenheit , 
        kelvin : kelvin
    }
    return result
 
}
app.post('/', (req, res) => {
    const { temperatureValue, temperatureUnit } = req.body; // Destructure data from request body
    const convertedValues = convertTemperature(temperatureValue, temperatureUnit);
  
    // Render the 'results.ejs' template with the converted data
    res.render('result', { convertedValues });
  });

app.get('/', (req, res) => {
    res.render('index.ejs'); // Specify the '.ejs' extension
  });


app.listen(5000 , ()=>{console.log("This server is runnig on port 5000")})