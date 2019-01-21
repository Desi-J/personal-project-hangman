import {createStore} from 'redux';
import reducer from './dux/reducer';
// import logger from 'redux-logger';


// const middleware = applyMiddleware()
export default createStore(reducer);