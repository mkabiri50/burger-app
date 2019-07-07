import React from 'react';
import Button from '../../Ui/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
            .map((igKey) =>{
                return <li key = {igKey} >
                <span style ={{textTransform:'capitalize'}}>{igKey}</span> :{props.ingredients[igKey]}
                </li>
            })
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A deliciuos burger with the following ingredients </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>TOTAL PRICE : <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue Checkout?</p>
            <Button btnType ='Danger' clicked ={props.purchaseCancelled}>CANCEl</Button>
            <Button btnType ='Success' clicked ={props.purchaseContinued} >CONTINUE</Button>

        </React.Fragment>
    )
}
export default orderSummary;