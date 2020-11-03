const puppeteer = require('puppeteer')


async function scraper(){
    try{
        let url = 'https://www.trademe.co.nz/a/property/residential/rent/wellington/wellington/search?bedrooms_min=1&bathrooms_min=2&sort_order=expirydesc&bedrooms_max=2'
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36")
        await page.goto(url, {
            waitUntil: 'load',
            timeout :0
        })

        const homes = await page.evaluate( () => Array.from( document.querySelectorAll( 'tm-property-search-card-listing-title' ), element => element.textContent));
        const avalibleDates = await page.evaluate( () => Array.from( document.querySelectorAll( 'tm-property-search-card-address-subtitle' ), element => element.textContent.match(/([^-]*)Dec/g)));
        const price = await page.evaluate( () => Array.from( document.querySelectorAll( '.tm-property-search-card-price-attribute__price' ), element => element.textContent.replace(/[^0-9\.]/g,'')));
     
        
        
        
        let allHomes = []
        for(let i=0; i< homes.length;i++){
         if(avalibleDates[i] != null && price[i] < 1000){   
             allHomes.push({id: i, homes: homes[i], dates: avalibleDates[i], price: price[i]})
         }
        }
        // 
        // await page.goto('', {
        //     waitUntil: 'load',
        //     timeout :0
        // })
        console.log(allHomes)
        return allHomes
    }catch(e){
        console.log('you got this error' + e)
 }
}

scraper()
