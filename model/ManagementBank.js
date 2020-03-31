const request = require('request'),
      cheerio = require('cheerio'),
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
    var bank = new Bank();
    bank.name = 'ABBANK';
    var irc = {};
    
    const url = "https://www.abbank.vn/lai-suat-tiet-kiem-bac-thang-ap-dung-tu-ngay-26032020-p3132r1019.html";
    const options = {
        method: 'GET',
        url: url
    };

    return await requestPromise(options)
    .then( body => {
        var $ = cheerio.load(body);
        
        var data = $('tbody td');
        data.each((i,element) => {
            switch(i){
                case 8 : irc['1'] = parseFloat($(element).text().trim()); break;
                case 20: irc['3'] = parseFloat($(element).text().trim()); break;
                case 32: irc['6'] = parseFloat($(element).text().trim()); break;
                case 44: irc['9'] = parseFloat($(element).text().trim()); break;
                case 56: irc['12'] = parseFloat($(element).text().trim()); break;
                case 62: irc['18'] = parseFloat($(element).text().trim()); break;
                case 68: irc['24'] = parseFloat($(element).text().trim()); break;
                default: break;
            }
        })
        console.log(irc);
    })
    .catch( err => {
        console.log('there is something wrong');
    });    
    }

    /**
     * get annual Interest Rate of AGRIBANK
     */
    async getDataFromAGRIBANK() {
        var bank = new Bank();
        bank.name = 'AGRIBANK';
        var irc = {};
        
        const url = "https://www.agribank.com.vn/vn/lai-suat";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('tbody td');
            data.each((i,element) => {
                switch(i){
                    case 5 : irc['1'] = parseFloat($(element).text().trim()); break;
                    case 13: irc['3'] = parseFloat($(element).text().trim()); break;
                    case 25: irc['6'] = parseFloat($(element).text().trim()); break;
                    case 37: irc['9'] = parseFloat($(element).text().trim()); break;
                    case 49: irc['12'] = parseFloat($(element).text().trim()); break;
                    case 61: irc['18'] = parseFloat($(element).text().trim()); break;
                    case 65: irc['24'] = parseFloat($(element).text().trim()); break;
                    default: break;
                }
            })
            console.log(irc);
        })
        .catch( err => {
            console.log('there is something wrong');
        });    
    }

    /**
     * get annual Interest Rate of CBBANK
     */
    async getDataFromCBBANK() {
        var bank = new Bank();
        bank.name = 'CBBANK';
        var irc = {};
        
        const url = "https://www.cbbank.vn/Pages/InterestRate.aspx";
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
                    case 8 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 10 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 13 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 16 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 19 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 22 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 23 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(3)').text().trim().replace('\,','.')); 
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
        })
        .catch( err => {
            console.log('there is something wrong');
        });    
    }

    /**
     * get annual Interest Rate of INDOVINABANK
     */
    async getDataFromINDOVINABANK() {
        var bank = new Bank();
        bank.name = 'INDOVINABANK';
        var irc = {};
        
        const url = "https://www.indovinabank.com.vn/vi/component/content/article/101/241-depositrate";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('#noscroll tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 9 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(6)').text().trim()); 
                        break;
                    }
                    case 11 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 13 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(6)').text().trim()); 
                        break;
                    }
                    case 14 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(6)').text().trim());  
                        break;
                    }
                    case 16 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 17 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
        })
        .catch( err => {
            console.log('there is something wrong');
        });    
    }

    /**
     * get annual Interest Rate of KIENLONGBANK
     */
    async getDataFromKIENLONGBANK() {
        var bank = new Bank();
        bank.name = 'KIENLONGBANK';
        var irc = {};
        
        const url = "https://kienlongbank.com/lai-suat";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table.table-responsive tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 3 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 5 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 8 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 11 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 14 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 17 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 18 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    default: break;
                    
                }
            })
            console.log(irc);
        })
        .catch( err => {
            console.log('there is something wrong');
        });    
    }

    /**
     * get annual Interest Rate of NAMABANK
     */
    async getDataFromNAMABANK() {
        var bank = new Bank();
        bank.name = 'NAMABANK';
        var irc = {};
        
        const url = "https://www.namabank.com.vn/lai-suat";
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
                        irc['1'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 6 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 9 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 15 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 20 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 25 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
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
     * get annual Interest Rate of OCB
     */
    async getDataFromOCB() {
        var bank = new Bank();
        bank.name = 'OCB';
        var irc = {};
        
        const url = "https://www.ocb.com.vn/vi/lai-suat.html";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table#tbVND tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 1 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 2 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 3 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 4 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 5 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 8 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 10 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
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
     * get annual Interest Rate of OCEANBANK
     */
    async getDataFromOCEANBANK() {
        var bank = new Bank();
        bank.name = 'OCEANBANK';
        var irc = {};
        
        const url = "http://oceanbank.vn/lai-suat.html";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table.tb_lstk tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 3 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(6)').text().trim()); 
                        break;
                    }
                    case 5 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 8 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 11 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(6)').text().trim()); 
                        break;
                    }
                    case 14 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(6)').text().trim());  
                        break;
                    }
                    case 17 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(6)').text().trim());
                        break;
                    }
                    case 18 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(6)').text().trim());
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
     * get annual Interest Rate of PUBLICBANK
     */
    async getDataFromPUBLICBANK() {
        var bank = new Bank();
        bank.name = 'PUBLICBANK';
        var irc = {};
        
        const url = "http://publicbank.com.vn/Rates.aspx";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table[width="80%"] tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 2 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 4 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 7 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 8 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 9 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 11 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 12 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
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
                    case 10 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 12 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 13 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 14 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 15 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 17 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 18 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
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
        var bank = new Bank();
        bank.name = 'PVCOMBANK';
        var irc = {};
        
        const url = "https://www.pvcombank.com.vn/bieu-lai-suat.html";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table.responsive tbody tr');

            irc['1'] = 0;
            data.each((i,element) => {
                switch(i){
                    case 1 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 2 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 3 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 4 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 6 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 7 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
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
     * get annual Interest Rate of SAIGONBANK
     */
    async getDataFromSAIGONBANK() {
        var bank = new Bank();
        bank.name = 'SAIGONBANK';
        var irc = {};
        
        const url = "https://www.saigonbank.com.vn/vi/truy-cap-nhanh/lai-suat/Lai-suat-tien-gui-tiet-kiem";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('div.table-responsive table tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 7 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.')); 
                        break;
                    }
                    case 9 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 12 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 15 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 18 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 20 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 21 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
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
            
            var data = $('table');
            console.log('data:'+data.length);
            data.each((i,element) => {
                switch(i){
                    case 2 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 4 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 7 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 10 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(2)').text().trim()); 
                        break;
                    }
                    case 13 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(2)').text().trim());  
                        break;
                    }
                    case 16 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
                        break;
                    }
                    case 17 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(2)').text().trim());
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
        var bank = new Bank();
        bank.name = 'SHB';
        var irc = {};
        
        const url = "https://www.shb.com.vn/category/lien-ket-nhanh/lai-suat-tiet-kiem/";
        const options = {
            method: 'GET',
            url: url
        };
    
        return await requestPromise(options)
        .then( body => {
            var $ = cheerio.load(body);
            
            var data = $('table[width="812"] tbody tr');
            data.each((i,element) => {
                switch(i){
                    case 6 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 8 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 11 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 14 : {
                        irc['9'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 17 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));  
                        break;
                    }
                    case 19 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
                        break;
                    }
                    case 20 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(2)').text().trim().replace('\,','.'));
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
            
            var data = $('table.table_laisuat tbody tr');
            irc['9'] = 0;
            data.each((i,element) => {
                switch(i){
                    case 0 : {
                        irc['1'] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 1 : {
                        irc['3'] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 2 : {
                        irc['6'] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 3 : {
                        irc['12'] = parseFloat($(element).find('td:nth-child(4)').text().trim());  
                        break;
                    }
                    case 4 : {
                        irc['18'] = parseFloat($(element).find('td:nth-child(4)').text().trim());
                        break;
                    }
                    case 5 : {
                        irc['24'] = parseFloat($(element).find('td:nth-child(4)').text().trim());
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

}

module.exports = ManagementBank;