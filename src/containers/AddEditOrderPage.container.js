import React from "react";
import { connect } from "react-redux";

import AddEditOrder from "../components/AddEditOrder/AddEditOrder.component";
import {
  fetchItemsPerOrder,
  addNewItemToCurrentOrder,
  updateItemQuantity,
  updateItemId,
  removeItemFromCurrentOrder,
  updateOrder,
  deleteOrder
} from "../actions/orderActions";
import { fetchItems } from "../actions/itemActions";

class AddEditOrderPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleorderItemselectionUpdate = (index, e) => {
    this.props.dispatch(updateItemId(index, e.target.value));
  };

  handleItemRemove = indexToRemove => {
    this.props.dispatch(removeItemFromCurrentOrder(indexToRemove));
  };

  handleItemQuantityUpdate = (index, e) => {
    this.props.dispatch(updateItemQuantity(index, e.target.value));
  };

  handleAddNewItem = () => {
    this.props.dispatch(addNewItemToCurrentOrder());
  };

  handleSaveOrder = () => {
    const {
      currentOrderItems,
      match: {
        params: { id }
      }
    } = this.props;
    let itemsTobeSaved = currentOrderItems.filter(
      item => item.id !== -1 && (item.itemQuantity && item.itemQuantity > 0)
    );
    this.props.dispatch(updateOrder(id, itemsTobeSaved));
  };

  handleDeleteOrder = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.dispatch(deleteOrder(id));
  };

  handleNavigationBack = () => {
    this.props.history.push("/orders");
  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.dispatch(fetchItems());
    this.props.dispatch(fetchItemsPerOrder(id));
  }

  componentWillUnmount() {
    let { currentOrderItems } = this.props;
    const applicableOrderToSave = currentOrderItems.filter(
      currentOrder => currentOrder.id !== -1 && currentOrder.itemQuantity > 0
    );
    if (applicableOrderToSave.length > 0) {
      this.handleSaveOrder();
    } else {
      this.handleDeleteOrder();
    }
  }

  render() {
    return (
      <AddEditOrder
        tableHeader={"New Order"}
        items={this.props.items}
        orderItems={this.props.currentOrderItems}
        loading={this.props.loading}
        handleAddNewItem={this.handleAddNewItem}
        handleorderItemselectionUpdate={this.handleorderItemselectionUpdate}
        handleItemQuantityUpdate={this.handleItemQuantityUpdate}
        handleItemRemove={this.handleItemRemove}
        onNavigateBack={this.handleNavigationBack}
        onLogOut={this.handleLogout}
      />
    );
  }
}

const mapStateToProps = state => ({
  items: state.items.items,
  currentOrderItems: state.orders.currentOrderItems,
  loading: state.orders.loading
});

export default connect(mapStateToProps)(AddEditOrderPage);
