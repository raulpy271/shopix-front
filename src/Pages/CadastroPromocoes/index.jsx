

import {useState, useEffect} from 'react';
import { Select, Label, TextInput, Button, Datepicker, Card } from "flowbite-react";
import Price from '@Components/Price';
import RatingComp from '@Components/Rating';
import Template from '@Layouts/Template';
import { toast } from 'react-toastify';
import { getProducts, createPromotion } from '@Controllers/api';
import storage from '@Controllers/storage';

export default function CadastroPromocoes() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [promotion, setPromotion] = useState({startDate: formatDate(new Date()), endDate: formatDate(new Date()), discountPercentage: 0});
  useEffect(() => {
    if (products.length == 0) {
      getProducts().then((data) => {
        setProducts(data);
      });
    }
  }, [products]);
  const handleChange = e => {
    if (e.target.name == "discountPercentage") {
      const discount = Number(e.target.value);
      if (discount < 100 && discount > 0) {
        promotion[e.target.name] = discount / 100;
      } else {
        e.target.value = "";
        promotion[e.target.name] = 0;
        toast.error("O percentual deve ser um valor númerico entre 1 e 99");

      }
    } else {
      promotion[e.target.name] = e.target.value;
    }
    setPromotion(promotion);
    setProduct({
      ...product,
      "promotion": promotion,
    });
  };
  const handleSubmit = async () => {
    promotion.isActive = true;
    promotion.product_id = product.id;
    await createPromotion(promotion);
    toast("Promoção criada com sucesso!");
  };
  return (
    <div>
      <Template>
        <div className="flex flex-col justify-center align-center gap-5">
          <h2 className="text-lg font-bold">Cadastre promoções na Shopix</h2>
          <div>
            <Label className="text-black dark:text-black">Selecione produto:</Label>
            <Select
              required
              onChange={e => {
                if (e.target.selectedIndex == 0) {
                  setProduct(null);
                } else {
                  setProduct({
                    ...products[e.target.selectedIndex - 1],
                    "promotion": promotion,
                  });
                }
              }}
            >
              <option> - </option>
              {
                products.map(p => 
                  <option key={p.id} id={p.id}>{p.name}</option>
                )
              }
            </Select>
          </div>
          <div className="w-full flex justify-center">
            {
              product && <Produto product={product}/>
            }
          </div>
          <form className="flex w-md flex-col justify-center gap-2">
            <div>
              <Label className="text-black dark:text-black">Nome da promoção:</Label>
              <TextInput name="name" onChange={handleChange}/>
            </div>
            <div>
              <Label className="text-black dark:text-black">Início da promoção:</Label>
              <DateInp name="startDate" obj={promotion} setObj={setPromotion}/>
            </div>
            <div>
              <Label className="text-black dark:text-black">Fim da promoção:</Label>
              <DateInp name="endDate" obj={promotion} setObj={setPromotion}/>
            </div>
            <div>
              <Label className="text-black dark:text-black">Percentual de desconto:</Label>
              <TextInput name="discountPercentage" type="number" onChange={handleChange} min="1" max="99"/>
            </div>
          </form>
          <Button onClick={handleSubmit}>Realizar Cadastro</Button>
        </div>
      </Template>
    </div>
  )
}

function DateInp({name, obj, setObj}) {
  return (
    <Datepicker name={name} language="pt-BR" labelTodayButton="Hoje" labelClearButton="Limpar" onChange={(date) => {
      const formattedDate = formatDate(date);
      obj[name] = formattedDate;
      setObj(obj)
    }}/>
  )
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function Produto({product}) {
  return (
    <Card className="w-65 h-80 m-2" href={`/produto/${product["id"]}`}>
      <div className="flex justify-center">
        <img src={storage(`/product/${product["id"]}`)} className="w-50 h-50" />
      </div>
      <div>
        <p>{product.name}</p>
        <RatingComp rate={product.rating} total={5}/>
        <Price product={product}/>
      </div>
    </Card>
  )
}
