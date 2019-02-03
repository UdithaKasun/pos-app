import React, { Component } from 'react';
import { connect } from "react-redux";

import OrderList from '../components/OrderList/OrderList.component';
import {fetchOrders,addNewOrder,deleteOrder} from '../actions/orderActions';
import {logout} from '../actions/userActions';

class OrderListPage extends Component {
  constructor(props){
    super(props);
    this.handleEditOrder = this.handleEditOrder.bind(this);
    this.handleRemoveOrder = this.handleRemoveOrder.bind(this);
    this.handleAddNewOrder = this.handleAddNewOrder.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  async componentDidMount(){
    this.props.dispatch(fetchOrders());
  }

  handleEditOrder(orderNumber){
    const {match, history} = this.props;
    history.push(`${match.path}/${orderNumber}`)
  }

  handleRemoveOrder(orderNumber){  
    this.props.dispatch(deleteOrder(orderNumber));
  }

  async handleAddNewOrder(){
   await this.props.dispatch(addNewOrder());
   const {newOrder,history,match} = this.props;
   if(newOrder.id){
    history.push(`${match.path}/${newOrder.id}`)
   }
  }

  async handleLogOut(){
    await this.props.dispatch(logout());
    this.props.history.push('/login');
  }

  render() {
    return (
      <OrderList 
        orders={this.props.currentOrders}
        loading={this.props.loading || this.props.saving}
        onEditClick={this.handleEditOrder}
        onNewOrderClick={this.handleAddNewOrder}
        onRemoveClick={this.handleRemoveOrder}
        onLogOut={this.handleLogOut}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentOrders: state.orders.currentOrders,
  newOrder: state.orders.newOrder,
  loading: state.orders.loading,
  saving: state.orders.saving
});

export default connect(mapStateToProps)(OrderListPage);
