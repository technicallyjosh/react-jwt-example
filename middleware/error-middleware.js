'use strict';

module.exports = () => {
    return function* (next) {
        try {
            yield next;
        } catch (e) {
            this.status = e.status || 500;

            let body = {
                message: e.message
            };

            if (this.status >= 500) {
                this.app.emit('error', e, this);

                if (process.env.NODE_ENV !== 'production') {
                    body.stack = e.stack;
                }
            }

            this.body = body;
        }
    };
};
