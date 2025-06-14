
import { money } from '@Components/Format';

export default function Price({product}) {
  if (product?.promotion) {
    const discount = product.price * (1 - product.promotion.discountPercentage);
    return (
      <p>
        <span className="text-xl font-bold text-green-600">{money(discount)}</span>
        <span className="text-md pl-2 line-through">{money(product.price)}</span>
      </p>
    )
  } else {
    return <p className="text-lg font-bold text-green-600">{money(product.price)}</p>
  }
}
