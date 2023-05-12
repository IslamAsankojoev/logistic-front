interface IProduct {
  id?: number;
  name: string;
  description: string;
  price: string;
}

interface IOrder {
  id?: number;
  phone_number: string;
  date?: string;
  product: IProduct;
  status: OrderStatus;
  address_type: AddressType;
  quantity: string;
  date_end?: string;
  date_status?: DateStatus;
  total_price?: string;
}

type OrderStatus = 'avia' | 'train' | 'track';
type AddressType = 'kz' | 'ru' | 'uz';
type DateStatus = 'past' | 'now';
