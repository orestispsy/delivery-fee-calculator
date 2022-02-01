module.exports.valueCostsCalc = (
    value: number,
    stateFunction: (num: number) => number
) => {
    if (value && value < 10) {
        stateFunction(10 - Number(value.toFixed(2)))
    } else {
        stateFunction(0)
    }
}

module.exports.distanceCostsCalc = (
    distance: number,
    stateFunction: (num: number) => number
) => {
    const minDistance = 1000
    const distanceDivider = 500
    if (distance && distance <= minDistance) {
        stateFunction(2)
    } else {
        let helper: number = distance / distanceDivider

        if (helper > Math.trunc(helper)) {
            stateFunction(Math.trunc(helper) + 1)
        } else {
            stateFunction(Math.trunc(helper))
        }
    }
}

module.exports.itemCostsCalc = (
    items: number,
    stateFunction: (num: number) => number
) => {
    const maxFreeItems = 4
    const itemExtraCost = 0.5
    items = Math.trunc(items)
    if (items > maxFreeItems) {
        stateFunction((items - maxFreeItems) * itemExtraCost)
    } else {
        stateFunction(0)
    }
}

module.exports.fridayRushChecker = (
    date: string,
    stateFunction: (boolean: boolean) => boolean
) => {
    let dayCheck = new Date(date)
    let day: number = dayCheck.getDay()
    let time: number = dayCheck.getHours()
    const rushHourDay = 5
    const rushHourTimeMin = 15
    const rushHourTimeMax = 19
    if (
        day === rushHourDay &&
        time >= rushHourTimeMin &&
        time < rushHourTimeMax
    ) {
        stateFunction(true)
    } else {
        stateFunction(false)
    }
}

module.exports.checkEndPrices = (
    value: number,
    valueCosts: number,
    distanceCosts: number,
    itemsAmountCosts: number,
    stateFunction: (num: number | null) => number | null,
    stateFunction2: (str: string) => string,
    fridayRushMode: boolean
) => {
    const freeChargeValue = 100
    const maximumFinalCosts = 15
    const rushHourMultiplier = 1.1
    let costs: number = valueCosts + distanceCosts + itemsAmountCosts
    if (value >= freeChargeValue) {
        stateFunction(null)
        stateFunction2('FREE')
    } else if (costs > maximumFinalCosts) {
        stateFunction(maximumFinalCosts)
        stateFunction2('€')
    } else {
        if (fridayRushMode) {
            if (costs * rushHourMultiplier > maximumFinalCosts) {
                stateFunction(maximumFinalCosts)
                stateFunction2('€')
            } else {
                stateFunction(Number((costs * rushHourMultiplier).toFixed(2)))
                stateFunction2('€')
            }
        } else {
            stateFunction(costs)
            stateFunction2('€')
        }
    }
}

module.exports.errorCheck = (
    value: number | string,
    stateFunction: (boolean: boolean) => boolean,
    stateFunction2: (number: number) => number,
    stateFunction3: (str: string) => string
) => {
    if (value < 1 && value != '') {
        stateFunction(true)
        stateFunction2(0)
        stateFunction3('€')
    } else {
        stateFunction(false)
    }
}
