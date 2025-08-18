<script setup>
import { useRouter } from "vue-router";
import { useFishStore } from "../stores/fish";
import FishRow from "../components/FishRow.vue";
import ResourceRow from "../components/ResourceRow.vue";
import { computed, onMounted, ref, provide, watch } from "vue";
import {
  View20 as ShowAllIcon,
  ViewOff20 as HideIcon,
} from "@carbon/icons-vue";
import { useTranslation } from "i18next-vue";
import FishRowEmpty from "@/components/FishRowEmpty.vue";
import { useLanguageStore } from "@/stores/language.js";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import MobileTablePagination from "@/components/MobileTablePagination.vue";
import WidgetKPI from "../components/WidgetKPI.vue";
import FrameTitle from "../components/FrameTitle.vue";
import {
  Parameter16 as ParameterIcon,
  Edit16 as EditIcon,
  TimeFilled16 as TimeIcon,
  CircleDash16 as CircleDashIcon,
  LocationFilled16 as LocationFilledIcon,
  UserMultiple16 as UserMultipleIcon,
  NewTab16 as NewTabIcon,
  Maximize16 as MaximizeIcon,
  CheckmarkFilled16 as CheckmarkFilledIcon,
  Checkmark16 as CheckmarkIcon,
  CheckmarkOutline16 as CheckmarkOutlineIcon,
  Incomplete16 as IncompleteIcon,
  ArrowRight16 as ArrowRightIcon,
  InformationFilled16 as InformationFilledIcon,
  Information16 as InformationIcon,
  WarningAltInverted16 as WarningAltInvertedIcon,
  WarningAltFilled16 as WarningAltFilledIcon,
  InProgress16 as InProgressIcon,
  ErrorFilled16 as ErrorFilledIcon,
  OverflowMenuVertical16 as OverflowMenuVerticalIcon,
  UndefinedFilled16 as UndefinedFilledIcon,
  // Login20 as LoginIcon,
  // UserAvatar20 as AvatarIcon,
  // Switcher20 as SwitcherIcon,
  // ColorPalette20 as ThemeIcon,
} from "@carbon/icons-vue";
import donutData0 from "@/assets/data/annualPlanningStartDonutData.ts";
import chartData from "@/assets/data/annualPlanningStartCapacityStackedBarChartData.ts";
import donutOptions0 from "@/assets/data/annualPlanningStartDonutOptions.ts";
import chartOptions from "@/assets/data/annualPlanningStartCapacityStackedBarChartOptions.ts";
import resourcesData from "@/assets/data/annualPlanningInternalResources.ts";
import providersData from "@/assets/data/annualPlanningExternalProviders.ts";

const router = useRouter();
const donutData = ref(donutData0);
const data = ref(chartData);
const donutOptions = ref(donutOptions0);
const options = ref(chartOptions);
const resources = ref(resourcesData);
const providers = ref(providersData);
// console.warn(resources.value)
const selectPlanningModeModalVisible = ref(false);

// console.log(donutData);
// console.log(donutOptions);

const region = ref("mando");

// const planningModeAI = ref(true);
// const planningModeManual = ref(false);

const { t, i18next } = useTranslation();
const langStore = useLanguageStore();

const hideIcon = HideIcon;
const fishStore = useFishStore();
const loading = ref(false);
const pagination = ref({ numberOfItems: 0, pageSizes: [7, 11, 23, 31] });
const i18nPagination = computed(() => {
  return {
    ...pagination.value,
    pageSizesLabel: t("items"),
    backwardText: t("previous-page"),
    forwardText: t("next-page"),
    pageNumberLabel: t("page-number"),
  };
});
onMounted(() => {
  loading.value = true;
  try {
    fishStore.loadFish().finally(() => {
      pagination.value.numberOfItems = fishStore.fish.length;
      loading.value = false;
    });
  } catch (e) {
    console.error("error loading fish from API", e.message);
  }
});
const sortKeys = ref({ index: "0", order: "none", name: null });
function onSort(keys) {
  sortKeys.value = keys;
}

const searchFilter = ref("");
/**
 * Set a search filter
 * @param {string} val
 */
function onSearch(val) {
  searchFilter.value = val?.trim();
}
const showHidden = ref(false);
const filteredFish = computed(() => {
  // start with all the fish
  /** @type {Array<FishData>} */
  let show = fishStore.fish;

  // if we are not showing hidden fish, remove them
  if (!showHidden.value) show = show.filter((fish) => !fish.hidden);

  // if we have search term, filter based on that term
  if (searchFilter.value)
    show = show.filter((fish) => fish.key.includes(searchFilter.value));

  // If we are sorting the data, do that here
  if (sortKeys.value.order !== "none") {
    show.sort((a, b) => {
      const _a = a[sortKeys.value.name]; // fish name or price
      const _b = b[sortKeys.value.name]; // fish name or price
      let cmp = 0;
      // sort by price (or some other number value that may get added later)
      if (typeof _a === "number") {
        cmp = _a - _b;
      }
      // or sort by name
      else if (sortKeys.value.name === "name") {
        const key = "name-" + langStore.languageObject.api;
        const nameA = _a[key] || "";
        const nameB = _b[key] || "";
        cmp = nameA.localeCompare(nameB, i18next.language);
      }
      // reverse the sort
      if (sortKeys.value.order === "descending") cmp = -cmp;
      return cmp;
    });
  }
  return show;
});
watch(filteredFish, () => {
  pagination.value.numberOfItems = filteredFish.value.length;
});

function gotoPlanningMode() {
  console.warn("gotoPlanningMode");
  // selectPlanningModeModalVisible.value = true;
  router.push("annualPlanning");
}

const planningModeAI = ref(true);
// planningModeAI.value = computed(() => {
//   console.warn("AI....");
//   return !planningModeManual.value;
// });

const planningModeManual = computed(() => {
  return !planningModeAI.value;
});

// watch(planningModeAI, () => {
//   console.warn("AI");
//   //   planningModeManual.value = false;
// });
watch(planningModeManual, () => {
  console.warn("manual");
  planningModeAI.value = !planningModeManual.value;
});

// function planningModeAISelected() {
//   console.warn("AI");
//   planningModeAI.value = true;
//   planningModeManual.value = false;
// }
// function planningModeManualSelected() {
//   console.warn("Manual");
//   planningModeAI.value = false;
//   planningModeManual.value = true;
// }

function onPrimaryClick() {
  console.warn("primary");
  router.push("ScenarioPlanning");
}

function toggleShowAll() {
  showHidden.value = !showHidden.value;
}

const currentPagination = ref({ start: 1, length: 7 });
const paginated = computed(() => {
  const change = currentPagination.value;
  return filteredFish.value.slice(
    change.start - 1,
    change.start + change.length - 1
  );
});
function onPagination(change) {
  currentPagination.value = change;
}
const selectedFish = ref([]);
function onHideSelected() {
  for (let i = 0; i < selectedFish.value.length; i++) {
    const key = selectedFish.value[i];
    fishStore.hideFish(key);
  }
  selectedFish.value = [];
}

const showCatchPhrases = ref(false);
provide("show-catch-phrases", showCatchPhrases);

const { md, carbonMd } = useBreakpoints();
</script>

<template>
  <cv-grid>
    <cv-row>
      <cv-column :lg="13">
        <!-- <cv-row> -->
        <div class="content">
          <div class="title-area">
            <span class="inline h-spread">
              <div class="title-frame">
                <div class="title">Dashboard</div>
                <div class="subtitle">
                  Overview of the current status for Planning and Work Order
                  Management
                </div>
              </div>
              <div>
                <div>Region</div>
                <br />
                <cv-dropdown v-model="region" class="w250px">
                  <cv-dropdown-item value="mando"
                    >Netzbereich Dorsten-Marl 1</cv-dropdown-item
                  >
                  <cv-dropdown-item value="nite-owl"
                    >Netzbereich Dorsten-Marl 2</cv-dropdown-item
                  >
                  <cv-dropdown-item value="mysterious"
                    >Netzbereich Dorsten-Marl 3</cv-dropdown-item
                  >
                  <cv-dropdown-item value="bounty-hunter"
                    >Netzbereich Dorsten-Marl 4</cv-dropdown-item
                  >
                </cv-dropdown>
              </div>
            </span>
          </div>
          <div class="widget-wrap">
            <!-- <cv-column> -->
            <!-- <cv-tile> -->
            <WidgetKPI>
              <template #title>
                <warning-alt-inverted-icon fill="orange" />
                Overdue Work Orders
              </template>
              <template #primary>6</template>
              <template #body>
                workorders overdue & need to be rescheduled
                <br />
                <cv-tag kind="red" label="Requires action"></cv-tag>
              </template>
              <template #bottomline>
                Reschedule now<ArrowRightIcon />
              </template>
            </WidgetKPI>
            <!-- </cv-tile> -->
            <!-- </cv-column> -->
            <!-- <cv-column> -->
            <!-- <RouterLink to="AnnualPlanning"> -->
            <WidgetKPI
              ><template #title
                ><warning-alt-filled-icon fill="yellow" />Planned utilisation
                too low</template
              ><template #primary>&lt;15%</template>
              <template #body>
                Utilisation in upcoming month, complete annual plan and dispatch
                upcoming task to your technicians
              </template>
              <template #bottomline
                >View Utilisation<Arrow-right-icon /></template
            ></WidgetKPI>
            <!-- </RouterLink> -->
            <!-- </cv-column>
            <cv-column> -->
            <WidgetKPI @click="gotoPlanningMode()"
              ><template #title
                ><circle-dash-icon />Maintenance plan 2026 available</template
              ><template #primary>1647</template
              ><template #body
                >new work orders need to be planned in 2026<br />
                <cv-tag kind="blue" label="Annual plan"></cv-tag></template
              ><template #bottomline>Edit<edit-icon /></template
            ></WidgetKPI>
            <!-- </cv-column> -->
          </div>
          <div class="frame0">
            <div class="frame1">
              <div class="frame-content background_white">
                <div class="title0">
                  <div class="inline">
                    <information-icon />&nbsp;Total work order distribution
                  </div>
                </div>
                <cv-content-switcher
                  id="workOrders"
                  aria-label="Choose content"
                  @selected="onSelected"
                >
                  <cv-content-switcher-button
                    owner-id="year"
                    parent-switcher="workOrders"
                    :selected="false"
                    >Work orders</cv-content-switcher-button
                  >
                  <cv-content-switcher-button
                    owner-id="month"
                    parent-switcher="workOrders"
                    :selected="true"
                    >Work Order Status</cv-content-switcher-button
                  >
                </cv-content-switcher>
                <div id="app" class="p-1">
                  <CcvDonutChart :data="donutData" :options="donutOptions" />
                </div>
                <br />
                <br />
                <div class="title0">
                  <div class="inline">View all work orders</div>
                  <span>
                    <arrow-right-icon />
                  </span>
                </div>
              </div>
            </div>
            <div class="frame1">
              <div class="frame-content background_white">
                <div class="title0">
                  <div class="inline">
                    <in-progress-icon />&nbsp;Utilization Forecast: Required vs.
                    Available Capacity
                  </div>
                </div>
                <cv-content-switcher
                  id="timeFrame"
                  aria-label="Choose content"
                  @selected="onSelected"
                >
                  <cv-content-switcher-button
                    parent-switcher="timeFrame"
                    :selected="true"
                    >Next 7 days</cv-content-switcher-button
                  >
                  <cv-content-switcher-button
                    parent-switcher="timeFrame"
                    :selected="false"
                    >Next 30 days</cv-content-switcher-button
                  >
                  <cv-content-switcher-button
                    parent-switcher="timeFrame"
                    :selected="false"
                  >
                    This year
                  </cv-content-switcher-button>
                </cv-content-switcher>
                <br />
                <div class="title">&lt;15%</div>
                Utilisation in upcoming month, complete annual plan and dispatch
                upcoming task to your technicians
                <br />
                <br />
                <br />
                <CcvStackedBarChart class="barChart" :data :options />
              </div>
            </div>
          </div>

          <!-- <cv-row>
          <cv-column> -->
          <CvToggle-Skeleton v-if="loading" />
          <!-- <cv-subtitle>hehe</cv-subtitle> -->
          <!-- <cv-toggle
          v-model="showCatchPhrases"
          value="catch-pharse"
          :label="t('catch-phrases')"
          class="mb-2"
        >
          <template #text-right>
            {{ t("yes") }}
          </template>
          <template #text-left>
            {{ t("no") }}
          </template>
        </cv-toggle> -->
          <!-- <cv-tile> hohoho </cv-tile> -->
          <!-- <cv-data-table-skeleton
            v-if="loading"
            :columns="[t('name'), t('price'), 'CJ', t('location'), t('rarity')]"
            :rows="7"
            :title="t('fish')"
            :helper-text="t('fish-info')"
          />
          <cv-data-table
            v-else
            v-model:rows-selected="selectedFish"
            :pagination="i18nPagination"
            :zebra="true"
            :title="t('fish')"
            :helper-text="t('fish-info')"
            :batch-cancel-label="t('cancel')"
            :action-bar-aria-label="t('actions')"
            :collapse-all-aria-label="t('collapse-all')"
            :expand-all-aria-label="t('expand-all')"
            :select-all-aria-label="t('select-all')"
            :search-label="t('search')"
            :search-placeholder="t('search')"
            :search-clear-label="t('search-clear')"
            :expandable="true"
            @pagination="onPagination"
            @search="onSearch"
            @sort="onSort"
          >
            <template #items-selected="{ scope }">
              {{ t("selected-num", { count: scope.count }) }}
            </template>
            <template #of-n-pages="{ scope }">
              {{ t("pages-num", { count: scope.pages }) }}
            </template>
            <template #range-text="{ scope }">
              {{ t("range-text", scope) }}
            </template>
            <template v-if="filteredFish.length > 0" #batch-actions>
              <cv-button :icon="hideIcon" @click="onHideSelected">
                {{ t("hide") }}
              </cv-button>
            </template>
            <template v-if="fishStore.someHidden" #actions>
              <cv-data-table-action
                :aria-label="t('show')"
                :alt="t('show')"
                @click="toggleShowAll"
              >
                <hide-icon v-if="showHidden" class="bx--toolbar-action__icon">
                  <title>{{ t("hide") }}</title>
                </hide-icon>
                <show-all-icon v-else class="bx--toolbar-action__icon">
                  <title>{{ t("show") }}</title>
                </show-all-icon>
              </cv-data-table-action>
            </template>
            <template #headings>
              <cv-data-table-heading
                :heading="t('name')"
                name="name"
                sortable
              />
              <cv-data-table-heading heading="" />
              <cv-data-table-heading
                v-if="md"
                :heading="t('price')"
                name="price"
                sortable
              />
              <cv-data-table-heading
                v-if="md"
                id="fish-heading-cj"
                heading="CJ"
                name="price-cj"
                sortable
              />
              <cv-data-table-heading
                id="fish-heading-location"
                :heading="t('location')"
              />
              <cv-data-table-heading
                v-if="md"
                id="fish-heading-rarity"
                :heading="t('rarity')"
              />
            </template>
            <template #data>
              <fish-row v-for="row in paginated" :key="row.key" :fish="row" />
              <fish-row-empty v-if="filteredFish.length === 0" />
            </template>
          </cv-data-table>
          <mobile-table-pagination
            v-if="!carbonMd"
            :number-of-items="pagination.numberOfItems"
            :table-pagination="currentPagination"
            @pagination="onPagination"
          /> -->
          <!-- </cv-column>
        </cv-row> -->
        </div>
        <!-- </cv-row> -->
      </cv-column>
      <cv-column :lg="3" class="negativeTopMargin1 noPad">
        <div class="background_white noPad">
          <div class="right-content">
            <div class="frame-content">
              <div class="h-spread">
                <div class="title20 inline">Alerts & AI Suggestions</div>
                <span class="link"> Show all </span>

                <!-- <div class="text14">Follow these steps for annual planning</div> -->
              </div>
              <cv-tag label="All (4)" kind="high-contrast" />
              <cv-tag label="AI Suggestions" />
              <div>
                <br />
                <br />
                <WidgetKPI class="red">
                  <template #title>
                    <div class="h-spread">
                      <div class="inline">
                        <error-filled-icon fill="red"></error-filled-icon>
                        &nbsp;
                        <div class="text14 bold inline">
                          WO overdue: Attention required
                        </div>
                      </div>
                      <div class="inline">
                        01.01.26 <overflow-menu-vertical-icon />
                      </div>
                    </div>
                  </template>
                  <template #body>
                    6 work orders overdue & need to be rescheduled
                  </template>
                </WidgetKPI>
                <br />
                <br />
                <WidgetKPI class="yellow">
                  <template #title>
                    <div class="h-spread">
                      <div class="inline">
                        <error-filled-icon fill="red"></error-filled-icon>
                        &nbsp;
                        <div class="text14 bold inline">
                          Utilisation low: Attention required
                        </div>
                      </div>
                      <div class="inline">
                        01.01.26 <overflow-menu-vertical-icon />
                      </div>
                    </div>
                  </template>
                  <template #body>
                    &lt;15% total utilisation in upcoming month, complete<br />annual
                    plan and dispatch upcoming task to your technicians
                  </template>
                </WidgetKPI>
                <br />
                <br />
                <WidgetKPI class="blue" @click="gotoPlanningMode()">
                  <template #title>
                    <div class="h-spread">
                      <div class="inline">
                        <undefined-filled-icon fill="purple"/>
                        &nbsp;
                        <div class="text14 bold inline">Create annual plan</div>
                      </div>
                      <div class="inline">
                        01.01.26 <overflow-menu-vertical-icon />
                      </div>
                    </div>
                  </template>
                  <template #body>
                    Create your annual plan for 2026. 1647<br />Work Orders are
                    available for annual planning.
                  </template>
                </WidgetKPI>
              </div>
            </div>
          </div>
        </div>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>

<style scoped>
.content {
  display: flex;
  /* height: 1038px; */
  /* padding: 106px 32px 24px 80px; */
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
}

.title-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  /* align-items: center;
  justify-content: space-between; */
}

.title-frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
}

.title {
  /* color: #000; */

  /* Productive/heading-04 */
  font-family: "IBM Plex Sans";
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 128.571% */
}

.title20 {
  color: var(--Text-text-primary, #161616);

  /* Fixed heading styles/heading-03 */
  font-family: var(--Fixed-Heading-Heading-03-Font-family, "IBM Plex Sans");
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 140% */
}

.text14 {
  color: var(--Text-text-primary, #161616);

  /* Body styles/body-compact-01 */
  font-family: var(--Fixed-Body-Font-family, "IBM Plex Sans");
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.16px;
}

.bold {
  font-weight: 800;
}

.subtitle {
  /* color: #000; */

  /* Body styles/body-01 */
  font-family: var(--Fixed-Body-Font-family, "IBM Plex Sans");
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: 0.16px;
}

.widget-wrap {
  display: flex;
  /* align-items: flex-start; */
  gap: 16px;
  align-self: stretch;
}

.frame0 {
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
}

.frame1 {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
  align-self: stretch;
}

.right-content {
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: flex-start; */
  /* flex: 1 0 0; */
  /* align-self: stretch; */
  position: fixed;
  top: 3rem;
  bottom: 0;
  right: 0;
  background: white;
}

.v-stretch {
  /* position: fixed; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  justify-content: space-between;
  /* bottom: 0px; */
  /* height: 100vh; */
}

.bottom {
  position: absolute;
  bottom: 0px;
  right: 0px;
  /* align-items: flex-end; */
  flex-direction: column;
  /* left: 0px; */
  width: 100%;

  display: flex;
}

.guidance {
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-subtle-contextual, #e0e0e0);
  background: var(--Notification-notification-info-background, #edf5ff);
}

.guidance-title {
  color: #000;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  /* Fixed heading styles/heading-compact-01 */
  font-family: var(--Fixed-Heading-Font-family, "IBM Plex Sans");
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.16px;
}

.guidance-content {
  color: #000;

  /* Utility styles/helper-text-01 */
  font-family: var(
    --fixed-utility-helper-text-0102-font-family,
    "IBM Plex Sans"
  );
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.32px;
}

.bold {
  font-weight: 700;
}

.outdent {
  margin-left: 20px;
}

.cautionColor {
  /* background: var(--Transparent, rgba(255, 255, 255, 0.00));
  background-blend-mode: multiply; */
  background: orange;
  /* color: var(--cds-support-warning); */
}

.yellow {
  background: var(--Notification-notification-warning-background, #fcf4d6);
  /* background: yellow; */
}

.blue {
  background: var(--Notification-notification-info-background, #edf5ff);
}

.footer-wrapper {
  /* background-color: red; */
  /* position: absolute; */
  /* bottom: 0px; */
  /* right: 0px; */
  /* left: 0px; */
  width: 100%;

  display: flex;
  /* flex-direction: row;
  align-items: flex-start;
  align-self: stretch;
  padding-left: 0px;
  padding-right: 0px; */
}

.footer-wrapper > cv-button {
}

.bottom0 {
  bottom: 0;
}

.w50 {
  /* display: relative; */
  /* align-self: stretch; */
  width: 50%;
  /* height: 100%; */
  /* bottom: 0; */
  /* top: 0; */
}

.frame-progress {
  margin-bottom: 75px;
}

flex {
  display: flex;
}

ul li {
  width: 100%;
}

.w10 {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-self: stretch;
  justify-content: space-between;
}

.w250px {
  width: 250px;
}

.border1gray {
  border-width: 1px;
  border-color: var(--border-subtle-contextual);
}

.step-button-left {
  /* display: flex; */
  /* float: left; */
  /* align-items: stretch; */
  /* height: 400%; */
  /* flex-grow: 1; */
  /* max-height: 100%; */
  /* height:4rem; */
  /* width: 30%; */
}
.step-button-right {
  /* flex-grow: 1; */
  /* display: inline-block; */
  /* float: right; */
  /* width: 30%; */
}

.frame-content {
  width: 100% !important;
  padding: 16px;
  height: max-content;
}

.background_white {
  /* display: block; */
  background: white;
  /* flex-direction: column; */
  /* height: auto; */
  /* align-self: stretch; */
  /* background: var(--color-gray-200, currentcolor); */
}

.map {
  background: url("@/assets/map.png") lightgray 35% / cover no-repeat;
  width: 100%;
  height: 550px;
  /* height: auto; */
  /* object-fit: none; */
  /* background-size: auto 100%; */
  /* height: 100%; */
  /* background: url("@/assets/map.png");
    background-size: cover;
    background-repeat:   no-repeat;
    background-position: center center; */
}

.barchart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;

  background: white;
}

.chart-content {
  display: flex;
  width: 717px;
  height: 403px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.frame2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
}

.barChart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
}

.cv-grid {
  right: 0;
  margin-right: 0px;
  padding-right: 0px;
}

.noMargins {
  margin: 0rem;
}

.negativeTopMargin1 {
  margin-top: -1rem;
}

.noPad {
  padding: 0px;
  height: 100%;
}

.pad16 {
  padding: 16px;
}

/* .red {
  background: var(--Notification-notification-error-background, #fff1f1);
} */

.h-spread {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.cv-list {
  padding-left: 20px;
}

.checkbox.background-4-1-1.active {
  background: var(--cds-charts-4-1-1, #6929c4);
}
.checkbox.background-4-1-2.active {
  background: var(--cds-charts-4-1-2, #012749);
}
.checkbox.background-4-1-3.active {
  background: var(--cds-charts-4-1-3, #009d9a);
}
.checkbox.background-4-1-4.active {
  background: var(--cds-charts-4-1-4, #ee5396);
}

/* .bx--data-table thead {
    height: 0px;
} */

.bx--structured-list {
  margin-bottom: 0px;
}

.bx--structured-list-row.bx--structured-list-row--header-row {
  border-bottom: 0px;
}
.bx--structured-list-row {
  border-bottom: 0px;
}

.bx--data-table tr {
  height: 0px;
}

.bx--grid {
  max-width: 105rem;
}

.no-lines .bx--data-table td {
  border-bottom: 0px;
}

.qualification-header {
  color: #000;

  /* Fixed heading styles/heading-compact-01 */
  font-family: var(--Fixed-Heading-Font-family, "IBM Plex Sans");
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.16px;
}

.modal-header {
  color: var(--Text-text-primary, #161616);

  /* Fixed heading styles/heading-02 */
  font-family: var(--Fixed-Heading-Font-family, "IBM Plex Sans");
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
}

.ai-label {
  display: flex;
  width: 24px;
  height: 24px;
  padding: 3px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border: 1px solid var(--Border-border-inverse, #161616);
  background: var(--Transparent, rgba(255, 255, 255, 0));
  background-blend-mode: multiply;
}

.inline {
  align-content: baseline;
}
/*
.bx--btn {
  min-height: 14px;
} */

/* .button_ghost {
  height: 100%;
  padding: 0px;
} */
</style>
