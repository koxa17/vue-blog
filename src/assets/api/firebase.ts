// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {child, get, getDatabase, push, ref, set, update} from "firebase/database";
import {getCurrentDate} from "@/assets/js/date";
import {createArray} from "@/assets/js/function";

const firebaseConfig = {
    apiKey: "AIzaSyAi0sbW_ixn3d4F3hWaCEXyGcctsywQL-U",
    authDomain: "vue-blog-1769a.firebaseapp.com",
    databaseURL: "https://vue-blog-1769a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-blog-1769a",
    storageBucket: "vue-blog-1769a.appspot.com",
    messagingSenderId: "889113603597",
    appId: "1:889113603597:web:ba93a4c4ce43bca2b6ef44"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

function generationId(path:string) {
    const _articlesRef = ref(database, path)
    return push(_articlesRef)
}

function writeArticlesData(data:any) {
    data.created = getCurrentDate();
    return set(generationId('articles'), data);
}

//
// @params data string
// передаем новый тег
async function writeTagData(data:any) {
    const db = getDatabase()

    const currentTags = await get(child(ref(db), 'tags')).then(res => {
        return res.val()
    })

    const updates:any = {}
    updates['/tags'] = createArray(currentTags, data)

    return update(ref(db), updates);

}

async function getBase(path:string):Promise<object | [] | string> {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, path)).then(res => {
        if (res.exists()) {
            return res.val()
        } else {
            return "Данные не найдены";
        }
    }).catch(e => {
        throw e
    })
}


export {writeArticlesData, writeTagData, getBase}