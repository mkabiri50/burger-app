import React from 'react'
import classes from './Order.css';
const Order = (props) => {
    const ingredients = [];
    for (let i in props.ingredients) {
        ingredients.push({
            name: i,
            amount: props.ingredients[i]
        })
    }
    const ingredientOutput = ingredients.map(ig => {
        return <span
        style={{
            textTransform:'capitalize',
            border: '1px solid #ccc',
            margin:'0 8px',
            display:'inline-block',
            padding:'5px',

    }}
         key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients :{ingredientOutput}</p>
            <p>Price : <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
    }
    export default Order;