import actions from './action';

const initState = {
    result: [],
    value:'',
    id:'',
    status:'',
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actions.FETCH_DATA:
            return {
                ...state
            };
            case actions.FETCH_DATA_SUCCESS:
            return {
                ...state,
                result: action.result
            };
        case actions.ADD_DATA:
            return {
                ...state,
                // value: action.payload.data,
                // status: action.payload.status
            };
        case actions.EDIT_DATA:
            return {
                ...state,
                // id: action.payload.id,
                // value: action.payload.value,
            };
        case actions.UPDATE_DATA:
            return {
                ...state,
                // id: action.id,
                // status: action.status,
            };
        case actions.DELETE_DATA:
            return {
                ...state,
                // id: action.payload.id
            };
        default:
            return state;
    }

}