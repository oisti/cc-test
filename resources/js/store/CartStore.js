export const SET_CART = 'SET_CART';

const initialState = null
/*
[
	{id: 1, product: {id: 1, name:'Brig', price: 23.22, size: '135/50/R10  82 T &#9432;'}, quantity: 4},
	{id: 2,product: {id: 2, name:'Pirelli', price: 1.33, size: '135/50/R10  82 T &#9432;'}, quantity: 5}
];
*/
const CartStoreReducer = (state = initialState, { type, payload = null}) => {
	switch (type) {
		case SET_CART:
			return payload;
		default:
			return state;
	}
};

export default CartStoreReducer;