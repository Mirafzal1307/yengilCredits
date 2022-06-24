const itemListing = (state: any = {}, action: any): any => {
  switch (action.type) {
    case "ADD_LISTING": {
      const newState: any = {};
      Object.keys(state).forEach((key) => {
        newState[key] = { ...state[key] };
      });
      newState[action.item.id] = {
        id: action.item.id,
        name: action.item.name,
        price: action.item?.price?.toLocaleString(),
        discount: action.item.discount,
        type: action.item.type,
        img_url: action.item.img_url,
      };
      return newState;
    }
    case "REMOVE_LISTING":
      return state.filter((item: any) => !(item.id === action.item.id));
    default:
      return state;
  }
};

export default itemListing;
