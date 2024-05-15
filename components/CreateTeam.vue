<template>
  <div>
    <Message severity="warn" :closable="false" >
        <div style="margin-block: .3rem;">
          Для того чтобы пользоваться сервисом и участвовать в турнирах вам необходимо пройти аккредитацию.
        </div>

        <Button class="ms-auto btn-sm p-button-outlined" outlined="" @click="visibleShow = true" label="Аккредитация" /> 
      </Message>

      <Dialog v-model:visible="visibleShow" modal header="Аккредитация">
      <div class="form-wrap">
        <form>
          <InputGroup>
            <label for="name">ИНН компании</label>
            <InputText id="name" type="text" v-model="textValue" placeholder="Введите ИНН компании" />
          </InputGroup>

          <InputGroup>
            <label for="name">Вы работаете или учитесь</label> 
            <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Выбрать" class="w-full" />
          </InputGroup>

          <InputGroup class="select-team">
            <label for="name">Лига</label>
            <SelectButton v-model="valueLigue" :options="options" aria-labelledby="basic" :allowEmpty="false"  />
          </InputGroup>
          
          <InputGroup>
            <label for="textarea">Загрузите документ</label>
            <div>
              <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="customBase64Uploader" chooseLabel="Загрузить документ" >
              </FileUpload>
              <br>
              <p class="text-center">Максимальный вес 5 мб. Соотношение сторон 1:1, размер 
не более 1080х1080 пикс.
JPG, GIF или PNG. </p>
            </div>
          </InputGroup> 
          <Button type="submit" class="btn-lg">Отправить</Button>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script setup> 
const visibleShow = ref(false);


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

const valueLigue = ref('Кибер Атланты');
const options = ref(['Кибер Атланты', 'Кибер Таланты']);
const customBase64Uploader = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
        const base64data = reader.result;
    };
};


</script>

<style lang="scss" scoped>
/* Your component's styles here */
</style>