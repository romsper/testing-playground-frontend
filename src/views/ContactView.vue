<script setup lang="ts">
import SocialLinks from '@/components/SocialLinks.vue';
</script>

<template>
  <div class="spacer"></div>
  <div class="contact-container">
    <div class="contact-card">
      <img src="@/assets/images/avatar.png" alt="romsper avatar" class="contact-avatar" />
      <div class="contact-title">Testing Playground Frontend</div>
      <div class="contact-description">
        Welcome to a dedicated website for practicing automated UI testing.<br>
        This app is designed to work together with <b style="font-weight: bold;">testing-playground-backend</b>.<br>
        <span class="contact-goodluck">Happy testing!</span>
      </div>
      <SocialLinks />
      <div class="contact-footer">
        <span>
          Don’t forget to star the project on GitHub, create Issues, and send Pull Requests with improvements!
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 70vh;
}

.contact-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  max-width: 440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.3rem;
  text-align: center;
}

.contact-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border: 2px solid #e0e0e0;
}

.contact-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d7a46;
  margin-bottom: 0.2rem;
}

.contact-description {
  color: #444;
  font-size: 1.08rem;
  line-height: 1.6;
}

.contact-goodluck {
  color: #2d7a46;
  font-weight: 500;
}

.contact-footer {
  margin-top: 1.2rem;
  color: #888;
  font-size: 0.98rem;
}
</style>