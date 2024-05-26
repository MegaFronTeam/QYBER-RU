<template>
  <section class="sTournamentOverview">
    <div class="container">
      <div class="sTournamentOverview__head">
        <div class="head-item">
          <p><span>Дисциплина</span></p>
          <p>Dota 2</p>
        </div>
        <div class="head-item">
          <p><span>Лига</span></p>
          <p>Кибер Атланты</p>
        </div>
        <div class="head-item">
          <p><span>Формат</span></p>
          <p>5x5</p>
        </div>
        <div class="head-item">
          <p><span>Команды</span></p>
          <p>3/8</p>
        </div>
        <div class="head-item">
          <p><span>Призовой фонд</span></p>
          <p>40 000 ₽</p>
        </div>
      </div>
      <div class="sTournamentOverview__wrap">
        <div class="div">
          <div class="wrap-header">
            <!-- <div class="link-wrap"><a href="">Обзор</a></div>
          <div class="link-wrap"><a href="">Расписание</a></div>
          <div class="link-wrap"><a href="">Сетка</a></div>
          <div class="link-wrap"><a href="">Участники</a></div>
          <div class="link-wrap"><a href="">Правила</a></div>
          <div class="link-wrap"><a href="">Контакты</a></div>
          <div class="link-wrap"><a href="">Жеребьевка</a></div> -->
            <a class="active" href="#">Обзор</a>
            <a href="#">Расписание</a>
            <a href="#">Сетка</a>
            <a href="#">Участники</a>
            <a href="#">Правила</a>
            <a href="#">Контакты</a>
            <a href="#">Жеребьевка <span>Для судей</span></a>
          </div>
        </div>

        <div class="wrap-body">
          <div class="sTournamentOverview__info">
            <svg-icon name="info.svg" />
            Для участия подтвердите свою заявку в период 28 января 2024 г. в 14:00 - 28 февраля 2024
            в 14:00
          </div>
          <div class="sTournamentOverview__title-item">
            <h3>Подробное описание турнира Кибер Атланты Осень 2024 по Dota 2</h3>
            <p>
              Для участия в турнире каждый игрок в обязательном порядке должен вступить на сервер в
              Discord с указанием названия команды <br />
              в формате — [Название команды] Никнейм
            </p>
            <ul>
              <li>Все матчи проходят в формате BO1 (до одной победы).</li>
              <li>Призы получают команды, занявшие места с 1 по 8.</li>
            </ul>
          </div>
          <div class="sTournamentOverview__item">
            <h5>Расписание</h5>
            <div class="sTournamentOverview__descr overview-item">
              <p>28 февраля в 14:00 мск — окончание приема заявок;</p>
              <p>28 января c 13:30 до 14:00 мск — подтверждение участия в турнире;</p>
              <p>28 января в 14:05 мск — публикация турнирной сетки;</p>
              <p>28 января в 14:10 мск — начало 1-го тура.</p>
            </div>
            <div class="sTournamentOverview__descr overview-item">
              <p><a href="#"> Инструкция по регистрации на платформе турнира </a></p>
            </div>
          </div>
          <div class="sTournamentOverview__item">
            <h5>Призовой фонд</h5>
            <div class="sTournamentOverview__descr overview-item">
              <h6>Призы получают команды, занявшие места с 1 по 8 *</h6>
              <p>
                1 место — 10 000 рублей на команду;<br />
                2 место — 7000 рублей на команду;<br />
                3-4 место — 5000 рублей на команду;<br />
                5-8 место — 3250 рублей на команду.
              </p>
              <p>
                <span
                  >*Передача призов будет осуществлена в течение 30 (тридцати) рабочих дней с
                  момента предоставления необходимых реквизитов.</span
                >
              </p>
            </div>
          </div>
          <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
            <Button label="Регистрация на турнир" class="w-full" />
          </NuxtLink>
        </div>
        <div class="wrap-footer" v-if="shareComp">
          <div class="wrap-footer__title">Поделиться</div>
          <div class="wrap-footer__icons">
            <a href="#" class="contacts__link">
              <svg-icon name="copy.svg" />
            </a>
            <a href="#" target="_blank" class="contacts__link">
              <svg-icon name="telegram.svg" />
            </a>
            <a href="#" target="_blank" class="contacts__link">
              <svg-icon name="vk.svg" />
            </a>
          </div>
        </div>
      </div>
      <!-- <Button label="Подробнее о турнире" class="btn-lg" /> -->
    </div>
  </section>
</template>

<script setup>
  import { useGlobalStore } from '~/store/globalStore';
  import YandexShare from '@cookieseater/vue-yandex-share';

  const globalStore = useGlobalStore();
</script>
