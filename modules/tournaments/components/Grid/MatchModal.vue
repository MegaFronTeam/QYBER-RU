<template>
  <Button
    class="sGridCardItem__settings"
    type="button"
    @click="(settingsModalVisible = true), matchEditStore.setModalData(item)"
  >
    <svg-icon name="gear.svg" />
  </Button>
  <Dialog v-model:visible="settingsModalVisible" modal :header="'Игра ' + item.indexPlus">
    <div class="d-flex switch-wrap">
      <InputSwitch v-model="editMatch.checked" @change="tournamentPageStore.checkMatchStatus" />
      <span class="">В процессе</span>
    </div>
    <TabView>
      <TabPanel header="Настройки">
        <div class="form-wrap">
          <InputGroup>
            <label for="calendar">Начало игры (мск)</label>
            <div class="d-flex date-flex">
              <Calendar
                id="calendar"
                v-model="editMatch.date"
                showIcon
                iconDisplay="input"
                dateFormat="dd.mm.yy"
                placeholder="__.__.____"
                @date-select="tournamentPageStore.modifyDate"
              >
                <template #inputicon="{ clickCallback }">
                  <div @click="clickCallback" class="icon-wrap">
                    <svg-icon name="calendar.svg" />
                  </div>
                </template>
              </Calendar>
              <Calendar
                id="calendar-timeonly"
                v-model="editMatch.time"
                timeOnly
                placeholder="00:00"
                @date-select="tournamentPageStore.modifyDate"
              />
            </div>
          </InputGroup>
          <label for="discord">Сервер Discord</label>
          <InputGroup>
            <div class="input-icon-wrap">
              <InputGroupAddon>
                <svg-icon name="discord.svg" />
              </InputGroupAddon>
              <InputText
                id="discord"
                type="text"
                v-model="editMatch.discord"
                placeholder="Ссылка с https://"
              />
            </div>
          </InputGroup>
          <InputGroup>
            <label for="IP">Информация для подключения</label>
            <InputText id="IP" type="text" v-model="editMatch.server" placeholder="Лобби" />
          </InputGroup>
        </div>

        <Button @click="tournamentPageStore.postEditedMatch" class="btn-lg">Сохранить</Button>
      </TabPanel>
      <TabPanel header="Результаты">
        <div class="game-item__card game-item__card--center">
          <div class="">
            <div class="table-wrap game-item__title">
              <img
                v-if="item.a.command.post_thumbnail && item.a.command.post_thumbnail !== false"
                :src="item.a.command.post_thumbnail"
                alt="Avatar"
                class="team-img"
              />
              <span>{{ item.a.command.post_title }} </span> <span class="p-badge"> 3 453 </span>
            </div>
            <div class="table-wrap">
              <div class="game-item__list">
                <div class="secondary">Дисквалифицировать</div>
              </div>
            </div>
          </div>
          <InputNumber
            v-model="editMatch.counter_a"
            :min="0"
            :max="100"
            inputId="horizontal-buttons"
            showButtons
            buttonLayout="horizontal"
            :step="1.0"
          >
            <template #incrementbuttonicon>
              <span>+</span>
            </template>
            <template #decrementbuttonicon>
              <span>–</span>
            </template>
          </InputNumber>
        </div>
        <div class="game-item__card game-item__card--center">
          <div class="">
            <div class="table-wrap game-item__title">
              <img
                v-if="item.b.command.post_thumbnail && item.b.command.post_thumbnail !== false"
                :src="item.b.command.post_thumbnail"
                alt="Avatar"
                class="team-img"
              />
              <span>{{ item.b.command.post_title }} </span> <span class="p-badge"> 3 453 </span>
            </div>
            <div class="table-wrap">
              <div class="game-item__list">
                <div class="secondary">Дисквалифицировать</div>
              </div>
            </div>
          </div>
          <InputNumber
            v-model="editMatch.counter_b"
            :min="0"
            :max="100"
            inputId="horizontal-buttons"
            showButtons
            buttonLayout="horizontal"
            :step="1.0"
          >
            <template #incrementbuttonicon>
              <span>+</span>
            </template>
            <template #decrementbuttonicon>
              <span>–</span>
            </template>
          </InputNumber>
        </div>
        <h5>Проверка победителя</h5>
        <div class="teams-check d-flex">
          <div class="team team--success">Команда 1</div>
          <div class="team">Команда 2</div>
        </div>
        <Button @click="tournamentPageStore.editResults" class="btn-lg">Завершить матч</Button>
      </TabPanel>
    </TabView>
  </Dialog>
</template>

<script setup>
  import { useMatchEditStore } from '@/modules/tournaments/store/MatchEditStore';
  const matchEditStore = useMatchEditStore();
  const { editMatch } = storeToRefs(matchEditStore);

  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const settingsModalVisible = ref(false);

  const props = defineProps({
    item: {
      type: Array,
      required: true,
    },
  });
</script>

<style></style>
