const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());
var data=
{
  "country": "Somalia",
  "code": "SO",
  "capital": "Mogadishu",
  "region": "Eastern Africa",
  "states": [
    {
      "state": "Somaliland",
      "districts": [
        "Hargeisa",
        "Berbera",
        "Burao",
        "Borama",
        "Erigavo",
        "Las Anod"
      ]
    },
    {
      "state": "Puntland",
      "districts": [
        "Garowe",
        "Bosaso",
        "Galkayo",
        "Badhan",
        "Qardho"
      ]
    },
    {
      "state": "Galmudug",
      "districts": [
        "Dhusamareb",
        "Galkayo",
        "Adado",
        "Hobyo",
        "Abudwak"
      ]
    },
    {
      "state": "Hirshabelle",
      "districts": [
        "Jowhar",
        "Beledweyne",
        "Balcad",
        "Mahaday",
        "Mataban"
      ]
    },
    {
      "state": "South West State",
      "districts": [
        "Baidoa",
        "Bardale",
        "Hudur",
        "Diinsoor",
        "Buurhakaba"
      ]
    },
    {
      "state": "Jubaland",
      "districts": [
        "Kismayo",
        "Afmadow",
        "Dhobley",
        "Badhaadhe",
        "Bu'ale"
      ]
    }
  ],
  "languages": ["Somali", "Arabic", "English"],
  "currency": "Somali Shilling (SOS)",
  "population": "16 million (estimated)"
}


const schemas= Joi.object({
    state: Joi.string().required(),
    districts : Joi.array().items(Joi.string()).required()
})

app.get("/",(req,res)=>{
    res.send({status: true, data: data })
})

app.post("/state",(req,res)=>{

    const {error}= schemas.validate(req.body);
    if(error){
        return res.send({status: false, message : error.details[0].message})
    }

    data.states.push({...req.body})
    return res.send({status: true, data: req.body})

})


app.delete("/state/:name", (req, res) => {
   data= data.states.filter(state => state.state!=req.params.name );
  return res.send({ status: true,message: "data has been removed", data: data});
});

app.get("/state/:name", (req, res) => {
  var fetched = data.states.filter((state) => state.state == req.params.name);
  return res.send({
    status: true,

    data: fetched,
  });
});

app.listen(4500,'0.0.0.0',()=>{})
