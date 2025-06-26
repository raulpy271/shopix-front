
import {useState, useEffect} from 'react';
import { Label, TextInput, Textarea, Button, FileInput, Badge } from "flowbite-react";
import Template from '@Layouts/Template';
import { toast } from 'react-toastify';
import { createProduct, storagePost } from '@Controllers/api';

export default function CadastroProduto() {
  const [product, setProduct] = useState({"vars": []});
  const handleChange = e => {
    if (e.target.type == "number") {
      product[e.target.name] = Number(e.target.value);
    } else {
      product[e.target.name] = e.target.value;
    }
    setProduct(product);

  };
  const handleSubmit = async () => {
    const productRes = await createProduct(product);
    const files = document.querySelector('input#file').files;
    const envios = Array(files.length).fill(0).map((f, i) => {
      const form = new FormData();
      form.append("resource_id", productRes["id"]);
      form.append("override", false);
      form.append("file", files[i]);
      return storagePost.post('/upload/product', form);
    });
    await Promise.all(envios);
    toast("Produto criado com sucesso!");
    setProduct(productRes);
  };
  return (
    <div>
      <Template>
        <div className="flex flex-col justify-center align-center gap-5">
          <h2 className="text-lg font-bold">Cadastre seu produto na Shopix</h2>
          <form className="flex w-md flex-col justify-center gap-2">
            <div>
              <Label className="text-black dark:text-black">Nome do produto:</Label>
              <TextInput name="name" onChange={handleChange}/>
            </div>
            <div>
              <Label className="text-black dark:text-black">Marca do produto:</Label>
              <TextInput name="brand" onChange={handleChange}/>
            </div>
            <div>
              <Label className="text-black dark:text-black">Categoria do produto:</Label>
              <TextInput name="category" onChange={handleChange}/>
            </div>
            <div>
              <Label className="text-black dark:text-black">Preço:</Label>
              <TextInput name="price" type="number" onChange={handleChange}/>
            </div>
              <Label className="text-black dark:text-black">Imagens do produto:</Label>
              <FileInput id="file" name="file" multiple/>
            <div>
            </div>
          </form>
          <div>
            <h2 className="font-bold">Variações do produto</h2>
            <div className="pl-5">
              {
                product.vars.map((v, i) =>
                  <div key={i} className="flex flex-row flex-wrap gap-2 w-md py-2 text-sm">
                    <p> ℹ️  Variação #{i + 1} - Quantidade: {v.stock} </p>
                    {
                      Object.keys(v.options).map((k, oi) => <Badge key={oi} color="info"><span className="text-gray-800">{k}</span>: {v.options[k]}</Badge>)
                    }
                  </div>
                )
              }
            </div>
            <div className="flex flex-row">
              <Textarea id="textarea-product-var" className="w-3/5" placeholder="Atributos da variação...
Cor: Azul
Tamanho: P" required rows={3}/>
              <div className="flex flex-col gap-2 px-2">
                <div>
                  <Label className="text-black dark:text-black">Quantidade:</Label>
                  <TextInput id="qtd" name="qtd" type="number"/>
                </div>
                <Button onClick={(e) => {
                  const options = {};
                  const textarea = document.querySelector('#textarea-product-var');
                  const qtd = document.querySelector('input#qtd');
                  for (const line of textarea.value.split("\n")) {
                    const sep = line.split(":");
                    if (sep.length === 2) {
                      options[sep[0].trim()] = sep[1].trim();
                    }
                  }
                  const data = {
                    options,
                    stock: Number(qtd.value),
                  };
                  const vars = product.vars.concat(data);
                  setProduct({
                    ...product,
                    vars: vars,
                  });
                }}>
                  Adicionar variação
                </Button>
              </div>
            </div>
          </div>
          <Button onClick={handleSubmit}>Realizar Cadastro</Button>
        </div>
      </Template>
    </div>
  )
}
