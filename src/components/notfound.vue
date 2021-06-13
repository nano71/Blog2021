/**
* Created with IntelliJ IDEA.
* @Author: Liang-Hao
* @Date: 2021/05/21/9:00
*/
<template>
  <v-app>
    <v-main>
      <v-row class="text-center" style="margin-top: 40vh">
        <v-col>
            <h1 class="font-weight-light primary--text">
              <font>Whoops, 404 </font>
            </h1>
            <p>The page you were looking for does not exist</p>
            <a href="#/" class="v-btn v-btn--outlined v-btn--router theme--light v-size--default primary--text">
              <span class="v-btn__content"> Get me out of here! </span></a>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "notfound"
}
</script>

<style scoped>

</style>
