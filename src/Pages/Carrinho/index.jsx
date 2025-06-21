
import { toast } from 'react-toastify';
import Template from '../../Layouts/Template';
import IncButton from '@Components/IncButton';
import { money } from '@Components/Format';
import { useEffect, useState } from 'react';
import { Checkbox } from "flowbite-react";
import {getProduct, getMyCart, addCartItem, removeCartItem} from '@Controllers/api';
import storage from '@Controllers/storage';

export default function Carrinho() {
  const [cart, setCart] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  useEffect(() => {
    (async () => {
      if (!cart) {
        const cartRes = await getMyCart();
        setSelectedItems(new Set(cartRes.items.map(i => i.id)));
        setCart(cartRes);
      }
    })();
  }, [cart]);
  return (
    <Template cart={cart} setCart={setCart}>
      <div>
        {
          cart && cart.items.length > 0 ?
            <div>
              <div>
                <Resumo cart={cart} selectedItems={selectedItems}/>
              </div>
              <div>
                {
                  cart.items.map(item =>
                      <CartItem
                        key={item.id}
                        item={item} 
                        cart={cart}
                        setCart={setCart}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                      />
                  )
                }
              </div>
            </div>
            : <h2 className="text-lg">Não há items no carrinho</h2>
        }
      </div>
    </Template>
  )
}

export function CartItem({item, cart, setCart, selectedItems, setSelectedItems}) {
  const [product, setProduct] = useState(null);
  const incCallback = async (value, setValue, op) => {
    if (op === "SUB") {
      const cartRes = await removeCartItem(item.id);
      setCart(cartRes);
      toast(' 🗑️ Item removido.');
    } else {
      const unitPrice = item.subtotal / item.quantity
      const data = {
        quantity: 1,
        product_variation_id: item.var.id,
        subtotal: unitPrice,
      }
      const cartRes = await addCartItem(data);
      setCart(cartRes);
      toast(' ✅ Item adicionado.');
    }

  }
  useEffect(() => {
    (async () => {
      if (!product) {
        const productRes = await getProduct(item.var.product_id);
        console.log(productRes)
        setProduct(productRes);
      }
    })();
  }, [product]);
  return (
    <div className="py-2 flex justify-center">
      <div className="px-5 w-100">
        <h3 className="text-lg">
          <Checkbox
            defaultChecked
            id={item.id}
            onChange={(e) => {
                const newSelected = new Set(selectedItems);
                if (e.target.checked) {
                  newSelected.add(Number(e.target.id));
                } else {
                  newSelected.delete(Number(e.target.id));
                }
                setSelectedItems(newSelected);
            }}
          />
          <p className="inline"> Produto: <a href={`/produto/${product?.id}`}>{product?.name}</a></p>
        </h3>
        <div className="p-2">
          Quantidade: <IncButton valueId="qtd" max={product?.stock} startValue={item.quantity} decIcon={"🗑️"} callback={incCallback}/>
          <p>Subtotal: {money(item["subtotal"])}</p>
          <p>Variação: {Object.keys(item["var"]["options"]).map(key => key + ": " + item["var"]["options"][key] + ". ") }</p>
        </div>
      </div>
      <a className="px-20" href={`/produto/${product?.id}`}>
        <img src={storage(`/product/${product?.id}`)} className="h-26 w-26" />
      </a>
    </div>
  )
}

function Resumo({cart, selectedItems}) {
  const total = cart.items
    .filter(i => selectedItems.has(i.id))
    .map(i => i.subtotal)
    .reduce((i1, i2) => i1 + i2, 0);
  const qtd = cart.items
    .filter(i => selectedItems.has(i.id))
    .map(i => i.quantity)
    .reduce((i1, i2) => i1 + i2, 0);
  const promos = cart.items.filter(i => i.promotion_id).length;
  return (
    <div className="py-5">
      <h2 className="text-lg">
        Resumo do Carrinho
      </h2>
      <div className="p-2">
        <h2>Total: {money(total)}</h2>
        <h2>Quantidade: {qtd}</h2>
        {
          promos > 0 ?
          <h2> 🎁 Promoções aplicadas: {promos} </h2>
          : null
        }
      </div>
    </div>
  )
}
