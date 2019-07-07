import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'
export const addIngredients = (name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingName:name
    };
};
export const removeIngredients = (name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingName:name
    };
};
export const setIigredients =(ingredients) =>{
    return{
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients
    }
}
export const fetchIngredientsFailed =()=>{
    return{
        type:actionTypes.FETCH_INGREDIENT_FAILED
    }
}
export const initIngredients =()=>{
    return dispatch =>{
        axios.get('https://meysam-burger.firebaseio.com/ingredients.json')
        .then(res => {
           dispatch(setIigredients(res.data))
        })
        .catch(err => { 
            dispatch(fetchIngredientsFailed())
        });

    }
}