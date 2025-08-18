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
  Time16 as TimeIcon,
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
  Settings16 as SettingsIcon,
  Ai16 as AiIcon,
  // Login20 as LoginIcon,
  // UserAvatar20 as AvatarIcon,
  // Switcher20 as SwitcherIcon,
  // ColorPalette20 as ThemeIcon,
} from "@carbon/icons-vue";
import calendarData0 from "@/assets/data/annualPlanningCapacityCalendarData.ts";
import chartData from "@/assets/data/annualPlanningCapacityStackedBarChartData.ts";
import chartOptions from "@/assets/data/annualPlanningCapacityStackedBarChartOptions.ts";
import resourcesData from "@/assets/data/annualPlanningInternalResources.ts";
import providersData from "@/assets/data/annualPlanningExternalProviders.ts";

const router = useRouter();

const calendarData = ref(calendarData0);
const data = ref(chartData);
const options = ref(chartOptions);
const resources = ref(resourcesData);
const providers = ref(providersData);
// console.warn(resources.value)

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

function saveSelectedPlan() {
  console.warn("saveSelectedPlan");
  router.push("DispatchingStart");
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
      <cv-column :lg="14">
        <!-- <cv-row> -->
        <div class="content">
          <div class="title-area">
            <div class="title-frame">
              <div class="title">New plan - Create Plan</div>
              <div class="subtitle">
                Review, adjust, and confirm your planning setup
              </div>
            </div>
          </div>
          <div class="frame0">
            <div class="frame1 w-left">
              <div class="frame-top w100">
                <div class="frame-left-panel">
                  <FrameTitle>
                    <template #title>Annual Plan 2026 - Scenario 1</template>
                    <template #subtitle
                      ><div class="subtitle">
                        Choose your constraints and parameters<br />
                        for the annual plan.
                      </div>
                    </template>
                    <template #rightSide>
                      <!-- <ai-icon/> -->
                      <div class="ai-label">AI</div>
                      <!-- <cv-button
                      class="button_ghost"
                      :icon="NewTabIcon"
                      kind="ghost"
                    >
                      Show all
                    </cv-button> -->
                    </template>
                  </FrameTitle>
                  <FrameTitle>
                    <template #title>Panning parameters</template>
                    <template #subtitle
                      ><div class="subtitle">
                        Currently selected:<br />Resource Allocation, Max.UTI
                        80%, Optimise Routes
                      </div></template
                    >
                    <template #rightSide>
                      <edit-icon></edit-icon>
                    </template>
                  </FrameTitle>
                  <FrameTitle class="toggle">
                    <template #title
                      ><cv-toggle checked hideLabel
                        ><template v-slot:text-left>Use AI Predictions</template
                        ><template v-slot:text-right
                          >Use AI Predictions</template
                        ></cv-toggle
                      ></template
                    >
                    <template #rightSide>
                      <settings-icon></settings-icon>
                    </template>
                  </FrameTitle>
                  <FrameTitle class="toggle">
                    <template #title
                      ><cv-toggle hideLabel
                        ><template v-slot:text-left
                          >Include ext. capacity</template
                        ><template v-slot:text-right
                          >Include ext. capacity</template
                        ></cv-toggle
                      ></template
                    >
                    <template #rightSide>
                      <settings-icon></settings-icon>
                    </template>
                  </FrameTitle>
                  <FrameTitle>
                    <template #title>Create est. time blockers</template>
                    <template #subtitle
                      >The AI Tag shows the recommended level<br />based on past
                      data.</template
                    >
                    <template #rightSide>
                      <div class="ai-label">AI</div>
                    </template>
                  </FrameTitle>
                  <span class="slider inline">
                    <cv-slider
                      label="Trainings"
                      min="0"
                      max="30"
                      maxLabel="30"
                      value="17"
                    ></cv-slider
                    ><cv-button kind="ghost" :icon="SettingsIcon">
                      edit
                    </cv-button>
                  </span>
                  <span class="slider inline">
                    <cv-slider
                      label="Absences (sick leave, etc.)"
                      min="0"
                      max="70"
                      maxLabel="70"
                      value="10"
                    ></cv-slider
                    ><cv-button kind="ghost" :icon="SettingsIcon">
                      edit
                    </cv-button>
                  </span>
                  <span class="slider inline">
                    <cv-slider
                      label="Faults"
                      min="0"
                      max="300"
                      maxLabel="300"
                      value="160"
                    ></cv-slider
                    ><cv-button kind="ghost" :icon="SettingsIcon">
                      edit
                    </cv-button>
                  </span>
                </div>
                <div class="frame-right-panel">
                  <FrameTitle>
                    <template #title>Utilisation calendar (%)</template>
                  </FrameTitle>
                  <span class="inline h-stretch">
                    <cv-content-switcher
                      id="timeFrame"
                      aria-label="Choose content"
                      @selected="onSelected"
                    >
                      <cv-content-switcher-button
                        owner-id="year"
                        parent-switcher="timeFrame"
                        :selected="true"
                        >Year</cv-content-switcher-button
                      >
                      <cv-content-switcher-button
                        owner-id="month"
                        parent-switcher="timeFrame"
                        :selected="selectedIndex === 1"
                        >Month</cv-content-switcher-button
                      >
                    </cv-content-switcher>
                    <cv-content-switcher id="units" aria-label="Choose content">
                      <cv-content-switcher-button
                        owner-id="percent"
                        parent-switcher="units"
                        :selected="true"
                        >%</cv-content-switcher-button
                      >
                      <cv-content-switcher-button
                        owner-id="time"
                        parent-switcher="units"
                        :selected="selectedIndex === 1"
                        ><TimeIcon
                      /></cv-content-switcher-button>
                    </cv-content-switcher>
                  </span>
                  <div>
                    <!-- <div v-for="n in 6"> -->
                    <div>
                      <div class="inline h-stretch">
                        <div>January</div>
                        <div>February</div>
                        <div>March</div>
                      </div>
                      <div class="inline h-stretch">
                        <div
                          v-for="w in calendarData[0]"
                          class="frame-week"
                          :class="`background-${w.color}`"
                        >
                          {{ w.value }}
                        </div>
                      </div>
                      <div class="inline h-stretch">
                        <div>March</div>
                        <div>April</div>
                        <div>May</div>
                      </div>
                      <div class="inline h-stretch">
                        <div
                          v-for="w in calendarData[1]"
                          class="frame-week"
                          :class="`background-${w.color}`"
                        >
                          {{ w.value }}
                        </div>
                      </div>
                      <div class="inline h-stretch">
                        <div>May</div>
                        <div>June</div>
                        <div>July</div>
                      </div>
                      <div class="inline h-stretch">
                        <div
                          v-for="w in calendarData[2]"
                          class="frame-week"
                          :class="`background-${w.color}`"
                        >
                          {{ w.value }}
                        </div>
                      </div>
                      <div class="inline h-stretch">
                        <div>July</div>
                        <div>August</div>
                        <div>September</div>
                      </div>
                      <div class="inline h-stretch">
                        <div
                          v-for="w in calendarData[3]"
                          class="frame-week"
                          :class="`background-${w.color}`"
                        >
                          {{ w.value }}
                        </div>
                      </div>
                      <div class="inline h-stretch">
                        <div>September</div>
                        <div>October</div>
                        <div>November</div>
                      </div>
                      <div class="inline h-stretch">
                        <div
                          v-for="w in calendarData[4]"
                          class="frame-week"
                          :class="`background-${w.color}`"
                        >
                          {{ w.value }}
                        </div>
                      </div>
                      <div class="inline h-stretch">
                        <div>November</div>
                        <div>December</div>
                      </div>
                      <div class="inline h-stretch">
                        <div
                          v-for="w in calendarData[5]"
                          class="frame-week"
                          :class="`background-${w.color}`"
                        >
                          {{ w.value }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="cds--cc--legend horizontal clickable"
                      width="100%"
                      height="100%"
                      role="group"
                      aria-label="Data groups"
                      data-name="legend-items"
                    >
                      <div class="legend-item active">
                        <div
                          class="checkbox background-low active"
                          role="checkbox"
                          tabindex="0"
                          aria-labelledby="chart-168b558baf544-legend-datagroup-0-title"
                          aria-checked="true"
                          width="13"
                          height="13"
                        ></div>
                        <p id="chart-168b558baf544-legend-datagroup-0-title">
                          Low <70%
                        </p>
                      </div>
                      <div class="legend-item active">
                        <div
                          class="checkbox background-medium active"
                          role="checkbox"
                          tabindex="0"
                          aria-labelledby="chart-168b558baf544-legend-datagroup-1-title"
                          aria-checked="true"
                          width="13"
                          height="13"
                        >
                          <svg
                            focusable="false"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 31 28"
                            aria-hidden="true"
                            style="will-change: transform"
                          >
                            <path
                              d="M13 21.2l-7.1-7.1-1.4 1.4 7.1 7.1L13 24 27.1 9.9l-1.4-1.5z"
                            ></path>
                          </svg>
                        </div>
                        <p id="chart-168b558baf544-legend-datagroup-1-title">
                          Medium <=80%
                        </p>
                      </div>
                      <div class="legend-item active">
                        <div
                          class="checkbox background-high active"
                          role="checkbox"
                          tabindex="0"
                          aria-labelledby="chart-168b558baf544-legend-datagroup-2-title"
                          aria-checked="true"
                          width="13"
                          height="13"
                        >
                          <svg
                            focusable="false"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 31 28"
                            aria-hidden="true"
                            style="will-change: transform"
                          >
                            <path
                              d="M13 21.2l-7.1-7.1-1.4 1.4 7.1 7.1L13 24 27.1 9.9l-1.4-1.5z"
                            ></path>
                          </svg>
                        </div>
                        <p id="chart-168b558baf544-legend-datagroup-2-title">
                          High >80%
                        </p>
                      </div>
                      <div class="legend-item active">
                        <div
                          class="checkbox background-critical active"
                          role="checkbox"
                          tabindex="0"
                          aria-labelledby="chart-168b558baf544-legend-datagroup-3-title"
                          aria-checked="true"
                          width="13"
                          height="13"
                        >
                          <svg
                            focusable="false"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 31 28"
                            aria-hidden="true"
                            style="will-change: transform"
                          >
                            <path
                              d="M13 21.2l-7.1-7.1-1.4 1.4 7.1 7.1L13 24 27.1 9.9l-1.4-1.5z"
                            ></path>
                          </svg>
                        </div>
                        <p id="chart-168b558baf544-legend-datagroup-3-title">
                          Critical >90%
                        </p>
                      </div>
                    </div>
                  </div>
                  <FrameTitle>
                    <template #title>Capacity breakdown</template>
                    <template #rightSide>
                      <SettingsIcon />
                    </template>
                  </FrameTitle>
                  <span class="inline"
                    ><div>Internal: 960PD used (0 available)</div>
                    <div>total 960 PD/y</div></span
                  >
                  <span class="inline"
                    ><div>External: 40PD used</div>
                    <div>total 40 PD/y</div></span
                  >
                  <CcvStackedBarChart class="barChart" :data :options />
                </div>
              </div>

              <!-- <div class="frame-content background_white">
                <CcvStackedBarChart class="barChart" :data :options />
              </div> -->
              <div class="footer-wrapper">
                <cv-button kind="secondary" class="w50 bottom0"
                  >Save as template</cv-button
                >
                <cv-button :icon="CheckmarkIcon" class="w50 bottom0"
                  >Selected</cv-button
                >
                <!-- </span> -->
              </div>
              <!-- <div class="frame-content background_white"></div> -->
              <!-- <div class="frame-content background_white"></div> -->
            </div>
            <div class="frame1 w-right">
              <div class="frame-content background_white noPad">
                <div class="blurredScenario"></div>
              </div>
            </div>
          </div>
        </div>
      </cv-column>
      <cv-column :lg="3" class="negativeTopMargin1 noPad">
        <div class="background_white noPad">
          <div class="right-content">
            <div class="frame-content">
              <div class="title20">Steps</div>
              <div class="text14">Follow these steps for annual planning</div>
            </div>
            <div class="frame-content v-stretch">
              <!-- MAIN
            <div>hoho</div>
            <div>hoho</div> -->
              <cv-progress
                :initial-step="2"
                vertical="vertical"
                :space-equally="spaceEqually"
              >
                <cv-progress-step
                  :complete="true"
                  id="step-1"
                  label="Set Scope & Parameters"
                  additional-info="Define the planning boundaries and inputs"
                  description="time icon description"
                >
                </cv-progress-step>
                <cv-progress-step
                  :complete="true"
                  id="step-2"
                  label="Select Planning Mode"
                  additional-info="Choose between automated or manual planning"
                  @step-clicked="onStepClicked"
                />
                <cv-progress-step
                  id="step-3"
                  label="Create Plan"
                  additional-info="Review, adjust & confirm your planning setup"
                  @step-clicked="onStepClicked"
                />
              </cv-progress>
            </div>
            <div class="bottom">
              <div class="guidance">
                <p className="guidance-title">
                  Guidance to success:<InformationFilledIcon fill="#0f62fe" />
                </p>
                <p className="guidance-content">
                  This page allows you to compare and manipulate different
                  planning scenarios.
                  <br />
                  <br />
                  You have selected the Auto-Assign AI Mode, the shown scenario
                  is created by the system. You can manipulate each parameter to
                  your liking or create other scenarios to directly compare them
                  on one screen.
                </p>
              </div>
              <div class="footer-wrapper">
                <!-- <span> -->
                <!-- <div class="column50"><cv-button kind="secondary">Back</cv-button></div>
                <div class="column50"><cv-button :icon="ArrowRightIcon">Continue</cv-button></div> -->
                <!-- </span> -->
                <!-- <span class="full-width"> -->
                <cv-button kind="secondary" class="w50 bottom0">Back</cv-button>
                <cv-button
                  :icon="ArrowRightIcon"
                  class="w50 bottom0"
                  @click="saveSelectedPlan()"
                  >Save selected plan</cv-button
                >
                <!-- </span> -->
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
  flex-direction: row;
  align-items: flex-start;
  gap: 6px;
  flex: 1 0 0;
  align-self: stretch;
}

.frame1 {
  display: flex;
  width: 833px;
  height: 820px;
  flex-direction: column;
  align-items: flex-start;
}

.frame-top {
  display: flex;
  width: 833px;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
}

.frame-left-panel {
  background-color: white;
  /* background-color: red; */
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  height: 100%;
}

.frame-right-panel {
  background-color: white;
  /* background-color: green; */
  display: flex;
  padding: 16px 16px 16px 17px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
}

.frame-content {
  width: 100% !important;
  padding: 16px;
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

.h-stretch {
  /* position: fixed; */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  justify-content: space-between;
  /* bottom: 0px; */
  /* height: 100vh; */
}

.frame-week {
  display: flex;
  width: 36px;
  height: 36px;
  padding: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
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

.checkbox.background-low.active {
  background: #bae6ff;
}
.checkbox.background-medium.active {
  background: var(--cds-charts-4-1-2, #a7f0ba);
}
.checkbox.background-high.active {
  background: var(--cds-charts-4-1-3, #ffd9be);
}
.checkbox.background-critical.active {
  background: var(--cds-charts-4-1-4, #a2191f);
}

.background-low {
  background: #bae6ff;
}

.background-medium {
  background: #a7f0ba;
}

.background-high {
  background: #ffd9be;
}

.background-critical {
  background: #a2191f;
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
  /* align-self: stretch; */
  bottom: 0;
  max-width: 40rem;
}

.w50 {
  /* display: relative; */
  /* align-self: stretch; */
  width: 50%;
  /* height: 100%; */
  /* bottom: 0; */
  /* top: 0; */
}

.w-left {
  width: 70%;
}

.w-right {
  width: 30%;
}

.w100 {
  width: 100%;
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

.background_white {
  background: white;
  /* background: var(--color-gray-200, currentcolor); */
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

.cv-list {
  padding-left: 20px;
}

.blurredScenario {
  background: url("@/assets/new-scenario-blurred.png") lightgray 35% / cover
    no-repeat;
  height: 100%;
  /* background-size: auto 100%; */
  /* height: 100vh; */
  /* background: url("@/assets/map.png");
    background-size: cover;
    background-repeat:   no-repeat;
    background-position: center center; */
}

/* .checkbox.background-4-1-1.active {
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
} */

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

.toggle {
  height: 40px;
}

.slider {
  height: 50px;
}

.inline {
  display: flex;
  flex-direction: row;
  width: 100%;
  /* align-items: flex-start; */
  /* flex: 1 0 0; */
  align-self: stretch;
  justify-content: space-between;
}

.bx--content-switcher {
  width: auto;
}

/* .bx--btn {
  min-height: 14px;
} */

/* .button_ghost {
  height: 100%;
  padding: 0px;
} */
</style>
