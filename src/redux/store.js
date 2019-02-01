import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import creataSagaMiddleware from 'redux-saga';
import reducers from '../redux/reducers';
import rootSaga from '../redux/sagas';

const sagaMiddleware =  creataSagaMiddleware();
const middlewares =  [ sagaMiddleware ];

const store = createStore(
    combineReducers({
        ...reducers,
    }),
    compose(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
export {store};