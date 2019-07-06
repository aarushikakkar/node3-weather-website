const path=require('path');
const express=require('express');
const app=express();
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname,'../public'));
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);
app.set('view engine','hbs');
app.set('views',viewsPath);
app.use(express.static(path.join(__dirname,'../public')));   //file used to expose to web server


// app.get('',function(req,res){       //this wont work after using above command of app.use
//   res.send('hello express');
// })
// app.get('/help',function(req,res){
//   res.send('<h1>Help</h1>');                              ////comment these off after making index.html title.html
// })
// app.get('/about',function(req,res){
//   res.send({name:'aarushi',
//   age:21});
// })

//with using handlebars hbs and we create dynamic files with it and we use res.render in place of res.send()

app.get('',function(req,res){
  res.render('index.hbs',{
    title:'weather app',
    name:'aarushi'
  });//for this we need to delete html file
})

app.get('/about',function(req,res){
  res.render('about',{
    title:'weather app',
    name:'aarushi'
  });
})
app.get('/help',function(req,res){
  res.render('help',{
    helpmsg:'help me aarushi',
    title:'help page',
    name:'aarushi kakkar'
  })
})
app.get('/weather',function(req,res){
  if(!req.query.address)
  {
    res.send({
      error:'address not given in query string'
    })
  }
  geocode(req.query.address,function(error,{latitude,longitude,location}={})
    {
      if(error)
      {
        res.send({error})
      }
      else {
        forecast(latitude,longitude,function(error,forcastData)
      {
        if(error)
        {
          res.send(error);
        }
        else {
          res.send({
            forcast:forcastData,
            location:location,
            address:req.query.address
          })
        }
      })
      }
    });
})


app.get('/products',function(req,res){
if(req.query.name){
    console.log(req.query.name);  //to print one of the query string
    res.send({
      products:[]
    })
  }
  else {
    res.send({
      error:'provide some query string'
    })
  }

})
app.get('/help/*',function(req,res){
  //res.send('help article not found');
  res.render('404',{
    title:'404',
    name:'aarushi',
    errorMessage:'help article not found'
})
})

app.get('*',function(req,res){
  res.render('404',{
    title:'404',
    name:'aarushi',
    errorMessage:'404 error found'
  })
})

app.get('/hey',function(req,res){
  res.send('<h1>Title</h1>');
})
app.get('/bye',function(req,res){
  res.send({
    forcast:'raining',
    location:'india'
  });
})
app.listen(3000,function(){
  console.log('server started');
});
