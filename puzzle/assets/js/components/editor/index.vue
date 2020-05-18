<template>
  <div class="editor">
    <slot />

    <notifications group="messages" position="bottom right" />

    <notifications
      group="errors"
      position="top right"
      classes="vue-notification error"
    />
  </div>
</template>
