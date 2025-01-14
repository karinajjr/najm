import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  return (
    <div className="container mx-auto">
      <Breadcrumbs title="Оформление заказа" />
      <div className="pb-10"></div>
    </div>
  );
};

export default Payment;
