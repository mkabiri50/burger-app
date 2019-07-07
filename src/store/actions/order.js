import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderID: id,
        orderData: orderData
    };
};
export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAILE,
        error: error
    };
};
export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START,
    };

};
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post('/orders.json?auth='+token, orderData)
            .then(ress => {
                dispatch(purchaseSuccess(ress.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseFail(error))
            });
    }
};
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};
export const fetchOrderSuccess = (order) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: order
    }
}
export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}
export const fetchOrder = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams ='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrderFail(err))
            });
    }
}

