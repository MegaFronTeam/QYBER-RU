<template>
  <div >
    <Message  severity="warn" :closable="false" >
        <div v-if="UserVerificationSend == true">Заявка на аккредитацию на рассмотрении</div>
        <template v-else> 
          <div  style="margin-block: .3rem;">
            Для того чтобы пользоваться сервисом и участвовать в турнирах вам необходимо пройти аккредитацию.
          </div>
          
          <Button class="ms-auto btn-sm p-button-outlined" outlined="" @click="visibleShow = true; UserVerificationSend = false" label="Аккредитация" /> 
        </template>
      </Message>

      <Dialog v-if="!UserVerificationSend !== true" v-model:visible="visibleShow" modal header="Аккредитация">
      <div class="form-wrap">
        <form @submit.prevent="userStore.sendVerification({inn, leagues, file})" v-if="!UserVerificationSend">
          <InputGroup>
            <label for="inn">ИНН компании</label>
            <InputText id="inn" type="text" v-model="inn" placeholder="Введите ИНН компании" />
          </InputGroup>

          <InputGroup>
            <label for="name">Вы работаете или учитесь</label> 
            <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Выбрать" class="w-full" />
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
      </div>
    </Dialog>
  </div>
</template>

<script setup> 
import { useUserStore } from '@/store/userStore';
const userStore = useUserStore();
// import Auth from '@/services/auth';
// import Team from '@/services/team';

// const { $locally } = useNuxtApp();

const visibleShow = ref(false);

const UserVerificationSend = ref(false);

  const inn= ref('');
  const leagues = ref([]);
  const file= ref({});
 

const isSend = ref(false);

const leaguesOptions = ref([]);

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


const selectedCity = ref('');
const cities = ref([
    { name: 'Учусь и работаю' },
    { name: 'Учусь' },
    { name: 'Рвботаю' },
    { name: 'Не работаю и не учусь'},
    { name: 'Пенсионер' },
    { name: 'Другое'},
    { name: 'Не хочу указывать'}
]);

onMounted(async() => { 
  leaguesOptions.value = userStore.leaguesOptions;
  UserVerificationSend.value = userStore.isSendverification;
  UserVerificationSend.value = userStore.isSendverification;
});



</script>

<style lang="scss" scoped>
/* Your component's styles here */
</style>