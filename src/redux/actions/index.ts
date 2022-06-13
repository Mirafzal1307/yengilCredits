import * as ProductActionCreators from './productAction';
import * as BrandActionCreators from './brandAction';
import * as CardActionCreators from './cardAction';
import * as CategoryActionCreators from './categoryAction'
import * as TodoActionCreators from './basketAction'
import * as FetchActionById from './detailsByIdAction'
import * as productByCategoryAction from "./productByCategoryAction"
import * as FetchProductClientDetails from './DetailsActions';
export default {
    ...ProductActionCreators,
    ...BrandActionCreators,
    ...CardActionCreators,
    ...CategoryActionCreators,
    ...TodoActionCreators,
    ...CardActionCreators,
    ...FetchActionById,
    ...productByCategoryAction,
    ...FetchProductClientDetails
}
export const addItem = (id:any) => {
    return {
        type: 'ADD_ITEM',
        item: {
            id: id
        }
    }
};
export const changeQuantity = (id:any, quantity:any) => {
    return {
        type: 'CHANGE_ITEM',
        item: {
            id: id,
            quantity: quantity
        }
    }
};
export const decrementItem = (id:any) => {
    return {
        type: 'DECREMENT_ITEM',
        item: {
            id: id
        }
    }
};
export const notify = () => {
    return {
        type: "SHOW_NOTIFICATION"
    }
};
export const disableNotify = () => {
    return {
        type: "REMOVE_NOTIFICATION"
    }
};
