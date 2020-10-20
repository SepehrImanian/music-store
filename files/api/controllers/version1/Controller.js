const groupAlbum = require('./../../models/groupAlbum');
const album = require('./../../models/album');
const music = require('./../../models/music');
const picture = require('./../../models/picture');
const musicVideo = require('./../../models/musicVideo');
const User = require('./../../models/user');

module.exports = class Controller {
    constructor() {
        this.model = {
            groupAlbum,
            album,
            music,
            picture,
            musicVideo,
            User
        };
    }

    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.status(422).json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false;
    }
    
    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}