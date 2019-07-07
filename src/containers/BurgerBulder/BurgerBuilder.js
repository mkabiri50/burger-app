import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/Ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
       

    }
    componentDidMount() {
        this.props.onInitIngredient();
          
    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
       return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
     
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push( '/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ing
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>loading ingredients faild</p> : <Spinner />
        if (this.props.ing) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ing} />
                    <BuildControls
                        ingredientAdded={this.props.omIngredientAdded}
                        ingredientRemoved={this.props.omIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ing)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated} />
                       
                </React.Fragment>
            )
            orderSummary = <OrderSummary ingredients={this.props.ing}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />
        }
      
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error :state.burgerBuilder.error,
        isAuthenticated:state.auth.token !==null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        omIngredientAdded: (i) => dispatch(actions.addIngredients(i)),
        omIngredientRemoved: (i) => dispatch(actions.removeIngredients(i)),
        onInitIngredient:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));