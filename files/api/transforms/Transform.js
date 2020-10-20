module.exports = class Transform {
    transformCollection(items){
        return items.map(this.transform.bind(this));
    }
}