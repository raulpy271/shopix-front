
import { money } from '@Components/Format';
import { Tooltip } from "flowbite-react";

export default function Price({product, details}) {
  if (product?.promotion) {
    const discount = product.price * (1 - product.promotion.discountPercentage);
    return (
        <div className="price">
          {
            details ? 
              <Tooltip
                placement="bottom"
                content={
                  <>
                    <p className="font-bold">{product.promotion.name}</p>
                    <br/>
                    <p>Desconto de {(product.promotion.discountPercentage * 100).toFixed(0)}%</p>
                    <p>Disponível até {product.promotion.endDate}</p>
                  </>
                }
              >
                <span className="block text-xl pr-2">🎁</span>
              </Tooltip>
            : null
          }
          <span className="text-xl font-bold text-green-600">{money(discount)}</span>
          <span className="text-md pl-2 line-through">{money(product.price)}</span>
        </div>
    )
  } else {
    return <p className="text-lg font-bold text-green-600">{money(product.price)}</p>
  }
}
