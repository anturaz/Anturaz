import { date } from 'quasar'
const { addToDate, subtractFromDate, adjustDate } = date
export default async({ Vue }) => {

    Vue.prototype.$formatDate = function(x) {
        return date.formatDate(x, 'MMMM D, YYYY hh:mm A')
    }
    Vue.prototype.$formatDate_DateOnly = function(x) {
        return date.formatDate(x, 'MMMM D, YYYY')
    }
    Vue.prototype.$formatDateForPicker = function(x) {
        return date.formatDate(x, 'YYYY/MM/DD')
    }
    Vue.prototype.$formatDateFromPickerToDatabase = function(x) {
        return date.formatDate(x, 'YYYY-MM-DD') + "T00:00:00.000Z"
    }
    Vue.prototype.$addToDate = function(x, days, month) {
        return addToDate(x, { days: days, month: month })
    }
    Vue.prototype.$subtractFromDate = function(x, days, month) {
        return subtractFromDate(x, { days: days, month: month })
    }
    Vue.prototype.$compareToCurrentDate = function(toCompare) {
        var diff = date.getDateDiff(toCompare, new Date(), 'days')
        if (diff > 0) {
            return 'upcoming'
        } else if (diff < 0) {
            return 'past'
        } else if (diff == 0) {
            return 'current'
        }
    }
    Vue.prototype.$between = function(toCompare, dateFrom, dateTo) {
        return date.isBetweenDates(toCompare, dateFrom, dateTo)
    }
    Vue.prototype.$getDateDiff = function(date1, date2, unit) {
        return date.getDateDiff(date1, date2, unit)
    }
    Vue.prototype.$adjustDate = function(x, date) {
        return adjustDate(x, { date: date, hours: 0, minutes: 0, seconds: 0 })
    }

}