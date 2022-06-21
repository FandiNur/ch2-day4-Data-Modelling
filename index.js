const express = require('express');
const { Connection } = require('pg');

const app = express()
const port = 8000

const db = require('./connection/db')

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

// set view engine
app.set('view engine', 'hbs') 

//directory(save data static)
app.use('/assets', express.static(__dirname + '/assets')) 
app.use(express.urlencoded({extended:false}))

//conditionall
let isLogin = true

// ===========get===============

//render home page
app.get('/', (request, response) => {
  
  db.connect((err, client, done)=>{ //connect to data_base on postgreSQl
    if(err) throw err  //show error 
    client.query('SELECT * FROM tb_blog', function(err, result){
      
      if(err) throw err  //show error 
      console.log(result.rows)

      let dataP = result.rows

      response.render('index',{ isLogin ,indexx : dataP });
    })

  })
})


app.get('/project', (request, response) =>{
  response.render("project"); 
})


app.get('/contact', (request, response) =>{
  response.render("contact"); 
})


app.get("/edit-blog/:index", (request, response)=>{
  response.render('edit-blog',{ isLogin});
  
}) 


// delete blog in /index
app.get('/delete-blog/:index',(request, response) =>{

  let index = request.params.index
  dataProject.splice(index, 1 )
  response.redirect('/')
})

//render index in blog
app.get('/blog/:index',(request,response) => {
  response.render('blog',projectss)  
})


// ===========post=========

// input data-> html(body) -->js
app.post('/project', (request, response) =>{
  response.redirect('/')
})



//update data
app.post('/edit-blog/:index', (request, response) =>{
response.redirect("/")
})


// date funcion
function getFullTime( waktu) {
  let month = [
      "Januari",
      "Febuari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
  ];

  let date = waktu.getDate();
  let monthIndex = waktu.getMonth();
  let year = waktu.getFullYear();

  let fullTime = `${date} ${month[monthIndex]} ${year}`;
  return fullTime;
}

function getDistanceTime(startDate, endDate) {
  let start = startDate ;
  let end = endDate ;
  
  let duration = end.getTime() - start.getTime();
  let day = Math.round(duration / (1000 * 3600 * 24));
  let month = Math.round(day / 30);
  duration = month <= 0 ? day + " day" : month + " month";

  if (start > end) {
      alert("check Your Date");
  } else if (start < end) {
      return `${duration} `;
  }
}