var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const promo = require('../models/promos');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(cors.cors, (req,res,next) => {
      Promotions.find(req.query)
         .then((dishes) => {
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(dishes);
    },(err) => next(err))
    .catch((err) => next(err));
})

    .post((req, res, next) => {
       promo.create(req.body)
       .then((dishes) => {
          console.log('Dish Created',dish);
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(dishes);
          },(err) => next(err))
           .catch((err) => next(err));
})
    .put((req,res,next) => {
        res.statusCode = 403;
        res.end('put operation not supported on /dishes');
     })

    .delete((req, res, next)  => {
       promo.remove({})
       .then((resp) => {
         console.log('Dish Created',dish);
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        },(err) => next(err))
          .catch((err) => next(err));
});

promoRouter.route('/:dishId')
  
  .get((req, res, next) => {
       promo.findById(req.params.dishId)
       .then((dish) => {
          console.log('Dish Created',dish);
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
    },(err) => next(err))
      .catch((err) => next(err));
})
   .put((req,res,next) =>{
       promo.findByAndUpdate(req.params.dishId,{
            $set: req.body
         }, {new:true})
         .then((dish) => {
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
    },(err) => next(err))
      .catch((err) => next(err));
})
   .post((req, res, next) => {
        res.end('post operation not supported on /ishes/' + req.params.dishId);
        
    })
   .delete((req, res, next)  => {
        promo.findByAndRemove(req.params.dishId)
        .then((dish) => {
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
    },(err) => next(err))
      .catch((err) => next(err));
});


promoRouter.route('/:dishId/comments')
   .get((req, res, next) => {
        promo.findById(req.params.dishId)
         .then((dish) => {
            if(dish!=null)
            {
              res.statusCode =200;
              res.setHeader('Content-Type','application/json');
              res.json(dish.comments);
            }
            else {
               err =new Error('Dish' + req.params.dishId + 'not found')
               err.status =404;
            }
               return next(err);
    },(err) => next(err))
    .catch((err) => next(err));
})

    .post((req, res, next) => {
       promo.findById(req.params.dishId)
       .then((dish) => {
           if(dish!=null)
            {
              dish.comments.push(req.body);
              dish.save()
              .then((dish) => {
                 res.statusCode =200;
                 res.setHeader('Content-Type','application/json');
              })
            }
            else {
               err =new Error('Dish' + req.params.dishId + 'not found')
               err.status =404;
               return next(err);
            }
          },(err) => next(err))
           .catch((err) => next(err));
})
    .put((req,res,next) => {
        res.statusCode = 403;
        res.end('put operation not supported on /dishes/'+ req.params.dishId + '/comments');
     })

    .delete((req, res, next)  => {
      promo.findById(req.params.dishId)
       .then((dish) => {
          if(dish!=null)
            {
              for( var i=dish.comments.length-1;i>=0;i--)
              {
                dish.comments.id(dish.comments[i]._id).remove();
              }
              dish.save()
              .then((dish) => {
                   res.statusCode =200;
              res.json(dish.comments);
              res.setHeader('Content-Type','application/json');
              res.json(dish);
            },(err) => next(err))
           }
            else {
               err =new Error('Dish' + req.params.dishId + 'not found')
               err.status =404;
               return next(err);
            }
        },(err) => next(err))
          .catch((err) => next(err));
});

promoRouter.route('/:dishId/comments/commentId')
  
  .get((req, res, next) => {
       promo.findById(req.params.dishId)
       .then((dish) => {
           if(dish!=null && dish.comments.id(req.params.commentId)!=null)
            {
              res.statusCode =200;
              res.setHeader('Content-Type','application/json');
              res.json(dish.comments.id(req.params.commentId));
            }
            else if(dish == null) {
               err =new Error('Dish' + req.params.dishId + 'not found')
               err.status =404;
               return next(err);
            } 
           else {
               err =new Error('Dish' + req.params.dishId + 'not found')
               err.status =404;
               return next(err);
            }
    },(err) => next(err))
      .catch((err) => next(err));
})
   .put((req,res,next) =>{
      promo.findById(req.params.dishId)
       .then((dish) => {
           if(dish!=null && dish.comments.id(req.params.commentId)!=null)
            {
              if(req.body.rating){
                dish.comments.id(req.params.commentId).rating = req.body.rating;
              }
              if(req.body.comment){
                dish.comments.id(req.params.commentId).comment = req.body.comment;
              }
              dish.save()
              .then((dish) => {
                   res.statusCode =200;
              res.json(dish.comments);
              res.setHeader('Content-Type','application/json');
              res.json(dish);
            },(err) => next(err));
           }
            else if(dish == null) {
               err =new Error('Dish' + req.params.dishId + 'not found')
               err.status =404;
               return next(err);
            } 
           else {
               err =new Error('Dish' + req.params.dishId + 'not found')
               err.status =404;
               return next(err);
            }
    },(err) => next(err))
      .catch((err) => next(err));
})
   .post((req, res, next) => {
        res.end('post operation not supported on /ishes/' + req.params.dishId + '/comments/' + req.params.dishId);
        
    })
   .delete((req, res, next)  => {
         promo.findById(req.params.dishId)
       .then((dish) => {
          if(dish!=null &&  dish.comments.id(req.params.commentId)!=null)
            {
            
                dish.comments.id(req.params.commentId).remove();
            
              dish.save()
              .then((dish) => {
                   res.statusCode =200;
              res.json(dish.comments);
              res.setHeader('Content-Type','application/json');
              res.json(dish);
            },(err) => next(err));
         }
          else if(dish == null) {
               err = new Error('Dish' + req.params.dishId + 'not found')
               err.status =404;
               return next(err);
            } 
           else {
               err = new Error('Dish' + req.params.dishId + 'not found')
               err.status =404;
               return next(err);
            }   
    },(err) => next(err))
      .catch((err) => next(err));
});
module.exports=promoRouter;
