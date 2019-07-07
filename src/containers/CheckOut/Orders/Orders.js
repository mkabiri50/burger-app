import React, {Component } from 'react';
import Order from '../../../components/Order/Order';
import {connect} from 'react-redux';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/Ui/Spinner/Spinner';

class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrder(this.props.token,this.props.userId)
    }

    render(){
        let order =<Spinner />;
        if (!this.props.loading){
          order=this.props.orders.map(order =>(
            <Order key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
            />         
        ))
        }

        return order;
    }   
}
const mapStateToProps=state =>{
    return{
        orders:state.order.order,
        loading:state.order.loading,
        token:state.auth.token, 
        userId:state.auth.userId 
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onFetchOrder: (token,userId)=>dispatch(actions.fetchOrder(token,userId))  
    };
 
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Orders,axios));
