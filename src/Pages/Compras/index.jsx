import Template from '../../Layouts/Template';
import { toast } from 'react-toastify';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Button, Textarea } from "flowbite-react";
import { paymentMethod, orderStatus } from "@Components/Consts";
import { RatingInput } from "@Components/Rating";
import { money } from '@Components/Format';
import { useEffect, useState } from 'react';
import api, {getProduct, sendRevisao } from '@Controllers/api';
import storage from '@Controllers/storage';


export function CompraItem({item}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const product = item["product"];
  const submitRevisao = async () => {
    const textarea = document.getElementById('review-text-area-' + item["id"]);
    const data = {
      rating,
      comment: comment,
      var_id: item["var"]["id"],
    };
    await sendRevisao(data);
    toast("Revisão enviada com sucesso!");
  };
  return (
    <div className="text-gray-800 dark:text-white py-2 px-5 flex justify-center">
      <div className="px-5 w-100">
        <h3 className="text-lg">
          Produto: <a href={`/produto/${product["id"]}`}>{product["name"]}</a>
        </h3>
        <div className="p-2">
          <p>Quantidade: {item["quantity"]}</p>
          <p>Subtotal: {money(item["subtotal"])}</p>
          <p>Variação: {Object.keys(item["var"]["options"]).map(key => key + ": " + item["var"]["options"][key] + ". ") }</p>
        </div>
        <div >
          <div className="flex flex-row gap-x-3 items-center">
            <h3 className="font-bold">Revisão:</h3>
            <RatingInput selected={rating} setSelected={setRating} total={5}/>
            <Button size="xs" onClick={submitRevisao}>Enviar revisão</Button>
          </div>
          <div className="py-2">
            <Textarea placeholder="Deixe seu comentário..." required rows={2} value={comment} onChange={e => setComment(e.target.value)}/>
          </div>
        </div>
      </div>
      <a className="px-20" href={`/produto/${product["id"]}`}>
        <img src={storage(`/product/${product["id"]}`)} className="h-26 w-26" />
      </a>
    </div>
  )
}

export function Resumo({compra}) {
  return (
    <div className="text-gray-800 dark:text-white py-3">
      <h3 className="text-lg font-bold">
        Resumo da compra: 
      </h3>
      <div className="p-2 text-lg">
        <p>Valor total: {money(compra["totalPrice"])}</p>
        <p>Status: {orderStatus[compra["status"]]}</p>
        <p>Método de pagamento: {paymentMethod[compra["paymentMethod"]]}</p>
        <p>Rastreio: {compra["trackingCode"]}</p>
      </div>
    </div>
  )
}

export default function Compras() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (!orders) {
      api.get('/orders/my').then((res) => {
        const promises = [];
        const ordersRes = res.data;
        for (let order of ordersRes) {
          for (let item of order["items"]) {
            promises.push(
              getProduct(item["var"]["product_id"])
                .then((prod) => item["product"] = prod)
            );
          }
        }
        Promise.all(promises).then(ps => {
          console.log(ordersRes);
          setOrders(ordersRes);
        });
      })
    }
  }, [orders]);
  return (
    <Template>
      <div className="w-3/4">
        <h2 className="text-center p-2 text-lg font-bold dark:text-gray-800">Suas compras:</h2>
        <Accordion>
          {orders ? orders.map((order) => 
            <AccordionPanel key={order.id}>
              <AccordionTitle>Pedido #{order.id}</AccordionTitle>
              <AccordionContent>
                <Resumo compra={order}/>
                <hr className="my-2 text-gray-800 dark:text-white"/>
                {order["items"].map((item) => <CompraItem key={item.id} item={item}/>)}
              </AccordionContent>
            </AccordionPanel>
          ) : null}
        </Accordion>
      </div>
    </Template>
  )
}

