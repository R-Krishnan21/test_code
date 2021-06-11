const express = require('express')
var cors = require('cors');
const app = express()
const multer = require('multer');

const port = 4000

app.use(cors())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/image')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png') {
            return cb(res.status(400).end('only jpg, png is allowed'), false);
        }
        cb(null, true)
    }
  })

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    }
}).single("file")

app.post("/uploadfiles", upload, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

});

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})