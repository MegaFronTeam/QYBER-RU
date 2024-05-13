<template>
	<div class="checkbox">
		<Checkbox
			v-model="agreement"
			inputId="agreement"
			name="agreement"
			value="Onion"
		/>
		<label for="agreement">
			Даю согласие на обработку и хранение моих персональных данных в соответствии с
			<a href="#">условиями политики конфиденциальности</a>
		</label>
	</div>
</template>

<script setup lang="ts">


const agreement = ref();
</script>
