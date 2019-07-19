'use strict' 
const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 
const bonkaiDB = require ('./models/bonkaiDB'); 

app.set('port', process.env.port || 3000); 
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");
app.use('/api', require('cors')());




// send static file as response
app.get('/', (req, res) => {
 bonkaiDB.find((err,items)=>{ 
   //console.log(items);
   if(err) return next(err); 
   res.render('home', { items: JSON.stringify(items)});
 });
   });


  //getAll/////////////////////////////////////////////////////
app.get('/getAll',(req,res)=>{
  bonkaiDB.find({},(err, items)=>{
    if (err) return next (err);
   //console.log(items);
  
  res.end(JSON.stringify(items));

  })
})

//API getAll METHOD//////////////////API getAll METHOD//////////////////////////////// 





app.get('/api/v1/inventors',(req, res)=>{
  inventDB.find({}, (err , inventorsAll) =>{ 
    if (err) return next(err);
    if (inventorsAll){
      res.json(inventorsAll)
    }else { 
      res.status(404).send("404 - you dun fucked up again");
    }
  })
})


 /*app.get('/getAll',( req , res) => { 
    res.end(JSON.stringify(invent.getAll())); 
 });*/


 //GET() post method with mongodb/////////////////////////GET()///////////////////////////////////////////////////////////


 app.get('/get', (req,res,next)=>{
  console.log(req.body.inventorFirst);
  
  inventDB.findOne({'first':req.body.inventorFirst} ,(err,found)=>{ 
    if(err) return next(err); 
    res.type('text/html');
    res.render('detail', {result:found})

    
  });
});


 app.post('/detail', (req, res, next)=> { 
  inventDB.findOne({'first' :req.body.inventorFirst}).then((found)=>{
    //console.log(found); 
    res.render("detail", { result:found});

  }).catch((err) =>{ 
    return next (err);
  });
}); 




//API get METHOD/////////////////////API get METHOD////////////////////////
app.get('/api/v1/inventor/:first', (req, res)=>{ 
  let firstName = req.params.first;
  console.log(firstName);
 inventDB.find({'first': firstName}, (err, found) => { 
  res.json(found); 
})
})
  



 /*app.post('/get', function(req,res){
  var found = invent.get(req.body.inventorFirst);
  res.render("detail", {title: req.body.inventorFirst, result: found});
})*/

 //////////////////////////////////////////////////////////////

//DELETE METHOD////////////DELETE METHOD//////////
app.get('/delete', (req, res, ) => { 
inventDB.deleteOne({'first': req.query.first}).then((result)=>{
  
  res.render("delete", {first: req.query.first, deleted:result})
  
})
});

///API DELETE METHOD//////////
app.get('/api/v1/inventor/delete/:first', (req, res)=>{ 
  let nameFirst = req.params.first; 
    console.log(nameFirst); 
    inventDB.deleteOne({'first': nameFirst}, (err, found)=>{ 
      res.json(nameFirst + " has been deleted");
    })

})
  

/* app.get('/delete', (req,res)=>{
  console.log(req.query);
  let result = invent.delete(req.query.first); // delete book object
 // console.log(result); 
  res.render('delete', {title: req.body.first, result: result});
}); */

//////////////////add methods//////////////////ADD METHODS
app.post('/api/v1/inventor/add/', (req, res)=>{ 
  let newName = {'first':req.body.addItem}; 
  console.log(newName); 
console.log(req.body);
  inventDB.updateOne({'first':req.body.first}, req.body, { upsert:true}, (err, result)=>{ 
    if (err) return next(err);
    res.json({first:req.body.first });
  })
 
})



app.post('/add', (req,res) => { 
  //console.log(req.body.addItem);
//let newItem = {'first': req.body.addItem}; 

inventDB.updateOne({'first':req.body.first}, req.body, {upsert:true}, (err, result)=>{ 
  if(err) return next (err);
  //console.log (result);
  res.type('text/html')
  res.render("../public/home" , {title:req.body.first, result:result});
})

}); 

//API ADD METHOD/////////////ADD METHOD


   // send plain text response
   app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
   });



   // define 404 handler
   app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
   });



    app.listen(app.get('port'), () => { 
        console.log('express has started');
    });

