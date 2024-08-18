import { requireAuth } from "@/lib/requireAuth";

const OrderList = async () => {
  const session = await requireAuth("/me/orders");

  return (
    <h1>
      <h1>{JSON.stringify(session, null, 4)}</h1>
    </h1>
  );
};

export default OrderList;
