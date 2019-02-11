<template>
  <v-container fluid grid-list-md>
<v-layout row wrap>
  <v-flex xs12 sm6 md4>
    <v-select 
      v-model="num_pr" 
      :items="products" 
      item-text="product" 
      item-value="code"
      label="Направление"
    />
  </v-flex>
  <v-flex xs12 sm6 md4>
    <v-select 
      v-model="product" 
      :items="get_products" 
      item-text="product" 
      item-value="code"
      label="Программа"
    />
  </v-flex>
</v-layout>
    <v-layout row wrap>
      <!-- **************фио категория***********************-->
      <v-flex xs12 sm6 md4><v-text-field label="ФИО"/></v-flex>
      <v-flex xs12 sm6 md2>
        <v-select
          v-model="category"
          :items="items"
          item-text="cat_name"
          item-value="cat_id"
          label="Категория клиента"
        />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <!-- **************доходы расходы ***********************-->
      <v-flex xs6 md2>
        <v-subheader class="pl-0">Доходы</v-subheader>
        <v-text-field v-model="income" type="number"/>
      </v-flex>
      <v-flex xs6 md2>
        <v-subheader class="pl-0">Обязательства</v-subheader>
        <v-text-field v-model="outcome" type="number"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <!-- **************дисконты***********************-->      
        <v-flex xs12 sm4 md2>
          <v-switch :label="`ЗП проект`" v-model="switch_disc"/>
        </v-flex>
        <v-flex xs12 sm4 md2>
          <v-switch :label="`КДС`" v-model="switch_insr"/>
        </v-flex>
        <v-flex xs12 sm4 md2>
          <v-switch :label="`Обеспечение`" v-model="switch_obesp"/>
        </v-flex>
    </v-layout>
    <v-layout row wrap>     
        <!-- **************Срок сумма ставка***********************-->   
      <v-flex xs12 md3>
        <v-subheader class="pl-0">Срок</v-subheader>
        <v-slider
          v-model="srok"
          :max="84"
          thumb-label="always"
        />
      </v-flex>
      <!--  -->
      <v-flex xs6 md1>
        <v-subheader class="pl-0">Сумма</v-subheader>
        <v-text-field
          v-model.number="summa"          
          type="number"
        />
      </v-flex>
      <!--  -->
      <v-flex xs6 md1>
        <v-subheader class="pl-0">Ставка</v-subheader>
        <v-text-field
          v-model="std_rate"
        />
     </v-flex>
    </v-layout>
     
      <!-- **************Итоги***********************-->
    <v-flex xs12>
        <h3>Платеж: {{pmt(std_rate).toLocaleString()}} Руб</h3>
        <h3>Проценты: {{ profit.toLocaleString()}} Руб</h3>
    <v-btn color="info" @click = "add_var">Добавить</v-btn>
      </v-flex>
      <!-- таблица с вариантами -->
      <v-layout row wrap>
      <v-flex xs12 md7>
      <v-data-table :headers="headers" :items="vars" hide-actions>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.summa.toLocaleString() }}</td>
          <td class="text-xs-center">{{ props.item.srok }}</td>
          <td class="text-xs-center">{{ props.item.rate }}</td>
          <td class="text-xs-center">{{ props.item.pmt.toLocaleString() }}</td>
          <td class="text-xs-center">{{ props.item.proc.toLocaleString() }}</td>
          <td class="text-xs-center">{{ props.item.kds }}</td>
          <td class="text-xs-center">{{ props.item.obesp }}</td>
        </template>
      </v-data-table>
      </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import * as func from './functions.js';
import * as dec from './decision.js';
import * as dic from './dictionary.js';
export default {
  name: 'Potreb',
  data () {
    return {
      items: dic.category,
      // значения по-уморчанию
      category: 0, //категория клиента по умолчанию
      income:0,
      outcome:0,
      srok: 1,
      summa: 50000,
      switch_insr: false,
      switch_disc: false,
      switch_obesp: false,
      // блок предложений
      vars: [],
      rowsPerPageItems: [16, 24, 32],
      pagination: {
        rowsPerPage: 16
      },
      headers: [
        { text: 'Сумма', value: 'summa', align: 'left'},
        { text: 'Срок, мес', value: 'srok',align: 'center'},
        { text: 'Ставка', value: 'rate',align: 'center'},
        { text: 'Платеж, руб', value: 'pmt',align: 'center'},
        { text: 'Проценты', value: 'proc',align: 'center'},
        { text: 'КДС', value: 'kds',align: 'center'},
        { text: 'Обеспечение', value: 'obesp',align: 'center'}
      ],
      // продукты
      products:dic.products,
      num_pr:'1',
      product:''   
    }
  },
    methods: {
    // добавить в предложение
      add_var () {
        this.vars.push({
             rate:this.std_rate
            ,pmt:func.calc_pmt(this.std_rate,this.summa,this.srok)
            ,kds: func.decode_boolean(this.switch_insr)
            ,obesp: func.decode_boolean(this.switch_obesp)
            ,proc:this.profit
            ,srok:this.srok
            ,summa:this.summa
        })  
      }
    },
    // -------------Показы----------------
    computed: {
      // продукты из выбранного направления
      get_products () {
        let res = this.products.find((el) =>
          el.code == this.num_pr
        )
        return res.options
      },
      std_rate: function () {
        let req =  {
          cat_id: this.category,
          term: this.srok,
          amount: this.summa,
          obesp: this.switch_obesp,
          insr: this.switch_insr,
          zp: this.switch_disc,
          num_pr: this.num_pr,
          product: this.product
        }
        return dec.get_rate(req)
      },
      // показ платежа
      pmt: function () {
          return (rate) => func.calc_pmt(rate,this.summa,this.srok)
      },
      // показ всех процентов
      profit: function () {
        return this.pmt(this.std_rate)*this.srok-this.summa
      },  
    },
    created() {}
}
</script>

<style>
@media print {
    /* здесь будут стили для печати */
    body {
      /* display: none; */
    }
}
</style>