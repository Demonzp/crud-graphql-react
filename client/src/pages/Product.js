import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getProductQuery } from '../graphql/queryProducts';
import { Button, Card, CardBody, CardTitle, CardText, CardSubtitle } from 'reactstrap';

const Product = ({ match, history }) => {
  const [_id, _] = useState(match.params.productId);
  const [product, setProduct] = useState();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const resData = await axios({
        method: 'post',
        url: 'http://localhost:5000/graphql',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(getProductQuery({ _id }))
      });

      setProduct(resData.data.data.getProduct);
    } catch (error) {
      console.error('error = ', error.message);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={()=>history.push('/')}>Back</Button>
      {
        product ?
          <Card>
            <CardBody>
              <CardTitle tag="h5">Product: {product.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Add at: {product.createdAt} Update At: {product.updatedAt}</CardSubtitle>
              <CardText>price: {product.price}</CardText>
            </CardBody>
          </Card>
          :
          <div>Loading...</div>
      }
    </React.Fragment>
  );
};

export default Product;