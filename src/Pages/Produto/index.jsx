
import { useParams } from "react-router-dom";
import Template from '../../Layouts/Template';
import Price from '@Components/Price';
import RatingComp from '@Components/Rating';
import { useEffect, useState } from 'react';
import { Carousel, Avatar, List, ListItem, Rating, RatingStar, Select } from "flowbite-react";
import api, {getProduct, getProductImages, getProductReviews, getProductPromotions} from '@Controllers/api';
import storage from '@Controllers/storage';

export default function Produto() {
  const params = useParams();
  const product_id = params.id;
  const [product, setProduct] = useState(null);
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
  return (
    <Template>
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
          <div className="py-2">
            Seleciona e variação:
            <Select id="vars" required>
              {
                product?.vars?.map(v =>
                  <option key={v.id} id={v.id}>{Object.keys(v.options).map(key => key + ": " + v.options[key] + ".")}</option>
                )
              }
            </Select>
          </div>
          <div className="py-2">
            Seleciona a quantidade de itens:
            <Select id="qtd" required>
              {
                Array(product?.stock).fill(0, 0, product?.stock).map((v, i) => 
                  <option key={i + 1} id={i + 1}>{i + 1} produtos.</option>
                )
              }
            </Select>
          </div>
          <div>
            {
              product ? <Price product={product}/> : "R$ 00,00"
            }
          </div>
        </div>
        <div className="p-5 w-2/3">
          <h1 className="py-2 text-2xl font-bold">Reviews</h1>
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
              <div>{review.comment}</div>
            </ListItem>
          )
          :
          <p>Não há revisões</p>
      }
    </List>
  );
}
 
