<template>
  <div class="searchBlock form-wrap">
    <form>
      <InputText id="name" type="text" v-model="value" placeholder="Поиск по названию" />
      <Button v-if="value.length > 0" type="button" @click="clearInput">
        <svg-icon name="cross.svg" />
      </Button>
      <Button v-else type="submit" severity="gray" :disabled="value.length == 0">
        <svg-icon name="search.svg" />
      </Button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');

const clearInput = () => {
  value.value = '';
};
</script>

<style lang="scss" scoped>
.searchBlock {
  width: 100%;
  max-width: 600px;
  position: relative;
  margin-top: 18px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: 992px) {
    margin-top: 48px;
  }
  input {
    font-size: 16px;
    padding-top: 17.6px;
    padding-bottom: 17.6px;
    padding-right: 60px;
  }
  button {
    position: absolute;
    top: 50%;
    right: 8px;
    width: auto;
    padding: 10px;
    width: 44px;
    height: 44px;
    transform: translateY(-50%);
    border-radius: 10px;
  }
}
</style>
