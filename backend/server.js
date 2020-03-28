const express = require('express');
const nunjucks = require('nunjucks')

const server = express();

nunjucks.configure('views', {
    express: server,
    noCache: true,
});

const allIdeas = [

    {
        img: "icon.svg",
        title: "Title 1",
        category: "Category 1",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        url: "http://www.tiagomelojuca.com.br/",
    },

    {
        img: "icon.svg",
        title: "Title 2",
        category: "Category 2",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        url: "http://www.tiagomelojuca.com.br/",
    },

    {
        img: "icon.svg",
        title: "Title 3",
        category: "Category 3",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        url: "http://www.tiagomelojuca.com.br/",
    },

    {
        img: "icon.svg",
        title: "Title 4",
        category: "Category 4",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        url: "http://www.tiagomelojuca.com.br/",
    },

]

server.use(express.static('public'));

server.get('/', function(request, response) {
    const allIdeasReversed = [...allIdeas].reverse();
    let latestIdeas = []
    for(idea of allIdeasReversed) {
        if(latestIdeas.length < 3) {
            latestIdeas.push(idea);
        }
    }

    return response.render('index.html', {getIdeas: latestIdeas} )
})

server.get('/ideas', function(request, response) {
    const allIdeasReversed = [...allIdeas].reverse();
    return response.render('ideas.html', {getIdeas: allIdeasReversed} );
})

server.listen(8090);