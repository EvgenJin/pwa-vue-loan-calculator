<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg6><v-text-field background-color="blue" label="ФИО" outline/></v-flex>
    </v-layout>  
    <v-layout row wrap>
      <!-- ************** направление программа ***********************-->
      <v-flex xs12 sm6 md3>
        <v-select
          v-model="num_pr" 
          :items="products" 
          item-text="product" 
          item-value="code"
          label="Направление"
          outline
          background-color="blue"
        />
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-select 
          v-model="product" 
          :items="get_products" 
          item-text="product" 
          item-value="code"
          label="Программа"
          outline
          background-color="blue"
        />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <!-- ************** доходы расходы ***********************-->
      <v-flex xs12 md2>
        <v-select
          v-model="category"
          :items="items"
          item-text="cat_name"
          item-value="cat_id"
          label="Категория клиента"
          outline
          background-color="blue"
        />
      </v-flex>      
      <v-flex xs6 md2>
          <v-text-field label="Доходы" outline
            v-model="income"
            background-color="blue"
          ></v-text-field>
      </v-flex>
      <v-flex xs6 md2>
          <v-text-field
            label="Обязательства"
            outline
            background-color="blue"
            v-model="outcome"
          ></v-text-field>
          <!-- placeholder="кредиты, алименты" -->
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <!-- ************** дисконты ***********************-->      
        <v-flex xs12 sm4 md2>
          <v-switch label="ЗП проект" color="info" v-model="switch_disc"/>
        </v-flex>
        <v-flex xs12 sm4 md2>
          <v-switch label="КДС" color="red" v-model="switch_insr"/>
        </v-flex>
        <v-flex xs12 sm4 md2>
          <v-switch label="Обеспечение"   color="success" v-model="switch_obesp"/>
        </v-flex>
    </v-layout>
    <v-layout row wrap>     
        <!-- ************** Срок сумма ставка ***********************-->   
      <v-flex xs12 md4>
        <!-- <v-subheader class="pl-0">Срок</v-subheader> -->
        <v-slider
          v-model="srok"
          :max="max_srok"
          :min="min_srok"
          thumb-label="always"
          label="Срок"
          hint= "месяцев"
          persistent-hint
        />
      </v-flex>
      <!--  -->
      <v-flex xs12 md2>
        <!-- <v-subheader class="pl-0">Сумма</v-subheader> -->
        <v-text-field
          v-model= summa
          label="Сумма"
          outline
          background-color="blue"
        />
      </v-flex>
    </v-layout>
    <v-layout>
      <p> {{ srok_year + ' Лет' }} </p>
    </v-layout>  
    <v-layout row wrap>
      <v-flex xs12 sm6 md1>
        <v-text-field
          label="Годовая ставка"
          v-model="std_rate"
          outline
          readonly
          background-color="blue darken-4"
        />
     </v-flex>
      <v-flex xs12 sm6 md2>
        <v-text-field
          label="Ежемесячный платеж"
          v-model="pmt(std_rate).toLocaleString()"
          outline
          readonly
          background-color="blue darken-4"
        />
     </v-flex>
      <v-flex xs12 sm6 md2>
        <v-text-field
          label="Проценты/переплата"
          v-model="profit.toLocaleString()"
          outline
          readonly
          background-color="blue darken-4"
        />
     </v-flex>
     <!-- <v-flex xs6 md1> -->
      <v-btn large color="info" @click = "add_var"><v-icon>add_shopping_cart</v-icon></v-btn>
     <!-- </v-flex> -->
    
    <!-- <v-flex offset-xs2> -->
      <v-btn offset-xs2 large color="red" @click = "del_var"><v-icon>delete_forever</v-icon></v-btn>
    <!-- </v-flex> -->
    </v-layout>
      <!--////////////////////////// таблица с вариантами /////////////////////////////-->
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
          <td class="text-xs-center">{{ props.item.product }}</td>
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
      category: 3, //категория клиента по умолчанию
      income:0,
      outcome:0,
      srok: 1,
      summa: 500000,
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
        { text: 'Сумма', value: 'summa', align: 'center'},
        { text: 'Срок, мес', value: 'srok',align: 'center'},
        { text: 'Ставка', value: 'rate',align: 'center'},
        { text: 'Платеж, руб', value: 'pmt',align: 'center'},
        { text: 'Проценты', value: 'proc',align: 'center'},
        { text: 'КДС', value: 'kds',align: 'center'},
        { text: 'Обеспечение', value: 'obesp',align: 'center'},
        { text: 'Продукт', value: 'product',align: 'center'}        
      ],
      // продукты
      products:dic.products,
      num_pr:'3',
      product:'',
      // сроки
      min_srok:1,
      max_srok:360
    }
  },
    methods: {
    // добавить в предложение
      add_var () {
        this.vars.push({
             rate:this.std_rate
            ,pmt:this.pmt(this.std_rate).toLocaleString()
            ,kds: func.decode_boolean(this.switch_insr)
            ,obesp: func.decode_boolean(this.switch_obesp)
            ,proc:this.profit
            ,srok:this.srok
            ,summa:this.summa
            ,product:this.product
        })
      },
      del_var () {
        this.vars = []
      }      
    },
    // -------------вычисляемые свойства----------------
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
        let res = dec.get_rate(req)
        this.min_srok = res.srokmin
        this.max_srok = res.srokmax
        console.log(res)
        return res.rate
      },
        displayValue: {
            get: function(value) {return value.toLocaleString()},
            set: function() {return 150}
        },          
      // показ платежа
      pmt: function () {
          return (rate) => func.calc_pmt(rate,this.summa,this.srok) + this.get_sum_com
      },
      // показ всех процентов
      profit: function () {
        return this.pmt(this.std_rate)*this.srok-this.summa
      },
      get_sum_com () {
        if (this.num_pr == '3' && (this.switch_insr) ) {
            return this.summa*0.00192
          }
        else {return 0}  
      },
      srok_year () {
        return (this.srok/12).toFixed()
      }
    },
    created() {
      
    }
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