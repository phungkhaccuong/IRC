var ManagementBank = require('../model/ManagementBank');
class SearchingController {
    /**
     * @class
     */
    constructor() { }

    async call(req, res){
        var money, period, dataGetFromBanks;
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

        try{
            switch(period){
                case 1: {
                    var data = SearchingController.prototype.handleForOneMonth(dataGetFromBanks,money,period);
                    res.send(data);
                    break;
                }
                case 3: {
                    var data = SearchingController.prototype.handleForThreeMonth(dataGetFromBanks,money,period);
                    res.send(data);
                    break;
                }
                case 6: {
                    var data = SearchingController.prototype.handleForSixMonth(dataGetFromBanks,money,period);
                    res.send(data);
                    break;
                }
                case 9: {
                    var data = SearchingController.prototype.handleForNineMonth(dataGetFromBanks,money,period);
                    res.send(data);
                    break;
                }
                case 12: {
                    var data = SearchingController.prototype.handleForTwelveMonth(dataGetFromBanks,money,period);
                    res.send(data);
                    break;
                }
                case 18: {
                    var data = SearchingController.prototype.handleForEightteenMonth(dataGetFromBanks,money,period);
                    res.send(data);
                    break;
                }
                case 24: {
                    var data = SearchingController.prototype.handleForTwentyFourMonth(dataGetFromBanks,money,period);
                    res.send(data);
                    break;
                }
                default: break;
    
            }
        } catch(error) {
            console.log(error+"");
        }

        
        
    }

    /** this function is to handle for one month period */
    handleForOneMonth(data,money,period) {
        var ircArray = new Set();
        var sortBanks=[];
        //amount of interest  received
        var air;
        for(let i = 0; i < data.length ; i++) {
            if(data[i]['annualInterestRate']['1'] !== 0 ) ircArray.add(data[i]['annualInterestRate']['1']);
        }
        ircArray = [...ircArray].sort().reverse();
        //sort object bank
        ircArray.forEach(item => {
            data.forEach(bank => {
                if(item === bank['annualInterestRate']['1']) {
                    air = Math.round((money * item)*period/12).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    bank.air = air;
                    sortBanks.push(bank);
                }
            })
        });

        return sortBanks;


    }
    /** this function is to handle for one month period */
    handleForThreeMonth(data,money,period) {
        var ircArray = new Set();
        var sortBanks=[];
        //amount of interest  received
        var air;
        for(let i = 0; i < data.length ; i++) {
            if(data[i]['annualInterestRate']['3'] !== 0 ) ircArray.add(data[i]['annualInterestRate']['3']);
        }
        ircArray = [...ircArray].sort().reverse();
        //sort object bank
        ircArray.forEach(item => {
            data.forEach(bank => {
                if(item === bank['annualInterestRate']['3']) {
                    air = Math.round((money * item)*period/12).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    bank.air = air;
                    sortBanks.push(bank);
                }
            })
        });

        return sortBanks;


    }
    /** this function is to handle for six month period */
    handleForSixMonth(data,money,period) {
        var ircArray = new Set();
        var sortBanks=[];
        //amount of interest  received
        var air;
        for(let i = 0; i < data.length ; i++) {
            if(data[i]['annualInterestRate']['6'] !== 0 ) ircArray.add(data[i]['annualInterestRate']['6']);
        }
        ircArray = [...ircArray].sort().reverse();
        //sort object bank
        ircArray.forEach(item => {
            data.forEach(bank => {
                if(item === bank['annualInterestRate']['6']) {
                    air = Math.round((money * item)*period/12).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    bank.air = air;
                    sortBanks.push(bank);
                }
            })
        });

        return sortBanks;
    }

    /** this function is to handle for nine month period */
    handleForNineMonth(data,money,period) {
        var ircArray = new Set();
        var sortBanks=[];
        //amount of interest  received
        var air;
        for(let i = 0; i < data.length ; i++) {
            if(data[i]['annualInterestRate']['9'] !== 0 ) ircArray.add(data[i]['annualInterestRate']['9']);
        }
        ircArray = [...ircArray].sort().reverse();
        //sort object bank
        ircArray.forEach(item => {
            data.forEach(bank => {
                if(item === bank['annualInterestRate']['9']) {
                    air = Math.round((money * item)*period/12).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    bank.air = air;
                    sortBanks.push(bank);
                }
            })
        });

        return sortBanks;
    }

    /** this function is to handle for twelve month period */
    handleForTwelveMonth(data,money,period) {
        var ircArray = new Set();
        var sortBanks=[];
        //amount of interest  received
        var air;
        for(let i = 0; i < data.length ; i++) {
            if(data[i]['annualInterestRate']['12'] !== 0 ) ircArray.add(data[i]['annualInterestRate']['12']);
        }
        ircArray = [...ircArray].sort().reverse();
        //sort object bank
        ircArray.forEach(item => {
            data.forEach(bank => {
                if(item === bank['annualInterestRate']['12']) {
                    air = Math.round((money * item)*period/12).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    bank.air = air;
                    sortBanks.push(bank);
                }
            })
        });

        return sortBanks;
    }

    /** this function is to handle for eighteen month period */
    handleForEightteenMonth(data,money,period) {
        var ircArray = new Set();
        var sortBanks=[];
        //amount of interest  received
        var air;
        for(let i = 0; i < data.length ; i++) {
            if(data[i]['annualInterestRate']['18'] !== 0 ) ircArray.add(data[i]['annualInterestRate']['18']);
        }
        ircArray = [...ircArray].sort().reverse();
        //sort object bank
        ircArray.forEach(item => {
            data.forEach(bank => {
                if(item === bank['annualInterestRate']['18']) {
                    air = Math.round((money * item)*period/12).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    bank.air = air;
                    sortBanks.push(bank);
                }
            })
        });

        return sortBanks;
    }

    /** this function is to handle for twenty four month period */
    handleForTwentyFourMonth(data,money,period) {
        var ircArray = new Set();
        var sortBanks=[];
        //amount of interest  received
        var air;
        for(let i = 0; i < data.length ; i++) {
            if(data[i]['annualInterestRate']['24'] !== 0 ) ircArray.add(data[i]['annualInterestRate']['24']);
        }
        ircArray = [...ircArray].sort().reverse();
        //sort object bank
        ircArray.forEach(item => {
            data.forEach(bank => {
                if(item === bank['annualInterestRate']['24']) {
                    air = Math.round((money * item)*period/12).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    bank.air = air;
                    sortBanks.push(bank);
                }
            })
        });
        console.log(sortBanks);

        return sortBanks;
    }
}
module.exports = new SearchingController();