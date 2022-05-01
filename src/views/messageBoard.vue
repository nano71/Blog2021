<template>
  <div id="messageBoard">
    <v-card
        id="messageList"
        class="mx-auto rounded-lg-no pa-3 pa-sm-4 pa-md-4 pb-0 pb-sm-0 pb-md-0"
        elevation="0"
    >
      <div class="d-flex align-center">
        <div class="v-heading text-h5 text--accent-4 teal--text font-weight-light me-3">
          留言板
        </div>
        请在此留言.
      </div>

    </v-card>
  </div>
</template>

<script>
export default {
  name: "messageBoard",
  data() {
    return {}
  },
  created() {

  },
  methods: {
    request() {

    }
  }
}
</script>

<style scoped lang="less">
#messageList {
  min-height: 800px;
}
</style>
