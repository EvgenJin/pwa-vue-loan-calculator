export let category = [
  { cat_name: 'Группа Газпром', cat_id: 3 },
  { cat_name: 'Приоритет', cat_id: 82 },
  { cat_name: 'Розница', cat_id: 2 },
  { cat_name: 'Прочие ФЛ', cat_id: 0},
]

export let products = [
  {product:"Ипотека", code: '1', options:[
     {product:'Стандарт', code: '04.01.00'}
    ,{product:'Премиальный стандарт', code: '04.01.01'}
  ]},
  {product:"Потребительский", code: '3', options:[
     {product:'Стандарт',code: '01.01.00'}
    ,{product:'Рефинансирование', code: '01.01.01'}
    ,{product:'Корпоративное', code: '01.01.02'}
  ]}
]