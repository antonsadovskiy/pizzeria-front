import { OrderType } from '../../../../entities/api/order/types.ts';

type OrderItemPropsType = OrderType & {
  refetchData: () => void;
};

export const OrderItem = ({
  orderItems,
  refetchData,
  id,
  status,
}: OrderItemPropsType) => {
  return <div>{id}</div>;
};
