<template>
  <div >
    <Message  severity="warn" :closable="false" >
        <div v-if="globalStore.in_verifications === true">Заявка на аккредитацию на рассмотрении</div>
        <template v-else> 
          <div  style="margin-block: .3rem;">
            Для того чтобы пользоваться сервисом и участвовать в турнирах вам необходимо пройти аккредитацию.
          </div>
          
          <Button class="ms-auto btn-sm p-button-outlined" outlined="" @click="visibleShow = true; globalStore.in_verifications = false" label="Аккредитация" /> 
        </template>
      </Message>

      <Dialog v-if="globalStore.in_verifications === false " v-model:visible="visibleShow" modal :header="globalStore.in_verifications !== true ? 'Аккредитация' : 'На проверке'">
      <div class="form-wrap">
        <form @submit.prevent="userStore.sendVerification({inn, leagues, file, selectedWorkStudy })" v-if="UserVerificationSend === false">
          <InputGroup>
            <label for="inn">ИНН компании</label>
            <InputText id="inn" type="text" v-model="inn" placeholder="Введите ИНН компании" />
          </InputGroup>

          <InputGroup>
            <label for="name">Вы работаете или учитесь</label> 
            <Dropdown v-model="selectedWorkStudy" :options="cities" optionLabel="name" placeholder="Выбрать" class="w-full" />
          </InputGroup>

          <InputGroup class="select-team">
              <label for="leagues">Лига</label>
              <SelectButton
                id="leagues"
                v-model="leagues"
                optionValue="slug"
                optionLabel="name"
                :options="globalStore.leaguesOptions"
                aria-labelledby="basic"
                :allowEmpty="false"
              />
            </InputGroup>

          
          <InputGroup>
            <label for="textarea">Загрузите документ</label>
            <div>
              <FileUpload
                  mode="basic"
                  name="file"
                  id="file"
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
          <Button type="submit" class="btn-lg">Отправить</Button>
        </form>
        <div v-else>
          <p>Мы проверим вашу заявку в ближайшее время</p>
          <Button @click="visibleShow = false" label="Закрыть" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup> 
import { useUserStore } from '@/store/userStore';
import { useGlobalStore } from '@/store/globalStore';
const userStore = useUserStore();
const globalStore = useGlobalStore();
// import Auth from '@/services/auth';
// import Team from '@/services/team';

// const { $locally } = useNuxtApp();

const visibleShow = ref(false);

const UserVerificationSend = ref(false);

  const inn= ref('');
  const leagues = ref([]);
  const file= ref({});


  const customBase64Uploader = async (event) => {
    file.value = event.files[0];
  // console.log(fileAcred);
  // file.value = event.files[0];

    const reader = new FileReader();
    let blob = await fetch( file.value.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
    const base64data = reader.result;
  }; 
};



const cities = ref([
    { name: 'Учусь', value:'study' },
    { name: 'Работаю', value:'work' },
    { name: 'Учусь и работаю ', value:'work_study' },

]);




</script>

<style lang="scss" scoped>
/* Your component's styles here */
</style>