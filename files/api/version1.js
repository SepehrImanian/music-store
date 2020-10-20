const express = require('express');
const router = express.Router();

//ControllerAdmin
const groupAlbumController = require('./controllers/version1/admin/groupAlbumController');
const albumController = require('./controllers/version1/admin/albumController');
const musicController = require('./controllers/version1/admin/musicController');
const pictureController = require('./controllers/version1/admin/pictureController');
const musicVideoController = require('./controllers/version1/admin/musicVideoController');
const UserController = require('./controllers/version1/user/UserController');

//ControllerUser
const AuthController = require('./controllers/version1/user/AuthController');

//middleware
const {uploadImage} = require('./middleware/UploadImage');
const apiAuth = require('./middleware/apiAuth');
const apiAdmin = require('./middleware/apiAdmin');
//users routes
router.post('/login' , AuthController.login.bind(AuthController));
router.post('/register' , AuthController.register.bind(AuthController));
router.get('/user' , apiAuth , UserController.index.bind(UserController));

//admin routes => groupAlbumController , AlbumController
//, musicController , pictureController , musicVideoController
const adminRouter = express.Router();

//groupAlbumController
adminRouter.get('/groupAlbum' , groupAlbumController.index.bind(groupAlbumController));
adminRouter.get('/groupAlbum/:id', groupAlbumController.search.bind(groupAlbumController));
adminRouter.post('/groupAlbum' , groupAlbumController.store.bind(groupAlbumController));
adminRouter.put('/groupAlbum/:id' , groupAlbumController.update.bind(groupAlbumController));
adminRouter.delete('/groupAlbum/:id' , groupAlbumController.remove.bind(groupAlbumController));

//AlbumController
adminRouter.get('/album' , albumController.index.bind(albumController));
adminRouter.get('/album/:id' , albumController.search.bind(albumController));
adminRouter.post('/album' , albumController.store.bind(albumController));
adminRouter.put('/album/:id' , albumController.update.bind(albumController));
adminRouter.delete('/album/:id' , albumController.remove.bind(albumController));

//musicController
adminRouter.get('/music' , musicController.index.bind(musicController));
adminRouter.get('/music/:id' , musicController.search.bind(musicController));
adminRouter.post('/music' , musicController.store.bind(musicController));
adminRouter.put('/music/:id' , musicController.update.bind(musicController));
adminRouter.delete('/music/:id' , musicController.remove.bind(musicController));

//pictureController
adminRouter.get('/picture' , pictureController.index.bind(pictureController));
adminRouter.get('/picture/:id' , pictureController.search.bind(pictureController));
adminRouter.post('/picture' , pictureController.store.bind(pictureController));
adminRouter.put('/picture/:id' , pictureController.update.bind(pictureController));
adminRouter.delete('/picture/:id' , pictureController.remove.bind(pictureController));
 
//musicVideoController
adminRouter.get('/musicVideo' , musicVideoController.index.bind(musicVideoController));
adminRouter.get('/musicVideo/:id' , musicVideoController.search.bind(musicVideoController));
adminRouter.post('/musicVideo' , musicVideoController.store.bind(musicVideoController));
adminRouter.put('/musicVideo/:id' , musicVideoController.update.bind(musicVideoController));
adminRouter.delete('/musicVideo/:id' , musicVideoController.remove.bind(musicVideoController));

router.use('/admin' , apiAuth , apiAdmin ,  adminRouter);
//(ip):port/api/version1/admin/
module.exports = router;
//(ip):port/api/version1/