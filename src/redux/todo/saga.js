import { all, takeEvery, put, call} from 'redux-saga/effects';
import { delay } from 'redux-saga'
import actions from './action';
import fireBase from '../todo/fireStore';

var db = fireBase.firestore();
var arrData = [];

function* fetchData() {
    yield call(onRetriveData);

    if(arrData) {
        yield put(
            actions.onFetchDataSuccess(
                arrData
            )
        );
    }

}

const onRetriveData = async () => {
    var data  = [];
    arrData = [];
    await db.collection('todo').get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) =>  {
                data.push(doc.data());
            });
        });
    arrData = data;
    // data = [];
}

const onAddData = (data,status) => {
    db.collection("todo").add({
        task: data,
        status: status,
    })
    .then((docRef) => {
             db.collection("todo").doc(docRef.id).update({
                id: docRef.id,
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}


function* addData({payload}) {
    const { data,status } = payload;

    yield call(onAddData , data, status)
    yield delay(1000)
    yield call(onRetriveData)

    if(arrData) {
        yield put(
        actions.onFetchDataSuccess(
            arrData
            )
        );
    }
}

const onDeleteData = (id) => {
    db.collection("todo").doc(id).delete().then(function() {

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function* deleteData({payload}) {
    const { id } = payload;

    yield call(onDeleteData , id);
    yield call(onRetriveData);

    if(arrData) {
        yield put(
        actions.onFetchDataSuccess(
            arrData
            )
        );
    }
}

const onUpdateData = (id, status) => {
    var s = (status == '1' ? '0' : '1' )

    db.collection('todo').doc(id)
        .update({status:s}).then(function () {

    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
    s = '';
}

function* updateData({payload}) {
    const { id, status } = payload;

    yield call(onUpdateData , id , status);
    yield call(onRetriveData);

    if(arrData) {
        yield put(
            actions.onFetchDataSuccess(
                arrData
            )
        );
    }
}
const onEditData = (id, value) => {
    db.collection('todo').doc(id)
        .update({task:value}).then(function () {

    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

function* editData({payload}) {
    const { id, value } = payload;



    yield call(onEditData , id , value);
    yield call(onRetriveData);

    if(arrData) {
        yield put(
            actions.onFetchDataSuccess(
                arrData
            )
        );
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actions.FETCH_DATA, fetchData)]);
    yield all([takeEvery(actions.ADD_DATA, addData)]);
    yield all([takeEvery(actions.DELETE_DATA, deleteData)]);
    yield all([takeEvery(actions.UPDATE_DATA, updateData)]);
    yield all([takeEvery(actions.EDIT_DATA, editData)]);

}