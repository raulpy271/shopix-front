
import { Rating, RatingStar } from "flowbite-react";

export default function RatingComp({rate, total}) {
  const stars = [];
  if (total) {
    total = 5;
  }
  if (rate > total) {
    throw new Error("Invalid rating");
  }
  for (let i = 0; i < total; i++) {
    if (i < rate) {
      stars.push(<RatingStar key={i}/>)
    } else {
      stars.push(<RatingStar key={i} filled={false}/>)
    }
  }
  return (
    <Rating>
      {stars}
    </Rating>
  )
}

