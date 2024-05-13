<template>
  <ProfileHead
    img="/img/team-img-1.png"
    :breadcrumbArr="[
      { label: 'Личный кабинет', route: '/' },
      { label: 'Мои команды', route: '/' },
      { label: 'Team Rogue' },
    ]"
  >
    <h1 class="mb-12">Team Rogue</h1>
    <div class="row mb-12">
      <div class="col-auto">
        <Badge severity="secondary" value="Кибер Атланты" class="p-badge-outline" />
      </div>
      <div class="col-auto">
        <span class="p-badge p-badge-gray">
          <svg-icon name="dota.svg" />
          Dota 2
        </span>
      </div>
    </div>
    <span class="sProfileHead__name mb-12">Самара</span>
    <div class="sProfileHead__time mb-0">ИНН 772331755151</div>
  </ProfileHead>
  <MyTeamBlock />
</template>

<script></script>
