import * as ProductActionCreators from "./productAction";
import * as BrandActionCreators from "./brandAction";
import * as CardActionCreators from "./cardAction";
import * as CategoryActionCreators from "./categoryAction";
import * as TodoActionCreators from "./basketAction";
import * as FetchActionById from "./detailsByIdAction";
import * as productByCategoryAction from "./productByCategoryAction";
import * as FetchProductClientDetails from "./DetailsActions";

export default {
  ...ProductActionCreators,
  ...BrandActionCreators,
  ...CardActionCreators,
  ...CategoryActionCreators,
  ...TodoActionCreators,
  ...CardActionCreators,
  ...FetchActionById,
  ...productByCategoryAction,
  ...FetchProductClientDetails,
};
export const addItem = (id: any): object => ({
  type: "ADD_ITEM",
  item: {
    id,
  },
});
export const changeQuantity = (id: any, quantity: any): object => ({
  type: "CHANGE_ITEM",
  item: {
    id,
    quantity,
  },
});
export const decrementItem = (id: any): object => ({
  type: "DECREMENT_ITEM",
  item: {
    id,
  },
});
export const notify = (): object => ({
  type: "SHOW_NOTIFICATION",
});
export const disableNotify = (): object => ({
  type: "REMOVE_NOTIFICATION",
});
