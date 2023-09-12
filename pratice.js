const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();
const produce = require("immer").produce;

const NUMBER = "NUMBER";
const MORENUMBERS = "MORENUMBERS";

function numberAdd() {
  return {
    type: NUMBER,
  };
}

function multiply(multi) {
  return {
    type: MORENUMBERS,
    payload: multi,
  };
}

const initialAddition = {
  numbertoAdd: 20,
};

const initialMoreMaths = {
  multiply: 2,
  subtract: 5,
};

const addReducer = (state = initialAddition, action) => {
  switch (action.type) {
    case NUMBER:
      return {
        numbertoAdd: state.numbertoAdd * 2,
      };
    default:
      return state;
  }
};

const moreMathsReducer = (state = initialMoreMaths, action) => {
  switch (action.type) {
    case MORENUMBERS:
      return produce(state, (draft) => {
        draft.multiply = action.payload;
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  add: addReducer,
  multiply: moreMathsReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(numberAdd());
store.dispatch(numberAdd());
store.dispatch(multiply(40));

unsubscribe();
