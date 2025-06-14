
import { formatValue } from 'react-currency-input-field';

export function money(v) {
  return formatValue({
    value: String(v),
    groupSeparator: '',
    decimalSeparator: ',',
    decimalScale: 2,
    prefix: 'R$ ',
  });
}
