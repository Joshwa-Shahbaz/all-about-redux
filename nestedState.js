const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;

const initialState = {
  name: "joshwa",
  address: {
    street: "123 main st",
    city: "boston",
    state: "MA",
  },
};

const UPDATED_STREET = "UPDATED_STREET";

const updateStreet = (street) => {
  return {
    type: UPDATED_STREET,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATED_STREET:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("updated State", store.getState())
);

store.dispatch(updateStreet("31-D house# no A41"));
unsubscribe();
