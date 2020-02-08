var firebase = require('firebase');
const r = require('convert-radix64');
const hasha = require("hasha");
const hashMap = {};


var firebaseConfig = {
    apiKey: "AIzaSyCpDyaS7BWCe7AVGl8EfKedCKJULomIhew",
    authDomain: "urlshortener-a3fb6.firebaseapp.com",
    databaseURL: "https://urlshortener-a3fb6.firebaseio.com",
    projectId: "urlshortener-a3fb6",
    storageBucket: "urlshortener-a3fb6.appspot.com",
    messagingSenderId: "1077454543762",
    appId: "1:1077454543762:web:3ed6ce3919b46c1b90ff4b",
    measurementId: "G-RG94RR3HQW"
};

firebase.initializeApp(firebaseConfig);


module.exports = {
    shorten: (url) => {
        hash = hasha(url, {
            encoding: "base64",
            algorithm: "md5"
        });

        hash = hash.slice(0, 4);
        console.log(hash);
        console.log(r.from64(hash));

        hash = hash.replace('/', '-');
        hash = hash.replace('+', '_');

        hashMap[hash] = url;
        writeUserData(url, r.from64(hash), hash);

        return hash;

    },


    expand: (shortcode) => {

        return new Promise(function (resolve, reject) {

            if (shortcode === undefined) {
                reject(null);
            }
            var ref = firebase.database().ref('/' + r.from64(shortcode));

            ref.once('value').then(function (snapshot) {
                val = snapshot.val();
                if (val) {
                    let url = val.url;
                    resolve(url);
                } else {
                    resolve(hashMap[shortcode]);
                }
            });

        });
    }
}

writeUserData = (url, shortcode, code) => {
    firebase.database().ref('/' + shortcode).set({
        code: code,
        url: url
    });
}