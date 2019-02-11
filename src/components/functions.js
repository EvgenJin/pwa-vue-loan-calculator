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

export function get_rate (cat_id,srok,obesp) {
  let result = 0
if (obesp == false) {
  // по всем срок до 1 года у всех 9.99
if (srok <= 12) {result = 9.99}
  // газпром
  else if (cat_id == 3 && (srok > 12 && srok <= 60)) {result = 11.4}
  else if (cat_id == 3 && (srok > 60 && srok <= 84)) {result = 14.25}
  // приоритет
  else if (cat_id == 82 && (srok > 12 && srok <= 60)) {result = 11.4}
  else if (cat_id == 82 && (srok > 60 && srok <= 84)) {result = 14.25}
  //  розница
  else if (cat_id == 2 && (srok > 12 && srok <= 60)) {result = 11.9}
  else if (cat_id == 2 && (srok > 60 && srok <= 84)) {result = 14.25}
  // прочие
  else if (cat_id == 0 && (srok > 12 && srok <= 60)) {result = 12.4}
}
else if (obesp == true) {
// по всем срок до 1 года у всех 9.99
if (srok <= 24) {result = 11.4}
  // по всем до 2 лет 11.4
  else if (srok > 24 && srok <= 60) {result = 11.4}
  // по всем от 5 до 7 лет 13.75
  else if (cat_id !== 0 && srok > 60 && srok <= 84) {result = 13.75}
}
  return result
}

export function decode_boolean (vars) {
  let res
  if (vars == true) {res = 'Да'}
  else {res = 'Нет'}
  return res
}