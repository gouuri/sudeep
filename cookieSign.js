let AWS = require('aws-sdk');


let keyPairId = 'APKAIRDIZYGVN3J7B3ZQ';
let privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAi7iiPmjdV6pP2OaFSY/+Jw6ShESko7ogMImgvnEdwZR4uDhj
UzFlDju/ZVxEsA2Xvghht0vq+KSrKcvnwa4vW2SJpLQCQzNyUN/TM9pvn/P5IbB4
66PYSobvu20uXjZvGLHxXeKQ3Snp0uEDFoXB0pdcTfFOsjBIlEEFMvtC9Y/3Xrpd
dqqbMFrsNDqj16WhDrkJERozDJMCeHr2fAfl56PTUGshRQR5HxqM0CFbFw8tXQSe
sfd1itlnSXBcAOcj5dCEJPGDX/4nTi4S33ZqqCpz4SzwoT13HqIYOYNw3Ryym6CI
iywIXRhObUL32s/5hfLQw+eblphjpH6bJjcoQwIDAQABAoIBABWD/Rf3Nf6F733L
IcNONSj2iYFswJ2lz8cpqmMpMBfbMSvNIx5wgMtMUBDfwIQL084jpEiBnFFlqiXp
jGq60/gS509BmQeYKIZjsTZO8NmEzFxvvG8s7+WqGciW64j+gOUgobZ/aSdliOg8
Villt48iV8h43FF8NfD+gjpzjsAZjRKydySE3ZVdYgpHmqzlV73YWDe1mNu7Cm03
2lEB9QePw8csJD4jT/esqTCSC5UQ9CToJKW1MB59qwgQx54tYyoPYPo2nxS8/uKi
CWaIyvcvJttp/+stUVI0lKjzSLv7XI/q+MLQ8NScKbUAxDOn7mvC3IZafuikvHNj
5evIWoECgYEAvfN7DdXBGCrVKLsrYjWU9NB4C+dgPIxFmHsu4NdL8f7tLBXFrfPO
rA2AdFpLdEShXGeeV6d+l4JL+i5b+ye5BWfuH+K+galS6JuXQoAfTkL3Kmr34oBk
Ho5lBKGu/2fNsbTfCDh9sAGzcfiqL3TFN/EnUyxMBhAh2+4w3L8rvnECgYEAvE3v
aQVdIVqt26FmzDk/8Kb3EahpfE1EbiSbv2AI0A2Gkypp54o+4S9Q0Jc8yOlyweT0
ZIVNMLycM6G6/o3D2YIu0gFFVtw1p5+XbAHveb691qNWjlolbuXt9iEDlRdzHJ65
+bun3DlgpGqXIPfYlDvGtuPVfUvtA+dnlZ7/E/MCgYAm+vVQtIHovLl7n1Va1RYZ
W0KXZsb4Be0uSnEnUOdT5PW0607i0Lqj0i1/Mxxy4raeaOE0qbmvy9xdne/gTZmJ
g3d5caWYpC/QbkWPLw29mL5yJPtzrtdc8enHFor7/MhYZH60iCs62E6D3/zEuljS
jxl71wZO5DaelHXQhyap8QKBgAthhnvJeDSA34sruSPUvfmUjdBCZoW9wcoKamNp
sX6pop2Ybagx4dUIYBELYwAdo/L2HJNKvzyX2bUBLGUgOlsWFDBbJU63poKIEcXU
ZB3umlizrJKT/jkyqmw62JWVQj7TlRfz8JRN33pwesviTvO+nScGpCubgCrBPLB9
WJtjAoGAdfroBHDdP30h54RM+fnRIECg9wVB6KNaU1XHKHfVj5xvHhO1mtxXT3K8
CM8iWuQadD9em717QFEQnwZODh39LsYliQsp36qo4RaVR8hwWPHi4zVhRC+rPa4X
6aH6tQVC5VKYOqlD9bj+4+xxyBMao3T84b+YFZwjknf0FW8jdoI=
-----END RSA PRIVATE KEY-----`;


let cfUrl = "http://d12t41uhkkn2d0.cloudfront.net/sonar.txt";
let expiry = 1576065632
let policy = {
  'Statement': [{
    'Resource': 'http*://' + cfUrl + '/*',
    'Condition': {
      'DateLessThan': {'AWS:EpochTime': expiry}
    }
  }]
};

let policyString = JSON.stringify(policy);

let signer = new AWS.CloudFront.Signer(keyPairId, privateKey);

exports.getSignedCookie = function(req, res) {
    var options = {url: "http://"+cfUrl, policy: policyString};

    signer.getSignedCookie(options, function(err, cookie) {
        if (err) {
          console.log(err.message);
            res.send(err);
        } else {

            console.log("cookies: ");
            console.log(cookie);
            res.send(cookie);

        }
    });
};
