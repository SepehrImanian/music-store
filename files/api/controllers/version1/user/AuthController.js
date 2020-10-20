const Controller = require('./../Controller');
const UserTransform = require('./../../../transforms/UserTransform');
const bcrypt = require('bcrypt');

module.exports = new class CourseController extends Controller {
    register(req, res) {
        req.checkBody('name', 'name can not be empty').notEmpty();
        req.checkBody('email', 'email can not be empty').notEmpty();
        req.checkBody('password', 'password can not be empty').notEmpty();
        req.checkBody('email', 'your email format is not true').isEmail();

        if (this.showValidationErrors(req, res))
            return;

        this.model.User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).save(err => {
            if (err) {
                if (err.code == 11000) {
                    return res.json({
                        data: 'your email not true',
                        success: false
                    })
                } else {
                    throw err;
                }
            }

            return res.json({
                data: 'you are success register in server',
                success: true
            });
        });
    }

    login(req, res) {
        req.checkBody('email', 'email can not be empty').notEmpty();
        req.checkBody('password', 'password can not be empty').notEmpty();
        req.checkBody('email', 'your email format is not true').isEmail();

        if (this.showValidationErrors(req, res))
            return;

        this.model.User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err) throw err;
            if (user == null)
                return res.status(422).json({
                    data: 'this imformation not true',
                    success: false
                });
            bcrypt.compare(req.body.password, user.password, (err, status) => {
                if (!status)
                    return res.status(422).json({
                        data: 'your password not true',
                        success: false
                    });
                return res.json({
                    data: new UserTransform().transform(user, true),
                    success: true
                });
            });
        });
    }
}