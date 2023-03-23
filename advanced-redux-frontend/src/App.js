import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import ProductForm from './components/Admin/ProductForm';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
	const showCart = useSelector(state => state.ui.cartIsVisible)
	const showProductForm = useSelector(state => state.ui.productFormIsVisible)

  	return (
    	<Layout>
			{showProductForm && <ProductForm />}
      		{showCart && <Cart />}
      		<Products />
    	</Layout>
  	);
}

export default App;
