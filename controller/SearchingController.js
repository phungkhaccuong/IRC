var ManagementBank = require('../model/ManagementBank');
class SearchingController {
    /**
     * @class
     */
    constructor() { }

    async call(req, res){
        ManagementBank.prototype.getDataFromTPBANK().then(data => {
            return data;
        })
    }

}
module.exports = new SearchingController();