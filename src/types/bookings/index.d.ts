type BookingForAdmin = {
  id: number;
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
  total_price: number;
  status: string;
  customer: {
    name: string;
    email: string;
  };
  vehicle: {
    vehicle_name: string;
    registration_number: string;
  };
};

type BookingForCustomer = {
  id: number;
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
  total_price: number;
  status: string;
  vehicle: {
    vehicle_name: string;
    registration_number: string;
  };
};
