var multer = require('multer');
var fs = require('fs');
module.exports = function(app) {
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads')
        },
        filename: function(req, file, cb) {
            cb(null, 'upload-' + Date.now() + "." + file.originalname.split(".")[1])
        }
    })
    var upload = multer({ storage: storage })
    app.post('/upload', upload.any(), (req, res) => {
        res.json(req.files[0].fieldname + "/uploads/" + req.files[0].filename)
    })

    var storageLogo = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/admin/')
        },
        filename: function(req, file, cb) {
            cb(null, "enturaz-logo.png")
        }
    })
    var uploadLogo = multer({ storage: storageLogo })

    app.post('/uploadLogo', uploadLogo.any(), (req, res) => {
        // app.service("admin-uploads").find({
        //     query: {
        //         file_desc: "logo"
        //     }
        // }).then(results => {
        //     // app.service("admin-uploads").update(results.data[0]._id, {
        //     //     file_desc: "logo",
        //     //     path: req.files[0].fieldname + "/uploads/admin/" + req.files[0].filename
        //     // })

        // })
        res.send(true)

    })

    var storageFavicon = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/admin/')
        },
        filename: function(req, file, cb) {
            cb(null, "enturaz-favicon.png")
        }
    })
    var uploadFavicon = multer({ storage: storageFavicon })

    app.post('/uploadFavicon', uploadFavicon.any(), (req, res) => {
        res.send(true)
    })

    var storageFeaturedPhoto = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/admin/featuredPhotos')
        },
        filename: function(req, file, cb) {
            cb(null, "/FP-" + Date.now() + ".png")
        }
    })
    var uploadFeaturedPhoto = multer({ storage: storageFeaturedPhoto })

    app.post('/addFeaturedPhotos', uploadFeaturedPhoto.any(), (req, res) => {
        app.service("featured-photos").create({
            path: req.files[0].fieldname + "/uploads/admin/featuredPhotos" + req.files[0].filename
        }).then(result => {
            res.send(result)
        })

    })

    var storageGovernmentID = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/storeOwner/GovernmentID')
        },
        filename: function(req, file, cb) {
            cb(null, "/GI-" + Date.now() + ".png")
        }
    })
    var uploadGovernmentID = multer({ storage: storageGovernmentID })

    app.post('/uploadGovernmentID', uploadGovernmentID.any(), (req, res) => {

        res.send(req.files[0].fieldname + "/uploads/storeOwner/GovernmentID" + req.files[0].filename)

    })

    var storageRegistrationCertificate = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/storeOwner/RegistrationCertificate')
        },
        filename: function(req, file, cb) {
            cb(null, "/RC-" + Date.now() + ".png")
        }
    })
    var uploadRegistrationCertificate = multer({ storage: storageRegistrationCertificate })

    app.post('/uploadRegistrationCertificate', uploadRegistrationCertificate.any(), (req, res) => {

        res.send(req.files[0].fieldname + "/uploads/storeOwner/RegistrationCertificate" + req.files[0].filename)

    })

    var storagePortfolioGallery = multer.diskStorage({

        destination: function(req, file, cb) {
            cb(null, 'public/uploads/storeOwner/featuredGallery')
        },
        filename: function(req, file, cb) {
            cb(null, "/FG-" + Date.now() + "." + file.originalname.split(".")[1])
        }
    })
    var uploadPortfolioGallery = multer({ storage: storagePortfolioGallery })
    app.post('/uploadPortfolioGallery', uploadPortfolioGallery.any(), (req, res) => {
        console.log(req.files)
        if (['image/jpeg', 'image/png'].includes(req.files[0].mimetype)) {

            res.json({
                type: req.files[0].mimetype.split("/")[0],
                name: req.files[0].fieldname + "/uploads/storeOwner/featuredGallery" + req.files[0].filename,
                directory: "public/uploads/storeOwner/featuredGallery" + req.files[0].filename,
                size: (req.files[0].size / 1000000).toFixed(2), //CONVERTING BYTE TO MEGABYTE
                createdAt: new Date()
            })
        } else {
            fs.unlink("public/uploads/storeOwner/featuredGallery" + req.files[0].filename, (err) => {
                console.log(err)
                res.send(false)
            })
        }
    })
    app.post('/deletePortfolioGallery', (req, res) => {
        console.log(req.body)
        fs.unlink(req.body.img_directory, (err) => {
            if (err) {
                console.log(err)
                res.send(false)
                return
            }
            res.send(true)
        })
    })
    var storageProducts = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/storeOwner/products')
        },
        filename: function(req, file, cb) {
            cb(null, "/PR-" + Date.now() + "." + file.originalname.split(".")[1])
        }
    })
    var uploadProducts = multer({ storage: storageProducts })

    app.post('/uploadProducts', uploadProducts.any(), async(req, res) => {
        res.send(req.files[0].fieldname + "/uploads/storeOwner/products" + req.files[0].filename)
    })

    var storageServices = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/storeOwner/services')
        },
        filename: function(req, file, cb) {
            cb(null, "/SR-" + Date.now() + "." + file.originalname.split(".")[1])
        }
    })
    var uploadServices = multer({ storage: storageServices })

    app.post('/uploadServices', uploadServices.any(), async(req, res) => {
        res.send(req.files[0].fieldname + "/uploads/storeOwner/services" + req.files[0].filename)
    })

}