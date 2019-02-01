const actions = {
    FETCH_DATA: 'FETCH_DATA',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
    ADD_DATA: 'ADD_DATA',
    EDIT_DATA: 'EDIT_DATA',
    UPDATE_DATA: 'UPDATE_DATA',
    DELETE_DATA: 'DELETE_DATA',

    fetchData: ()=> ({
        type: actions.FETCH_DATA,
    }),
    onFetchDataSuccess: (result)=> ({
        type: actions.FETCH_DATA_SUCCESS,
        result
    }),
    addData: (data,status)=> ({
        type: actions.ADD_DATA,
        payload: { data,status }
    }),
    editData: (id,value)=> ({
        type: actions.EDIT_DATA,
        payload: { id,value }
    }),
    updateData: (id,status)=> ({
        type: actions.UPDATE_DATA,
        payload: { id,status }
    }),
    deleteData: (id)=> ({
        type: actions.DELETE_DATA,
        payload: { id }
    }),
};
export default actions;