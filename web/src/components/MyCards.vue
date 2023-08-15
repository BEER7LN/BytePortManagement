<template>
  <div>
    <a-card
      class="mycard"
      v-for="card in cards"
      :title="card.title"
      :bordered="false"
      @click="selectCard(card)"
      style="
        width: 20%;
        display: inline-block;
        margin-left: 20%;
        margin-top: 5%;
        fill: #0871ff;
        text-align: center;
        border: 1px solid #e8e8e8;
      "
    >
      <svg
        class="homeicon"
        aria-hidden="true"
        style="width: 3em; height: 3em; text-align: center"
      >
        <use :xlink:href="card.image"></use>
      </svg>
    </a-card>
  </div>
</template>
<script>
export default {
  name: "MyCards",
  data() {
    return {
      cards: [
        { title: "新建接口", image: "#icon-interface", path: "" },
        { title: "从swagger文档导入", image: "#icon-interface", path: "" },
        { title: "快捷请求", image: "#icon-quick-request", path: "" },
        { title: "新建MarkDown", image: "#icon-markdown", path: "" },
      ],
    };
  },
  emits: ["response"],
  methods: {
    selectCard(card) {
      this.$emit("response", card.title);
    },
  },
  created() {
    this.$emit("response", "1");
  },
};
</script>
<style>
.mycard:hover {
  background-color: #dddddd;
  cursor: pointer;
}
</style>
