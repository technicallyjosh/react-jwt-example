'use strict';

const app          = require('koa')();
const jwt          = require('koa-jwt');
const bodyParser   = require('koa-bodyparser');
const send         = require('koa-send');
const serve        = require('koa-static');
const jsonwebtoken = require('jsonwebtoken');
const error        = require('./middleware/error-middleware.js');
const router       = require('koa-router')();

// do not use this secret for production
const secret = 'supersecret';

app.use(error());
app.use(bodyParser());
app.use(serve('dist'));
app.use(jwt({ secret }).unless({
    path: [/^(?!\/api\/)/]
}));

// for example use, we just check for specific username/password
// in the real world, we would check a database and check hashed password
router.post('/auth', function* () {
    const username = this.request.body.username;
    const password = this.request.body.password;

    if (username !== 'username' && password !== 'password') {
        this.throw(401, 'Invalid username/password.');
    }

    const token = jsonwebtoken.sign({ username }, secret, {
        issuer: 'localhost',
        audience: 'someaudience',
        expiresIn: '1d'
    });

    this.body = { token };
});

app.use(router.routes());

app.use(function* () {
    yield send(this, '/dist/index.html');
});

app.on('error', err => console.log(err));

app.listen(3000, () => console.log('example running on port 3000'));
