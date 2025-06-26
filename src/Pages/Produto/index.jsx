
import { useParams } from "react-router-dom";
import Template from '../../Layouts/Template';
import Price from '@Components/Price';
import RatingComp from '@Components/Rating';
import IncButton from '@Components/IncButton';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Carousel, Avatar, List, ListItem, Select, Button, Toast, ToastToggle } from "flowbite-react";
import api, {getProduct, getProductImages, getProductReviews, getProductPromotions, addCartItem} from '@Controllers/api';
import storage from '@Controllers/storage';

export default function Produto() {
  const params = useParams();
  const product_id = params.id;
  const [cart, setCart] = useState(null);
  const [product, setProduct] = useState(null);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (images.length == 0) {
      getProductImages(product_id).then((data) => {
        console.log(data)
        setImages(data);
      });
    }
  }, [images]);
  useEffect(() => {
    if (!product) {
      getProduct(product_id).then((data) => {
        console.log(data)
        setProduct(data);
        if (data?.vars?.length > 0) {
          setStock(data.vars[0].stock);
        }
      });
    }
  }, [product]);
  useEffect(() => {
    if (!product?.promotion) {
      getProductPromotions(product_id).then((data) => {
        setProduct({
          ...product,
          promotion: data
        });
      });
    }
  }, [product]);
  const handleSubmit = async (e) => {
    const qtd = document.querySelector('button#qtd');
    const vars = document.querySelector('select#vars');
    const data = {
      quantity: Number(qtd.textContent),
      product_variation_id: Number(vars.options[vars.selectedIndex].id),
      promotion_id: product?.promotion?.id,
    }
    data.subtotal = data.quantity * product.price * (product?.promotion ? (1 - product.promotion.discountPercentage) : 1);
    const cartRes = await addCartItem(data);
    setCart(cartRes);
    toast(' ✅ Item adicionado.');
  }
  return (
    <Template cart={cart} setCart={setCart}>
      <div className="w-3/4 relative flex flex-wrap justify-center">
        <div className="px-5 h-80 w-80 sm:h-40 sm:w-40 xl:h-100 xl:w-100">
          <Carousel>
            {
              images.map(
                (image) => <img src={storage(`/${image}`)} />,
                images
              )
            }
          </Carousel>
        </div>
        <div className="px-5 w-1/3">
          <h1 className="py-2 text-2xl font-bold">{product?.name}</h1>
          <p>Categoria: {product?.category}</p>
          <p>Marca: {product?.brand}</p>
          <p>Estoque: {stock}</p>
          <div className="py-2">
            Seleciona e variação:
            <Select
              id="vars"
              required
              onChange={e => {
                const pvar = product?.vars[e.target.selectedIndex];
                setStock(pvar.stock);
              }}
            >
              {
                product?.vars?.map((v, i) =>
                  <option key={i} id={v.id}>{Object.keys(v.options).map(key => key + ": " + v.options[key] + ". ")}</option>
                )
              }
            </Select>
          </div>
          <div className="py-2">
            Quantidade: <IncButton
                          valueId="qtd"
                          min={1}
                          max={stock}
                          startValue={1}
                        />
          </div>
          <div>
            {
              product ? <Price product={product} details/> : "R$ 00,00"
            }
          </div>
          <div className="py-2">
            {
              stock > 0 ?
                <Button onClick={handleSubmit}> 🛒 Adicionar</Button>
                : <Button disabled> Não há estoque disponível </Button>
            }
          </div>
        </div>
        <div className="p-5 w-2/3">
          <div className="py-5 flex flex-row gap-2 items-center">
            <h1 className="text-2xl pr-5 font-bold">Avaliações</h1>
            <RatingComp rate={product?.rating} total={5} size="md"/>
            <h1 className="text-lg font-bold text-gray-400 dark:text-gray-500">{product?.rating?.toFixed(2)} de 5</h1> 
          </div>
          <Reviews/>
        </div>
      </div>
    </Template>
  )
}

export function Reviews() {
  const params = useParams();
  const product_id = params.id;
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    if (!reviews) {
      getProductReviews(product_id).then((data) => {
        console.log(data)
        setReviews(data);
      });
    }
  }, [reviews]);
  return (
    <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      {
        reviews?.length > 0 ?
          reviews.map(review =>
            <ListItem className="pb-3 sm:pb-4" key={review.id}>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Avatar img={storage(`/user/${review?.user.id}`)} alt={review?.user.fullname} rounded size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-black">{review?.user.fullname}</p>
                  <p className="truncate text-sm text-gray-400 dark:text-gray-500">{review?.user.email}</p>
                </div>
                <RatingComp rate={review.rating} total={5}/>
              </div>
              <div>
                <p className="text-black">{review.comment}</p>
              </div>
            </ListItem>
          )
          :
          <p>Não há revisões</p>
      }
    </List>
  );
}
 
