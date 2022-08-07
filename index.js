const fs = require('fs')
const next = require('next')
const mime = require('mime-types')
const app = next({ dev: false })
const handle = app.getRequestHandler()
const slasher = handler => (req, res) => {
    if (req.url === '') {
        req.url = '/'
    }
    return handler(req, res)
}
exports.bitAssist = slasher((req, res) => {
    return app.prepare()
        .then(() => handle(req, res))
        .catch(ex => {
            console.error(ex.stack)
            process.exit(1)
        })
})

