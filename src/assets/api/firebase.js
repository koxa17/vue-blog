// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {child, get, getDatabase, push, ref, set, update} from "firebase/database";
import {getCurrentDate} from "@/assets/js/date";
import {BASE_URL} from "@/assets/api/constapi";
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

async function generationId(path) {
    const _ref = await ref(database, path)
    return push(_ref)
}

async function writeArticlesData(data) {
    data.created = getCurrentDate();
    const key = await generationId(`${BASE_URL}/articles`).then(res => {
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
async function updateData(path,data) {
    const db = getDatabase()
    const updates = {}



    if(path.includes('tags')) {
        const dbRef = ref(getDatabase());
        const allTags = await get(child(dbRef, `${BASE_URL}/tags`)).then(res => {
            return res.val()
        })
        updates[`${BASE_URL}/${path}`] = createArray(allTags, data)
    } else {
        updates[`${BASE_URL}/${path}`] = data
    }

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

function removeTag(path) {
    const dbRef = ref(getDatabase());
    return set(child(dbRef, `${BASE_URL}/tags/${path}`), null).then(res => {
        return res
    });
}


export {writeArticlesData, updateData, getBase, removeArticle, removeTag}