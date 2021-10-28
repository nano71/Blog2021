/** * Created with IntelliJ IDEA. * @Author: Liang-Hao * @Date: 2021/05/21/9:00
*/
<template>
  <v-app>
    <v-main class="white">
      <v-row class="text-center" style="margin-top: 40vh">
        <v-col>
          <h1 class="font-weight-light primary--text">
            <span>Whoops, 404 </span>
          </h1>
          <p>The page you were looking for does not exist</p>
          <v-btn elevation="0" outlined class="primary--text" @click="back">
            Get me out of here!
          </v-btn>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Notfound",
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped></style>
