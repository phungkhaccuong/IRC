var ManagementBank = require('../model/ManagementBank');
class SearchingController {
    /**
     * @class
     */
    constructor() { }

    /**
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async call(req, res){
        var money, period, dataGetFromBanks, dataForDisplaying;
        if(req.query.money === undefined || req.query.period === undefined) {
            money = -1;
            period = -1;
        }else {
            money = parseFloat(req.query.money);
            period = parseInt(req.query.period);
        }
        if(money == -1 ) {
            res.render("website");
            return;
        }

        /** run parallel to get interest rate of banks */
        dataGetFromBanks = await Promise.allSettled([
            ManagementBank.prototype.getDataFromABBANK(),
            ManagementBank.prototype.getDataFromAGRIBANK(),
            ManagementBank.prototype.getDataFromBAOVIETBANK(),
            ManagementBank.prototype.getDataFromCBBANK(),
            ManagementBank.prototype.getDataFromINDOVINABANK(),
            ManagementBank.prototype.getDataFromKIENLONGBANK(),
            ManagementBank.prototype.getDataFromNAMABANK(),
            ManagementBank.prototype.getDataFromOCB(),
            ManagementBank.prototype.getDataFromOCEANBANK(),
            ManagementBank.prototype.getDataFromPUBLICBANK(),
            ManagementBank.prototype.getDataFromPVCOMBANK(),
            ManagementBank.prototype.getDataFromSAIGONBANK(),
            ManagementBank.prototype.getDataFromSHB(),
            ManagementBank.prototype.getDataFromVIETINBANK(),
            ManagementBank.prototype.getDataFromVRB()
        ]).then(dataOfBanks => {
            var data = [];
            for(let i = 0 ; i < dataOfBanks.length ; i++ ) {
                if(dataOfBanks[i].status === 'fulfilled' && (typeof dataOfBanks[i].value !== 'undefined'))  data.push(dataOfBanks[i].value);
            }
            return data;
        });

        /** get data for displaying */
        try{
            dataForDisplaying = SearchingController.prototype.handleDataForDisplay(dataGetFromBanks,money,period);
        } catch(error) {
            console.log('There is a error:' + error)
        }
        console.log(dataForDisplaying);
        res.send(dataForDisplaying);
    }

    /**
     * this function is to handle data for display based on period and money 
     * @param {data} data : interest rate of banks
     * @param {money} money : money user want to send savings
     * @param {period} period : a period of savings
     */
    handleDataForDisplay(data,money,period) {
        /** a specific interest rate of banks */
        var irArray = new Set(),
        /**  a list of sorted Banks based on descending ir  */
        sortBanks=[];
        //amount of interest received
        var air;
        for(let i = 0; i < data.length ; i++) {
            if(data[i]['annualInterestRate'][period] !== 0 ) irArray.add(data[i]['annualInterestRate'][period]);
        }
        irArray = [...irArray].sort().reverse();
        //sort object bank
        irArray.forEach(item => {
            data.forEach(bank => {
                if(item === bank['annualInterestRate'][period]) {
                    air = Math.round((money * item)*period/(12*100)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    bank.air = air;
                    sortBanks.push(bank);
                }
            })
        });

        return sortBanks;
    }
}
module.exports = new SearchingController();