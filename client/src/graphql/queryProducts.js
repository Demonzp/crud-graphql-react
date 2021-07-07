export const getProductsQuery = {
  query: `
    query {
      getProducts {
        _id
        price
        name
      }
    }`
};

export const getProductQuery = ({_id})=>{
  return {
    query: `
    query {
      getProduct(_id:"${_id}") {
        _id
        price
        name
        createdAt,
        updatedAt
      }
    }`
  }
};

export const addProductQuery = ({ name, price }) => {
  return {
    query: `
    mutation {
      createProduct(name:"${name}", price:${price}) {
        _id
        price
        name
      }
    }`
  }
};

export const updateProductQuery = ({ _id, name, price }) => {
  return {
    query: `
    mutation {
      updateProduct(_id:"${_id}", name:"${name}", price:${price}) {
        _id
        price
        name
      }
    }`
  }
};

export const deleteProductQuery = ({ _id }) => {
  return {
    query: `
    mutation {
      deleteProduct(_id: "${_id}") {
        result
      }
    }`
  }
};