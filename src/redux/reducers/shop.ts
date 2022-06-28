const addItem = (state: any = {}, action: any): any => {
  let quantity = 0;
  if (state[action.item.id] !== undefined)
    quantity = state[action.item.id].quantity;
  const newState: any = {};
  Object.keys(state).forEach((key) => {
    newState[key] = { ...state[key] };
  });
  newState[action.item.id] = {
    quantity: quantity + 1,
    id: action.item.id,
  };
  return newState;
};

const decrementItem = (state: any = {}, action: any): any => {
  let quantity = 0;
  if (state[action.item.id] !== undefined)
    quantity = state[action.item.id].quantity;
  const newState: any = {};
  Object.keys(state).forEach((key) => {
    newState[key] = { ...state[key] };
  });
  newState[action.item.id] = {
    quantity: quantity - 1,
    id: action.item.id,
  };
  return newState;
};

const changeItem = (state: any = {}, action: any): any => {
  const { quantity } = action.item;
  const newState: any = {};
  Object.keys(state).forEach((key) => {
    newState[key] = { ...state[key] };
  });
  if (quantity === 0) delete newState[action.item.id];
  else newState[action.item.id].quantity = quantity;
  return newState;
};

const shoppingCart = (state: any = {}, action: any): any => {
  switch (action.type) {
    case "ADD_ITEM":
      return addItem(state, action);
    case "CHANGE_ITEM":
      return changeItem(state, action);
    case "DECREMENT_ITEM":
      return decrementItem(state, action);
    default:
      return state;
  }
};

export default shoppingCart;
