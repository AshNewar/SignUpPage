const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.listen(process.env.PORT || 3000,function(){
    console.log("Server Started");
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    var first=req.body.FirstName;
    var sec=req.body.LastName;
    var Email=req.body.Email;
   var data={
    members:[{
        email_address:Email,
        status:"subscribed",
        merge_fields:{
            FNAME:first,
            LNAME:sec
        }

    }

    ]
   };
   var jdata=JSON.stringify(data);
   const url="https://us14.api.mailchimp.com/3.0/lists/5917fba268";
   const options={
    method:"POST",
    auth:"ashish:b269491ba9bbc2b6aa9bd0a09354163e-us14"

   }
   const request=https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/sucess.html");
    }
    else{
        res.sendFile(__dirname+"/fail.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
   })
   request.write(jdata);
   request.end();

})
app.post("/fail",function(req,res){
    res.redirect("/");
})


// api key=b269491ba9bbc2b6aa9bd0a09354163e-us14
// uniqueid=5917fba268.