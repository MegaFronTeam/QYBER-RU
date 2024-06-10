<template>
  <Dialog
    v-model:visible="settingsModalVisible"
    modal
    :header="tournamentPageStore.editMatch.title"
  >
    <div class="d-flex switch-wrap">
      <InputSwitch
        v-model="tournamentPageStore.editMatch.checked"
        @change="tournamentPageStore.checkMatchStatus"
      />
      <span class="">В процессе</span>
    </div>
    <TabView>
      <TabPanel header="Настройки">
        <div class="form-wrap">
          <!-- <InputGroup>
            <label for="name">Формат</label>
            <Dropdown
              v-model="selectedFormat"
              :options="formats"
              optionLabel="name"
              placeholder="5x5"
              class="w-full md:w-14rem"
            />
          </InputGroup> -->
          <InputGroup>
            <label for="calendar">Начало игры (мск)</label>
            <div class="d-flex date-flex">
              <Calendar
                id="calendar"
                v-model="tournamentPageStore.editMatch.date"
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
                v-model="tournamentPageStore.editMatch.time"
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
                v-model="tournamentPageStore.editMatch.editForm.discord"
                placeholder="Ссылка с https://"
              />
            </div>
          </InputGroup>
          <InputGroup>
            <label for="IP">Сервер</label>
            <InputText
              id="IP"
              type="text"
              v-model="tournamentPageStore.editMatch.editForm.server"
              placeholder="IP адрес"
            />
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
            v-model="tournamentPageStore.editMatch.editResults.counter_a"
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
            v-model="tournamentPageStore.editMatch.editResults.counter_b"
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
  <div class="sGridCardItem">
    <div class="sGridCardItem__order">
      {{ item.indexPlus }}
      <template v-if="item.status.value === 'pending'">
        <Button
          class="sGridCardItem__settings"
          type="button"
          @click="
            (settingsModalVisible = true),
              (tournamentPageStore.editMatch.id = item.id),
              (tournamentPageStore.editMatch.title = `Игра ${item.indexPlus}`)
          "
        >
          <svg-icon name="gear.svg" />
        </Button>
      </template>
    </div>
    <div class="teams-group">
      <div
        class="sGridCard sGridCard__team"
        :class="
          item.status.value === 'done' && item.a.counter > item.b.counter ? 'team-success' : ''
        "
      >
        <!-- :class="{ 'team-success': product.team.success }" -->
        <div class="sGridCard__wrap">
          <img
            v-if="item.a.command.post_thumbnail && item.a.command.post_thumbnail !== false"
            :src="item.a.command.post_thumbnail"
            alt="Avatar"
            class="img"
          />
          <span>{{
            item.a.prevText || (item.a.command.post_title && item.a.command.post_title)
          }}</span>
        </div>
        <div class="sGridCard__score">
          <!-- {{ product.b.team.success ? 1 : 0 }} -->
          {{ item.a.counter }}
        </div>
      </div>

      <div
        class="sGridCard sGridCard__team"
        :class="
          item.status.value === 'done' && item.a.counter < item.b.counter ? 'team-success' : ''
        "
      >
        <!-- :class="{ 'team-success': product.team.success }" -->
        <div class="sGridCard__wrap">
          <img
            v-if="item.b.command.post_thumbnail && item.b.command.post_thumbnail !== false"
            :src="item.b.command.post_thumbnail"
            alt="Avatar"
            class="img"
          />
          <span>{{
            item.b.prevText || (item.b.command.post_title && item.b.command.post_title)
          }}</span>
        </div>
        <div class="sGridCard__score">
          <!-- {{ product.b.team.success ? 1 : 0 }} -->
          {{ item.b.counter }}
        </div>
      </div>
      <Button v-if="referee">Присоединиться</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTournamentPageStore } from '../../store/TournamentPageStore';

const tournamentPageStore = useTournamentPageStore();
const props = defineProps({
  item: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
// const products = ref([
//   {
//     team: {
//       avatar: 'teamGrid-1.png',
//       text: 'Команда 1',
//       success: 1,
//     },
//   },
//   {
//     team: {
//       avatar: 'teamGrid-2.png',
//       text: 'Команда 2',
//       success: 0,
//     },
//   },
// ]);

const filteredMatch = ref({});
console.log(tournamentPageStore.matchesGrid);
filteredMatch.value = tournamentPageStore.matchesGrid.filter(
  (id) => id === tournamentPageStore.editMatch.id,
);

const settingsModalVisible = ref(false);
const formats = ref([{ name: '5x5' }]);

const totalRecords = ref(10);
const rowsPerPage = ref([5, 10, 50, 100]);
</script>
