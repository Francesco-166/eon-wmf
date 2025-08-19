<script setup lang="ts">
// import {
//   Parameter16 as ParameterIcon,
//   Edit16 as EditIcon,
// } from "@carbon/icons-vue";

defineProps({
  classes: { type: String },
  line: { type: Boolean },
  lineColor: { type: String, default: 'red' },
})
</script>

<template>
  <!-- {{ classes }} -->
  <div class="widget" :class="classes">
    <!-- <div class="line"></div> -->
    <div class="widget-top">
      <div class="widget-title">
        <slot name="title" />
      </div>
      <div class="widget-main">
        <div class="widget-primary">
          <slot name="primary" />
        </div>
        <div class="widget-body">
          <slot name="body" />
        </div>
      </div>
    </div>
    <div class="widget-bottom">
      <div class="widget-bottomline">
        <slot name="bottomline" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget {
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  flex: 1 0 0;
  /* height: 100%; */

  /* background: var(--Default-Neutral-White, #fff); */
  /* background: var(--cds-ui-01); */
}

.widget:not(.bx--inline-notification--low-contrast) {
  background: var(--cds-ui-01);
}

.border-left {
  /* border-color: var(--Text-text-error, #da1e28); */
  border-left-width: 2px;
  border-style: solid;
}
.border-red {
  border-color: var(--Text-text-error, #da1e28);
}

.red {
  /* background: var(--Notification-notification-error-background, #fff1f1); */
}

.yellow {
  background: var(--Notification-notification-warning-background, #fcf4d6);
}
.blue {
  background: var(--Notification-notification-info-background, #edf5ff);
}

.widget-top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;

  border-color: #da1e28;
  border-width: 50px;
}

.widget-bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
}

.widget-title {
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;

  /* color: #000; */
  font-family: 'IBM Plex Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
}

.widget-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
}

.widget-primary {
  /* color: var(--Gray-10, #111); */
  font-family: 'IBM Plex Sans';
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 38.4px */
}

.widget-body {
  align-self: stretch;
  /* color: #000; */
  font-family: 'IBM Plex Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
}

.widget-bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
}

.widget-bottomline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  /* color: #000; */
  font-family: 'IBM Plex Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
}
</style>
