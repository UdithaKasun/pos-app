
import React from 'react';
import {
    ListGroupItem,
    Grid,
    Row,
    Col,
    Badge,
    Image,
    Label,
    Button
} from 'react-bootstrap';

const OrderComponent = ({ orderIcon, orderNumber, orderItemCount, orderCreatedDate, orderUpdatedDate, orderTotal , onEditClick, onRemoveClick}) => (
    <ListGroupItem>
        <Grid>
            <Row>
                <Col md={1}>
                    <Image alt="orderIcon" src={orderIcon} />
                </Col>
                <Col md={3}>
                    <p>
                        Order Number : {orderNumber}
                    </p>
                    <p>
                        Number Of Items : <Badge>{orderItemCount}</Badge>
                    </p>
                </Col>
                <Col md={3} className="Other">
                    <p>
                        Created Date : <Label bsStyle="primary">{orderCreatedDate}</Label>
                    </p>
                    <p>
                        Last Updated Date : <Label bsStyle="success">{orderUpdatedDate}</Label>
                    </p>
                </Col>
                <Col md={2}>
                    <h2 className="price">{orderTotal} $</h2>
                </Col>
                <Col md={2} className="buttons">
                    <Button bsStyle="primary" className="singleButton" onClick={onEditClick}>Edit</Button>
                    <Button bsStyle="danger" className="singleButtonOther" onClick={onRemoveClick}>Delete</Button>
                </Col>
            </Row>
        </Grid>
    </ListGroupItem>
);

export default OrderComponent;