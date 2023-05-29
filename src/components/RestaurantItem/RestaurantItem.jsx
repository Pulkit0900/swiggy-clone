import { IMG_LINK } from '../../utils/config';
import './RestaurantItem.scss';
import { AiFillStar } from 'react-icons/ai';
import { ReactComponent as VegIcon } from './../../assets/icons/veg.svg';
import { ReactComponent as NonVegIcon } from './../../assets/icons/nonveg.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToCart,
	decreaseQuantity,
	increaseQuantity,
	removeFromCart,
} from '../../redux/slice/cartSlice';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const RestaurantItem = data => {
	// console.log(data?.card?.info);
	const dispatch = useDispatch();
	const items = useSelector(state => state.cart.items);
	const [isAdded, setIsAdded] = useState(false);
	const [quantity, setQuantity] = useState(0);
	useEffect(() => {
		const isPresentAt = items.findIndex(
			el => el.info.id === data.card.info.id
		);
		setIsAdded(isPresentAt >= 0);
		setQuantity(items?.[isPresentAt]?.quantity);
		// console.log(isPresentAt);
	}, [items]);

	return (
		<div className="restaurant-item-wrapper">
			<div className="restaurant-item">
				<div className="info">
					<span className="tag">
						{data?.card?.info?.itemAttribute?.vegClassifier ===
						'VEG' ? (
							<VegIcon className="veg-nonveg-icon" />
						) : (
							<NonVegIcon className="veg-nonveg-icon" />
						)}
						{data?.card?.info?.ribbon?.text && (
							<AiFillStar className="icon" />
						)}
						<span>{data?.card?.info?.ribbon?.text}</span>
					</span>

					<span className="title">{data?.card?.info?.name}</span>
					<span className="price">
						{data?.card?.info?.price
							? data?.card?.info?.price / 100
							: data?.card?.info?.variantsV2?.pricingModels?.[0]
									?.price / 100}{' '}
						₹
					</span>
					<span className="desc">
						{data?.card?.info?.description}
					</span>
				</div>
				<div className="img">
					{data?.card?.info?.imageId ? (
						<img
							src={IMG_LINK + data?.card?.info?.imageId}
							alt={data?.card?.info?.name}
						/>
					) : (
						<div className="img-dummy">NO IMG</div>
					)}

					{!isAdded || quantity <= 0 ? (
						<div className="add-btn">
							<div
								onClick={() => {
									dispatch(
										addToCart({
											...data.card,
											quantity: 1,
										})
									);
								}}>
								ADD
							</div>
						</div>
					) : (
						<div className="controls">
							<div>
								<span
									onClick={() => {
										if (
											items.find(
												el =>
													el.info.id ===
													data.card.info.id
											)?.quantity > 1
										) {
											dispatch(
												decreaseQuantity(
													data.card.info.id
												)
											);
										} else {
											dispatch(
												removeFromCart(
													data.card.info.id
												)
											);
										}
									}}
									className="btns">
									<BiMinus />
								</span>
								<span>{quantity}</span>
								<span
									onClick={() => {
										dispatch(
											increaseQuantity(data.card.info.id)
										);
									}}
									className="btns">
									<BiPlus />
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RestaurantItem;
