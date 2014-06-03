/**
 * do something with the user model
 * var User = require('../models/user');
 */

var express = require('express');
var fs = require('fs');

var productList = [
    {product: "Salt", about: "Salt is a mineral substance composed primarily of sodium chloride (NaCl), a chemical compound belonging to the larger class of ionic salts",quantity:"1"},
    {product: "Sugar", about: "Sugar is the generalized name for sweet, short-chain, soluble carbohydrates, many of which are used in food.",quantity:"2"},
    {product: "Spice", about: "A spice is a dried seed, fruit, root, bark, or vegetable substance primarily used for flavoring, coloring or preserving food.",quantity:"3"},
    {product: "Bread", about: "Bread is a staple food prepared from a dough of flour and water",quantity:"4"}
];

exports.index = function(req, res) {
    res.set('Content-Type', 'text/html');

    fs.readFile(__dirname + '/../views/grid.html', function(err, data) {
        if (err) {
            console.log("err: " + err);
            res.send("<html><head/><body>empty: " + __dirname + "</body></html>");
            return;
        }

        res.send(data);
    });
};

exports.getProducts = function(req, res) {
    res.set('Content-Type', 'application/json');

    res.send(productList);
};
