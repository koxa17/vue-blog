// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {child, get, getDatabase, push, ref, set, update} from "firebase/database";
import {getCurrentDate} from "@/assets/js/date";
import {createArray} from "@/assets/js/function";
import {BASE_URL} from "@/assets/api/constapi";

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

async function generationId(path) {
    const _articlesRef = await ref(database, path)
    return push(_articlesRef)
}

async function writeArticlesData(path, data) {
    data.created = getCurrentDate();
    const key = await generationId(`${BASE_URL}/articles/${path}`).then(res => {
        return res
    })
    await set(key, data);
    return {
        id: key.key,
        data
    }
}

//
// @params data string
// передаем новый тег
async function writeTagData(data) {
    const db = getDatabase()

    const currentTags = await get(child(ref(db), `${BASE_URL}/tags`)).then(res => {
        return res.val()
    })

    const updates = {}
    updates[`${BASE_URL}/tags`] = createArray(currentTags, data)

    return update(ref(db), updates);

}

function getBase(path ){
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `${BASE_URL}/${path}`)).then(res => {
        return res.val()
    }).catch(e => {
        throw e
    })
}

function removeArticle(path) {
    const dbRef = ref(getDatabase());
    return set(child(dbRef, `${BASE_URL}/articles/${path}`), null).then(res => {
        return res
    });
}


export {writeArticlesData, writeTagData, getBase, removeArticle}