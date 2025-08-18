<!-- <script setup> -->
<script setup lang="ts">
import {
  Search16 as SearchIcon,
  Settings16 as SettingsIcon,
  Notification16 as NotificationIcon,
  UserAvatarFilledAlt16 as AvatarFilledAltIcon,
  ColorPalette16 as ThemeIcon,
  Home16 as HomeIcon,
  Fish16 as FishIcon,
  Debug16 as BugsIcon,
  Events16 as VillagersIcon,
  // List16 as ListIcon,
  ListBoxes16 as ListBoxesIcon,
  Pipelines16 as PipelinesIcon,
  Analytics16 as AnalyticsIcon,
  Group16 as GroupIcon,
  Map16 as MapIcon,
  // Translate20 as LanguageIcon,
  // Login20 as LoginIcon,
  // UserAvatar20 as AvatarIcon,
  // Switcher20 as SwitcherIcon,
  // ColorPalette20 as ThemeIcon,
} from '@carbon/icons-vue'
import ThemeSelector from '@/components/Theme/Selector.vue'
import { ref } from 'vue'
import { useLanguageStore } from '../stores/language'
import { useTranslation } from 'i18next-vue'
const { t } = useTranslation()

// const loggedIn = ref(false);

const langStore = useLanguageStore()
const languageExpanded = ref(false)
function changeLocale(language) {
  langStore.setLanguage(language)
  languageExpanded.value = false
  document?.activeElement?.blur()
}
// function onLogin() {
//   loggedIn.value = !loggedIn.value;
// }

const otherApps = ref([
  {
    id: 'hello-vue',
    name: 'Hello Carbon Vue',
    link: 'https://github.com/IBM/hello-carbon-vue3',
  },
  {
    id: 'hello-nuxt',
    name: 'Hello Carbon Nuxt',
    link: 'https://github.com/davidnixon/hello-carbon-nuxt',
  },
  {
    id: 'carbon-vue',
    name: 'Carbon Vue Storybook',
    link: 'https://vue.carbondesignsystem.com/',
  },
])
</script>

<template>
  <cv-header aria-label="Carbon header" data-cy="header">
    <!-- <cv-header-menu-button
      :aria-label="t('header-menu5646')"
      aria-controls="side-nav"
    /> -->
    <img src="@/assets/logo_eon.png" />
    <cv-skip-to-content href="#main-content">
      {{ t('skip-content') }}
    </cv-skip-to-content>
    <!-- <cv-header-name
      href="/"
      prefix="Carbon"
    > -->
    <cv-header-name>
      Work Force Management
      <!-- {{ t("hello") }} Vue3 -->
    </cv-header-name>
    <template #header-global>
      <cv-header-global-action
        :aria-label="t('search')"
        :label="t('search')"
        aria-controls="search"
        tip-position="bottom"
        tip-alignment="end"
      >
        <search-icon />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t('settings')"
        :label="t('settings')"
        aria-controls="settings"
        tip-position="bottom"
        tip-alignment="end"
      >
        <settings-icon />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t('notification')"
        :label="t('notification')"
        aria-controls="notification"
        tip-position="bottom"
        tip-alignment="end"
      >
        <notification-icon />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t('user')"
        :label="t('user')"
        aria-controls="user"
        tip-position="bottom"
        tip-alignment="end"
      >
        <avatar-filled-alt-icon />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t('choose-theme')"
        :label="t('choose-theme')"
        aria-controls="choose-theme"
        tip-position="bottom"
        tip-alignment="end"
      >
        <theme-icon />
      </cv-header-global-action>
      <!-- <cv-header-global-action
        :aria-label="t('choose-language')"
        :label="t('choose-language')"
        aria-controls="language-panel"
        tip-position="bottom"
        tip-alignment="start"
      >
        <language-icon data-cy="language-icon" />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t(loggedIn ? 'logout' : 'login')"
        :label="t(loggedIn ? 'logout' : 'login')"
        aria-controls="user-panel"
        tip-position="bottom"
        tip-alignment="center"
        @click="onLogin"
      >
        <avatar-icon v-if="loggedIn" />
        <login-icon v-else />
      </cv-header-global-action>
      <cv-header-global-action
        :aria-label="t('other-apps')"
        :label="t('other-apps')"
        aria-controls="other-apps"
        tip-position="bottom"
        tip-alignment="end"
      >
        <switcher-icon />
      </cv-header-global-action> -->
    </template>
    <template #right-panels>
      <cv-header-panel id="language-panel" v-model:expanded="languageExpanded">
        <cv-switcher>
          <cv-switcher-item v-for="entry in langStore.languages" :key="entry.title">
            <cv-switcher-item-link
              :selected="entry.language === langStore.language"
              :data-cy="`language-${entry.language}`"
              @click="changeLocale(entry.language)"
            >
              {{ entry.title }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>
      <cv-header-panel id="other-apps">
        <cv-switcher>
          <cv-switcher-item v-for="app in otherApps" :key="app.id">
            <cv-switcher-item-link :data-cy="`language-${app.id}`" :href="app.link" target="_blank">
              {{ app.name }}
            </cv-switcher-item-link>
          </cv-switcher-item>
        </cv-switcher>
      </cv-header-panel>
      <cv-header-panel id="choose-theme">
        <theme-selector />
      </cv-header-panel>
    </template>
    <template #left-panels>
      <cv-side-nav id="side-nav" :rail="true" :fixed="false" :expanded="false">
        <cv-side-nav-items>
          <cv-side-nav-link :to="{ name: 'home' }">
            <template #nav-icon>
              <home-icon />
            </template>
            {{ t('Home') }}
          </cv-side-nav-link>
          <cv-side-nav-link :to="{ name: 'annualPlanningStart' }">
            <template #nav-icon>
              <list-boxes-icon />
            </template>
            {{ t('Start Annual Planning') }}
          </cv-side-nav-link>
          <cv-side-nav-link :to="{ name: 'dispatchingStart' }">
            <template #nav-icon>
              <pipelines-icon />
            </template>
            {{ t('Start Dispatching') }}
          </cv-side-nav-link>
          <cv-side-nav-link>
            <template #nav-icon>
              <analytics-icon />
            </template>
            {{ t('Analytics') }}
          </cv-side-nav-link>
          <cv-side-nav-link>
            <template #nav-icon>
              <group-icon />
            </template>
            {{ t('Manage Technicians') }}
          </cv-side-nav-link>
          <cv-side-nav-link>
            <template #nav-icon>
              <map-icon />
            </template>
            {{ t('Manage Regions') }}
          </cv-side-nav-link>
          <!-- <cv-side-nav-link :to="{ name: 'list' }">
            <template #nav-icon>
              <list-icon />
            </template>
            {{ t("list") }}
          </cv-side-nav-link> -->
          <cv-side-nav-menu-divider />
          <cv-side-nav-link>
            <template #nav-icon>
              <settings-icon />
            </template>
            {{ t('Settings') }}
          </cv-side-nav-link>
          <!-- <cv-side-nav-link :to="{ name: 'fish' }">
            <template #nav-icon>
              <fish-icon />
            </template>
            {{ t("fish") }}
          </cv-side-nav-link> -->
          <!-- <cv-side-nav-link :to="{ name: 'bugs' }">
            <template #nav-icon>
              <bugs-icon />
            </template>
            {{ t("bugs") }}
          </cv-side-nav-link> -->
          <!-- <cv-side-nav-link :to="{ name: 'villagers' }">
            <template #nav-icon>
              <villagers-icon />
            </template>
            {{ t("villagers") }}
          </cv-side-nav-link> -->
        </cv-side-nav-items>
      </cv-side-nav>
    </template>
  </cv-header>
</template>

<style scoped>
.cv-header {
  /* background-color: white; */
  color: black;
  border-bottom: 1px solid var(--Border-border-subtle-01, #c6c6c6);
  background: var(--Background-background, #fff);
}
/* .cv-skip-to-content {
  background: var(--Background-background, #FFF);
} */
.cv-header-name {
  color: black;
  /* background: var(--Background-background, #FFF); */
  /* border-color: "border-subtle-01"; */
}
/* .bx--header__global {
  background: var(--Background-background, #FFF);
} */

.cv-header-global-action {
  background: var(--Background-background, #fff);
  color: black;
}

/* .cv-side-nav {
  background-color: var(--Background-background, #FFF);
} */
</style>
