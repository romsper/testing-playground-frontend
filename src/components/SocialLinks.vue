<script setup lang="ts">

</script>

<template>
    <div class="contact-links">
      <a href="https://github.com/romsper" target="_blank" rel="noopener" class="contact-link" data-test-group="social-links" data-test-id="social-github">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.01-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
        </svg>
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/romsper/" target="_blank" rel="noopener" class="contact-link" data-test-group="social-links" data-test-id="social-linkedin">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.25 11.25h-3v-5.5c0-1.32-.03-3.01-1.84-3.01-1.84 0-2.12 1.44-2.12 2.92v5.59h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
        </svg>
        LinkedIn
      </a>
      <a href="https://t.me/romsper_qa_buddy" target="_blank" rel="noopener" class="contact-link" data-test-group="social-links" data-test-id="social-telegram">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M9.993 15.674l-.396 4.013c.568 0 .814-.244 1.112-.537l2.664-2.537 5.522 4.029c1.012.557 1.736.264 1.991-.937l3.613-16.868c.329-1.521-.553-2.116-1.538-1.771l-21.07 8.117c-1.444.557-1.426 1.354-.247 1.715l5.393 1.684 12.522-7.888c.59-.385 1.128-.172.686.213z" />
        </svg>
        Telegram
      </a>
    </div>
</template>

<style scoped>
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
