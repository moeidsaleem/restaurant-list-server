const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const request= require('request');
const rp = require('request-promise');

var cors=require('./cors');
app.use(cors.permission)
getOptions = function(uri){
    return {
        uri: uri,
        qs: {
            access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
}


/* device ID set */
app.get('/device/:id', (req,res)=>{
    let param = req.params.id;
    console.log(param);
    rp(getOptions('http://dottrw.com/apis/addDevice.php?imei='+param)).then(data=>{
       console.log(data);
       res.json({
           message:'user registered',
           status:'success'
       });
    },err=> res.json({message:'ERROR registering user', status:'fail'}));
});

/*GET ALL RESTAURANTS  */
app.get('/restaurants', (req,res)=>{
    rp(getOptions('http://dottrw.com/apis/getRestaurants.php')).then(data=>{
       console.log(data);
       res.json(data);
    });
});

/* get SINGLE RESTAURANT */
app.get('/restaurants/:id', (req,res)=>{
    let param = req.params.id;
    rp(getOptions('http://dottrw.com/apis/getRestaurants.php?rid='+param)).then(data=>{
       console.log(data);
       res.json(data);
    });
});



/* GET OFFERS http://dottrw.com/apis/getOffers.php  */
app.get('/offers', (req,res)=>{
    
    rp(getOptions('http://dottrw.com/apis/getOffers.php')).then(data=>{
       console.log(data);
       res.json(data);
    });
});


/* GET SINGLE OFFERS   http://dottrw.com/apis/getOffers.php?oid= */
app.get('/offers/:id', (req,res)=>{
    let param = req.param.id;
    rp(getOptions('http://dottrw.com/apis/getOffers.php?oid='+ param)).then(data=>{
       console.log(data);
       res.json(data);
    });
});


/* ADD USER RESTAURANT TO TASTED */
app.get('/addtasted/:userId&:restaurantId', (req,res)=>{
    let userId = Number(req.params.userId);
    let restaurantId = req.params.restaurantId;
    console.log(userId);
    console.log(restaurantId)
    rp(getOptions('http://dottrw.com/apis/addTasted.php?imei=' +  userId + '&restaurant_id=' + restaurantId)).then(data=>{
       console.log(data);
       res.json(data);
    });
});



/* WISHLIST  */
/* ADD USER RESTAURANT TO WISHLIST */
app.get('/addwishlist/:userId&:restaurantId', (req,res)=>{
    let userId = req.params.userId;
    let restaurantId = req.params.restaurantId;
    rp(getOptions('http://dottrw.com/apis/addWishlist.php?imei=' +  userId + '&restaurant_id=' + restaurantId)).then(data=>{
       console.log(data);
       res.json(data);
    });
});


/* GET USER WISHLIST http://dottrw.com/apis/getWishlist.php?imei={[MOBILE.IMEI]} */
app.get('/getwishlist/:userId', (req,res)=>{
    let userId = req.params.userId;
    rp(getOptions('http://dottrw.com/apis/getWishlist.php?imei=' +  userId)).then(data=>{
       console.log(data);
       res.json(data);
    });
});

/* GET USER TASTED http://dottrw.com/apis/getTasted.php?imei={[MOBILE.IMEI]} */
app.get('/gettasted/:userId', (req,res)=>{
    let userId = req.params.userId;
    console.log(`User id is ${userId}`)
    rp(getOptions('http://dottrw.com/apis/getTasted.php?imei=' +  userId)).then(data=>{
       console.log(data);
        res.json(data);
    });
});


app.listen(4002, ()=> console.log(`console log 4002`));