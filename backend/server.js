const express = require('express');
const nunjucks = require('nunjucks')
const db = require('./db');

const server = express();

nunjucks.configure('views', {
    express: server,
    noCache: true,
});

server.use(express.static('public'));
server.use(express.urlencoded( { extended: true } ) );

server.get('/', function(request, response) {

    db.all('SELECT * FROM ideas', function(err, rows) {
        if (err) {
            console.log(err);
            return response.send('Database error!');
        }
        
        const allIdeasReversed = [...rows].reverse();
        let latestIdeas = []
        for(idea of allIdeasReversed) {
            if(latestIdeas.length < 3) {
                latestIdeas.push(idea);
            }
        }
    
        return response.render('index.html', {getIdeas: latestIdeas} )
    })

});

server.get('/ideas', function(request, response) {

    db.all('SELECT * FROM ideas', function(err, rows) {
        if (err) {
            console.log(err);
            return response.send('Database error!');
        }

        const allIdeasReversed = [...rows].reverse();
        return response.render('ideas.html', {getIdeas: allIdeasReversed} );
    })
});

server.post('/', function(request, response) {
    const query = "INSERT INTO ideas(image, title, category, description, url) VALUES (?, ?, ?, ?, ?);";
    db.run(query, [
        request.body.image,
        request.body.title,
        request.body.category,
        request.body.description,
        request.body.url,
    ], function(err) {
        if (err) {
            console.log(err);
            return response.send('Database error!');
        }
    });

    return response.redirect('/ideas');
});

server.listen(8090);