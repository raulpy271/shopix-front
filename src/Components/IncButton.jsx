
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Button, ButtonGroup } from "flowbite-react";

export default function IncButton({callback, startValue, valueId, min, max, decIcon, incIcon}) {
  const size = "sm";
  if (!Number.isInteger(min)) {
    min = - Infinity;
  }
  if (!Number.isInteger(max)) {
    max = Infinity;
  }
  if (!Number.isInteger(startValue)) {
    startValue = 0;
  }
  const [value, setValue] = useState(startValue);
  return (
    <ButtonGroup>
      <Button size={size} onClick={ () => {
        if (value > min) {
          setValue(value - 1);
          callback && callback(value, setValue, "SUB");
        } else {
          toast.error(`Não é possível decrementar a quantidade para ${value - 1}.`)
        }
      }}>{decIcon || "-"}</Button>
      <Button size={size} id={valueId || "IncButton"}>{value}</Button>
      <Button size={size} onClick={ () => {
        if (value < max) {
          setValue(value + 1);
          callback && callback(value, setValue, "ADD");
        } else {
          toast.error(`Não é possível aumentar a quantidade para ${value + 1}.`)
        }
      }}>{incIcon || "+"}</Button>
    </ButtonGroup>
  )
}
