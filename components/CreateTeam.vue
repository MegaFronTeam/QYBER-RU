<template>
  <div>
    <Button
      class="ms-auto btn-sm"
      severity="primary"
      outlined
      @click="visibleShow = true"
      label="Создать команду"
    />

    <Dialog v-model:visible="visibleShow" modal header="Создание команды">
      <div class="form-wrap">
        <transition name="fade">
          <form @submit="submit" v-if="!isSend">
            <InputGroup>
              <label for="name">Название команды</label>
              <InputText
                id="name"
                type="text"
                v-model="name"
                placeholder="Введите Название команды"
              />
            </InputGroup>

            <InputGroup>
              <label for="discipline">Дисциплина</label>
              <Dropdown
                v-model="discipline"
                :options="disciplineList"
                optionValue="slug"
                optionLabel="name"
                placeholder="Выбрать"
                class="w-full"
              />
            </InputGroup>

            <InputGroup class="select-team">
              <label for="leagues">Лига</label>
              <SelectButton
                id="leagues"
                v-model="leagues"
                optionValue="slug"
                optionLabel="name"
                :options="leaguesOptions"
                aria-labelledby="basic"
                :allowEmpty="false"
              />
            </InputGroup>

            <InputGroup>
              <label for="textarea">Загрузить аватар команды</label>
              <div>
                <FileUpload
                  mode="basic"
                  name="demo[]"
                  url="/api/upload"
                  accept="image/*"
                  customUpload
                  @uploader="customBase64Uploader"
                  chooseLabel="Загрузить аватар команды"
                >
                </FileUpload>
                <br />
                <p class="text-center">
                  Максимальный вес 5 мб. Соотношение сторон 1:1, размер не более 1080х1080 пикс.
                  JPG, GIF или PNG.
                </p>
              </div>
            </InputGroup>
            <Button type="submit" class="btn-lg">Создать команду</Button>
          </form>
          <div v-else>
            <p>Команда успешно создана</p>
            <Button @click="visibleShow = false" label="Закрыть" />
          </div>
        </transition>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
const visibleShow = ref(false);
import Team from '@/services/team';

const name = ref();
const isSend = ref(false);
const discipline = ref([]);
const disciplineList = ref([]);

Team.getDisciplines()
  .then((response) => {
    disciplineList.value = response;
  })
  .catch((error) => {
    console.log(error);
  });

const leagues = ref([]);
const leaguesOptions = ref([]);
Team.getLeagues()
  .then((response) => {
    console.log(response);
    leaguesOptions.value = response;
  })
  .catch((error) => {
    console.log(error);
  });

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    const base64data = reader.result;
  };
};

const submit = (event) => {
  event.preventDefault();
  console.log(name.value, discipline.value, leagues.value);
  Team.createTeam({ name: name.value, discipline: discipline.value, leagues: leagues.value })
    .then((response) => {
      isSend.value = true;
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log(data());
};
</script>

<style lang="scss" scoped>
/* Your component's styles here */
</style>
