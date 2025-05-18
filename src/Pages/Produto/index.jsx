
import { useParams } from "react-router-dom";
import Template from '../../Layouts/Template';
import { useEffect, useState } from 'react';
import { Carousel, Avatar, List, ListItem } from "flowbite-react";
import api, {getProduct, getProductImages} from '@Controllers/api';
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
  return (
    <Template>
      <div className="w-3/4 relative inset-1/8 flex flex-wrap">
        <div className="px-5 h-80 w-80 sm:h-40 sm:w-40 xl:h-100 xl:w-100">
          <Carousel>
            {
              images.map(
                (image) => <img src={storage(`/product/${image}`)} />,
                images
              )
            }
          </Carousel>
        </div>
        <div className="px-5 w-1/3">
          <h1 className="py-2 text-2xl font-bold">{product?.name}</h1>
          <p>Categoria: {product?.category}</p>
          <p>Marca: {product?.brand}</p>
        </div>
        <div className="px-5">
          <Reviews/>
        </div>
      </div>
    </Template>
  )
}



export function Reviews() {
  return (
    <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      <ListItem className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-1.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Neil Sims</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-3.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Bonnie Green</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$3467</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-2.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Michael Gough</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$67</div>
        </div>
      </ListItem>
      <ListItem className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-5.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Thomas Lean</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$2367</div>
        </div>
      </ListItem>
      <ListItem className="pb-0 pt-3 sm:pt-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Avatar img="/images/people/profile-picture-4.jpg" alt="Neil image" rounded size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Lana Byrd</p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@flowbite.com</p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$367</div>
        </div>
      </ListItem>
    </List>
  );
}
 
