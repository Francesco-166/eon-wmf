<script setup lang="ts">
import { useRouter } from 'vue-router'
// import TheWelcome from '../components/TheWelcome.vue'
import WidgetKPI from '../components/WidgetKPI.vue'

const router = useRouter()

function gotoAnnualPlanningStart() {
  console.warn('gotoAnnualPlanningStart')
  router.push('annualPlanningStart')
}

function gotoDispatchingStart() {
  console.warn('gotoDispatchingStart')
  router.push('dispatchingStart')
}
</script>

<template>
  <!-- <main> -->
  <!-- <TheWelcome /> -->
  <cv-grid>
    <cv-row>
      <cv-column :lg="14">
        <!-- <cv-row> -->
        <div class="content">
          <div class="title-area">
            <div class="title-frame">
              <div class="title">E.ON Work Force Management MVP</div>
              <div class="subtitle">
                This is an implemented MVP application showcasing a "happy path" for AI-assisted
                annual planning and dispatching.
              </div>
            </div>
          </div>
          <div class="gradient w100">
            <div class="inline">
              <idea-icon />
              <div class="bold">&nbsp;Tech quick information</div>
            </div>
            <br />
            <br />
            <div class="widget-wrap w90 h-stretch">
              <div>
                <div class="bold pad16">Tech stack</div>
                <div class="pad16">
                  <cv-list nested class="outdent">
                    <cv-list-item class="inverse">
                      <span class="bold">Typescript:</span> type safety & code quality (superset of
                      Javascript)
                    </cv-list-item>
                    <br />
                    <cv-list-item class="inverse">
                      <span class="bold">Vue3:</span> modern lightweight frontend framework, with
                      Vite & Pinia
                    </cv-list-item>
                    <br />
                    <cv-list-item class="inverse">
                      <span class="bold">Carbon components:</span> modern & consistant design (v10
                      for Vue3)
                    </cv-list-item>
                  </cv-list>
                </div>
              </div>
              <div>
                <div class="bold pad16">Pros</div>
                <div class="pad16">
                  <cv-list nested class="outdent">
                    <cv-list-item class="inverse">
                      <span class="bold">modern</span>
                    </cv-list-item>
                    <cv-list-item class="inverse">
                      <span class="bold">flexible</span>
                    </cv-list-item>
                    <cv-list-item class="inverse">
                      <span class="bold">light-weight</span>
                    </cv-list-item>
                    <cv-list-item class="inverse">
                      <span class="bold">modular, component-based</span>
                    </cv-list-item>
                    <cv-list-item class="inverse">
                      <span class="bold">bi-directional data binding</span>
                    </cv-list-item>
                    <cv-list-item class="inverse">
                      <span class="bold">responsive</span>
                    </cv-list-item>
                    <cv-list-item class="inverse">
                      <span class="bold">...</span>
                    </cv-list-item>
                  </cv-list>
                </div>
              </div>
              <!-- <div>
                <div class="bold pad16">Reponsive, customizable</div>
                <div class="pad16">
                  components can easily be extended & adapted to the users' needs
                </div>
              </div> -->
            </div>
          </div>
          <div class="widget-wrap">
            <WidgetKPI
              class="bx--inline-notification--low-contrast bx--inline-notification--success"
              @click="gotoAnnualPlanningStart()"
            >
              <template #title>
                <parameter-icon />
                Jump right to
              </template>
              <template #primary> Start Annual Planning </template>
              <template #body> Resource allocation, Utilisation, Route Optimization </template>
              <!-- <template #bottomline> Edit<edit-icon /> </template> -->
            </WidgetKPI>
            <WidgetKPI
              class="bx--inline-notification--low-contrast bx--inline-notification--info"
              @click="gotoDispatchingStart()"
            >
              <template #title><time-icon />Short cut to</template>
              <template #primary>Start Dispatching</template>
              <template #body>
                Assignment of technicians based on Availability, Qualification,
                Equipment/Materials,...
              </template>
              <!-- <template #bottomline>Edit<edit-icon /></template> -->
            </WidgetKPI>
          </div>
        </div>
      </cv-column>
    </cv-row>
  </cv-grid>
  <!-- </main> -->
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
  /* background: var(--cds-support-info-inverse); */
  /* background: var(--bx--inline-notification--low-contrast); */
}

.guidance-title {
  /* color: #000; */
  color: var(--cds-text-primary);
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
  color: var(--cds-text-primary);

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

.w100 {
  width: 100%;
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

.inverse {
  color: white;
}

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
