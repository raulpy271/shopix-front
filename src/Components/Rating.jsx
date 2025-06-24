
import { useState } from 'react';
import { Rating, RatingStar } from "flowbite-react";

export default function RatingComp({rate, total}) {
  const stars = [];
  if (total) {
    total = 5;
  }
  if (!Number.isInteger(rate)) {
    rate = Math.round(rate);
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

export function RatingInput({selected, setSelected, total}) {
  const stars = [];
  if (total) {
    total = 5;
  }
  for (let i = 0; i < total; i++) {
    stars.push(<RatingStar key={i} filled={i < selected} onClick={e => (i + 1) == selected ? setSelected(0) : setSelected(i + 1)}/>)
  }
  return (
    <Rating>
      {stars}
    </Rating>
  )
}

