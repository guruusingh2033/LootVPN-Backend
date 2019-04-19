const _ = require('underscore');
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
var md5 = require('md5');
var sha1 = require('sha1');

module.exports = {
    login,
    getSubscription
}
function login(body, connection) {
    return new Promise(function (resolve, reject) {
            var fetch = "SELECT * FROM clients WHERE email = '" + body.email + "'"
            connection.query(fetch, function (error, results) {
                if(results.length != 0)
                {
                var encriptpassword = sha1(body.password);
                console.log(encriptpassword);
                console.log(results[0].password);
                if (encriptpassword == results[0].password) {
                    console.log("*****");
                    var user = results[0];
                    // And done with the connection.
                    // Handle error after the release.
                    if (error) reject(error)
                    
                    else {
                    var token = jwt.sign({ email: body.email }, config.jwt.secret_key, { expiresIn: config.jwt.expires_in });

                        getCertificate(body, connection).then(function (response) {



                            
                            for(var j=0;j<response.length;j++){
                                
                                let splitted = response[j].cirtificate.split('\n')
                                let formattedText = ""
                                for (var i = 0; i < splitted.length; i++) {
                                    formattedText += splitted[i] + '\r\n'
                                }

                                let cert_object = {}
                                cert_object['certificate'] = formattedText
                                cert_object['location'] = response[j].location
                                user['certificates']=[];
                                user['certificates'].push(cert_object)
                            }
                            resolve({ user, token });
                        },
                        function (err) {
                            resolve({ user, token });
                        })
                        .catch(function (exception) {
                            resolve({ user, token });
                        })
                       
                    }
                }
                else {
                    reject({"error": "Email or password is wrong"});
                }
            }
            else
            {
                    reject({ "error": "Email is not exist"});
            }
            });
    })
}

function getCertificate(body, connection) {
    console.log(body.email)
    return new Promise(function (resolve, reject) {
            var fetch = "SELECT * FROM certificate WHERE user_name = '" + body.email + "'"
            connection.query(fetch, function (error, results) {

                var certificates = results
                if(results.length != 0)
                {
                    console.log(results);
            
                    resolve( certificates );
                }
            else
            {
                    reject({ "error": "User name does not exist"});
            }
            });
    })
}


function getSubscription(body, connection) {
    return new Promise(function (resolve, reject) {
        var fetch = "SELECT account_status FROM clients WHERE email = '" + body.email + "'"
            connection.query(fetch, function (error, results) {

                var account_status = results
                if(account_status.length != 0)
                {
            
                    resolve(account_status[0] );
                }
            else
            {
                    reject({ "error": "User does not exist"});
            }
            });
    })
}


