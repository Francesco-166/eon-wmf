<template>
  <div class="title0 inline">
    <div>
      <slot name="title" /><br />
      <div class="subtitle"><slot name="subtitle" /></div>
    </div>
    <span>
      <slot name="rightSide" />
    </span>
  </div>
</template>

<style>
.inline {
  display: inline-flex;
}

.bx--btn {
  min-height: 14px;
}

.title0 {
  display: flex;
  white-space: nowrap;
  /* padding: 16px; */
  padding-bottom: 16px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;

  color: #000;

  /* Fixed heading styles/heading-compact-02 */
  font-family: var(--Fixed-Heading-Font-family, "IBM Plex Sans");
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */

  /* height: 20px; */
}
/* 
.internal {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
} */

/* .button_ghost {
  height: 100%;
  padding: 0px;
} */

</style>
