const puppeteer = require('puppeteer')

async function product(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [el] = await page.$x('/html/body/trade-me/div[1]/main/div/ng-component/div/div/div/tg-row/tg-col/tm-search-results/div/div[2]/tm-potential-r18-content/div/tg-row')
    const title = await el.getProperty('textContent')
    const rawTitle = await title.jsonValue()

    
    // const [el2] = await page.$x('//*[@id="-price"]/div[2]')
    // const price = await el2.getProperty('textContent')
    // const rawPrice = await price.jsonValue()


    // console.log({rawTitle, rawPrice})
    console.log(el.length)
    console.log(rawTitle)
    browser.close()
}



product('https://www.trademe.co.nz/a/marketplace/antiques-collectables/alcohol-related?bof=aJFBHIFj')