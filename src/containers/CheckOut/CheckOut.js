import React, { Component } from 'react';
import CheckoutSummary from '../..//components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './CotactData/ContactData';
class CheckOut extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();

    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = <Redirect to='/' />
        if (this.props.ing) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ing}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(CheckOut);
