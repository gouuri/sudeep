let AWS = require('aws-sdk');


let keyPairId = 'APKAJRYKQZMFYT4EP44Q';
let privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAvgKmtwjhYDTI1/ruBHxAiV4LCcTDpUqb81vEgPwXZ79TRkS6
9oEkVc7JRf9zBJnUCdpZLACr15f/2r+A9v2wmIEaNCEubfMwbhuo4TTx/v6h+rn1
HXniEkXLdKcsfP9erNDX109RlijvMTJoDZTEDUzNRLeeVMKPkZXZepZDEu98QMUq
M0HdFS5hlC627g61oRluAwBGow9+M9Hn1Ya4a0qtV9jpIDVjNBKj3pbrvh26COdh
TIbCNtZ4wrD/t6wO/Bp2sSfFAphrSi/Tnw1i8QqCySS59ON1MRdullsR+HAeiduL
yqlkXeBYmRzYixDClCceB1i312511o4CDVIgEwIDAQABAoIBAQCK83ljZLUcG728
ZB5nXU38pq8/x4qjd7ov7y32fWPIVNvbCSwIVEx0C7KY48QC21N6mRiY2yzPjrJm
D6GJ/d+ExvSYpqNDeJI0Ezoe5w8JQMDHj/G2SomOf0fX2ODpz/42NsuBAtpRC0JQ
IeKB/AabC00ZMYYxyc4f0wulX/lRAFl8wCeT2jSuTkMr4WBmd4mn4jZP1owLhXI1
hN1lA8D2hcGeJu2pe6SNlV59VFC8+TYtKQXaJi/A2wsdWa8xTtgz2WUAdVlY0fnc
VL388hQV6Z8QNh4EKcUmzbTDhYSrbqVlTtKCIKpBUJBeH476BvTvdt8lvdFUOwaO
tM9GuMHhAoGBAPCNq0U3nK+q4bzvYUR+OJ6l85YHiM1oJ7GQm3/6BR3Vi2fCPss1
1xYHhHS0STjQO2Vfec5xctmy8poXyXWrTuMB218LGpjxFnzpQDHSwVOePLZLcv1O
SCEHGNy/a+a9YgQt88SjzfYRaDGAYH1pfHZMmR9HEDZpVTNDwF49mhwJAoGBAMo2
Ibk0Fdw7OXWCTcK7bjTPu3XAJjqa7Z+Ee2nztUc+jCxyjDgWROLWlrAIPcqYn0xv
D0So3efQspaxdaowRRAEG/C4Vs/h+KC7Yw/Fm+6iEwfuz8xM06ojjEMvDBkIP+90
raxf8Qpxi8+3MD2jIlB/QfBIacyYq0icYPXe/to7AoGAQUpyfisGADglZR6kC+8m
dwkcAFCzNO1cOLnDOw0lbl+Toun6GTXX10bbEMIOTblXJcCwUvQ/9A66AlEKgUGp
+7t5S2a8JV7qd6Tno55MkuGUIPaBk3c35J8EhIYAR3SHshK241yCfpNi8Gyjw+Zp
vcI0nWSwZdRZJ7zv7aRSu+ECgYBMIjNySrUMVVQd9TCX5//nbGs1O2JpYFmlXLkm
vDZ9m4QlW/+FQoUvLwJPRtsVA3++xHXoMPhTxpTm/evCZygpjpKCgLVW0crNoZ/7
mThLkcQ+kWC1mBt9jKLLzNPuPNftrW2SYBEeEIBGdb95BYnu6usFsA39lWGwFgi/
qfUkbwKBgGfrfpQ4pv1idcPIDDZn1jyJkR2NBLyt1X+qCcL+jRe7KyyU89HGW+pr
GcJAHurTQQMTi10P7IwJCieqY2DPETCXl9F4xlTOSYXnHY6/meNuTypRoHrLoZeC
EbCISjrPeW5wVrbbZcNKvPdrzizcjY2eDnWkvtvanb2iH/lg+//f
-----END RSA PRIVATE KEY-----`;


let cfUrl = "d3ml9645k3368n.cloudfront.net/logo.png ";
let expiry = 1556668800 ;
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
