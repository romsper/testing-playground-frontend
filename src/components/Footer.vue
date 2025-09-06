<script setup lang="ts">
import SocialLinks from './SocialLinks.vue';
</script>

<template>
  <div class="footer">
    <SocialLinks />
    <span>© romsper | All rights... This is a random footer text</span>
  </div>
</template>

<style scoped>
.footer {
  width: 100vw;
  padding: 1rem;
  background-color: var(--color-background);
  display: flex;
  flex-direction: row;
  border-top: gainsboro solid 0.5px;
  flex-direction: column;
  align-items: center;
}

.contact-links {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 0.5rem;
  justify-content: center;
}

.contact-link {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #2d7a46;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.contact-link:active,
.contact-link:focus,
.contact-link:hover {
  color: #1b4d2b;
  background: none;
  text-decoration: none;
  box-shadow: none;
  outline: none;
}
</style>
