const Controller = require('./../Controller');

module.exports = new class groupAlbumController extends Controller {
    index(req, res) {
        this.model.groupAlbum.find({}).populate('albums').then((groupAlbums) => {
            if (groupAlbums) {
                return res.json({
                    message: 'group albums',
                    data: groupAlbums,
                    success: true
                });
            }
            res.status(404).json({
                message: 'group albums have eror :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    search(req, res) {
        req.checkParams('id', 'id is not correct :-(').isMongoId();
        let id = req.params.id;
        this.model.groupAlbum.findById(id).populate('albums').then((groupAlbum) => {
            if (groupAlbum) {
                return res.json({
                    message: 'search for this group album',
                    data: groupAlbums,
                    success: true
                });
            }
            res.status(404).json({
                message: 'this group album not found :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    store(req, res) {
        req.checkBody('name', 'group album name can not be empty').notEmpty();
        req.checkBody('body', 'group album body can not be empty').notEmpty();
        req.checkBody('year', 'group album year can not be empty').notEmpty();
        req.checkBody('size', 'group album size can not be empty').notEmpty();
        req.checkBody('albumNumber', 'group album number can not be empty').notEmpty();

        this.escapeAndTrim(req, 'name body year size albumNumber');

        if (this.showValidationErrors(req, res)) {
            return;
        }

        let newGroupAlbum = this.model.groupAlbum({
            name: req.body.name,
            body: req.body.body,
            year: req.body.year,
            size: req.body.size,
            albumNumber: req.body.albumNumber
        });

        newGroupAlbum.save(err => {
            if (err) throw err;
            res.json({
                message: 'new group album success created :-)',
                success: true
            });
        });
    }

    update(req, res) {
        req.checkParams('id', 'id is not correct :-(').isMongoId();
        
        if(this.showValidationErrors(req, res)) {
            return;
        }

        let id = req.params.id;
        this.model.groupAlbum.findByIdAndUpdate(id, {
            'body': req.headers['body']
        }).then((groupAlbum) => {
            if (groupAlbum) {
                return res.json({
                    message: 'group album success updated :-)',
                    success: true
                });
            }
            res.status(404).json({
                message: 'group album not found to update :-(',
                success: false
            });
        }).catch((err) => {
            if (err) throw err;
        });
    }

    remove(req, res) {
        req.checkParams('id', 'id is not correct :-(').isMongoId();
        let id = req.params.id;
        if(this.showValidationErrors(req, res)) {
            return;
        }

        this.model.groupAlbum.findByIdAndRemove(id).then((groupAlbum) => {
            if(groupAlbum){
                res.json({
                    message: 'group album success deleted :-)',
                    success: true
                });
            }

            res.json({
                message: 'group album not found :-(',
                success: false
            });
        }).catch((err) => {
            if(err) throw err;
        });
    }
}