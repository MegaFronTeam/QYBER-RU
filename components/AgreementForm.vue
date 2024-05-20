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
			<a href="https://api.qyber.ru/wp-content/uploads/2024/05/privacy-policy.pdf" target="_blank">условиями политики конфиденциальности</a>
		</label>
	</div>
</template>

<script setup lang="ts">


const agreement = ref('');
</script>
