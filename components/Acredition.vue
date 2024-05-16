<template>
  <div >
    <Message  severity="warn" :closable="false" >
        <div v-if="UserVerificationSend === true">Заявка на аккредитацию на рассмотрении</div>
        <template v-else> 
          <div  style="margin-block: .3rem;">
            Для того чтобы пользоваться сервисом и участвовать в турнирах вам необходимо пройти аккредитацию.
          </div>
          
          <Button class="ms-auto btn-sm p-button-outlined" outlined="" @click="visibleShow = true; isSend = false" label="Аккредитация" /> 
        </template>
      </Message>

      <Dialog v-if="!UserVerificationSend " v-model:visible="visibleShow" modal header="Аккредитация">
      <div class="form-wrap">
        <form @submit="submit" v-if="!isSend">
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
                  @select="customBase64Uploader"
                  maxFileSize="5000000" 
                  url="/api/upload"
                  chooseLabel="Загрузить файл"
                  >
                </FileUpload>
                <!-- accept=""  -->
              <br>
              <p class="text-center">Максимальный вес 5 мб. </p>
            </div>
          </InputGroup> 
          <Button type="submit" class="btn-lg">Отправить</Button>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script setup> 
import Auth from '@/services/auth';
import Team from '@/services/team';

const { $locally } = useNuxtApp();

const visibleShow = ref(false);
const UserVerificationSend = ref( $locally.getItem("UserVerificationSend") ? true : false);


const inn = ref();
const leagues = ref([]); 
const file =  ref();

const isSend = ref(false);

const leaguesOptions = ref([]);
Team.getLeagues()
  .then((response) => {
    leaguesOptions.value = response;
  })
  .catch((error) => {
    console.log(error);
  });

  const customBase64Uploader = async (event) => {
  const file = event.files[0];
  file.value = file;
  
  const reader = new FileReader();
  let blob = await fetch( file.objectURL).then((r) => r.blob()); //blob:url

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    const base64data = reader.result;
  }; 
  console.log(file.value );
};


const selectedCity = ref();
const cities = ref([
    { name: 'Учусь и работаю' },
    { name: 'Учусь' },
    { name: 'Рвботаю' },
    { name: 'Не работаю и не учусь'},
    { name: 'Пенсионер' },
    { name: 'Другое'},
    { name: 'Не хочу указывать'}
]);


const submit = (event) => {
  event.preventDefault(); 
  const formData = new FormData();
  formData.append('inn', inn.value); 
  formData.append('leagues', leagues.value);
  formData.append('file', file.value );

  Auth.setUserVerification(formData)
    .then((response) => {
      if(response.success === true) {

        isSend.value = true;
      }
      // $locally.setItem("UserVerificationSend", true)
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

</script>

<style lang="scss" scoped>
/* Your component's styles here */
</style>