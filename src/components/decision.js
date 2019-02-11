export let base = [
  {cat_id:[3,82,2,0], srokmin:0, srokmax:36, sum_min:50000, sum_max: 5000000, rate: 10.99, obesp: true, num_pr: ['1','3'], product: ['01.01.01']}
]

export function get_rate(req) {
  let res = base.filter((el) =>
    el.cat_id.includes(req.cat_id)
    && req.term >= el.srokmin && req.term <= el.srokmax    
    && req.amount >= el.sum_min && req.amount <= el.sum_max
    && req.obesp == el.obesp
    && el.product.includes(req.product) && el.num_pr.includes(req.num_pr)
  //   // moment(req.date, 'DD.MM.YYYY', true).isBetween(moment(el.dstart, 'DD.MM.YYYY', true), moment(el.dend, 'DD.MM.YYYY', true), 'days', '[]')
  );
    // беру только первое вхождение
  let obj = res[0]
  // если решение не нашлось = 0
  if (!obj) {
    return 0
  }
  // if (req.insr) {obj.kds_disc = 0} else {obj.kds_disc = 3}
  // if (req.ask_kds) {obj.kds_disc = 0} else {obj.kds_disc = obj.kds_rate}
  // if (req.ask_zp) {obj.zp_disc = 0} else {obj.zp_disc = obj.zp_rate}
  // console.log(obj.rate)
  return obj.rate
  // + obj.kds_disc + obj.zp_disc
}