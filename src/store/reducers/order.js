import * as actionTypes from '../actions/actionTypes';
const initialState = {
    order: [],
    loading: false,
    purchased: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                order: state.order.concat(newOrder),
                purchased: true
            }
        case actionTypes.PURCHASE_FAILE:
            return {
                ...state,
                loading: false,
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                order:action.order
            }    
        case actionTypes.FETCH_ORDER_FAIL:
            return{
                ...state,
                loading:false,
            }   
        default: return state
    }


}
export default reducer;