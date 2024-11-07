import { OrderType } from '../../../../entities/api/order/types.ts';

type OrderItemPropsType = OrderType & {
  refetchData: () => void;
};

export const OrderItem = ({ id }: OrderItemPropsType) => {
  return <div>{id}</div>;
};
