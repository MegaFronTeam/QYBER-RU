<template>
  <section class="sCurrentSponsors">
    <div class="container">
      <h2 class="h1">Наши действующие спонсоры</h2>
      <div class="sCurrentSponsors__row row">
        <div class="sCurrentSponsors__col col">
          <div class="sCurrentSponsors__card">
            <div class="sCurrentSponsors__img-wrap">
              <div class="img-wrap-center">
                <img src="/img/logo-1.svg" />
              </div>
            </div>
            <div>
              <h3>DATEX</h3>
              <Badge severity="secondary" value="Генеральный спонсор турнира" />
              <p>
                Компания Datex, основанная в 2019 году, является сертифицированным партнером фирмы
                «1С»©, основным направлением деятельности которого является продажа и внедрение
                программных продуктов на базе 1С:Предприятие.
              </p>
              <Button label="Подробнее" />
            </div>
          </div>
        </div>
        <div class="sCurrentSponsors__col col">
          <div class="sCurrentSponsors__card">
            <div class="sCurrentSponsors__img-wrap">
              <div class="img-wrap-center">
                <img src="/img/logo-2.svg" />
              </div>
            </div>
            <div>
              <h3>ПАО «Сбербанк»</h3>
              <Badge severity="secondary" value="Спонсор" />
              <p>
                ПАО «Сберба́нк» — российский финансовый конгломерат, крупнейший универсальный банк
                России и Восточной Европы. По итогам первого полугодия 2023 года у Сбербанка 107,2
                миллиона активных частных клиентов и 3,1 миллиона активных корпоративных клиентов.
              </p>
              <Button label="Подробнее" />
            </div>
          </div>
        </div>
        <div class="sCurrentSponsors__col col">
          <div class="sCurrentSponsors__card">
            <div class="sCurrentSponsors__img-wrap">
              <div class="img-wrap-center">
                <img src="/img/logo-2.svg" />
              </div>
            </div>
            <div>
              <h3>ПАО «Сбербанк»</h3>
              <Badge severity="secondary" value="Спонсор" />
              <p>
                ПАО «Сберба́нк» — российский финансовый конгломерат, крупнейший универсальный банк
                России и Восточной Европы. По итогам первого полугодия 2023 года у Сбербанка 107,2
                миллиона активных частных клиентов и 3,1 миллиона активных корпоративных клиентов.
              </p>
              <Button label="Подробнее" />
            </div>
          </div>
        </div>
        <div class="sCurrentSponsors__col col">
          <div class="sCurrentSponsors__card">
            <div class="sCurrentSponsors__img-wrap">
              <div class="img-wrap-center">
                <img src="/img/logo-1.svg" />
              </div>
            </div>
            <div>
              <h3>DATEX</h3>
              <Badge severity="secondary" value="Генеральный спонсор турнира" />
              <p>
                Компания Datex, основанная в 2019 году, является сертифицированным партнером фирмы
                «1С»©, основным направлением деятельности которого является продажа и внедрение
                программных продуктов на базе 1С:Предприятие.
              </p>
              <Button label="Подробнее" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useSponsorsStore } from '@/store/sponsorsStore';
  const sponsorsStore = useSponsorsStore();
  const { sponsors } = sponsorsStore;
  sponsorsStore.getSponsors();
</script>
