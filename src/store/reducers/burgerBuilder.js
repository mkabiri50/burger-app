
import * as actionTypes from '../actions/actionTypes';
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building:false
}
const INGREDIENY_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1,
                   
                },
                building:true,
                totalPrice: state.totalPrice + INGREDIENY_PRICE[action.ingName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1,
                    
                },
                building:true,
                totalPrice: state.totalPrice - INGREDIENY_PRICE[action.ingName]
            }
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                error:false,
                totalPrice: 4,
                building:false
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}
export default reducer;