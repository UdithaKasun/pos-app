import React from "react";
import {
  Panel,
  Button,
  Label,
  Table,
  ButtonGroup,
  FormControl,
  FormGroup,
  Alert
} from "react-bootstrap";

import LoadingIndicator from "../Shared/LoadingIndicator/LoadingIndicator.component";

const getValidationState = (index, controlType, orderItems) => {
  switch (controlType) {
    case "item":
      return orderItems[index].id && orderItems[index].id !== -1
        ? "success"
        : "error";
    case "quantity":
      return orderItems[index].itemQuantity &&
        orderItems[index].itemQuantity > 0
        ? "success"
        : "error";
    default:
      return null;
  }
};

const getUnitPrice = (item, items) => {
  if (items) {
    const selectedItem = items
      .filter(selectedItem => selectedItem.id === Number(item.id))
      .pop();
    return selectedItem.itemPrice;
  }
};

const resolveUnitPrice = (item, items) => {
  return item.id && item.id !== -1 ? (
    `$ ${getUnitPrice(item, items)}`
  ) : (
    <Label bsStyle="danger">No Item</Label>
  );
};

const resolveTotalPrice = (item, items) => {
  return (
    <td>
      {item.itemQuantity && item.id !== -1 ? (
        `$ ${item.itemQuantity * getUnitPrice(item, items)}`
      ) : (
        <Label bsStyle="danger">No Item/Quantity</Label>
      )}
    </td>
  );
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

const resolveItemName = (item, orderItems, selectedId) => {
  const selectedItemIds = orderItems.map(item => Number(item.id));
  if (
    selectedItemIds.indexOf(item.id) !== -1 &&
    item.id === Number(selectedId)
  ) {
    return <option value={item.id}>{item.itemName}</option>;
  } else if (
    selectedItemIds.indexOf(item.id) !== -1 &&
    item.id !== Number(selectedId)
  ) {
    return null;
  } else {
    return <option value={item.id}>{item.itemName}</option>;
  }
};

const resolveNewItemAddButton = (items, orderItems) => {
  return items.length === orderItems.length ? true : false;
};

const resolveEmptyOrderMessage = (orderItems, loading) => {
  const validOrderItems = orderItems.filter(
    orderItem => orderItem.id !== -1 && orderItem.itemQuantity
  );
  return validOrderItems.length === 0 && !loading ? (
    <Alert bsStyle="warning">
      Your Order will be discarded due to not having items, add some items
    </Alert>
  ) : null;
};

const AddEditOrder = ({
  tableHeader,
  items,
  orderItems,

  handleAddNewItem,
  handleorderItemselectionUpdate,
  handleItemQuantityUpdate,
  handleItemRemove,
  onNavigateBack,
  loading
}) => (
  <Panel bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">
        {tableHeader}
        <span class="button-left">
          <Button
            bsStyle="success"
            bsSize="xsmall"
            onClick={handleAddNewItem}
            disabled={resolveNewItemAddButton(items, orderItems)}
          >
            New Item
          </Button>
          &nbsp;
          <Button bsStyle="warning" bsSize="xsmall" onClick={onNavigateBack}>
            Back
          </Button>
        </span>
      </Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      <LoadingIndicator loading={loading} />
      {!loading && resolveEmptyOrderMessage(orderItems)}
      {!loading && (
        <form>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Edit/Remove</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((orderItem, index) => {
                return (
                  <tr key={orderItem.id}>
                    <td>{index + 1}</td>
                    <td>
                      <FormGroup
                        controlId={`control${index}`}
                        validationState={getValidationState(
                          index,
                          "item",
                          orderItems
                        )}
                      >
                        <FormControl
                          componentClass="select"
                          placeholder="select"
                          value={orderItem.id}
                          onChange={e =>
                            handleorderItemselectionUpdate(index, e)
                          }
                        >
                          <option disabled value={-1} key={-1}>
                            Select an item
                          </option>
                          {items.map(item =>
                            resolveItemName(item, orderItems, orderItem.id)
                          )}
                        </FormControl>
                      </FormGroup>
                    </td>
                    <td>{resolveUnitPrice(orderItem, items)}</td>
                    <td>
                      <FormGroup
                        controlId={`control${index}`}
                        validationState={getValidationState(
                          index,
                          "quantity",
                          orderItems
                        )}
                      >
                        <FormControl
                          type="number"
                          label="Text"
                          value={orderItem.itemQuantity}
                          placeholder="Enter quantity"
                          onChange={e => handleItemQuantityUpdate(index, e)}
                          min="0"
                        />
                      </FormGroup>
                    </td>
                    <td>{resolveTotalPrice(orderItem, items)}</td>
                    <td>
                      <ButtonGroup>
                        <Button
                          bsStyle="danger"
                          onClick={() => handleItemRemove(index)}
                        >
                          Remove
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {
            <h3 className="rightItem">
              Total Cost : {resolveOrderTotalCost(orderItems, items)} $
            </h3>
          }
        </form>
      )}
    </Panel.Body>
  </Panel>
);

export default AddEditOrder;
