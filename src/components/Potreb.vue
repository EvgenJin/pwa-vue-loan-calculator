<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs9>
        <v-text-field
        label="ФИО"
        />
      </v-flex>
      <v-flex xs3>
        <v-select
          v-model="category"
          :items="items"
          item-text="cat_name"
          item-value="cat_id"
          label="Категория клиента"
        />
      </v-flex>
      <!-- **************доходы расходы ***********************-->
      <v-flex xs6>
        <v-subheader class="pl-0">Доходы</v-subheader>
        <v-text-field v-model="income" type="number"/>
      </v-flex>
      <v-flex xs6>
        <v-subheader class="pl-0">Обязательства</v-subheader>
        <v-text-field v-model="outcome" type="number"/>
      </v-flex>
      <!-- **************дисконты***********************-->      
      <v-flex xs12>
        <v-layout row wrap>
        <!-- ${switch1.toString()} -->
        <v-flex xs12 sm4 md4 lg2>
        <v-switch
          :label="`ЗП проект`"
          v-model="switch_disc"
        />
        </v-flex>

        <v-flex xs12 sm4 md4 lg2>
        <v-switch
          :label="`КДС`"
          v-model="switch_insr"
        />
        </v-flex>

        <v-flex xs12 sm4 md4 lg2>
        <v-switch
          :label="`Обеспечение`"
          v-model="switch_obesp"
        />
        </v-flex>

        </v-layout>
      </v-flex>
     <!-- Срок сумма ставка -->
     </v-flex>
      <v-flex xs6>
        <v-subheader class="pl-0">Срок</v-subheader>
        <v-slider
          v-model="srok"
          :max="84"
          thumb-label="always"
        />
      </v-flex>
      <!--  -->
      <v-flex xs3>        
        <v-subheader class="pl-0">Сумма</v-subheader>
        <v-text-field
          v-model="summa"          
          type="number"
        />
      </v-flex>
      <!--  -->
      <v-flex xs3>
        <v-subheader class="pl-0">Ставка</v-subheader>
        <v-text-field
          v-model="std_rate"
        />
     </v-flex>       
      <!-- итоги -->
      <v-flex xs12>
        <h3>Платеж: {{pmt(std_rate).toLocaleString()}} Руб</h3>
        <h3>Проценты: {{ profit.toLocaleString()}} Руб</h3>
      <v-btn fab dark color="indigo" @click = "add_var">
        <v-icon dark>add</v-icon>
      </v-btn>        
      </v-flex>
      <!-- таблица с вариантами -->
      <v-data-table
        :headers="headers"
        :items="vars"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.summa.toLocaleString() }}</td>
          <td class="text-xs-right">{{ props.item.srok }}</td>
          <td class="text-xs-right">{{ props.item.rate }}</td>
          <td class="text-xs-right">{{ props.item.pmt.toLocaleString() }}</td>
          <td class="text-xs-right">{{ props.item.proc.toLocaleString() }}</td>
          <td class="text-xs-right">{{ props.item.kds }}</td>
          <td class="text-xs-right">{{ props.item.obesp }}</td>
        </template>
      </v-data-table>      
    <v-flex>
    </v-flex>   

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Potreb',
  data () {
    return {
      category: 0,
        items: [
          { cat_name: 'Группа Газпром', cat_id: 3 },
          { cat_name: 'Приоритет', cat_id: 82 },
          { cat_name: 'Розница', cat_id: 2 },
          { cat_name: 'Прочие ФЛ', cat_id: 0},
        ],
      income:40000,
      outcome:5000,
      srok: 36,
      summa: 50000,
      switch_insr: true,
      switch_disc: true,     
      switch_obesp: false,
      vars: [],
      rowsPerPageItems: [16, 24, 32],
      pagination: {
        rowsPerPage: 16
      },
      headers: [
        { text: 'Сумма',align: 'left',value: 'summa'},
        { text: 'Срок, мес', value: 'srok' },
        { text: 'Ставка', value: 'fat' },
        { text: 'Платеж, руб', value: 'carbs' },
        { text: 'Проценты', value: 'protein' },
        { text: 'КДС', value: 'iron' },
        { text: 'Обеспечение', value: 'iron' }
      ],
    }
  },
    methods: {
    get_rate (cat_id,srok,obesp) {
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
    },
    calc_pmt (rate,summa,srok) {     
      rate = rate / 1200
      srok = srok
      let pow = Math.pow((1+rate),-srok)
      let res = Math.round(summa * rate / (1-pow))
        if (this.switch_insr) {res = res+summa*0.00192}
          return res
    },
    decode_boolean (vars) {
      let res
      if (vars == true) {res = 'Да'}
      else {res = 'Нет'}
      return res
    },
    add_var () {
      this.vars.push({
            rate:this.std_rate
           ,pmt:this.calc_pmt(this.std_rate,this.summa,this.srok)
           ,kds: this.decode_boolean(this.switch_insr)
           ,obesp: this.decode_boolean(this.switch_obesp)
           ,proc:this.profit
           ,srok:this.srok
           ,summa:this.summa
      })      
    },        
    },
    // -------------Показы----------------
    computed: {
      // показ ставки
      std_rate: function () {
      let sum_disc = 0
      if (!this.switch_insr) {sum_disc = sum_disc + 3}
      if (!this.switch_disc) {sum_disc = sum_disc + 1}           
        return this.get_rate(this.category,this.srok,this.switch_obesp) + sum_disc
        
      },
      // показ платежа
      pmt: function () {
          return (rate) => this.calc_pmt(rate,this.summa,this.srok)
      },
      // показ всех процентов
      profit: function () {
        return this.pmt(this.std_rate)*this.srok-this.summa
      },      
    },

    created () {
        
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