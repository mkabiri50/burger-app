import React from 'react';

import BurgerIngredient from './Burgeringredient/Burgeringredient';
import classes from './Burger.css'
const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_, i) => {
    return <BurgerIngredient key={igkey + i} type={igkey} />;
});
    })
    .reduce((arr,el) => {
        return arr.concat(el)
    },[]);
    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>please add ingredient</p>
    }
    // console.log(transformedIngredient);
return (
    <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
        {transformedIngredient}
        <BurgerIngredient type='bread-bottom' />
    </div>
)
}
export default burger;