import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Col } from 'reactstrap';

const getProductsQuery = {
  query: `
    query {
      getProducts {
        _id
        price
        name
        createdAt
        updatedAt
      }
    }`
};

const addProductQuery = ({ name, price }) => {
  return {
    query: `
    mutation {
      createProduct(name:"${name}", price:${price}) {
        _id
        price
        name
        createdAt
        updatedAt
      }
    }`
  }
};

const deleteProductQuery = ({ _id }) => {
  return {
    query: `
    mutation {
      deleteProduct(_id: "${_id}") {
        result
      }
    }`
  }
};

const App = () => {
  const [products, setProducts] = useState([]);

  const [createProductName, setCreateProductName] = useState('');
  const [createProductPrice, setCreateProductPrice] = useState('');

  const [editProductId, setEditProductId] = useState('');
  const [editProductName, setEditProductName] = useState('');
  const [editProductPrice, setEditProductPrice] = useState('');

  const [createProductModal, setCreateProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);

  const toggleCreateProductModal = () => setCreateProductModal(!createProductModal);
  const toggleEditProductModal = () => setEditProductModal(!editProductModal);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const resData = await axios({
        method: 'post',
        url: 'http://localhost:5000/graphql',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(getProductsQuery)
      });

      setProducts(resData.data.data.getProducts);
    } catch (error) {
      console.error('error = ', error.message);
    }
  };

  const editProductHandler = (_id) => {
    const product = products.find((el) => el._id === _id);
    setEditProductId(_id);
    setEditProductName(product.name);
    setEditProductPrice(product.price);
    toggleEditProductModal();
  };

  const clearInput = () => {
    setCreateProductName('');
    setCreateProductPrice('');
  };

  const addProductHandler = async () => {
    try {
      const resData = await axios({
        method: 'post',
        url: 'http://localhost:5000/graphql',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(addProductQuery({
          name: createProductName,
          price: createProductPrice
        }))
      });

      const newProduct = resData.data.data.createProduct;
      const updProducts = [...products, { ...newProduct }];

      setProducts(updProducts);
      toggleCreateProductModal();
      clearInput();
    } catch (err) {
      console.error(err);
    };
  };

  const deleteProductHandler = async (_id) => {
    try {
      const resData = await axios({
        method: 'post',
        url: 'http://localhost:5000/graphql',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(deleteProductQuery({
          _id
        }))
      });

      if(!resData.data.data.deleteProduct.result){
        throw new Error('delete is fail');
      }

      getProducts();
    } catch (err) {
      console.error(err);
    };
  };

  return (
    <div className='App container'>
      <br />
      <h1>List of Products</h1>
      <br />
      <Button color='success' outline onClick={toggleCreateProductModal}>ADD NEW PRODUCT</Button>
      <br />
      <br />
      <Modal isOpen={createProductModal} toggle={toggleCreateProductModal}>
        <ModalHeader toggle={toggleCreateProductModal}>Please add a new product:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='name'>Name:</Label>
              <Input id='name'
                placeholder='ex. AMD Ryzen 5 3600'
                value={createProductName}
                onChange={(event) => { setCreateProductName(event.target.value) }} />
              <br />
              <Label for='price'>Price:</Label>
              <Input id='price'
                placeholder='ex. 5000.00'
                value={createProductPrice}
                onChange={(event) => { setCreateProductPrice(event.target.value) }} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={addProductHandler}>ADD</Button>{' '}
          <Button color='secondary' onClick={toggleCreateProductModal}>CANCEL</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editProductModal} toggle={toggleEditProductModal}>
        <ModalHeader toggle={toggleEditProductModal}>Edit product info:</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='name'>Name:</Label>
              <Input id='name'
                value={editProductName}
                onChange={(event) => { setEditProductName(event.target.value) }} />
              <br />
              <Label for='price'>Price:</Label>
              <Input id='price'
                value={editProductPrice}
                onChange={(event) => { setEditProductPrice(event.target.value) }} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => { }}>UPDATE</Button>{' '}
          <Button color='secondary' onClick={toggleEditProductModal}>CANCEL</Button>
        </ModalFooter>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product._id}>
                <th scope="row">
                  {product._id}
                </th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.createdAt}</td>
                <td>{product.updatedAt}</td>
                <td>
                  <Col>
                    <Button onClick={() => editProductHandler(product._id)}>
                      Edit
                    </Button>
                    <Button onClick={()=> deleteProductHandler(product._id)}>
                      DELETE
                    </Button>
                  </Col>
                </td>
              </tr>

            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default App;