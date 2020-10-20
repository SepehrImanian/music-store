const Controller = require('./../Controller');

module.exports = new class pictureController extends Controller {
    index(req, res) {
        this.model.picture.find({}).then((pictures) => {
            if (pictures) {
                return res.json({
                    message: 'pictures',
                    data: pictures,
                    success: true
                });
            }
            res.status(404).json({
                message: 'pictures have eror :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    search(req, res) {
        req.checkParams('id', 'id is not correct :-(').isMongoId();
        let id = req.params.id;
        this.model.picture.findById(id).then((picture) => {
            if (picture) {
                return res.json({
                    message: 'search for this picture',
                    data: picture,
                    success: true
                });
            }
            res.status(404).json({
                message: 'search this picture not found :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    store(req, res) {
        req.checkBody('name', 'music name can not be empty').notEmpty();
        req.checkBody('title', 'music title can not be empty').notEmpty();
        req.checkBody('size', 'music size name can not be empty').notEmpty();
        req.checkBody('body', 'music body can not be empty').notEmpty();

        this.escapeAndTrim(req, 'name body size title');

        if (this.showValidationErrors(req, res)) {
            return;
        }

        let music = this.model.music.findById(req.body.music_id, (err, music) => {
            let newPicture = this.model.picture({
                musics: music._id,
                name: req.body.name,
                body: req.body.body,
                size: req.body.size,
                title: req.body.title
            });

            newPicture.save(err => {
                if (err) throw err;
                music.pictures.push(newPicture._id);
                music.save();
                res.json({
                    message: 'new picture success created :-)',
                    success: true
                });
            });
        });
    }

    update(req, res) {
        req.checkParams('id', 'id is not correct :-(').isMongoId();
        if (this.showValidationErrors(req, res)) {
            return;
        }
        let id = req.params.id;
        this.model.picture.findByIdAndUpdate(id, {
            'body': req.headers['body']
        }).then((picture) => {
            if (picture) {
                return res.json({
                    message: 'picture success updated :-)',
                    success: true
                });
            }
            res.status(404).json({
                message: 'picture not found to update :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    remove(req, res) {
        req.checkParams('id', 'id is not correct :-(').isMongoId();
        let id = req.params.id;
        if (this.showValidationErrors(req, res)) {
            return;
        }

        this.model.picture.findByIdAndRemove(id).then((picture) => {
            if (picture) {
                res.json({
                    message: 'picture success deleted :-)',
                    success: true
                });
            }

            res.json({
                message: 'picture not found :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }
}