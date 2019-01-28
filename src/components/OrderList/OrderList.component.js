
import React from 'react';
import {
    Panel,
    ListGroup,
} from 'react-bootstrap';

import orderIcon from '../../assests/img/order.png';
import Order from '../Order/Order.component';

const renderDate = (date) => {
    const inputDate = new Date(date);
const formatteddate = inputDate.getFullYear()+'-'+(inputDate.getMonth()+1)+'-'+inputDate.getDate();
const formattedTime = inputDate.getHours() + ":" + inputDate.getMinutes() + ":" + inputDate.getSeconds();
return formatteddate+' '+formattedTime;
};
const OrderListComponent = ({ orders, onEditClick, onRemoveClick}) => (
    <Panel bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">Current Orders</Panel.Title>
    </Panel.Heading>
    <ListGroup>
        {orders.map(order => 
            <Order 
                key={order.id}
                orderIcon={orderIcon}
                orderNumber={order.id}
                orderItemCount={order.itemCount}
                orderCreatedDate={renderDate(order.createdDate)}
                orderUpdatedDate={renderDate(order.updatedDate)}
                orderTotal={order.total}
                onEditClick={()=> onEditClick(order.id)}
                onRemoveClick={()=>onRemoveClick(order.id)}
          />
        )}
  </ListGroup>
  </Panel>
);

export default OrderListComponent;