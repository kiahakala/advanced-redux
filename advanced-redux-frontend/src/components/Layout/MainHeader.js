import { useDispatch } from 'react-redux';
import CartButton from '../Cart/CartButton';
import { uiActions } from '../../store/ui-slice';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
	const dispatch = useDispatch()

	const toggleProductFormHandler = () => {
		dispatch(uiActions.toggleProductForm())
	}

	return (
		<header className={classes.header}>
		<h1>Webstore</h1>
		<nav>
			<ul>
			<li>
				<button onClick={toggleProductFormHandler}></button>
				<CartButton />
			</li>
			</ul>
		</nav>
		</header>
	);
};

export default MainHeader;
