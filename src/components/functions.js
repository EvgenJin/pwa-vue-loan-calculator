export function area(radius) {
  return radius*2
}

export function calc_pmt (rate,summa,srok) {
  rate = rate / 1200
  srok = srok
  let pow = Math.pow((1+rate),-srok)
  let res = Math.round(summa * rate / (1-pow))
    // if (this.switch_insr) {res = res+summa*0.00192}
      return res
}

export function decode_boolean (vars) {
  let res
  if (vars == true) {res = 'Да'}
  else {res = 'Нет'}
  return res
}