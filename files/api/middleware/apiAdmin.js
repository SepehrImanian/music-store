module.exports = (req, res, next) => {
    let access = req.body.access || req.query.access || req.headers['access'];
    if (access == 'sepehr123') {
        next();
        return;
    }

    return res.status(403).json({
        message: 'you can not access to this route',
        success: false
    })
}