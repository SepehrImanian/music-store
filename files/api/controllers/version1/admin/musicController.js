const Controller = require('./../Controller');

module.exports = new class musicController extends Controller {
    index(req, res) {
        this.model.music.find({}).populate('pictures').populate('musicVideos').then((musics) => {
            if (musics) {
                return res.json({
                    message: 'musics',
                    data: musics,
                    success: true
                });
            }
            res.status(404).json({
                message: 'musics have eror :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    search(req, res) {
        req.checkParams('id', 'id is not correct :-(').isMongoId();
        let id = req.params.id;
        this.model.music.findById(id).populate('pictures').populate('musicVideos').then((music) => {
            if (music) {
                return res.json({
                    message: 'search for this music',
                    data: music,
                    success: true
                });
            }
            res.status(404).json({
                message: 'this music not found :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    store(req, res) {
        req.checkBody('name', 'music name can not be empty').notEmpty();
        req.checkBody('size', 'music size can not be empty').notEmpty();
        req.checkBody('singerName', 'music singer name can not be empty').notEmpty();
        req.checkBody('body', 'music body can not be empty').notEmpty();

        this.escapeAndTrim(req, 'name body size singerName');

        if (this.showValidationErrors(req, res)) {
            return;
        }

        let album = this.model.album.findById(req.body.album_id, (err, album) => {
            let newMusic = this.model.music({
                albums: album._id,
                name: req.body.name,
                body: req.body.body,
                size: req.body.size,
                singerName: req.body.singerName
            });

            newMusic.save(err => {
                if (err) throw err;
                album.musics.push(newMusic._id);
                album.save();
                res.json({
                    message: 'new music success created :-)',
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
        this.model.music.findByIdAndUpdate(id, {
            'body': req.headers['body']
        }).then((music) => {
            if (music) {
                return res.json({
                    message: 'music success updated :-)',
                    success: true
                });
            }
            res.status(404).json({
                message: 'music not found to update :-(',
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

        this.model.music.findByIdAndRemove(id).then((music) => {
            if (music) {
                res.json({
                    message: 'music success deleted :-)',
                    success: true
                });
            }

            res.json({
                message: 'music not found :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }
}