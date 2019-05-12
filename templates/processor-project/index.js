const factoryGenerator = require('bayeslife-generators')
const fp = require('funprog')

let fs = require('fs')

let component = factoryGenerator({
    single: true, 
    type: 'XLSX',
    dir: './data'
})
component.producer(null,'sample.xlsx')

const sheetActual = x => x.SheetName.indexOf('Actual')>=0

const relabel = x => {

    let dt = x.SheetName.substring(0,x.SheetName.length-7)
    let year = parseInt(dt.substring(0,dt.indexOf('-')))
    let month = parseInt(dt.substring(dt.indexOf('-')+1))

    return {
        date: dt,
        year: year,
        month: month,
        description: x['Accounts and Invoices report for '],
        amount: x['to']
    }
}

const mustHaveAmount = x => x.amount
const shouldHaveDescription = x => x.description

const skipBalance = x => x.description.toLowerCase().indexOf('balance')<0  
const skipTransfer = x => x.description.toLowerCase().indexOf('transfer')<0  
const skipTotal = x => x.description.toLowerCase().indexOf('total')<0
let account='foobar'
const skipAccount = x => {
    let skipAccount = x.description.toLowerCase().indexOf('account')>=0
    if(skipAccount){
        account = x.description.toLowerCase().indexOf('remedial')>=0 ? 'remedial' : 'working'
    }
    return !skipAccount 
}

const categorize = x => {
    x.account='working'
    if(x.description.toLowerCase().indexOf('bank')>=0){
        x.type='Bank'
    }else if(x.description.toLowerCase().indexOf('levy')>=0 || x.description.toLowerCase().indexOf('levies')>=0){
        x.account = account
        x.type='Levy'
        //console.log(x)
    }else if(x.description.toLowerCase().indexOf('debt rec')>=0){
        x.type='Debt Recovery'
    }else if(x.description.toLowerCase().indexOf('strata')>=0 || x.description.toLowerCase().indexOf('stata')>=0 || x.description.toLowerCase().indexOf('srata')>=0){
        x.type='BodyCorporate'
    }else if(x.description.toLowerCase().indexOf('gst')>=0){
        x.account = account
        x.type='GST'
    }else if(x.description.toLowerCase().indexOf('interest')>=0){
        x.type='Interest'
    }else if(x.description.toLowerCase().indexOf('active property')>=0){
        x.type='Building Management'
    }else if(x.description.toLowerCase().indexOf('property assistant')>=0){
        x.type='Repair'
    }else if(x.description.toLowerCase().indexOf('spark')>=0){
        x.type='Lift Phone'
    }else if(x.description.toLowerCase().indexOf('mercury')>=0){
        x.type='Electicity-Common'
    }else if(x.description.toLowerCase().indexOf('trustpower')>=0){
        x.type='Gas-Common'
    }else if(x.description.toLowerCase().indexOf('rubbish')>=0){
        x.type='Rubbish'
    }else if(x.description.toLowerCase().indexOf('electrical')>=0){
        x.type='Electrical'
    }else if(x.description.toLowerCase().indexOf('watercare')>=0){
        x.type='Water'
    }else if(x.description.toLowerCase().indexOf('schindler')>=0 || x.description.toLowerCase().indexOf('schlind')>=0){
        x.type='Lift'
    }else if(x.description.toLowerCase().indexOf('timely')>=0){
        x.type='Garage Door'
    }else if(x.description.toLowerCase().indexOf('insight')>=0){
        x.type='Security'
    }else if(x.description.toLowerCase().indexOf('plumbing')>=0){
        x.type='Plumbing'
    }else if(x.description.toLowerCase().indexOf('tubman')>=0){
        x.type='Plumbing'
    }else if(x.description.toLowerCase().indexOf('macmillian')>=0){
        x.type='Plumbing'
    }else if(x.description.toLowerCase().indexOf('energy co')>=0){
        x.type='Plumbing'
    }else if(x.description.toLowerCase().indexOf('adt')>=0){
        x.type='Fire'
    }else if(x.description.toLowerCase().indexOf('fire control')>=0){
        x.type='Fire'
    }else if(x.description.toLowerCase().indexOf('passive fire')>=0){
        x.type='Fire'
    }else if(x.description.toLowerCase().indexOf('ryanfire')>=0){
        x.account='remedial'
        x.type='Fire'
    }else if(x.description.toLowerCase().indexOf('firecontrol')>=0){
        x.account='remedial'
        x.type='Fire'
    }else if(x.description.toLowerCase().indexOf('airtech')>=0 || x.description.toLowerCase().indexOf('airteech')>=0){
        x.type='Ventilation'
    }else if(x.description.toLowerCase().indexOf('progressive')>=0){
        x.account='remedial'
        x.type='Construction'
    }else if(x.description.toLowerCase().indexOf('buildscape')>=0){
        x.account='remedial'
        x.type='Gardening'
    }else if(x.description.toLowerCase().indexOf('insite fac')>=0){
        x.account='remedial'
        x.type='Design'
    }else if(x.description.toLowerCase().indexOf('ach')>=0){
        x.account='remedial'
        x.type='Design'
    }else if(x.description.toLowerCase().indexOf('affordable')>=0){
        x.account='remedial'
        x.type='Scaffolding'
    }else if(x.description.toLowerCase().indexOf('wallace')>=0){
        x.account=account
        x.type='Insurance'
    }else if(x.description.toLowerCase().indexOf('stamford')>=0){
        x.account='remedial'
        x.type='Insurance'
    }else if(x.description.toLowerCase().indexOf('canam')>=0){
        x.account='remedial'
        x.type='Construction'
    }else if(x.description.toLowerCase().indexOf('vero')>=0){
        x.type='Insurance'
    }else if(x.description.toLowerCase().indexOf('seagar')>=0){
        x.type='Insurance'
    }else if(x.description.toLowerCase().indexOf('office bea')>=0){
        x.type='Insurance'
    }else if(x.description.toLowerCase().indexOf('impact')>=0){
        x.account='remedial'
        x.type='Construction'
    }else if(x.description.toLowerCase().indexOf('hobanz')>=0){
        x.account='remedial'
        x.type='Advisory'
    }else if(x.description.toLowerCase().indexOf('alexand')>=0 || x.description.toLowerCase().indexOf('acl')>=0){
        x.account='remedial'
        x.type='Advisory'
    }else if(x.description.toLowerCase().indexOf('ppc')>=0 || x.description.toLowerCase().indexOf('property & pro')>=0){
        x.account='remedial'
        x.type='Advisory'
    }else if(x.description.toLowerCase().indexOf('bqh')>=0 ){
        x.account='remedial'
        x.type='Estimation'
    }else if(x.description.toLowerCase().indexOf('thermosash')>=0){
        x.account='remedial'
        x.type='Construction'
    }else if(x.description.indexOf('CEW')>=0){
        x.account='remedial'
        x.type='Project Management'
    }else if(x.description.toLowerCase().indexOf('bwof')>=0 || x.description.toLowerCase().indexOf('auckland council')>=0){
        x.account='remedial'
        x.type='LocalAuthority'
    }else if(x.description.toLowerCase().indexOf('bwof')>=0 || x.description.toLowerCase().indexOf('health and safety')>=0){
        x.type='Compliance'
    }else if(x.description.toLowerCase().indexOf('bendall')>=0){
        x.account='remedial'
        x.type='Accounting'
    }else if(x.description.toLowerCase().indexOf('aurecon')>=0){
        x.account='remedial'
        x.type='Design'
    }else if(x.description.toLowerCase().indexOf('owner options')>=0){
        x.account='remedial'
        x.type='Owner Options'
    }else {
        x.type='Unknown'
    }
    return x
}

const toCSV = x => `${x.date},${x.account},${x.type},${x.amount},${x.description}`

async function transactions(){

    var transformation = fp.compose(
        fp.filtering(sheetActual),
        fp.mapping(relabel),
        fp.filtering(mustHaveAmount),
        fp.filtering(shouldHaveDescription),
        fp.filtering(skipTransfer), 
        fp.filtering(skipBalance),
        fp.filtering(skipTotal),
        fp.filtering(skipAccount),

        fp.mapping(categorize),

        // fp.mapping(toCSV)
    )


    var processedGenerator = fp.transduceGenerator(transformation, fp.latest, null, component.generator );

    let transactions = []
    for await (const d of processedGenerator){
        transactions.push(d)
    }

    fs.writeFileSync('./dist/transactions.json', JSON.stringify(Object.values(transactions),null," "))
    console.log('Done')
}

transactions()