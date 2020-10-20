const Controller = require('./../Controller');

module.exports = new class musicVideoController extends Controller {
    index(req, res) {
        this.model.musicVideo.find({}).then((musicVideos) => {
            if (musicVideos) {
                return res.json({
                    message: 'musicVideos',
                    data: musicVideos,
                    success: true
                });
            }
            res.status(404).json({
                message: 'musicVideos have eror :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    search(req, res) {
        req.checkParams('id', 'id is not correct :-(').isMongoId();
        let id = req.params.id;
        this.model.musicVideo.findById(id).then((musicVideo) => {
            if (musicVideo) {
                return res.json({
                    message: 'search musicVideo for this picture',
                    data: musicVideo,
                    success: true
                });
            }
            res.status(404).json({
                message: 'this musicVideo not found :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    store(req, res) {
        req.checkBody('name', 'music name can not be empty').notEmpty();
        req.checkBody('size', 'music size name can not be empty').notEmpty();
        req.checkBody('body', 'music body can not be empty').notEmpty();

        this.escapeAndTrim(req, 'name body size');

        if (this.showValidationErrors(req, res)) {
            return;
        }

        let music = this.model.music.findById(req.body.music_id, (err, music) => {
            let newMusicVideo = this.model.musicVideo({
                musics: music._id,
                name: req.body.name,
                body: req.body.body,
                size: req.body.size
            });

            newMusicVideo.save(err => {
                if (err) throw err;
                music.musicVideos.push(newMusicVideo._id);
                music.save();
                res.json({
                    message: 'new musicVideo success created :-)',
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
        this.model.musicVideo.findByIdAndUpdate(id, {
            'body': req.headers['body']
        }).then((musicVideo) => {
            if (musicVideo) {
                return res.json({
                    message: 'musicVideo success updated :-)',
                    success: true
                });
            }
            res.status(404).json({
                message: 'musicVideo not found to update :-(',
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

        this.model.musicVideo.findByIdAndRemove(id).then((musicVideo) => {
            if (musicVideo) {
                res.json({
                    message: 'musicVideo success deleted :-)',
                    success: true
                });
            }

            res.json({
                message: 'musicVideo not found :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }
}