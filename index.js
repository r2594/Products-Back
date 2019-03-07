const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const dbFile = 'test.db';
const db = new sqlite3.Database(dbFile);


app.use(cors());
db.serialize( () => {

    //if (! fs.existsSync(dbFile)){
        db.run('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUMBER, img TEXT, like BOOLEAN)');
    //}
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'sac', 4, 'img1.jpg', false);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'tshirt', 45, 'img2.jpg', false);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'chaussures', 55, 'img3.jpg', false);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'pistoleros', 499.99, 'img4.jpg', true);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'sac', 6, 'img1.jpg', false);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'tshirt', 45, 'img2.jpg', false);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'chaussures', 55, 'img3.jpg', false);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'pistoleros', 499.99, 'img4.jpg', true);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'sac', 2, 'img1.jpg', false);

        db.all('UPDATE products SET price = price + 5', function (error, data) {
            if (!error) console.log(data);
            else console.log(error);
            });
        

        db.all('SELECT name, price, img, like FROM products', function (error, data) {
            if (!error) console.log(data);
            else console.log(error);
            app.get("/", function(req, res){
                res.send(data);
        });

        db.all('SELECT like FROM products WHERE like=true', function (error, data) {
            if (!error) console.log(data);
            else console.log(error);
            });

        db.all('SELECT max(price) FROM products', function (error, data) {
            if (!error) console.log(data);
            else console.log(error);
            });

        db.all('SELECT count(*) FROM products', function (error, data) {
            if (!error) console.log(data);
            else console.log(error);
            });

        db.all('SELECT name, price FROM products WHERE name="sac" AND price < 5', function (error, data) {
            if (!error) console.log(data);
            else console.log(error);
            });

        db.all('SELECT * FROM products ORDER BY price DESC', function (error, data) {
            if (!error) console.log(data);
            else console.log(error);
            });
        });

        
});
    
    app.listen(3000, function(){
        console.log('lol');
    });
    