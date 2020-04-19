var ManagementBank = require('../model/ManagementBank');
class SearchingController {
    /**
     * @class
     */
    constructor() { }

    /**
     * the main method for handling data to display. 
     * @param {request} req 
     * @param {response} res 
     */
    async call(req, res){
        var money, period, 
        /** data read from json or crawl from website of banks */
        dataGetFromBanks, 
        /** banks that user choose from UI */
        banks,
        /** for pagination */
        currentPage ;
        /** the first call to the page */
        if(req.query.money === undefined || req.query.period === undefined) {
            money = -1;
            period = -1;
            currentPage = -1;
        }else {
            money = parseFloat(req.query.money);
            period = parseInt(req.query.period);
            banks = req.query.banks;
            currentPage = parseInt(req.query.page) || 1;
        }
        if(money === -1 ) {
            /** this is default page */
            dataGetFromBanks = await SearchingController.prototype.runDataOfBanks();
            money = 50000000;
            period = 1;
            currentPage = -1;
            banks = ['TECHCOMBANK','VIETCOMBANK','AGRIBANK','VIETINBANK','VPBANK'];
            SearchingController.prototype.renderData(SearchingController.prototype.sortBanks(SearchingController.prototype.filterBanks(dataGetFromBanks,banks),money,period), money, period, currentPage, res);
            return;
        }else{
            /** this is a page that user chose money, period and bank */
            dataGetFromBanks = await SearchingController.prototype.runDataOfBanks();
            //filter banks and render data
            SearchingController.prototype.renderData(SearchingController.prototype.sortBanks(SearchingController.prototype.filterBanks(dataGetFromBanks,banks),money,period), money, period, currentPage, res);
        }
    }

    /**
     * run parallel to get interest rate of banks from json file or crawl websites
     */
    async runDataOfBanks() {
        return await Promise.allSettled([
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
                    data.push(dataOfBanks[i].value);
                }
            }
            return data.flat();
        });
    }

    /**
     * this method is to get data of bank user chose, after that render to hmtl file
     * @param {*} dataGetFromBanks 
     * @param {*} money 
     * @param {*} period 
     */
    renderData(datasortedBanks,money,period, currentPage, res) {
        var dataForDisplaying;
        try{
            if(currentPage === -1){
                res.render("website", {
                    data: datasortedBanks,
                    period: period,
                    money: money
                });
            } else {
                //get total page
                let totalRecord = datasortedBanks.length;
                let perPage = 5;
                let start = (currentPage - 1)* perPage;
                let end = currentPage * perPage;
                let totalPage = Math.ceil(totalRecord / perPage);
                dataForDisplaying = datasortedBanks.slice(start, end);
                res.render("result", {
                    data: dataForDisplaying,
                    period: period,
                    money: money,
                    currentPage: currentPage,
                    totalPage: totalPage,
                    totalRecord:totalRecord
                });
            }
        } catch(e) {
            console.log('There is an error at renderData method:' + error)
        }
    }

    /**
     * this function is to sort banks for display based on period and money 
     * @param {data} data : interest rate of banks
     * @param {money} money : money user want to send savings
     * @param {period} period : a period of savings
     */
    sortBanks(data,money,period) {
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

    /**
     * this method is to get data of banks that user chose  by filtering banks from (json file or website)
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
}
module.exports = new SearchingController();