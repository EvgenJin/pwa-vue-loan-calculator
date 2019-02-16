<template>
  <div id="app">
    <!-- <header>
      <span>Vue.js PWA</span>
    </header> -->
    <!-- <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
    </main> -->
  <v-app>
    <!-- <v-navigation-drawer app></v-navigation-drawer> -->
    <v-toolbar app>Credit Calculator</v-toolbar>
    <v-content>
      <!-- <v-container fluid> -->
        <potreb></potreb>
        <!-- <router-view></router-view> -->
      <!-- </v-container> -->
    </v-content>
    <v-footer app>EvgenJin</v-footer>
  </v-app>    
  </div>
</template>

<script>
import Potreb from './components/Potreb'
export default {
  name: 'app',
  components: {
    Potreb
  }
}
</script>

<style>
@media print {
    .v-toolbar, .v-footer {
        display: none
    }
    body {
      /* zoom:75%; */
      width: 210mm;
      height: 297mm;
      margin: 0;
	    /* margin-top: 2cm; */
	    /* margin-right: 2cm; */
	    /* margin-bottom: 1.5cm; */
	    /* margin-left: 2cm; */
      box-shadow: 0;
    }
}
</style>