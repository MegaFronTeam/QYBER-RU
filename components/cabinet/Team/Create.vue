<template>
  <div>
    <Button
      style="margin-bottom: 1.5rem"
      class="ms-auto btn-sm"
      severity="primary"
      outlined
      @click="
        visibleShow = true;
        isSend = false;
        teamStore.isCreate = false;
      "
      label="Создать команду"
    />

    <Dialog v-model:visible="visibleShow" modal header="Создать команду">
      <div class="form-wrap">
        <transition name="fade">
          <form @submit.prevent="teamStore.createTeam()" v-if="!teamStore.isCreate">
            <InputGroup>
              <label for="name">Название команды</label>
              <InputText
                id="name"
                type="text"
                v-model="teamStore.formDataCreateTeam.name"
                placeholder="Введите Название команды"
              />
            </InputGroup>

            <InputGroup>
              <label for="discipline">Дисциплина</label>
              <Dropdown
                v-model="teamStore.formDataCreateTeam.discipline"
                :options="globalStore.disciplineList"
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
                v-model="teamStore.formDataCreateTeam.leagues"
                optionValue="slug"
                optionLabel="name"
                :options="globalStore.leaguesOptions"
                aria-labelledby="multiple"
                multiple
                :disabled="globalStore.userData.leagues.length !== 2"
              />
              <!-- :allowEmpty="false" -->
            </InputGroup>

            <InputGroup>
              <label for="textarea">Загрузить аватар команды</label>
              <div>
                <FileUpload
                  mode="basic"
                  name="logo"
                  id="logo"
                  accept="image/*"
                  maxFileSize="5000000"
                  url="/api/upload"
                  @select="customBase64Uploader"
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
    <!-- <Toast /> -->
  </div>
</template>

<script setup>
// TODO: переделать на Store
const visibleShow = ref(false);
import { useGlobalStore } from '@/store/globalStore';
import { useTeamStore } from '@/store/TeamStore';

const globalStore = useGlobalStore();
const teamStore = useTeamStore();

// if (visibleShow.value === false) {
//   teamStore.isCreate = false;
// }

globalStore.getDisciplines();
// import { useToast } from 'primevue/usetoast';
// const toast = useToast();

teamStore.leaguesStatus();

// const name = ref();
// const leagues = ref([]);
// const discipline = ref([]);

// const logo = ref();

// Team.getDisciplines()
//   .then((response) => {
//     disciplineList.value = response;
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  teamStore.formDataCreateTeam.logo = file;

  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    const base64data = reader.result;
  };
  // console.log(logo.value);
};

// const onUpload = (event) => {
//   console.log(event);
// };

// const submit = (event) => {
// event.preventDefault();
// const formData = new FormData();
// formData.append('name', name.value);
// formData.append('discipline', discipline.value);
// formData.append('leagues', leagues.value);
// formData.append('logo', logo.value);

// Team.createTeam(formData)
//   .then((response) => {
//     isSend.value = true;
//     // console.log(response);
//     name.value = '';
//     discipline.value = [];
//     leagues.value = [];
//     logo.value = '';
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// };
</script>

<style lang="scss" scoped>
/* Your component's styles here */
</style>
