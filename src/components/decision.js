export let base = [
  // потребы
  {cat_id:[3], srokmin:1,  srokmax:24, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 12},
  {cat_id:[3], srokmin:25, srokmax:59, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 13},
  {cat_id:[3], srokmin:60, srokmax:84, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 14},
  {cat_id:[2], srokmin:1,  srokmax:24, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 12},
  {cat_id:[2], srokmin:25, srokmax:59, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 13},
  {cat_id:[2], srokmin:60, srokmax:84, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 14},
  {cat_id:[82], srokmin:1,  srokmax:24, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 12},
  {cat_id:[82], srokmin:25, srokmax:59, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 13},
  {cat_id:[82], srokmin:60, srokmax:84, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 14},
  {cat_id:[0], srokmin:1,  srokmax:24, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 12},
  {cat_id:[0], srokmin:25, srokmax:59, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 13},
  {cat_id:[0], srokmin:60, srokmax:84, sum_min:50000, sum_max: 5000000, product: ['03.03.01'], insr_incr: 3, zp_incr:1, rate: 14},
  // рефинансирование
  {cat_id:[3], srokmin:1,  srokmax:24, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 12},
  {cat_id:[3], srokmin:25, srokmax:59, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 13},
  {cat_id:[3], srokmin:60, srokmax:84, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 14},
  {cat_id:[2], srokmin:1,  srokmax:24, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 12},
  {cat_id:[2], srokmin:25, srokmax:59, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 13},
  {cat_id:[2], srokmin:60, srokmax:84, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 14},
  {cat_id:[82], srokmin:1,  srokmax:24, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 12},
  {cat_id:[82], srokmin:25, srokmax:59, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 13},
  {cat_id:[82], srokmin:60, srokmax:84, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 14},
  {cat_id:[0], srokmin:1,  srokmax:24, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 12},
  {cat_id:[0], srokmin:25, srokmax:59, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 13},
  {cat_id:[0], srokmin:60, srokmax:84, sum_min:50000, sum_max: 5000000, product: ['03.03.02'], insr_incr: 3, zp_incr:1, rate: 14},  
]

export function get_rate(req) {
  let insr = 0
  , zp = 0
  , obsp = 0
  let res = base.filter((el) =>
    el.cat_id.includes(req.cat_id)
    && req.term >= el.srokmin && req.term <= el.srokmax    
    && req.amount >= el.sum_min && req.amount <= el.sum_max
    && (el.obesp == null||req.obesp == el.obesp)
    && el.product.includes(req.product) 
    && (el.num_pr == null||el.num_pr.includes(req.num_pr))
  //   // moment(req.date, 'DD.MM.YYYY', true).isBetween(moment(el.dstart, 'DD.MM.YYYY', true), moment(el.dend, 'DD.MM.YYYY', true), 'days', '[]')
  );
    // беру только первое вхождение
  let obj = res[0]
  // если решение не нашлось = 0
  if (!obj) {
    return 0
  }
  if (!req.insr) {insr = obj.insr_incr}
  if (!req.zp)   {zp = obj.zp_incr}
  // if (req.ask_kds) {obj.kds_disc = 0} else {obj.kds_disc = obj.kds_rate}
  // if (req.ask_zp) {obj.zp_disc = 0} else {obj.zp_disc = obj.zp_rate}
  // console.log(obj.rate)
  return obj.rate + insr + zp
  // + obj.kds_disc + obj.zp_disc
}