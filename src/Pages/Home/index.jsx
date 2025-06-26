
import Price from '@Components/Price';
import RatingComp from '@Components/Rating';
import { Card, TextInput } from "flowbite-react";
import Template from '../../Layouts/Template';
import { useEffect, useState } from 'react';
import api, {getProducts, getPromotions} from '@Controllers/api';
import storage from '@Controllers/storage';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [marca, setMarca] = useState(null);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    if (products.length == 0) {
      getProducts().then((data) => {
        const marcasSet = new Set();
        const categoriasSet = new Set();
        for (const product of data) {
          categoriasSet.add(product.category);
          marcasSet.add(product.brand);
        }
        setProducts(data);
        setCategorias(Array.from(categoriasSet));
        setMarcas(Array.from(marcasSet));
        return data;
      }).then((productsData) => {
        getPromotions().then((data) => {
          const promotionsIdx = {};
          for (const prom of data) {
            promotionsIdx[prom.product_id] = prom;
          }
          const newProducts = []
          console.log(promotionsIdx)
          for (const product of productsData) {
            product.promotion = promotionsIdx[product.id];
            if (promotionsIdx[product.id]) {
              newProducts.push({
                ...product,
                promotion: promotionsIdx[product.id]
              });
            } else {
              newProducts.push(product);
            }
          }
          console.log(productsData);
          setProducts(productsData);
        });
      });
    }
  }, [products]);
  return (
    <Template>
      <div>
        <Filtros categorias={categorias} categoria={categoria} setCategoria={setCategoria} marcas={marcas} marca={marca} setMarca={setMarca} setSearch={setSearch}/>
      </div>
      <div className="w-3/4">
        <div className="flex flex-row flex-wrap px-5">
          {
            products
              .filter(p => p.category === categoria || !categoria)
              .filter(p => p.brand === marca || !marca)
              .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
              .map((p, i) => 
                <Card key={i} className="w-65 h-80 m-2" href={`/produto/${p["id"]}`}>
                  <div className="flex justify-center">
                    <img src={storage(`/product/${p["id"]}`)} className="w-50 h-50" />
                  </div>
                  <div>
                    <p>{p.name}</p>
                    <RatingComp rate={p.rating} total={5}/>
                    <Price product={p}/>
                  </div>
                </Card>
              )
          }
        </div>
      </div>
    </Template>
  )
}

function Filtros({categorias, categoria, setCategoria, marcas, marca, setMarca, setSearch}) {
  return (
    <div className="inset-y-0 left-0 pr-10 flex flex-col gap-5">
      <div>
        <p className="text-lg font-bold">Busca:</p>
        <TextInput name="busca" onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div>
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
      <div>
        <p className="text-lg font-bold">Marcas:</p>
        {
          marcas.map((m, i) => 
            (m == marca) ? 
              <a className="text-lg block font-bold" key={i} onClick={e => setMarca(null)}>{m}</a>
              :
              <a className="text-lg block" key={i} onClick={e => setMarca(e.target.text)}>{m}</a>
          )
        }
      </div>
    </div>
  )
}

