
import { toast } from 'react-toastify';
import Template from '../../Layouts/Template';
import IncButton from '@Components/IncButton';
import Pagamento from '@Pages/Pagamento';
import { money } from '@Components/Format';
import { useEffect, useState } from 'react';
import { Select, Checkbox, Button } from "flowbite-react";
import {getProduct, getMyCart, addCartItem, getAddresses, removeCartItem, buy} from '@Controllers/api';
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
          Quantidade: <IncButton valueId="qtd" max={item?.var.stock} startValue={item.quantity} decIcon={"🗑️"} callback={incCallback}/>
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
  const [method, setMethod] = useState("");
  const [address, setAddress] = useState(null);
  const selected = cart.items.filter(i => selectedItems.has(i.id));
  const total = selected.map(i => i.subtotal).reduce((i1, i2) => i1 + i2, 0);
  const qtd = selected.map(i => i.quantity).reduce((i1, i2) => i1 + i2, 0);
  const promos = selected.filter(i => i.promotion_id).length;
  const handleSubmit = (e) => {
    const items = selected.map(item => {
      return {
        promotion_id: item.promotion_id,
        cart_item_id: item.id
      };
    });
    const data = {
      address_id: address.id,
      paymentMethod: method,
      items: items
    };
    buy(data)
    .then(order => {
      toast(` ✅ Compra realizada com sucesso. Pedido #${order.id}`);
      setTimeout(() => window.location = '/compras', 2000);
    }).catch(err => {
      toast.error(err.response.data);
    });
  }
  return (
    <div className="py-5 flex flex-row gap-5">
      <div>
        <h2 className="text-lg font-bold">
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
        <Button onClick={handleSubmit}> 🛍️ Realizar compra! </Button>
      </div>
      <div>
        <EnderecoEnvioSelect address={address} setAddress={setAddress}/>
      </div>
      <div>
        <Pagamento method={method} setMethod={setMethod} amount={total}/>
      </div>
    </div>
  )
}

export function EnderecoEnvioSelect({address, setAddress}) {
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    if (!address) {
      getAddresses()
      .then(addressesRes => {
        setAddresses(addressesRes);
        setAddress(addressesRes[0]);
      });
    }
  }, [addresses]);
  return (
    <div>
      <div className="py-2 w-100">
        <h2>Endereço de envio:</h2>
        <Select
          required
          onChange={e => {
            setAddress(addresses[e.target.selectedIndex]);
          }}
        >
          {
            addresses.map(addr => 
              <option key={addr.id} id={addr.id}>Endereço {addr.street}, {addr.city}</option>
            )
          }
        </Select>
        <div>
          {
            address && 
              <div>
                <h3>Rua: {address.street} {address?.complement} - {address.number}</h3>
                <h3>Bairro: {address.neighborhood}</h3>
                <h3>Cidade: {address.city} / {address.state} / {address.zipCode}</h3>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
