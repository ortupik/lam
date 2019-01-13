'use strict';

module.exports = function(app) {

var orderCont = require('../../app/controllers/order.server.controller'); 
var shippingCont = require('../../app/controllers/shipping.server.controller'); 

var CONSUMER_KEY = "jKT7MAyHtAJH2s+25ZUHiqevd1dmXfj8";
var CONSUMER_SECRET = "AiArdbmlkIPcu2fSjLW8sE2H5u4=";

var PesaPal = require('pesapaljs').init({
    key: CONSUMER_KEY,
    secret: CONSUMER_SECRET,
    debug: true // false in production!
});

app.get('/payment_listener', PesaPal.paymentListener, function (req) {
    var payment = req.payment;
    if (payment) {
        // TODO: Save in DB?
        console.log("Payment...")
        console.log(payment)
    }
});

app.get('/payment_callback', function (req, res) {

    var options = { // Assumes pesapal calls back with a transaction id and reference
        transaction: req.query[PesaPal.getQueryKey('transaction')],
        reference: req.query[PesaPal.getQueryKey('reference')]
    };

    PesaPal.getPaymentDetails(options)
        .then(function (payment) {
            // check payment.status and proceed accordingly

            var message = "Thank you for doing business with us.";
            res.render("pages/message", {
                message: message,
                details: JSON.stringify(payment, null, 2)
            });

        })
        .catch(function(error) {
            var message = "Oops! Something went wrong";
            res.render("pages/message", {
                message: message,
                error: JSON.stringify(error, null, 2)
            });
        });

});

app.get('/testpay', function (req, res, next) {
    // TODO: Render checkout UI
    console.log("check me out")
    res.render("pages/checkout2", {
        reference: new Date().getTime(),
        description: "This is a funny description",
        amount: Math.floor((Math.random() * 20000) + 1)
    });
});

app.post('/checkout', function (req, res, next) {
    // TODO: Make order from request;

    shippingCont.getShippingAddress(function(resp){

       if(resp.success == 1){

         var shippingData = resp.data;

         var customer = new PesaPal.Customer(shippingData.email, shippingData.phone);
            customer.firstName = shippingData.fname;
            customer.lastName = shippingData.lname;

            var reference = new Date().getTime();
            var amount = Math.floor((Math.random() * 20000) + 1);

            var order = new PesaPal.Order(
                reference,
                customer,
                req.body.description,
                amount,
                req.body.currency,
                req.body.type);
             
                var mobilePayment = req.body.mobile == "mobile";
                var method = mobilePayment ? PesaPal.PaymentMethod.MPesa : PesaPal.PaymentMethod.Visa;

                PesaPal.makeOrder(order, method)
                    .then(function (order) {

                        // TODO: Save order in DB
                      orderCont.saveOrder(order,function(resp){
                         if(resp.success == 1){
                                // TODO: Render UI to get mpesa transaction code or card details from user
                                if (mobilePayment) {
                                    res.render("pages/mobile", {
                                        reference: order.reference,
                                        instructions: "Send " + order.amount + " " + order.currency + " to " + method.account + " via " + method.name
                                    });
                                } else {
                                    res.render("pages/card", {reference: order.reference});
                                }
                         }else{
                             res.send(resp.message);
                         }
                      });

                    })
                    .catch(function(error) {
                        console.log(error)
                        res.send(error.message);
                    });

       }else{
         res.json(resp);
       }
    });

    /*
            */
    
});

app.post('/pay', function (req, res, next) {

    // TODO: Retrieve order from DB
    orderCont.getOrder(req.body.reference,function(resp){

      if(resp.success == 1){

        var order = resp.data;
       
        var processResponse = function (paymentResponse) {
            // TODO: Render Success / Error UI
            // TODO: Save transaction id for conformation when I get an IPN? Or check payment status right now?

            PesaPal.getPaymentDetails(paymentResponse)
                .then(function (payment){
                    // check payment.status and proceed accordingly

                    var message = "Thank you for doing business with us.";
                    res.render("pages/message", {
                        message: message,
                        details: JSON.stringify(payment, null, 2)
                    });
                })
                .catch(function(error){
                    var message = "Oops! Something bad happended!";
                    res.render("pages/message", {
                        message: message,
                        error: JSON.stringify(error, null, 2)
                    });
                });


        };

        var paymentData = null;
        

        switch (order._paymentMethod.tag) {
            case PesaPal.PaymentMethod.MPesa.tag:
                paymentData = new PesaPal.MobileMoney(req.body.phone, req.body.code);
            case PesaPal.PaymentMethod.Airtel.tag:
                paymentData = new PesaPal.MobileMoney(req.body.phone, req.body.code);
                break;
            case PesaPal.PaymentMethod.Visa.tag:
            case PesaPal.PaymentMethod.MasterCard.tag:
                paymentData = new PesaPal.Card();
                paymentData.firstName = req.body.first_name;
                paymentData.lastName = req.body.last_name;
                paymentData.number = req.body.number.replace(/ /g, "");
                paymentData.cvv = req.body.cvv;
                paymentData.expirationMonth = (req.body.expiry.split('/') [0]).trim();
                paymentData.expirationYear = (req.body.expiry.split('/') [1]).trim();
                paymentData.country = req.body.country;
                paymentData.countryCode = req.body.country_code;
                paymentData.phone = req.body.phone;
                paymentData.email = req.body.email;
                break;
            default:
                throw new Error("Invalid order");
        }

        if(paymentData != null) {
            PesaPal.payOrder(order, paymentData)
                .then(processResponse)
                .catch(function (error) {
                    res.send(error.toString());
                });

        } else {
            res.render("pages/message", {message: "Error!!!"});
        }
     }else{
        res.render("pages/message", {message: resp.message});
     }
     
    });


});
	
};