const request = require('request'),
      cheerio = require('cheerio'),
      fs      = require('fs'),
      Bank    = require('./Bank');
      requestPromise = require('request-promise');
class ManagementBank{
    constructor(){
        this.listBanks = [];
    }

    

    
    /**
     * get annual Interest Rate of ABBANK
     */
    async getDataFromABBANK() {
    
    const url = "https://www.abbank.vn/lai-suat-tiet-kiem-bac-thang-ap-dung-tu-ngay-26032020-p3132r1019.html";
    const options = {
        method: 'GET',
        url: url
    };

    return await requestPromise(options)
    .then( body => {
        var bank = {};
        bank.name = 'ABBANK';
        bank.logo = 'https://www.abbank.vn/Content/ABBANK/images/logo.png';
        bank.webOfBank = 'https://www.abbank.vn/';
        bank.savingPackage = 'Tiết kiệm thông thường';
        bank.minimumDepositAmount = 500000;

        var irc = {};
        var $ = cheerio.load(body);
        
        var data = $('tbody td');
        data.each((i,element) => {
            switch(i){
                case 8 : irc[1] = parseFloat($(element).text().trim()); break;
                case 20: irc[3] = parseFloat($(element).text().trim()); break;
                case 32: irc[6] = parseFloat($(element).text().trim()); break;
                case 44: irc[9] = parseFloat($(element).text().trim()); break;
                case 56: irc[12] = parseFloat($(element).text().trim()); break;
                case 62: irc[18] = parseFloat($(element).text().trim()); break;
                case 68: irc[24] = parseFloat($(element).text().trim()); break;
                default: break;
            }
        })
        if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
            bank.annualInterestRate = irc;
        } else{
            return undefined;
        }
        return bank;
    })
    .catch( err => {
        console.log('there is something wrong with ABBANK:'+ err);
    });    
    }

    /**
     * get annual Interest Rate of AGRIBANK
     */
    async getDataFromAGRIBANK() {     
        const url = "https://www.agribank.com.vn/vn/lai-suat";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'AGRIBANK';
            bank.logo = 'https://www.agribank.com.vn/contenthandler/dav/themelist/custom.portal.theme.AGBank/custom/images/logo_agribank.png';
            bank.webOfBank = 'http://agribank.com.vn/default.aspx';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('tbody td');
            data.each((i,element) => {
                switch(i){
                    case 5 : irc[1] = parseFloat($(element).text().trim()); break;
                    case 13: irc[3] = parseFloat($(element).text().trim()); break;
                    case 25: irc[6] = parseFloat($(element).text().trim()); break;
                    case 37: irc[9] = parseFloat($(element).text().trim()); break;
                    case 49: irc[12] = parseFloat($(element).text().trim()); break;
                    case 61: irc[18] = parseFloat($(element).text().trim()); break;
                    case 65: irc[24] = parseFloat($(element).text().trim()); break;
                    default: break;
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with AGRIBANK:'+ err);
        });    
    }

    /**
     * get annual Interest Rate of CBBANK
     */
    async getDataFromCBBANK() {
        const url = "https://www.cbbank.vn/Pages/InterestRate.aspx";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'CBBANK';
            bank.logo = 'https://www.cbbank.vn/img/logo.jpg';
            bank.webOfBank = 'https://www.cbbank.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 8 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 10 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 13 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 16 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 19 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 22 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 23 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with CBBANK:'+ err);
        });    
    }

    /**
     * get annual Interest Rate of INDOVINABANK
     */
    async getDataFromINDOVINABANK() {
        const url = "https://www.indovinabank.com.vn/vi/component/content/article/101/241-depositrate";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'INDOVINABANK';
            bank.logo = 'https://www.indovinabank.com.vn/templates/indovina-bank/images/logo.png';
            bank.webOfBank = 'https://www.indovinabank.com.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('#noscroll tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 9 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(6)').text().trim()); 
                        break;
                    }
                    case 11 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 13 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(6)').text().trim()); 
                        break;
                    }
                    case 14 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(6)').text().trim());  
                        break;
                    }
                    case 16 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 17 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with INDOVINABANK:'+ err);
        });    
    }

    /**
     * get annual Interest Rate of KIENLONGBANK
     */
    async getDataFromKIENLONGBANK() {
        const url = "https://kienlongbank.com/lai-suat";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'KIENLONGBANK';
            bank.logo = 'https://kienlongbank.com/Data/Sites/1/media/logo.png';
            bank.webOfBank = 'https://kienlongbank.com/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('table.table-responsive tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 3 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 5 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 8 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 11 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 14 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 17 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 18 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with KIENLONGBANK:'+ err);
        });       
    }

    /**
     * get annual Interest Rate of NAMABANK
     */
    async getDataFromNAMABANK() {
        const url = "https://www.namabank.com.vn/lai-suat";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'NAMABANK';
            bank.logo = 'https://www.namabank.com.vn/Data/Sites/1/media/default/img/logo.png';
            bank.webOfBank = 'https://www.namabank.com.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 4 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 6 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 9 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 15 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 20 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 25 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with NAMABANK:'+ err);
        });  
    }

    /**
     * get annual Interest Rate of OCB
     */
    async getDataFromOCB() {
        
        const url = "https://www.ocb.com.vn/vi/lai-suat.html";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'OCB';
            bank.logo = 'https://logo.png';
            bank.webOfBank = 'https://www.ocb.com.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('table#tbVND tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 1 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 2 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 3 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 4 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 5 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 8 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 10 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with OCB:'+ err);
        });   
    }

    /**
     * get annual Interest Rate of OCEANBANK
     */
    async getDataFromOCEANBANK() {
        const url = "http://oceanbank.vn/lai-suat.html";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'OCEANBANK';
            bank.logo = 'http://oceanbank.vn/template/Default/images/header/logo.png';
            bank.webOfBank = 'http://www.oceanbank.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('table.tb_lstk tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 3 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(6)').text().trim()); 
                        break;
                    }
                    case 5 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 8 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 11 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(6)').text().trim()); 
                        break;
                    }
                    case 14 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(6)').text().trim());  
                        break;
                    }
                    case 17 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 18 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with OCEANBANK:'+ err);
        });   
    }

    /**
     * get annual Interest Rate of PUBLICBANK
     */
    async getDataFromPUBLICBANK() {
        const url = "http://publicbank.com.vn/Rates.aspx";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'PUBLICBANK';
            bank.logo = 'http://logo.png';
            bank.webOfBank = 'https://www.publicbank.com.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('table[width="80%"] tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 2 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 4 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 7 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 8 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 9 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 11 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with PUBLICBANK:'+ err);
        });  
    }

    /**
     * get annual Interest Rate of PGBANK
     */
    async getDataFromPGBANK() {
        var bank = new Bank();
        bank.name = 'PGBANK';
        var irc = {};
        
        const url = "https://www.pgbank.com.vn/Desktop.aspx/Lai-suat-huy-dong/Lai-suat-huydong/";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table#TienGui tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 10 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 12 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 13 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 14 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 15 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 17 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 18 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }

    /**
     * get annual Interest Rate of PVCOMBANK
     */
    async getDataFromPVCOMBANK() {
        const url = "https://www.pvcombank.com.vn/bieu-lai-suat.html";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'PVCOMBANK';
            bank.logo = 'https://www.pvcombank.com.vn/images/pvcom-logo.png';
            bank.webOfBank = 'https://www.pvcombank.com.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('table.responsive tbody tr');

            irc[1] = 0;
            data.each((i,element) => {
                switch(i){
                    case 1 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 2 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 3 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 4 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 6 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 7 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with PVCOMBANK:'+ err);
        });  
    }

     /**
     * get annual Interest Rate of SAIGONBANK
     */
    async getDataFromSAIGONBANK() {
        const url = "https://www.saigonbank.com.vn/vi/truy-cap-nhanh/lai-suat/Lai-suat-tien-gui-tiet-kiem";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'SAIGONBANK';
            bank.logo = 'https://www.saigonbank.com.vn/images/common/BANNER_LOGO_SGB.jpg';
            bank.webOfBank = 'https://www.saigonbank.com.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('div.table-responsive table tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 7 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 9 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 12 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 15 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 18 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 20 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 21 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with SAIGONBANK:'+ err);
        });    
    }

    /**
     * get annual Interest Rate of SCB
     */
    async getDataFromSCB() {
        var bank = new Bank();
        bank.name = 'SCB';
        var irc = {};
        
        const url = "https://www.scb.com.vn/vie/tien-gui-khcn/tiet-kiem-thong-thuong";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table');
            data.each((i,element) => {
                switch(i){
                    case 2 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 4 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 7 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 10 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 13 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 16 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 17 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }

    /**
     * get annual Interest Rate of SHB
     */
    async getDataFromSHB() {
        const url = "https://www.shb.com.vn/category/lien-ket-nhanh/lai-suat-tiet-kiem/";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'SHB';
            bank.logo = 'https://www.shb.com.vn/wp-content/uploads/2016/03/logo-1.png';
            bank.webOfBank = 'https://www.shb.com.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('table[width="812"] tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 6 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 8 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 11 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 14 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 17 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));  
                        break;
                    }
                    case 19 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 20 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with SHB:'+ err);
        }); 
    }
    /**
     * get annual Interest Rate of TPBANK
     */
    async getDataFromTPBANK() {
        var bank = new Bank();
        bank.name = 'TPBANK';
        var irc = {};
        
        const url = "https://tpb.vn/wps/portal/vni/financial-toolkit/lai-suat/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8zizd0NTYwMDQz9LPz9DAwcw7wCvYz8jY29fQ31w1EV-Ae7Gho4uvk4Bjq7Oxn5WpjpR5Go39PZwNHP2M0s1BTICDAhTr8BDuBoQKL9mAqi8Bsfrh-FagWWEEBXgOFFQpYU5IaGhkYYZHo6KioCAC12K9Y!/#tab-1";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('div#tab-1 h6');
            console.log(data.length);
            irc[9] = 0;
            data.each((i,element) => {
                switch(i){
                    case 0 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 1 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 2 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 3 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(4)').text().trim());  
                        break;
                    }
                    case 4 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 5 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }

    /**
     * get annual Interest Rate of VietinBank
     */
    async getDataFromVIETINBANK() {
        const url = "https://www.vietinbank.vn/web/home/vn/lai-suat";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'VIETINBANK';
            bank.logo = 'https://www.vietinbank.vn/vtbresource/web/export/system/modules/com.vietinbank.cardtemplate/resources/img/logo.png?v=02262018';
            bank.webOfBank = 'https://www.vietinbank.vn/web/home/vn/index.html';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('table#hor-ex-b tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 5 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 7 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 10 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 13 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 16 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 18 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 19 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
        })
        .catch( err => {
            console.log('there is something wrong with VIETINBANK:'+ err);
        }); 
    }

    /**
     * get annual Interest Rate of BAOVIETBANK
     */
    async getDataFromBAOVIETBANK() {
        const url = "https://www.baovietbank.vn/en/lai-suat-tiet-kiem-vnd";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'BAOVIETBANK';
            bank.logo = 'https://www.baovietbank.vn/images/baovietbank/logo_baovietbank.png';
            bank.webOfBank = 'https://www.baovietbank.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('table tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 5 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(3)').text().trim());
                        break;
                    }
                    case 7 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(3)').text().trim());
                        break;
                    }
                    case 10 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(3)').text().trim());
                        break;
                    }
                    case 13 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(3)').text().trim());
                        break;
                    }
                    case 16 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(3)').text().trim());  
                        break;
                    }
                    case 19 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(3)').text().trim());
                        break;
                    }
                    case 20 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(3)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }

    /**
     * get annual Interest Rate of BIDV
     */
    async getDataFromBIDV() {
        var bank = new Bank();
        bank.name = 'BIDV';
        var irc = {};
        
        const url = "https://www.bidv.com.vn/vn/tra-cuu-lai-suat";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 2 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 4 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 6 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 7 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 9 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(4)').text().trim());  
                        break;
                    }
                    case 12 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 23 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }
    /**
     * get annual Interest Rate of DONGABANK
     */
    async getDataFromDONGABANK() {
        var bank = new Bank();
        bank.name = 'DONGABANK';
        var irc = {};
        
        const url = "https://www.dongabank.com.vn/interest?type=tktt-vnd";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 4 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 6 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 9 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 15 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(4)').text().trim());  
                        break;
                    }
                    case 17 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 18 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }

    /**
     * get annual Interest Rate of NCB
     */
    async getDataFromNCB() {
        var bank = new Bank();
        bank.name = 'NCB';
        var irc = {};
        
        const url = "https://www.ncb-bank.vn/vi/lai-suat-tien-gui";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 6 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 8 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 11 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 14 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 17 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 20 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 21 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }

    /**
     * get annual Interest Rate of PGBANK
     */
    async getDataFromPGBANK() {
        var bank = new Bank();
        bank.name = 'PGBANK';
        var irc = {};
        
        const url = "https://www.pgbank.com.vn/Desktop.aspx/Lai-suat-huy-dong/Lai-suat-huydong/";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table#TienGui tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 9 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 11 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 13 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 14 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 16 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 17 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }
    
    /**
     * get annual Interest Rate of SCB
     */
    async getDataFromSCB() {
        var bank = new Bank();
        bank.name = 'SCB';
        var irc = {};
        
        const url = "https://www.scb.com.vn/vie/tien-gui-khcn/tiet-kiem-thong-thuong";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('tbody tr');
            console.log(data.length);
            data.each((i,element) => {
                switch(i){
                    case 9 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 11 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 13 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 14 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 16 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 17 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }
    
    /**
     * get annual Interest Rate of VIB
     */
    async getDataFromVIB() {
        var bank = new Bank();
        bank.name = 'VIB';
        var irc = {};
        
        const url = "https://www.vib.com.vn/wps/portal/vn/product-landing/tai-khoan-ngan-hang/";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('div');
            console.log(data.length);
            data.each((i,element) => {
                switch(i){
                    case 9 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 11 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 13 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 14 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 16 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 17 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }

    /**
     * get annual Interest Rate of VIETCOMBANK
     */
    async getDataFromVIETCOMBANK() {
        var bank = new Bank();
        bank.name = 'VIETCOMBANK';
        var irc = {};
        
        const url = "https://portal.vietcombank.com.vn/LS/Pages/lai-suat.aspx?devicechannel=default";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            console.log(body)
            var $ = cheerio.load(body);
            
            var data = $('div');
            console.log(data.length);
            data.each((i,element) => {
                switch(i){
                    case 9 : {
                        irc[1] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 11 : {
                        irc[3] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc[6] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 13 : {
                        irc[9] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 14 : {
                        irc[12] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 16 : {
                        irc[18] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 17 : {
                        irc[24] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
            
        })
        .catch( err => {
            console.log('there is something wrong:'+err);
        });    
    }

     /**
     * get annual Interest Rate of VRB
     */
    async getDataFromVRB() {
        const url = "https://vrbank.com.vn/vi/lai-suat-1/";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var bank = {};
            bank.name = 'VRB';
            bank.logo = 'https://vrbank.com.vn/Uploads/icon_menu/logo.png';
            bank.webOfBank = 'https://vrbank.com.vn/';
            bank.savingPackage = 'Tiết kiệm thông thường';
            bank.minimumDepositAmount = 500000;

            var irc = {};
            var $ = cheerio.load(body);
            
            var data = $('div.cell-tbl-1-2');
            data.each((i,element) => {
                switch(i){
                    case 20 : {
                        irc[1] = parseFloat($(element).text().trim());
                        break;
                    }
                    case 28 : {
                        irc[3] = parseFloat($(element).text().trim());
                        break;
                    }
                    case 32 : {
                        irc[6] = parseFloat($(element).text().trim());
                        break;
                    }
                    case 36 : {
                        irc[9] = parseFloat($(element).text().trim());
                        break;
                    }
                    case 40 : {
                        irc[12] = parseFloat($(element).text().trim());
                        break;
                    }
                    case 52 : {
                        irc[18] = parseFloat($(element).text().trim());
                        break;
                    }
                    case 56 : {
                        irc[24] = parseFloat($(element).text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            if(irc[1] && irc[3] && irc[6] && irc[9] && irc[12] && irc[18] && irc[24]) {
                bank.annualInterestRate = irc;
            } else{
                return undefined;
            }
            return bank;
            
        })
        .catch( err => {
            console.log('there is something wrong with VRB:'+err);
        });     
    }

    /** read data from json file */
    readFileFromProject() {
        return new Promise((resolve, reject) => {
          fs.readFile('./irOfBanks.json',{encoding: 'utf8'},(err, data) => {
            if(err){
              reject(err);
            }
            resolve(data);
          });
        });
      }

    /**
     * get annual Interest Rate of other banks
     */
    async getDataFromOtherBanks() {
        var data = await ManagementBank.prototype.readFileFromProject()
        .catch(error => 'there is an error with getDataFromOtherBanks:'+error);
        return JSON.parse(data);
      }
}

module.exports = ManagementBank;