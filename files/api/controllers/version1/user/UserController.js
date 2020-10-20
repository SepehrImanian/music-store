const Controller = require('./../Controller');
const UserTransform = require('./../../../transforms/UserTransform');

module.exports = new class UserController extends Controller {
    index(req , res) {
        return res.json({
            data : new UserTransform().transform(req.user)
        })
    }
}