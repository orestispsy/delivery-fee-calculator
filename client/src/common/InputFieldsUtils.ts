module.exports.limitDate = (
    elem: React.MutableRefObject<any>,
    setDate: (string: string) => string
) => {
    let today: any = new Date()
    let day: string | number = today.getDate()
    let month: string | number = today.getMonth() + 1
    let year: any = today.getFullYear()
    let hours: any = today.getHours()
    let minutes: string | number = today.getMinutes()
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (hours < 10) {
        hours = '0' + hours
    }
    let fixedDateTime: string =
        year + '-' + month + '-' + day + 'T' + hours + ':' + minutes
    elem.current.min = fixedDateTime
    elem.current.defaultValue = fixedDateTime
    setDate(elem.current.value)
}
