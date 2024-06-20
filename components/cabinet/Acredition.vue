<template>
  <div v-if="!globalStore.userData.user_verification">
    <Message severity="warn" :closable="false">
      <div v-if="in_verifications">Заявка на аккредитацию на рассмотрении</div>
      <template v-else>
        <div style="margin-block: 0.3rem">
          Для того чтобы пользоваться сервисом и участвовать в турнирах вам необходимо пройти
          аккредитацию.
        </div>

        <Button
          class="ms-auto btn-sm p-button-outlined"
          outlined=""
          @click="
            visibleShow = true;
            in_verifications = false;
          "
          label="Аккредитация"
        />
      </template>
    </Message>

    <Dialog
      v-if="!in_verifications"
      v-model:visible="visibleShow"
      modal
      :header="!in_verifications ? 'Аккредитация' : 'На проверке'"
    >
      <div class="form-wrap">
        <transition name="fade">
          <form @submit.prevent="userStore.sendVerification" v-if="!in_verifications">
            <InputGroup>
              <label for="inn"
                >ИНН компании/учебного заведения <span style="color: var(--red-500)">*</span></label
              >
              <InputText id="inn" type="text" v-model="data.inn" placeholder="Введите ИНН " />
            </InputGroup>

            <InputGroup>
              <label for="name"
                >Вы работаете или учитесь <span style="color: var(--red-500)">*</span></label
              >
              <Dropdown
                v-model="data.selectedWorkStudy"
                :options="typeUSer"
                optionLabel="name"
                placeholder="Выбрать"
                optionValue="value"
                class="w-full"
              />
            </InputGroup>

            <InputGroup class="select-team">
              <label for="leagues">Лига</label>
              <SelectButton
                id="leagues"
                v-model="data.leagues"
                optionValue="id"
                optionLabel="name"
                :options="globalStore.leaguesOptions"
                :allowEmpty="false"
                multiple
                aria-labelledby="multiple"
                disabled
              />
            </InputGroup>

            <transition name="fade">
              <InputGroup
                v-if="data.selectedWorkStudy === 'study' || data.selectedWorkStudy === 'work_study'"
              >
                <label>Учебное заведение <span style="color: var(--red-500)">*</span></label>
                <Dropdown
                  v-model="data.educational_institution"
                  :options="userStore.educational_institutions"
                  optionValue="id"
                  optionLabel="title.rendered"
                  placeholder="Выберите учебное заведение"
                  class="w-full"
                  filter
                  filterPlaceholder="Поиск"
                  emptyFilterMessage="Нет данных"
                >
                  <template #option="slotProps">
                    <div v-html="slotProps.option.title.rendered"></div>
                  </template>
                </Dropdown>
              </InputGroup>
            </transition>

            <InputGroup>
              <label for="textarea"
                >Загрузите документ <span style="color: var(--red-500)">*</span></label
              >
              <div>
                <FileUpload
                  mode="basic"
                  name="file"
                  id="file"
                  accept="image/*"
                  maxFileSize="5000000"
                  url="/api/upload"
                  @select="customBase64Uploader"
                  chooseLabel="Загрузить документ"
                >
                </FileUpload>

                <br />
                <p class="text-center">Максимальный вес 5 мб.</p>
                <small
                  >Для учащихся необходимо прикрепить справку с места учёбы, либо студенческий
                  билет. Для работающих игроков необходимо прикрепить справку с места работы</small
                >
              </div>
            </InputGroup>
            <Button type="submit" class="btn-lg">Отправить</Button>
          </form>
          <div v-else>
            <p>Мы проверим вашу заявку в ближайшее время</p>
            <Button @click="visibleShow = false" label="Закрыть" />
          </div>
        </transition>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
  // import { User } from '@/services/user';
  import { useUserStore } from '@/store/userStore';
  import { useGlobalStore } from '@/store/globalStore';
  import { useAccreditationStore } from '@/store/accreditationStore';

  const userStore = useUserStore();
  const globalStore = useGlobalStore();
  const accreditation = useAccreditationStore();

  const { userData, in_verifications } = storeToRefs(globalStore);
  const { data, typeUSer } = storeToRefs(accreditation);

  const visibleShow = ref(false);

  const customBase64Uploader = async (event) => {
    const filepage = event.files[0];
    // file.value = event.files[0];

    const reader = new FileReader();
    let blob = await fetch(filepage.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
      data.file = filepage;
      accreditation.setFile(filepage); // Assuming the accreditation store has a method called setFile to store the base64 data
    };
  };

  onMounted(() => {
    if (userStore.educational_institutions.length === 0) userStore.getEducationalInstitutions();
  });
</script>

<style lang="scss" scoped>
  /* Your component's styles here */
</style>
