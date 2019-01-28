
import React from 'react';
import {
    Panel,
    Button,
    Label,
    Table,
    ButtonGroup,
    FormControl,
    FormGroup,
} from 'react-bootstrap';


const getValidationState = (index,controlType,orderItems) => {
    switch(controlType){
      case 'item':
        return (orderItems[index].id && orderItems[index].id !== -1 ?'success':'error');
      case 'quantity':
        return (orderItems[index].itemQuantity?'success':'error');
      default:
        return null;
    }
}

const getUnitPrice = (item, items) => {
    if(items){
        const selectedItem = items.filter(selectedItem=>selectedItem.id === Number(item.id)).pop();
        return selectedItem.itemPrice;
    }
}

const resolveUnitPrice = (item,items) => {
    return (item.id && item.id !== -1? `$ ${getUnitPrice(item,items)}` : <Label bsStyle="danger">No Item</Label>);
}

const resolveTotalPrice = (item,items) => {
    return (<td>{(item.itemQuantity && item.id !== -1 )?`$ ${item.itemQuantity * getUnitPrice(item, items)}`:<Label bsStyle="danger">No Item/Quantity</Label>}</td>);
}

const resolveItemName = (item,orderItems) => {
    const selectedItemIds = orderItems.map(item=>item.id);
    if(orderItems.length > 0 && selectedItemIds.indexOf(item.id) !== -1){
      return (<option value={item.id} disabled={true}>{item.itemName}</option>)      
    }
    else{
      return (<option value={item.id}>{item.itemName}</option>);
    }
};

const resolveNewItemAddButton = (items,orderItems) => {
    return (items.length === orderItems.length ? true : false);
}

const AddEditOrder = ({
    tableHeader,
    items,
    orderItems, 

    handleAddNewItem,
    handleorderItemselectionUpdate,
    handleItemQuantityUpdate,
    handleItemRemove,
}) => (<Panel bsStyle="primary">
    <Panel.Heading>
        <Panel.Title componentClass="h3">{tableHeader}
            <span class='button-left'>
            <Button bsStyle="info" bsSize="xsmall" onClick={handleAddNewItem} disabled={resolveNewItemAddButton(items,orderItems)}>
                New Item
            </Button>
            &nbsp;
            <Button bsStyle="success" bsSize="xsmall" onClick={handleAddNewItem} disabled={resolveNewItemAddButton(items,orderItems)}>
                Save Order
            </Button>
            </span></Panel.Title>
    </Panel.Heading>
    <Panel.Body>
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
                    {orderItems.map((item, index) => {
                        return (<tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <FormGroup controlId={`control${index}`} validationState={getValidationState(index, 'item',orderItems)}>
                                    <FormControl componentClass="select" placeholder="select" value={item.id} onChange={(e) => handleorderItemselectionUpdate(index, e)}>
                                        <option disabled value={-1} key={-1}>Select an item</option>
                                        {items.map(item => resolveItemName(item, orderItems))}

                                    </FormControl>
                                </FormGroup>
                            </td>
                            <td>{resolveUnitPrice(item, items)}</td>
                            <td>
                                <FormGroup controlId={`control${index}`} validationState={getValidationState(index, 'quantity',orderItems)}>
                                    <FormControl type="number" label="Text" value={item.itemQuantity} placeholder="Enter quantity" onChange={(e) => handleItemQuantityUpdate(index, e)} />
                                </FormGroup>
                            </td>
                            <td>{resolveTotalPrice(item,items)}</td>
                            <td>
                                <ButtonGroup>
                                    <Button bsStyle="danger" onClick={() => handleItemRemove(index)}>Remove</Button>
                                </ButtonGroup>
                            </td>
                        </tr>);
                    })}
                </tbody>
            </Table>
        </form>
    </Panel.Body>
</Panel>);

export default AddEditOrder;