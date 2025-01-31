import { Button, Divider } from "antd";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { IProduct } from "../../types/types";
import QuantitySelector from "../buttons/QuantitySelector";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

interface CartItem extends IProduct {
  quantity: number;
  orderQuantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrease = () => {
    if (item.quantity > item.orderQuantity) {
      onUpdateQuantity(item._id, item.orderQuantity + 1);
    }
  };

  const handleDecrease = () => {
    if (item.orderQuantity > 1) {
      onUpdateQuantity(item._id, item.orderQuantity - 1);
    }
  };

  return (
    <div className="">
      {/* Product Image */}
      <div className="flex items-center justify-between">

        <Link to={`/product/${item._id}`} className="w-20 h-20 flex-shrink-0 mr-4">
          <img src={item.imageUrl || "/placeholder.jpg"} alt={item.title} className="w-full h-full object-cover rounded-md" />
        </Link>

        <div className="w-full">
          {/* Title & Price */}
          <div className="flex-1 flex flex-col items-center text-left">
            <div className="w-full flex">


              <h2 className="text-sm text-left  font-semibold ">{item.title}</h2>

              {/* Remove Button */}
              <Button type="text" className="ml-auto" danger onClick={() => onRemove(item._id)} icon={<X size={18} />} />
            </div>
            <p className="text-sm text-text  mr-auto">Price: ${item.price.toFixed(2)}</p>
          </div>

          {/* Quantity Controls */}
  
     
          <QuantitySelector quantity={item.orderQuantity}
            maxQuantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onChange={(value) => onUpdateQuantity(item._id, value)} />
        </div>
      </div>



      <Divider className="my-4" />
    </div>
  );
};

export default CartItem;
