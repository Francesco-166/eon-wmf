<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useFishStore } from '../stores/fish'
// import FishRow from '../components/FishRow.vue'
import ResourceRow from '../components/ResourceRow.vue'
import { computed, onMounted, ref, provide, watch } from 'vue'
import { View20 as ShowAllIcon, ViewOff20 as HideIcon } from '@carbon/icons-vue'
import { useTranslation } from 'i18next-vue'
// import FishRowEmpty from '@/components/FishRowEmpty.vue'
import { useLanguageStore } from '@/stores/language.js'
import { useBreakpoints } from '@/composables/useBreakpoints.js'
// import MobileTablePagination from '@/components/MobileTablePagination.vue'
import WidgetKPI from '../components/WidgetKPI.vue'
import FrameTitle from '../components/FrameTitle.vue'
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
  AiLabel24 as AiLabelIcon,
  // Idea16 as IdeaIcon,
  // Login20 as LoginIcon,
  // UserAvatar20 as AvatarIcon,
  // Switcher20 as SwitcherIcon,
  // ColorPalette20 as ThemeIcon,
} from '@carbon/icons-vue'
import chartData from '@/assets/data/annualPlanningStackedBarChartData.ts'
// import chartOptions from '@/assets/data/annualPlanningStackedBarChartOptions.ts'
import resourcesData from '@/assets/data/annualPlanningInternalResources.ts'
import providersData from '@/assets/data/annualPlanningExternalProviders.ts'

import { useStorage } from '@vueuse/core'

const router = useRouter()
const data = ref(chartData)
// const options = ref(chartOptions)
const resources = ref(resourcesData)
const providers = ref(providersData)
// console.warn(resources.value)
const selectPlanningModeModalVisible = ref(false)

const options = computed(() => {
  return {
    title: 'Work order distribution by Month',
    theme: theme.value, //'g90',
    axes: {
      left: {
        mapsTo: 'value',
        stacked: true,
        title: '%',
      },
      bottom: {
        mapsTo: 'key',
        scaleType: 'labels',
      },
    },
    height: '400px',
  }
})

const theme = ref(useStorage('theme', 'g10'))
options.value.theme = theme.value

// const planningModeAI = ref(true);
// const planningModeManual = ref(false);

const { t, i18next } = useTranslation()
const langStore = useLanguageStore()

const hideIcon = HideIcon
const fishStore = useFishStore()
const loading = ref(false)
const pagination = ref({ numberOfItems: 0, pageSizes: [7, 11, 23, 31] })
const i18nPagination = computed(() => {
  return {
    ...pagination.value,
    pageSizesLabel: t('items'),
    backwardText: t('previous-page'),
    forwardText: t('next-page'),
    pageNumberLabel: t('page-number'),
  }
})
onMounted(() => {
  loading.value = true
  try {
    fishStore.loadFish().finally(() => {
      pagination.value.numberOfItems = fishStore.fish.length
      loading.value = false
    })
  } catch (e) {
    console.error('error loading fish from API', e.message)
  }
})
const sortKeys = ref({ index: '0', order: 'none', name: null })
function onSort(keys) {
  sortKeys.value = keys
}

const searchFilter = ref('')
/**
 * Set a search filter
 * @param {string} val
 */
function onSearch(val) {
  searchFilter.value = val?.trim()
}
const showHidden = ref(false)
const filteredFish = computed(() => {
  // start with all the fish
  /** @type {Array<FishData>} */
  let show = fishStore.fish

  // if we are not showing hidden fish, remove them
  if (!showHidden.value) show = show.filter((fish) => !fish.hidden)

  // if we have search term, filter based on that term
  if (searchFilter.value) show = show.filter((fish) => fish.key.includes(searchFilter.value))

  // If we are sorting the data, do that here
  if (sortKeys.value.order !== 'none') {
    show.sort((a, b) => {
      const _a = a[sortKeys.value.name] // fish name or price
      const _b = b[sortKeys.value.name] // fish name or price
      let cmp = 0
      // sort by price (or some other number value that may get added later)
      if (typeof _a === 'number') {
        cmp = _a - _b
      }
      // or sort by name
      else if (sortKeys.value.name === 'name') {
        const key = 'name-' + langStore.languageObject.api
        const nameA = _a[key] || ''
        const nameB = _b[key] || ''
        cmp = nameA.localeCompare(nameB, i18next.language)
      }
      // reverse the sort
      if (sortKeys.value.order === 'descending') cmp = -cmp
      return cmp
    })
  }
  return show
})
watch(filteredFish, () => {
  pagination.value.numberOfItems = filteredFish.value.length
})

function selectPlanningMode() {
  console.warn('seelectPlanningMode')
  selectPlanningModeModalVisible.value = true
}

const planningModeAI = ref(true)
// planningModeAI.value = computed(() => {
//   console.warn("AI....");
//   return !planningModeManual.value;
// });

const planningModeManual = computed(() => {
  return !planningModeAI.value
})

// watch(planningModeAI, () => {
//   console.warn("AI");
//   //   planningModeManual.value = false;
// });
watch(planningModeManual, () => {
  console.warn('manual')
  planningModeAI.value = !planningModeManual.value
})

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
  console.warn('primary')
  router.push('DispatchingReview')
}

function toggleShowAll() {
  showHidden.value = !showHidden.value
}

const currentPagination = ref({ start: 1, length: 7 })
const paginated = computed(() => {
  const change = currentPagination.value
  return filteredFish.value.slice(change.start - 1, change.start + change.length - 1)
})
function onPagination(change) {
  currentPagination.value = change
}
const selectedFish = ref([])
function onHideSelected() {
  for (let i = 0; i < selectedFish.value.length; i++) {
    const key = selectedFish.value[i]
    fishStore.hideFish(key)
  }
  selectedFish.value = []
}

const showCatchPhrases = ref(false)
provide('show-catch-phrases', showCatchPhrases)

const { md, carbonMd } = useBreakpoints()
</script>

<template>
  <cv-grid>
    <cv-row>
      <cv-column :lg="14">
        <!-- <cv-row> -->
        <div class="content">
          <div class="title-area">
            <div class="title-frame">
              <div class="title">New plan - Set Scope & Parameters</div>
              <div class="subtitle">
                Define the planning boundaries and inputs. Choose the key parameters, timeframe,
                operations, regions and resources to tailor the planning process to your specific
                needs.
              </div>
            </div>
          </div>
          <div class="widget-wrap">
            <!-- <cv-column> -->
            <!-- <cv-tile> -->
            <WidgetKPI>
              <template #title>
                <parameter-icon />
                Planning parameters
              </template>
              <template #primary>Upcoming Month</template>
              <template #body>
                Resource allocation, Max. Utilisation 80%, Optimise routes
              </template>
              <template #bottomline> Edit<edit-icon /> </template>
            </WidgetKPI>
            <!-- </cv-tile> -->
            <!-- </cv-column> -->
            <!-- <cv-column> -->
            <WidgetKPI
              ><template #title><time-icon />Time Frame</template
              ><template #primary>01.01.- 31.01.2026</template
              ><template #bottomline>Edit<edit-icon /></template
            ></WidgetKPI>
            <!-- </cv-column>
            <cv-column> -->
            <WidgetKPI
              ><template #title><circle-dash-icon />Operations</template
              ><template #primary>300</template
              ><template #body>Operations ready for dispatching<br />→ 130 Work Orders</template
              ><template #bottomline>Edit<edit-icon /></template
            ></WidgetKPI>
            <!-- </cv-column>
            <cv-column> -->
            <WidgetKPI
              ><template #title><location-filled-icon />Selected Region</template
              ><template #primary>1</template
              ><template #body>H3512 DRW-F-ÖB-DM|NB Dorsten-Marl</template
              ><template #bottomline>Edit<edit-icon /></template
            ></WidgetKPI>
            <!-- </cv-column>
            <cv-column> -->
            <WidgetKPI
              ><template #title><user-multiple-icon />Planning Capacity</template
              ><template #primary>4 FTE</template><template #body>4 employees</template
              ><template #bottomline>Edit<edit-icon /></template
            ></WidgetKPI>
            <!-- </cv-column> -->
          </div>
          <div class="frame0">
            <div class="frame1">
              <div class="frame-content background_white">
                <CcvStackedBarChart class="barChart" :data :options />
                <!-- <div class="barchart">
                <div class="chart-content"></div>
              </div> -->
              </div>
              <div class="frame-content background_white">
                <div class="title0">
                  <div class="inline">Internal Resources in selected region</div>
                  <span>
                    <cv-button class="button_ghost" :icon="EditIcon" kind="ghost"> Edit </cv-button>
                  </span>
                </div>
                <cv-accordion @change="onChange" :align="align" :size="size">
                  <cv-accordion-item
                    v-for="n in 4"
                    :key="`acc-item-${n}`"
                    :id="n % 2 ? `acc-item-${n}` : ''"
                  >
                    <template #title>
                      H3512 DRW-F-ÖB-DM|NB Dorsten-Marl {{ n }} <cv-tag label="4 FTE" /><cv-tag
                        label="4 Employees"
                      />
                    </template>
                    <template #content>
                      <cv-data-table-skeleton
                        v-if="loading"
                        :columns="[t('name'), t('price'), 'CJ', t('location'), t('rarity')]"
                        :rows="7"
                        :title="t('fish')"
                        :helper-text="t('fish-info')"
                      />
                      <cv-data-table v-else>
                        <!-- <template #headings>
                            <cv-data-table-heading
                            :heading="t('name')"
                            name="name"
                            sortable
                          />
                          <cv-data-table-heading
                            v-if="md"
                            :heading="t('Qualifications')"
                            name="qualifications"
                            sortable
                          />
                        </template> -->
                        <template #data>
                          <resource-row v-for="row in resources" :key="row.name" :resource="row" />
                        </template>
                      </cv-data-table>
                    </template>
                  </cv-accordion-item>
                </cv-accordion>
              </div>
              <div class="frame-content background_white">
                <FrameTitle>
                  <template #title> External providers </template>
                  <template #subtitle> 35 FTE available in total </template>
                  <template #rightSide>
                    <cv-button class="button_ghost" :icon="NewTabIcon" kind="ghost">
                      Show all
                    </cv-button>
                  </template>
                </FrameTitle>
                <!-- <div class="title0 inline">
                  <div>
                    External providers<br />
                    <div class="subtitle">35 FTE available in total</div>
                  </div>
                  <span>
                    <cv-button
                      class="button_ghost"
                      :icon="NewTabIcon"
                      kind="ghost"
                    >
                      Show all
                    </cv-button>
                  </span>
                </div> -->
                <cv-accordion @change="onChange" :align="align" :size="size">
                  <cv-accordion-item
                    v-for="provider in providers"
                    :key="`acc-item-${provider}`"
                    :id="n % 2 ? `acc-item-${provider}` : ''"
                  >
                    <template #title>
                      {{ provider.name }}
                      <cv-tag v-for="qual in provider.qualifications" :label="qual" />
                    </template>
                    <template #content> Provider details </template>
                  </cv-accordion-item>
                </cv-accordion>
              </div>
            </div>
            <div class="frame1">
              <div class="frame-content background_white">
                <FrameTitle>
                  <template #title> Work Order Distribution by Region </template>
                  <template #rightSide>
                    <cv-button class="button_ghost" :icon="MaximizeIcon" kind="ghost">
                      Fullscreen
                    </cv-button>
                  </template>
                </FrameTitle>
                <div>
                  <cv-tag
                    :renderIcon="CheckmarkFilledIcon"
                    label="Scheduled Maintenance"
                    kind="high-contrast"
                  />
                  <cv-tag
                    :renderIcon="CheckmarkFilledIcon"
                    label="Inspections"
                    kind="high-contrast"
                  />
                  <cv-tag :renderIcon="CheckmarkFilledIcon" label="Build" kind="high-contrast" />
                  <cv-tag
                    :renderIcon="CheckmarkFilledIcon"
                    label="Meter Calibration"
                    kind="high-contrast"
                  />
                </div>
                <div class="pad16 map">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="500"
                    height="550"
                    viewBox="0 0 400 450"
                    fill="none"
                  >
                    <circle cx="166" cy="116.323" r="116" fill="#1A57D4" fill-opacity="0.33" />
                    <circle cx="250" cy="150" r="100" fill="#DA1E28" fill-opacity="0.3" />
                    <circle
                      cx="200"
                      cy="250"
                      r="160"
                      fill="rgba(36, 161, 72, 1)"
                      fill-opacity="0.3"
                    />
                  </svg>
                  <cv-tag class="mapTag1" label="75" kind="high-contrast" />
                  <cv-tag class="mapTag2" label="29" kind="high-contrast" />
                  <cv-tag class="mapTag3" label="35" kind="high-contrast" />
                </div>
                <div
                  class="layout-child layout-child-43053337110 legend pad16"
                  style="height: 16px; width: 100%"
                >
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
                        class="checkbox background-4-1-1 active"
                        role="checkbox"
                        tabindex="0"
                        aria-labelledby="chart-168b558baf544-legend-datagroup-0-title"
                        aria-checked="true"
                        width="13"
                        height="13"
                      ></div>
                      <p id="chart-168b558baf544-legend-datagroup-0-title">Scheduled Maintenance</p>
                    </div>
                    <div class="legend-item active">
                      <div
                        class="checkbox background-4-1-2 active"
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
                      <p id="chart-168b558baf544-legend-datagroup-1-title">Inspections</p>
                    </div>
                    <div class="legend-item active">
                      <div
                        class="checkbox background-4-1-3 active"
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
                      <p id="chart-168b558baf544-legend-datagroup-2-title">Build</p>
                    </div>
                    <div class="legend-item active">
                      <div
                        class="checkbox background-4-1-4 active"
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
                      <p id="chart-168b558baf544-legend-datagroup-3-title">Meter Calibration</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="frame-content background_white">
                <cv-structured-list condensed>
                  <!-- <template v-slot:headings>
                    <cv-structured-list-heading>
                      Heading 1
                    </cv-structured-list-heading>
                    <cv-structured-list-heading>
                      Heading 2
                    </cv-structured-list-heading>
                    <cv-structured-list-heading>
                      Heading 3
                    </cv-structured-list-heading>
                  </template> -->

                  <template v-slot:items>
                    <cv-structured-list-item>
                      <cv-structured-list-data
                        key="dataIndex"
                        no-wrap="false"
                        class="qualification-header"
                      >
                        Qualifications internal (185):
                      </cv-structured-list-data>
                      <cv-structured-list-data
                        key="dataIndex"
                        no-wrap="false"
                        class="qualification-header"
                      >
                        Qualifications external (21):
                      </cv-structured-list-data>
                      <cv-structured-list-data
                        key="dataIndex"
                        no-wrap="false"
                        class="qualification-header"
                      >
                        Qualifications missing:
                      </cv-structured-list-data>
                    </cv-structured-list-item>
                    <cv-structured-list-item>
                      <cv-structured-list-data>
                        <cv-tag :render-icon="CheckmarkIcon" kind="green" label="HV/MV Training" />
                      </cv-structured-list-data>
                      <cv-structured-list-data>
                        <cv-tag :render-icon="CheckmarkIcon" kind="blue" label="Tiefbau" />
                      </cv-structured-list-data>
                      <cv-structured-list-data>
                        <span class="inline">
                          <checkmark-outline-icon />&nbsp;no qualification missing
                        </span>
                      </cv-structured-list-data>
                    </cv-structured-list-item>
                    <cv-structured-list-item>
                      <cv-structured-list-data>
                        <cv-tag :render-icon="CheckmarkIcon" kind="green" label="LV Training" />
                      </cv-structured-list-data>
                      <cv-structured-list-data>
                        <cv-tag :render-icon="CheckmarkIcon" kind="blue" label="Construction" />
                      </cv-structured-list-data>
                    </cv-structured-list-item>
                    <cv-structured-list-item>
                      <cv-structured-list-data>
                        <cv-tag :render-icon="CheckmarkIcon" kind="green" label="E.Circuit" />
                      </cv-structured-list-data>
                      <cv-structured-list-data>
                        <cv-tag
                          :render-icon="CheckmarkIcon"
                          kind="blue"
                          label="Civil Engineering"
                        />
                      </cv-structured-list-data>
                    </cv-structured-list-item>
                    <cv-structured-list-item>
                      <cv-structured-list-data>
                        <cv-tag
                          :render-icon="CheckmarkIcon"
                          kind="green"
                          label="Plant Responsibility"
                        />
                      </cv-structured-list-data>
                      <cv-structured-list-data>
                        <cv-tag :render-icon="CheckmarkIcon" kind="blue" label="Example" />
                      </cv-structured-list-data>
                    </cv-structured-list-item>
                    <cv-structured-list-item>
                      <cv-structured-list-data>
                        <cv-tag :render-icon="CheckmarkIcon" kind="green" label="System Engineer" />
                      </cv-structured-list-data>
                      <cv-structured-list-data>
                        <cv-tag :render-icon="CheckmarkIcon" kind="blue" label="Example" />
                      </cv-structured-list-data>
                    </cv-structured-list-item>
                    <cv-structured-list-item>
                      <cv-structured-list-data>
                        <cv-tag
                          :render-icon="CheckmarkIcon"
                          kind="green"
                          label="Electr. Engineer"
                        />
                      </cv-structured-list-data>
                      <cv-structured-list-data>
                        <cv-tag :render-icon="CheckmarkIcon" kind="blue" label="Example" />
                      </cv-structured-list-data>
                    </cv-structured-list-item>
                    <cv-structured-list-item>
                      <cv-structured-list-data>
                        <div class="link">Show all</div>
                      </cv-structured-list-data>
                      <cv-structured-list-data>
                        <div class="link">Show all</div>
                      </cv-structured-list-data>
                    </cv-structured-list-item>
                  </template>
                </cv-structured-list>
                <!-- <FrameTitle>
                  <template #title>
                    Estimated required qualifications (206)
                  </template>
                  <template #subtitle
                    >Shown qualifications are estimated to fulfil all selected
                    work orders.</template
                  >
                  <template #rightSide>
                    <cv-button
                      class="button_ghost"
                      :icon="NewTabIcon"
                      kind="ghost"
                    >
                      Show Details
                    </cv-button>
                  </template>
                </FrameTitle>
                <cv-data-table class="no-lines">
                  <template #data>
                    <cv-data-table-row>
                      <cv-data-table-cell class="qualification-header"
                        >Qualifications internal (185):</cv-data-table-cell
                      >
                      <cv-data-table-cell class="qualification-header"
                        >Qualifications external (21):</cv-data-table-cell
                      >
                      <cv-data-table-cell class="qualification-header"
                        >Qualifications missing:</cv-data-table-cell
                      >
                    </cv-data-table-row>
                    <cv-data-table-row>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="green"
                          label="HV/MV Training"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="blue"
                          label="Tiefbau"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell
                        ><span class="inline"
                          ><checkmark-outline-icon />no qualification
                          missing</span
                        ></cv-data-table-cell
                      >
                    </cv-data-table-row>
                    <cv-data-table-row>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="green"
                          label="LV Training"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="blue"
                          label="Construction"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell />
                    </cv-data-table-row>
                    <cv-data-table-row>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="green"
                          label="E.Circuit"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="blue"
                          label="Civil Engineering"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell />
                    </cv-data-table-row>
                    <cv-data-table-row>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="green"
                          label="Plant Responsibility"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="blue"
                          label="Example"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell />
                    </cv-data-table-row>
                    <cv-data-table-row>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="green"
                          label="System Engineer"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="blue"
                          label="Example"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell />
                    </cv-data-table-row>
                    <cv-data-table-row>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="green"
                          label="Electr. Engineer"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell
                        ><cv-tag
                          :renderIcon="CheckmarkIcon"
                          kind="blue"
                          label="Example"
                        ></cv-tag
                      ></cv-data-table-cell>
                      <cv-data-table-cell />
                    </cv-data-table-row>
                    <cv-data-table-row>
                      <cv-data-table-cell
                        ><div class="link">Show all</div></cv-data-table-cell
                      >
                      <cv-data-table-cell
                        ><div class="link">Show all</div></cv-data-table-cell
                      >
                      <cv-data-table-cell />
                    </cv-data-table-row>
                  </template>
                </cv-data-table> -->
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
              <div class="title20">Steps</div>
              <div class="text14">Follow these steps for creating a plan</div>
            </div>
            <div class="frame-content v-stretch">
              <!-- MAIN
            <div>hoho</div>
            <div>hoho</div> -->
              <cv-progress
                :initial-step="initialStep"
                vertical="vertical"
                :complete="true"
                :space-equally="spaceEqually"
              >
                <cv-progress-step
                  id="step-1"
                  label="Set Scope & Parameters"
                  additional-info="Define the planning boundaries and inputs"
                  description="time icon description"
                >
                  <template #step-icon>
                    <incomplete-icon />
                  </template>
                </cv-progress-step>
                <cv-progress-step
                  id="step-2"
                  label="Select Planning Mode"
                  additional-info="Choose automated or manual technician assignment"
                  @step-clicked="onStepClicked"
                />
                <cv-progress-step
                  id="step-3"
                  label="Compare & select scenarios"
                  additional-info="Finalise plan"
                  @step-clicked="onStepClicked"
                />
              </cv-progress>
            </div>
            <div class="bottom">
              <div
                class="guidance bx--inline-notification--low-contrast bx--inline-notification--info"
              >
                <p className="guidance-title">
                  Guidance to success:<InformationFilledIcon fill="#0f62fe" />
                </p>
                <p className="guidance-content">
                  In this step, you’ll configure the foundational elements of your planning process.
                  Carefully setting these parameters ensures that the plan aligns with your
                  operational goals and constraints.
                </p>
                <br />
                <br />
                <div class="bold">✅ What to do:</div>
                <cv-list nested class="outdent guidance-content">
                  <cv-list-item>
                    <span class="guidance-content bold">Planning Parameters:</span>
                    Add any specific constraints or preferences (e.g. resource allocation,
                    utilisation, routes).
                  </cv-list-item>
                  <cv-list-item>
                    <span class="guidance-content bold">Timeframe:</span> Choose the start and end
                    dates for the planning period.
                  </cv-list-item>
                  <cv-list-item>
                    <span class="guidance-content bold">Operations:</span>
                    Select the operations to be scheduled.
                  </cv-list-item>
                  <cv-list-item>
                    <span class="guidance-content bold">Region:</span> Specify the geographic area
                    you want to plan for
                  </cv-list-item>
                  <cv-list-item>
                    <span class="guidance-content bold">Planning Capacity:</span>
                    Select employees/ technicians
                  </cv-list-item>
                  <br />
                </cv-list>
                <div class="bold">💡 Tips:</div>
                <cv-list nested class="outdent guidance-content">
                  <cv-list-item>
                    Be as precise as possible - this helps the AI generate better suggestions in
                    later steps.
                  </cv-list-item>
                  <cv-list-item>
                    You can always revisit and adjust these settings before finalizing the plan.
                  </cv-list-item>
                </cv-list>
              </div>
              <div class="footer-wrapper">
                <!-- <span> -->
                <!-- <div class="column50"><cv-button kind="secondary">Back</cv-button></div>
                <div class="column50"><cv-button :icon="ArrowRightIcon">Continue</cv-button></div> -->
                <!-- </span> -->
                <!-- <span class="full-width"> -->
                <cv-button kind="secondary" class="w50 bottom0">Back</cv-button>
                <cv-button :icon="ArrowRightIcon" class="w50 bottom0" @click="selectPlanningMode()"
                  >Select planning mode</cv-button
                >
                <!-- </span> -->
              </div>
            </div>
          </div>
        </div>
      </cv-column>
    </cv-row>
  </cv-grid>
  <cv-modal
    v-model:visible="selectPlanningModeModalVisible"
    size="sm"
    disableTeleport="false"
    @primary-click="onPrimaryClick"
  >
    <!-- <template v-slot:label>Label of modal</template> -->
    <template v-slot:title>Choose your planning mode</template>
    <template v-slot:content>
      <div class="frame-progress">
        <cv-progress :initial-step="1" :vertical="false" space-equally="spaceEqually">
          <cv-progress-step
            :complete="true"
            id="step-1"
            label="Set Scope & Parameters"
            additional-info="Define the planning boundaries and inputs"
            description="time icon description"
          >
            <template #step-icon>
              <Checkmark-outline-icon />
            </template>
          </cv-progress-step>
          <cv-progress-step
            id="step-2"
            label="Select Planning Mode"
            additional-info="Choose between automated or manual planning"
            @step-clicked="onStepClicked"
          >
            <template #step-icon>
              <incomplete-icon />
            </template>
          </cv-progress-step>
          <cv-progress-step
            id="step-3"
            label="Create Plan"
            additional-info="Review, adjust & confirm your planning setup"
            @step-clicked="onStepClicked"
          />
        </cv-progress>
      </div>
      <!-- <br />
      <br /> -->
      <div>
        <p>
          This step lets you decide the level of automation and control you want in your planning
          process. Both modes incorporate AI-generated suggestions to help optimize your plan.
        </p>
        <br />
        <div class="widget-wrap">
          <!-- {{ planningModeAI }}
          {{ planningModeManual }} -->
          <!-- {{ selected }} -->
          <!-- <cv-tile
            v-model="planningModeAI"
            :selected="planningModeAI ? true : false"
            kind="selectable"
            value="ai"
            class="w50 border1gray modal-header"
          > -->
          <cv-tile
            v-model="planningModeAI"
            value="ai"
            kind="selectable"
            class="w50 border1gray modal-header"
          >
            <span class="inline">
              <ai-label-icon />
              <!-- <div class="ai-label">AI</div> -->
              &nbsp;Smart AI Auto-Assign
            </span>
            <br />
            <br />
            <cv-list>
              <cv-list-item>
                Let AI handle the complexity - fast, optimized scheduling with AI-powered
                recommendations
                <span class="bold">based on past data</span> as a starting point
              </cv-list-item>
              <cv-list-item>
                You can still review and edit these suggestions before finalizing.
              </cv-list-item>
            </cv-list>
            <cv-structured-list condensed>
              <template #headings>
                <cv-structured-list-heading> Best for: </cv-structured-list-heading>
              </template>
              <template #items>
                <cv-structured-list-item>
                  <cv-structured-list-data>
                    <span class="inline">
                      <checkmark-outline-icon />&nbsp;Large scale planning
                    </span>
                  </cv-structured-list-data>
                </cv-structured-list-item>
                <cv-structured-list-item>
                  <cv-structured-list-data>
                    <span class="inline">
                      <checkmark-outline-icon />&nbsp;Many variables & constraints (e.g.,<br />technician
                      skills, availability, travel time)
                    </span>
                  </cv-structured-list-data>
                </cv-structured-list-item>
                <cv-structured-list-item>
                  <cv-structured-list-data>
                    <span class="inline">
                      <checkmark-outline-icon />&nbsp;Teams with predictable task patterns
                    </span>
                  </cv-structured-list-data>
                </cv-structured-list-item>
              </template>
            </cv-structured-list>
          </cv-tile>
          <cv-tile
            v-model="planningModeManual"
            kind="selectable"
            value="manual"
            class="w50 border1gray modal-header"
          >
            <!-- <cv-tile kind="selectable" class="w50 border1gray modal-header"> -->
            Manual Assign with AI Assistance
            <br />
            <br />
            <cv-list>
              <cv-list-item> Take full control of resource/technician allocation </cv-list-item>
              <cv-list-item>
                AI suggestions are still provided to guide your decisions if you would like to use
                them
              </cv-list-item>
            </cv-list>
            <cv-structured-list condensed>
              <template #headings>
                <cv-structured-list-heading> Best for: </cv-structured-list-heading>
              </template>
              <template #items>
                <cv-structured-list-item>
                  <cv-structured-list-data>
                    <span class="inline">
                      <checkmark-outline-icon />&nbsp;Custom requirements
                    </span>
                  </cv-structured-list-data>
                </cv-structured-list-item>
                <cv-structured-list-item>
                  <cv-structured-list-data>
                    <span class="inline">
                      <checkmark-outline-icon />&nbsp;High-priority tasks requiring specific<br />expertise
                    </span>
                  </cv-structured-list-data>
                </cv-structured-list-item>
                <cv-structured-list-item>
                  <cv-structured-list-data>
                    <span class="inline">
                      <checkmark-outline-icon />&nbsp;Teams with predictable task patterns
                    </span>
                  </cv-structured-list-data>
                </cv-structured-list-item>
              </template>
            </cv-structured-list>
          </cv-tile>
        </div>
        <!-- <br />
        <p>https://en.wikipedia.org/wiki/Shields_(Star_Trek)</p> -->
      </div>
    </template>
    <!-- <template v-slot:other-button>other</template> -->
    <template v-slot:secondary-button>Back</template>
    <template v-slot:primary-button>Create plan</template>
    <!-- <cv-link to="ScenarioPlanning">LINK</cv-link> -->
    <!-- <template v-slot:primary-button
      ><cv-link to="ScenarioPlanning">LINK</cv-link>LINK0</template
    > -->
  </cv-modal>
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
  font-family: 'IBM Plex Sans';
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 128.571% */
}

.title20 {
  /* color: var(--Text-text-primary, #161616); */

  /* Fixed heading styles/heading-03 */
  font-family: var(--Fixed-Heading-Heading-03-Font-family, 'IBM Plex Sans');
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 140% */
}

.text14 {
  /* color: var(--Text-text-primary, #161616); */

  /* Body styles/body-compact-01 */
  font-family: var(--Fixed-Body-Font-family, 'IBM Plex Sans');
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.16px;
}

.subtitle {
  /* color: #000; */

  /* Body styles/body-01 */
  font-family: var(--Fixed-Body-Font-family, 'IBM Plex Sans');
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
  /* background: white; */
  background: var(--cds-ui-01);
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
  /* border: 1px solid var(--border-subtle-contextual, #e0e0e0); */
  /* background: var(--Notification-notification-info-background, #edf5ff); */
}

.guidance-title {
  /* color: #000; */
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  /* Fixed heading styles/heading-compact-01 */
  font-family: var(--Fixed-Heading-Font-family, 'IBM Plex Sans');
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.16px;
}

.guidance-content {
  /* color: #000; */

  /* Utility styles/helper-text-01 */
  font-family: var(--fixed-utility-helper-text-0102-font-family, 'IBM Plex Sans');
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
  bottom: 0;
}

.w90 {
  width: 90%;
}

.h-stretch div {
  flex: 1 1 0;
  /* border: 1px solid yellow; */
  /* background: pink; */
  /* text-align: center; */
  min-height: 20px;
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

.border1gray {
  border-width: 1px;
  border-color: var(--border-subtle-contextual);
}

.gradient {
  color: white;
  padding: 16px;
  background: var(--Gradient, linear-gradient(90deg, #001d6c -3.12%, #6929c4 80.7%));
  /* background: linear-gradient(90deg, #6929C4 0%, rgba(105, 41, 196, 0.80) 50%, red 100%); */
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
  /* background: white; */
  background: var(--cds-ui-01);
  /* flex-direction: column; */
  /* height: auto; */
  /* align-self: stretch; */
  /* background: var(--color-gray-200, currentcolor); */
}

.map {
  background: url('@/assets/map.png') lightgray 35% / cover no-repeat;
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

  /* background: white; */
  background: var(--cds-ui-01);
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
  /* color: #000; */

  /* Fixed heading styles/heading-compact-01 */
  font-family: var(--Fixed-Heading-Font-family, 'IBM Plex Sans');
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 128.571% */
  letter-spacing: 0.16px;
}

.modal-header {
  /* color: var(--Text-text-primary, #161616); */

  /* Fixed heading styles/heading-02 */
  font-family: var(--Fixed-Heading-Font-family, 'IBM Plex Sans');
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

  /* border: 1px solid var(--Border-border-inverse); */
  border: 1px solid var(--Border-border-inverse, #161616);
  background: var(--Transparent, rgba(255, 255, 255, 0));
  background-blend-mode: multiply;
}

.mapTag1 {
  position: relative;
  top: -240px;
  left: -270px;
}

.mapTag2 {
  position: relative;
  top: -370px;
  left: -250px;
}

.mapTag3 {
  position: relative;
  top: -420px;
  left: -400px;
}

/* .mapTag1 {
  position: relative;
  top: -240px;
  left: 230px;
}

.mapTag2 {
  position: relative;
  top: -380px;
  left: 270px;
}

.mapTag3 {
  position: relative;
  top: -420px;
  left: 110px;
} */

/* .inline {
  display: inline-flex;
}

.bx--btn {
  min-height: 14px;
} */

/* .button_ghost {
  height: 100%;
  padding: 0px;
} */
</style>
