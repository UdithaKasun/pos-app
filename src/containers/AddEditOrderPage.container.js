
import React from 'react';

import AddEditOrder from '../components/AddEditOrder/AddEditOrder.component';

class AddEditOrderPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orderItems : [{
        id: 1,
        itemPrice: 2,
        itemQuantity: 7,
      },
      {
        id: 2,
        itemName:'Hello',
        itemPrice: 3,
        itemQuantity: 7,
      }],
      items:[
        {
          id: 1,
          itemName:'Ice Cream',
          itemPrice: 2.0,
        },
        {
          id: 2,
          itemName:'Pizza',
          itemPrice: 5.0,
        },
        {
          id: 3,
          itemName:'Burger',
          itemPrice: 3.5,
        }
      ]
    }
  }

  handleorderItemselectionUpdate = (index, e) => {
    let {orderItems} = this.state;
    orderItems[index].id = Number(e.target.value);
    this.setState({
      orderItems
    })
  }

  handleItemRemove = (indexToRemove) => {
    const neworderItems = this.state.orderItems.filter((item,index)=>index!==indexToRemove);

    this.setState({
      orderItems : neworderItems
    });
  }

  handleItemQuantityUpdate = (index, e) => {
    let {orderItems} = this.state;
    orderItems[index].itemQuantity = e.target.value;
    this.setState({
      orderItems
    })
  }

  handleAddNewItem = () => {
    const {orderItems} = this.state;
    this.setState({
      orderItems : [...orderItems,
        {
          id: -1,
          itemName:null,
          itemPrice: null,
          itemQuantity: null,
        }]
    })
  }

  render(){
    return (
    <AddEditOrder 
      tableHeader={"New Order"}
      items={this.state.items}
      orderItems={this.state.orderItems}
      handleorderItemselectionUpdate={this.handleorderItemselectionUpdate}
      handleItemQuantityUpdate={this.handleItemQuantityUpdate}
      handleItemRemove={this.handleItemRemove}
    />
  );
  }
}

export default AddEditOrderPage;