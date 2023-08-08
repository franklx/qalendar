<template>
  <div
    :id="elementId"
    class="agenda__event is-event"
    @click.prevent="handleClickOnEvent"
  >
    <span v-if="eventTime && !calendarEvent.originalEvent" class="agenda__event-time">
      <i :class="`agenda__event-icon ${config.style?.iconClasses?.clock}`"/>
      {{ eventTime }}
    </span>

    <span class="agenda__event-title">
      {{ calendarEvent.title }}
    </span>
    <span v-if="calendarEvent.with" class="agenda__event-with">
      <i :class="`agenda__event-icon ${config.style?.iconClasses?.user}`"/>
      {{ calendarEvent.with }}
    </span>

    <span v-if="calendarEvent.location" class="agenda__event-location">
      <i :class="`agenda__event-icon ${config.style?.iconClasses?.location}`"/>
      {{ calendarEvent.location }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import Time from '../../helpers/Time';
import type { eventInterface } from '../../typings/interfaces/event.interface';
import { DATE_TIME_STRING_PATTERN, EVENT_COLORS } from '../../constants';
import type { configInterface } from '../../typings/config.interface';

export default defineComponent({
  name: 'Event',

  props: {
    time: {
      type: Object as PropType<Time>,
      required: true,
    },
    calendarEvent: {
      type: Object as PropType<eventInterface>,
      required: true,
    },
    config: {
      type: Object as PropType<configInterface>,
      required: true,
    },
  },

  emits: ['event-was-clicked'],

  data() {
    return {
      colors: EVENT_COLORS as { [key: string]: string },
      eventBackgroundColor: '',
      eventColor: '#fff',
      eventIdPrefix: 'agenda__event-',
    };
  },

  computed: {
    eventTime() {
      return DATE_TIME_STRING_PATTERN.test(this.calendarEvent.time.start)
        ? this.time.getLocalizedTimeRange(
            this.calendarEvent.time.start,
            this.calendarEvent.time.end
        )
        : null;
    },

    elementId() {
      return this.eventIdPrefix + this.calendarEvent.id;
    },
  },

  mounted() {
    this.setColors();
  },

  methods: {
    setColors() {
      if (
        this.calendarEvent?.colorScheme &&
        this.config.style?.colorSchemes &&
        this.config.style.colorSchemes[this.calendarEvent.colorScheme]
      ) {
        this.eventColor =
          this.config.style.colorSchemes[this.calendarEvent.colorScheme]
            .color;

        return (this.eventBackgroundColor =
          this.config.style.colorSchemes[
            this.calendarEvent.colorScheme
          ].backgroundColor);
      }

      if (this.calendarEvent?.color) {
        return (this.eventBackgroundColor =
          this.colors[this.calendarEvent.color]);
      }

      return (this.eventBackgroundColor = this.colors.blue);
    },

    handleClickOnEvent() {
      const eventElement = document.getElementById(this.elementId);

      this.$emit('event-was-clicked', {
        clickedEvent: this.calendarEvent,
        eventElement,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as mixins;

.agenda__event {
  background-color: v-bind(eventBackgroundColor);
  color: v-bind(eventColor);
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  border-radius: 4px;
  font-size: var(--qalendar-font-2xs);
  margin-bottom: 4px;
  padding: var(--qalendar-spacing);
  cursor: pointer;
  user-select: none;
}
</style>
