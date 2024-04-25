<template>
  <datepicker
    v-model="date"
    class="max-w-64"
    :min-date="startDate"
    :max-date="endDate"
    :disabled-dates="disabledDates"
    :enable-time-picker="false"
    :disabled-week-days="disabledDays"
    calendar-cell-class-name="dp-cell"
    disable-year-select
    auto-apply
    six-weeks="append"
    keep-action-row
  >
    <template #calendar-header="{ day }">
      <div class="text-16 font-normal">{{ day }}</div>
    </template>
  </datepicker>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { CalendarProps } from "./Calendar.d";

const props = withDefaults(defineProps<CalendarProps>(), {
  fields: () => ({
    circleColor: "bg-velux-blue",
    availableWeeks: 1,
    disabledDays: [],
    disabledDates: [],
  }),
});

const currentDate = new Date();
const startDate = computed<Date>(() => currentDate);
const availableWeeks = computed<number>(() =>
  get(props, "fields.availableWeeks", 4)
);
const disabledDays = computed<Array<number>>(() =>
  get(props, "fields.disabledDays", [])
);
const disabledDates = computed<Array<Date>>(() =>
  get(props, "fields.disabledDates", [])
);
const circleColorClass = computed<string>(() =>
  get(props, "fields.circleColor", "")
);

const date = ref(startDate.value);

const endDate = computed<Date>(
  () =>
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 7 * availableWeeks.value - 1
    )
);
</script>
<style lang="scss" scoped>
:deep(.dp__theme_light) {
  --dp-primary-color: v-bind(circleColorClass);
  --dp-hover-color: theme(colors.velux.residential-grey);
}
:deep(.dp-cell) {
  @apply rounded-full border-none;
}
</style>
