const Controller = require('./../Controller');

module.exports = new class albumController extends Controller {
    index(req, res) {
        this.model.album.find({}).populate('musics').then((Albums) => {
            if (Albums) {
                return res.json({
                    message: 'albums',
                    data: Albums,
                    success: true
                });
            }
            res.status(404).json({
                message: 'albums have eror :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    search(req, res) {
        req.checkParams('id', 'id is not correct :-(').isMongoId();
        let id = req.params.id;
        this.model.album.findById(id).populate('musics').then((Album) => {
            if (Album) {
                return res.json({
                    message: 'search for this album',
                    data: Album,
                    success: true
                });
            }
            res.status(404).json({
                message: 'this album not found :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    store(req, res) {
        req.checkBody('name', 'album name can not be empty').notEmpty();
        req.checkBody('body', 'album body can not be empty').notEmpty();
        req.checkBody('year', 'album year can not be empty').notEmpty();
        req.checkBody('size', 'album size can not be empty').notEmpty();
        req.checkBody('musicNumber', 'album music number can not be empty').notEmpty();

        this.escapeAndTrim(req, 'name body year size musicNumber');

        if (this.showValidationErrors(req, res)) {
            return;
        }

        let groupAlbum = this.model.groupAlbum.findById(req.body.groupAlbum_id, (err, groupAlbum) => {
            let newAlbum = this.model.album({
                groupAlbums: groupAlbum._id,
                name: req.body.name,
                body: req.body.body,
                year: req.body.year,
                size: req.body.size,
                musicNumber: req.body.musicNumber
            });

            newAlbum.save(err => {
                if (err) throw err;
                groupAlbum.albums.push(newAlbum._id);
                groupAlbum.save();
                res.json({
                    message: 'new album success created :-)',
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
        this.model.album.findByIdAndUpdate(id, {
            'body': req.headers['body']
        }).then((Album) => {
            if (Album) {
                return res.json({
                    message: 'album success updated :-)',
                    success: true
                });
            }
            res.status(404).json({
                message: 'album not found to update :-(',
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

        this.model.album.findByIdAndRemove(id).then((Album) => {
            if (Album) {
                res.json({
                    message: 'album success deleted :-)',
                    success: true
                });
            }

            res.json({
                message: 'album not found :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }
}