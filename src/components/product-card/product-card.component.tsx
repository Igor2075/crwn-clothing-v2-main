import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { ProductCardContainer, Footer, Name, Price } from "./product-card.styles";
import { CategoryItem } from "../../store/categories/category.types";

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const addProductToCard = () => dispatch(addItemToCart(cartItems, product));
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>${price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCard}>
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
