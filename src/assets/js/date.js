import {format, formatDistanceToNow, parseISO} from 'date-fns'
import ru from "date-fns/locale/ru";

export function getCurrentDate() {
    return format(new Date(), 'dd.MM.yyyy', {locale: ru})
}


export function getDistanceDate(date) {
    return formatDistanceToNow(new Date(date.split('.').reverse().join()), { addSuffix: true, locale: ru })
}