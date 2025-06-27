
import { Select, Button } from "flowbite-react";
import { useEffect, useState } from 'react';
import { paymentMethod } from "@Components/Consts";
import { CardPayment, initMercadoPago } from "@mercadopago/sdk-react";

const handleSubmit = (e) => {
}

export default function Pagamento({amount, method, setMethod}) {
  initMercadoPago("TEST-21234234", {locale: "pt-BR"});
  console.log(method);
  return (
    <div>
      <div className="py-2">
        <h2>Método de pagamento:</h2>
        <Select
          id="method"
          required
          onChange={e => {
            console.log(e)
            const op = e.target.options[e.target.selectedIndex];
            console.log(op)
            setMethod(op.id)
          }}
        >
          <option> --- </option>
          {
            Object.keys(paymentMethod).map(k =>
              <option key={k} id={k}>{paymentMethod[k]}</option>
            )
          }
        </Select>
      </div>
      {
        method == "CREDIT_CARD" ?
          <CardPayment
            initialization={amount}
            onSubmit={handleSubmit}
          />
          : null
      }
    </div>
  )
}
