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
    if (req.url.startsWith('/_next/static/')) {
        const file = '.' + req.url.replace('_next', '.next')
        if (fs.existsSync(file)) {
            // console.log(`Serving ${file}`)
            res.setHeader('Cache-Control', 'public, max-age=0')
            const mimeType = mime.lookup(file)
            const body = fs.readFileSync(file)
            return res.writeHead(200, {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': mimeType
            })
                .end(body)
        }

    } else {
        return app.prepare()
            .then(() => handle(req, res))
            .catch(ex => {
                console.error(ex.stack)
                process.exit(1)
            })
    }
    return res.writeHead(404, {
        'Content-Length': Buffer.byteLength('404 Not Found'),
        'Content-Type': 'text/plain'
    })
        .end('404 Not Found')
})

