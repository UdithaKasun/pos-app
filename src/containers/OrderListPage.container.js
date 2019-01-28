import React, { Component } from 'react';
import { connect } from "react-redux";

import OrderList from '../components/OrderList/OrderList.component';
import {fetchOrders} from '../actions/orderActions';

class OrderListPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      orders : [{
          orderNumber : 1,
                itemCount:5,
                createdDate:'2019/01/01',
                updatedDate:'2019/01/05',
                total:'250.25'
      },
      {
        orderNumber : 2,
              itemCount:5,
              createdDate:'2019/01/01',
              updatedDate:'2019/01/05',
              total:'550.25'
    }]
    };
    this.handleEditOrder = this.handleEditOrder.bind(this);
    this.handleRemoveOrder = this.handleRemoveOrder.bind(this);
  }

  async componentDidMount(){
    this.props.dispatch(fetchOrders());
  }

  handleEditOrder(orderNumber){
    const {match, history} = this.props;
    history.push(`${match.path}/${orderNumber}`)
  }

  handleRemoveOrder(orderNumber){  
    console.log(`handleRemoveOrder ${orderNumber}`)
  }

  render() {
    return (
      <OrderList 
        orders={this.props.currentOrders}
        onEditClick={this.handleEditOrder}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentOrders: state.orders.currentOrders
});

export default connect(mapStateToProps)(OrderListPage);
