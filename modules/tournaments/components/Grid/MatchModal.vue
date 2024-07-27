<template>
  <Button
    :class="btnLabel ? '' : 'sGridCardItem__settings'"
    type="button"
    @click="(settingsModalVisible = true), matchEditStore.setModalData(item)"
  >
    <svg-icon v-if="btnLabel === ''" name="gear.svg" />
    <span v-else>{{ btnLabel }}</span>
  </Button>
  <Dialog
    class="edit-match"
    v-model:visible="settingsModalVisible"
    modal
    :header="item.indexPlus !== underfind ? 'Игра ' + item.indexPlus : 'Игра'"
  >
    <div class="d-flex switch-wrap">
      <InputSwitch v-model="editMatch.checked" />
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
                placeholder="__.__.____"
                date-format="dd.mm.yy"
                showButtonBar
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
                time-format="HH:mm"
                timeOnly
                placeholder="00:00"
                showButtonBar
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

          <InputGroup v-if="false">
            <label for="steam">Steam ID</label>
            <InputText id="steam" type="text" v-model="editMatch.steam_id" placeholder="Steam ID" />
          </InputGroup>

          <InputGroup>
            <label for="url">Ccылка на трансляцию</label>
            <InputText id="url" type="text" v-model="editMatch.broadcast" placeholder="Url" />
          </InputGroup>

          <InputGroup v-if="!isFinished">
            <br />
            <div class="flex align-items-center">
              <Checkbox
                v-model="editMatch.show_in_main"
                inputId="show_in_main"
                name="show_in_main"
                value="Cheese"
                :binary="true"
              />
              <label for="show_in_main" class="ml-2"> Показывать на главной </label>
            </div>
          </InputGroup>
          <br />
        </div>

        <Button @click="matchEditStore.updateMatch" class="btn-lg">Сохранить</Button>
      </TabPanel>
      <TabPanel header="Результаты">
        <div class="game-item__card game-item__card--center">
          <div class="">
            <div class="table-wrap game-item__title">
              <img
                v-if="
                  editMatch.a.command.post_thumbnail && editMatch.a.command.post_thumbnail !== false
                "
                :src="editMatch.a.command.post_thumbnail"
                alt="Avatar"
                class="team-img"
              />
              <span>{{ editMatch.a.command.post_title }} </span>
              <!-- <span class="p-badge"> 3 453 </span> -->
            </div>
            <div class="table-wrap">
              <div class="game-item__list">
                <div class="click-el secondary" @click="matchEditStore.updateMatch(true, 'a')">
                  Дисквалифицировать
                </div>
              </div>
            </div>
          </div>
          <InputNumber
            v-model="editMatch.a.counter"
            :min="0"
            :max="100"
            inputId="horizontal-buttons"
            showButtons
            buttonLayout="horizontal"
            :step="1.0"
            :disabled="editMatch.status.value === 'done'"
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
                v-if="
                  editMatch.b.command.post_thumbnail && editMatch.b.command.post_thumbnail !== false
                "
                :src="editMatch.b.command.post_thumbnail"
                alt="Avatar"
                class="team-img"
              />
              <span>{{ editMatch.b.command.post_title }} </span>
              <!-- <span class="p-badge"> 3 453 </span> -->
            </div>
            <div class="table-wrap">
              <div class="game-item__list">
                <div class="click-el secondary" @click="matchEditStore.updateMatch(true, 'b')">
                  Дисквалифицировать
                </div>
              </div>
            </div>
          </div>
          <InputNumber
            v-model="editMatch.b.counter"
            :min="0"
            :max="100"
            inputId="horizontal-buttons"
            showButtons
            buttonLayout="horizontal"
            :step="1.0"
            :disabled="editMatch.status.value === 'done'"
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
          <div
            class="team"
            :class="editMatch.a.counter > editMatch.b.counter ? 'team--success' : ''"
          >
            Команда 1
          </div>
          <div
            class="team"
            :class="editMatch.a.counter < editMatch.b.counter ? 'team--success' : ''"
          >
            Команда 2
          </div>
        </div>
        <Button @click="matchEditStore.updateMatch(true)" class="btn-lg">Завершить матч</Button>
      </TabPanel>
    </TabView>
  </Dialog>
</template>

<script setup>
  import { useMatchEditStore } from '@/modules/tournaments/store/MatchEditStore';
  const matchEditStore = useMatchEditStore();
  const { editMatch, isFinished } = storeToRefs(matchEditStore);

  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const settingsModalVisible = ref(false);

  const props = defineProps({
    item: {
      type: Array,
      required: true,
    },
    btnLabel: {
      type: String,
      default: '',
      required: false,
    },
  });
</script>

<style lang="scss">
  .edit-match {
    .p-checkbox {
      margin-right: 10px;
      margin-bottom: 0.625rem;
      position: relative;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
</style>
