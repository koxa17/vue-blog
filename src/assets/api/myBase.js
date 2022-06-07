import {push, ref, set} from "firebase/database";
import {getCurrentDate} from "@/assets/js/date";


export function writeArticlesData(url, data) {
    data.created = getCurrentDate()
    return set(url, data)
}
