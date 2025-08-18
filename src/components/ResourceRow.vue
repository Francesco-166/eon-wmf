<script setup>
import { useLanguageStore } from "../stores/language";
import { computed, inject, ref } from "vue";
import {
  UserAvatar16 as UserAvatarIcon,
  StarFilled16 as RareIcon,
  CircleFilled16 as LocationIcon,
  EarthFilled16 as RiverIcon,
  EarthAmericasFilled16 as SeaIcon,
  EarthEuropeAfricaFilled16 as PondIcon,
  EarthSoutheastAsiaFilled16 as PierIcon,
} from "@carbon/icons-vue";
import BlurImage from "@/components/BlurImage.vue";
import placeholderImage from "../assets/fish.svg";
import { useTranslation } from "i18next-vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { t } = useTranslation();

const props = defineProps({
  resource: {
    type: /** @type {FishData} **/ Object,
    required: true,
  },
  expandable: { type: Boolean, default: false },
});
// console.warn(props.resource);
// const langStore = useLanguageStore();
// const fishName = computed(() => {
//   const key = "name-" + langStore.languageObject.api;
//   let name = props.fish.name[key];
//   return name || props.fish.key;
// });
// const fishPrice = computed(() => {
//   return langStore.currencyFormat.format(props.fish.price);
// });
// const cjFishPrice = computed(() => {
//   return langStore.currencyFormat.format(props.fish["price-cj"]);
// });
// const rarityMap = {
//   "Common": 1,
//   "Uncommon": 2,
//   "Rare": 3,
//   "Ultra-rare": 4,
// };
// const rarity = computed(() => {
//   return rarityMap[props.fish.availability?.rarity] || -1;
// });
// const location = computed(() => {
//   const location = props.fish.availability?.location || "Pond";
//   if (location.startsWith("Pond")) return "pond";
//   else if (location.startsWith("River")) return "river";
//   else if (location.startsWith("Sea")) return "sea";
//   else if (location.startsWith("Pier")) return "pier";
//   else return "";
// });

// const showCatchPhrases = inject("show-catch-phrases", ref(false));

// const { md } = useBreakpoints();
</script>

<template>
  <cv-data-table-row :value="resource.name">
    <cv-data-table-cell><user-avatar-icon class="inline" /> <span class="link">{{ props.resource.name }}</span></cv-data-table-cell
    >
    <cv-data-table-cell
      ><cv-tag v-for="qual in props.resource.qualifications" kind="high-contrast" :label="qual"
    /></cv-data-table-cell>
    <!-- <cv-data-table-cell>
      <blur-image
        class="w-4 h-4 md:w-12 md:h-12 object-contain max-w-none"
        :src="fish['icon_uri']"
        :src-placeholder="placeholderImage"
        :alt="fishName"
      />
    </cv-data-table-cell> -->
    <!-- <cv-data-table-cell v-if="md">
      {{ fishPrice }}
    </cv-data-table-cell>
    <cv-data-table-cell v-if="md">
      {{ cjFishPrice }}
    </cv-data-table-cell> -->
    <!-- Add optional expanding data here -->
    <!-- <template
      v-if="showCatchPhrases"
      #expandedContent
    >
      <div class="flex justify-around gap-4">
        <div
          class="bg-[url(@/assets/fish-bowl.png)] bg-contain bg-no-repeat bg-carbon-blue-40 text-black text-2xl p-1"
        >
          {{ fish["catch-phrase"] }}
        </div>
        <div class="bg-[url(@/assets/museum-tile.png)] text-black text-2xl p-1">
          {{ fish["museum-phrase"] }}
        </div>
      </div>
    </template> -->
  </cv-data-table-row>
</template>

<style lang="scss">
.bx--accordion__content {
  padding-right: 0px;
}

.inline {
  white-space: nowrap;
  display: inline-block;
}

.link {
  color: var(--Link-link-primary, #0f62fe);
}

.resource_row {
  color: var(--Link-link-primary, #0f62fe);
  // display: inline-block;

  /* Body styles/body-01 */
  font-family: var(--Fixed-Body-Font-family, "IBM Plex Sans");
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.16px;
}
</style>
