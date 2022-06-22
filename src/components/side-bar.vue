<template>
  <div class="side-bar ps-2 pe-2 pt-3 pb-3 d-flex flex-row flex-md-column justify-content-between border-top">
    <div class="side-bar__logo">
      <router-link to="/" class="side-bar__logo__link">
        <img src="@/assets/images/blog.png" alt="Логотип">
      </router-link>
    </div>
    <nav class="p-0 m-0">
      <ul class="side__bar__menu d-flex d-md-block">
        <li class="side__bar__menu__item">
          <a href="#" class="side__bar__menu__item__link">
            <img src="@/assets/images/icons/home.svg" alt="" class="side__bar__menu__item__icon">
          </a>
        </li>
        <li class="side__bar__menu__item">
          <a href="#" class="side__bar__menu__item__link">
            <img src="@/assets/images/icons/blogs.svg" alt="" class="side__bar__menu__item__icon">
          </a>
        </li>
      </ul>
    </nav>
    <div class="user ms-md-auto me-md-auto">
      <img src="@/assets/images/img_avatar-man.png" alt="Avatar" class="avatar">
    </div>
  </div>
</template>

<script>
export default {
  name: "side-bar",
  props: {},
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.side-bar {
  height: auto;
  width: 100%;
  bottom: 0;
  z-index: 10;
  background: white;

  &__logo {
    width: 60px;
    margin: 0;

    &__link {
      display: block;
      text-decoration: none;
    }

    & img {
      width: 100%;
      height: 100%;
    }
  }
}

@media (min-width: 768px) {
  .side-bar{
    height: 100%;
    width: auto;
    max-width: 130px;
    background-color: transparent;

    &__logo {
      margin: 0 auto;
    }

  }
}

nav .side__bar__menu {
  list-style-type: none;
  margin: 0;
  padding: 0;

  &__item {
    &__link {
      margin: 20px auto;
      display: block;
      text-decoration: none;
      width: 24px;
      height: 24px;
    }
    &__icon {
      width: 100%;
      height: 100%;
    }
  }
}

@media (min-width: 768px) {
  .border-top {
    border-top: 1px solid #b2b2b2;
  }
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    border-color: dodgerblue;
  }
}
</style>