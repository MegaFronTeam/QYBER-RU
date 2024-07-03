<template>
  <div>
    <CabinetProfileHead>
      <h1 :class="true == true ? 'verifired' : ''">123123</h1>
      <span class="sProfileHead__name">name</span>
      <div class="sProfileHead__status online">Онлайн</div>
      <div class="sProfileHead__time">На сайте с 10.10.10</div>

      <div class="row">
        <div class="col-auto">
          <Badge severity="secondary" value="QYBER Атланты" class="p-badge-outline" />
        </div>
        <div class="col-auto">
          <Badge severity="danger" value="QYBER Таланты" class="p-badge-outline" />
        </div>
      </div>
    </CabinetProfileHead>
    <!-- TODO: Сделать внутрений компонент "Команда игрока" -->
    <CabinetMyProfileBlock />
  </div>
</template>

<script setup lang="ts">
import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

const breadcrumbsStore = useBreadcrumbsStore();

onMounted(() => {
  breadcrumbsStore.setNameFromIds('123w/12');
});
</script>
