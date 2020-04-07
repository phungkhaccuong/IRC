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
        var money, period, dataGetFromBanks, banks ;
        if(req.query.money === undefined || req.query.period === undefined) {
            money = -1;
            period = -1;
        }else {
            money = parseFloat(req.query.money);
            period = parseInt(req.query.period);
            banks = req.query.banks;
        }
        if(money == -1 ) {
            //ManagementBank.prototype.getDataFromVIETCOMBANK().catch(error => 'error:'+error)
            res.render("website");
            return;
        }

        /** run parallel to get interest rate of banks */
        dataGetFromBanks = await Promise.allSettled([
            // ManagementBank.prototype.getDataFromABBANK(),
            // ManagementBank.prototype.getDataFromAGRIBANK(),
            // ManagementBank.prototype.getDataFromBAOVIETBANK(),
            // ManagementBank.prototype.getDataFromCBBANK(),
            // ManagementBank.prototype.getDataFromINDOVINABANK(),
            // ManagementBank.prototype.getDataFromKIENLONGBANK(),
            // ManagementBank.prototype.getDataFromNAMABANK(),
            // ManagementBank.prototype.getDataFromOCB(),
            // ManagementBank.prototype.getDataFromOCEANBANK(),
            // ManagementBank.prototype.getDataFromPUBLICBANK(),
            // ManagementBank.prototype.getDataFromPVCOMBANK(),
            // ManagementBank.prototype.getDataFromSAIGONBANK(),
            // ManagementBank.prototype.getDataFromSHB(),
            // ManagementBank.prototype.getDataFromVIETINBANK(),
            // ManagementBank.prototype.getDataFromVRB(),
            // ManagementBank.prototype.getDataFromHLBVN(),
            ManagementBank.prototype.getDataFromOtherBanks()
        ]).then(dataOfBanks => {
            var data = [];
            for(let i = 0 ; i < dataOfBanks.length ; i++ ) {
                if(dataOfBanks[i].status === 'fulfilled' && (typeof dataOfBanks[i].value !== 'undefined')) {
                    if(!Array.isArray(dataOfBanks[i].value)) {
                        data.push(dataOfBanks[i].value);
                    }else{
                        data.push(...dataOfBanks[i].value);
                    }
                }
            }
            return data;
        });

        //filter banks and render data
        if(banks.find(bankName => bankName === "BANKS")) {
            SearchingController.prototype.renderData(dataGetFromBanks,money,period,res)
        }else {
            SearchingController.prototype.renderData(SearchingController.prototype.filterBanks(dataGetFromBanks,banks),money,period,res)
        }
    }

    /**
     * this method is to get data of bank user chose, after that render to hmtl file
     * @param {*} dataGetFromBanks 
     * @param {*} money 
     * @param {*} period 
     */
    renderData(dataGetFromBanks,money,period,res) {
        var dataForDisplaying;
        /** get data for displaying */
        try{
            dataForDisplaying = SearchingController.prototype.handleDataForDisplay(dataGetFromBanks,money,period);
            res.render("result", {
                data: dataForDisplaying,
                period: period
            })
        } catch(error) {
            console.log('There is an error:' + error)
        }

    }

    /**
     * this method is to filter banks that user chose
     * @param {*} dataGetFromBanks: data that reading from json
     * @param {*} banks: name of banks that user chose
     */
    filterBanks(dataGetFromBanks,banks) {
        var data = [];
        //filter banks that user choose
        for(let i = 0; i < banks.length; i++) {
            data.push(dataGetFromBanks.find(bank => bank.name === banks[i].toString()));
        }
    
        return data;
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