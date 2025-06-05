
import { money } from '@Components/Format';
import { Card } from "flowbite-react";
import Template from '../../Layouts/Template';
import { useEffect, useState } from 'react';
import api, {getProducts} from '@Controllers/api';
import storage from '@Controllers/storage';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(null);
  useEffect(() => {
    if (products.length == 0) {
      getProducts().then((data) => {
        const categoriasSet = new Set();
        console.log(data)
        for (const product of data) {
          categoriasSet.add(product.category);
        }
        setProducts(data);
        setCategorias(Array.from(categoriasSet));
      });
    }
  }, [products]);
  return (
    <Template>
      <div>
        <Categoria categorias={categorias} categoria={categoria} setCategoria={setCategoria}/>
      </div>
      <div className="w-3/4">
        <div className="flex flex-row flex-wrap px-5">
          {
            products
              .filter(p => p.category === categoria || !categoria)
              .map((p, i) => 
                <Card key={i} className="w-70 h-80 m-2" href={`/produto/${p["id"]}`}>
                  <div>
                    <img src={storage(`/product/${p["id"]}`)} className="w-55 h-55" />
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>{p.name}</p>
                    <p>{money(p.price)}</p>
                  </div>
                </Card>
              )
          }
        </div>
      </div>
    </Template>
  )
}

function Categoria({categorias, categoria, setCategoria}) {
  return (
    <div className="inset-y-0 left-0 pr-10">
      <p className="text-lg font-bold">Categorias:</p>
      {
        categorias.map((c, i) => 
          (c == categoria) ? 
            <a className="text-lg block font-bold" key={i} onClick={e => setCategoria(null)}>{c}</a>
            :
            <a className="text-lg block" key={i} onClick={e => setCategoria(e.target.text)}>{c}</a>
        )
      }
    </div>
  )
}

