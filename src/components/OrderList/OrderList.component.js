import React from "react";
import { Button, Panel, ListGroup, Image } from "react-bootstrap";

import orderIcon from "../../assests/img/order.png";
import emptyOrderIcon from "../../assests/img/no-order.png";
import Order from "../Order/Order.component";
import LoadingIndicator from "../Shared/LoadingIndicator/LoadingIndicator.component";

const renderDate = date => {
  const inputDate = new Date(date);
  const formatteddate =
    inputDate.getFullYear() +
    "-" +
    (inputDate.getMonth() + 1) +
    "-" +
    inputDate.getDate();
  const formattedTime =
    inputDate.getHours() +
    ":" +
    inputDate.getMinutes() +
    ":" +
    inputDate.getSeconds();
  return formatteddate + " " + formattedTime;
};

const resolveOrderTotalCost = (currentOrderItems, items) => {
  let totalCost = 0;
  currentOrderItems.forEach(orderItem => {
    if (orderItem.id !== -1 && orderItem.itemQuantity > 0) {
      totalCost +=
        items.filter(item => item.id === Number(orderItem.id))[0].itemPrice *
        orderItem.itemQuantity;
    }
  });
  return totalCost;
};

const OrderListComponent = ({
  orders,
  loading,
  onEditClick,
  onRemoveClick,
  onNewOrderClick,
  onLogOut
}) => (
  <Panel bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">
        Current Orders
        <span class="button-left">
          <Button bsStyle="success" bsSize="xsmall" onClick={onNewOrderClick}>
            New Order
          </Button>
          &nbsp;
          <Button bsStyle="danger" bsSize="xsmall" onClick={onLogOut}>
            Log Out
          </Button>
        </span>
      </Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      <LoadingIndicator loading={loading} />
      {!loading && orders.length === 0 && (
        <div className="centerItem">
          <h3>It's empty here. Get started by creating an order</h3>
          <Image src={emptyOrderIcon} width="256" height="256" />
        </div>
      )}
      {!loading && (
        <ListGroup>
          {orders.map(order => (
            <Order
              key={order.id}
              orderIcon={orderIcon}
              orderNumber={order.id}
              orderItemCount={order.itemCount}
              orderCreatedDate={renderDate(order.createdDate)}
              orderUpdatedDate={renderDate(order.updatedDate)}
              orderTotal={order.total}
              onEditClick={() => onEditClick(order.id)}
              onRemoveClick={() => onRemoveClick(order.id)}
            />
          ))}
        </ListGroup>
      )}
    </Panel.Body>
  </Panel>
);

export default OrderListComponent;
