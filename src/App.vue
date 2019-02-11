<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <!-- <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
    </main> -->
  <v-app>
    <!-- <v-navigation-drawer app></v-navigation-drawer> -->
    <v-toolbar app>Credit Calculator</v-toolbar>
    <v-content>
      <v-container fluid>
        <potreb></potreb>
        <!-- <router-view></router-view> -->
      </v-container>
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