<template>
  <div class="card">
    <div>
      <div class="flex justify-between">
        <status-label :status="statusValue" />
        <label-chip
          v-if="service?.versions?.length"
          :label="`${service.versions?.length} versions`"
        />
      </div>
      <div class="text-lg font-semibold card-title">
        {{ service.name }}
      </div>
      <div class="text-sm card-description text-secondary">
        {{ service.description }}
      </div>
    </div>
    <div class="flex align-end justify-between flex-auto-dir">
      <div>
      <ul
        v-if="service?.configured"
        class="card-content-list text-xs text-secondary font-semibold"
      >
        <li>
          <span class="text-primary font-semibold">{{ service?.metrics?.latency||0 }}</span> latency
        </li>
        <li>
          <span class="text-primary font-semibold"> {{ service?.metrics?.uptime||0 }} </span> uptime
        </li>
        <li>
          <span class="text-primary font-semibold"> {{ service?.metrics?.requests||0 }}</span> requests
          <span class="text-primary font-semibold dot-before">  {{ service?.metrics?.errors||0 }}%</span>
          errors
        </li>
      </ul>
      <ul
        v-else
        class="text-secondary font-semibold text-xs not-configured-msg"
      >
        <li>
          Not Configured with runtime yet
        </li>
      </ul>
    </div>
    <div>
      <multi-user-avatar :users="developers" v-if="developers"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent,computed } from 'vue'
import type { PropType } from 'vue'
import type { Service } from '@/types/Service'
import StatusLabel from './StatusLabel.vue'
import LabelChip from './LabelChip.vue'

import MultiUserAvatar from './MultiUserAvatar.vue'
import {useDevelopers} from '../composables/useDevelopers'




export default defineComponent({
  name: 'ServiceCard',
  components:{
    StatusLabel,
    LabelChip,
    MultiUserAvatar
  },
  props:{
    service:{
      type:Object as PropType<Service>,
      required:true,
    },
  },
  setup(props) {
    const statusValue = computed(() => props.service?.configured?props.service.published?'published':'un_published':'in_progress' )
    const { developers } = useDevelopers(props.service?.versions);
    return {
      statusValue,
      developers
    }
  },
})
</script>

<style scoped lang="scss">


.card{
    background: #FFFFFF;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;

}
.card-description{
  margin-top: 0.6875rem;
}
.card-content-list{
  margin-top: 2.3125;
  padding-left:0rem;
}
.card-content-list li{
  list-style-type: none; /* Remove default list style */
  margin-top:0.5rem;
  padding-left: 1.5rem; /* Space for custom dot */
  position: relative;
}
.card-content-list li::before {
  background-color: var(--text-success);
  border-radius: 50%;
  content: '';
  height: 8px;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
}
.card-title{
  margin-top:0.625rem;
}
.dot-before::before {
    content: "•"; /* Unicode character for the bullet point */

    font-size: 1em; /* Adjust size if needed */
    margin: 0 0.25rem; /* Adjust spacing */
}
.not-configured-msg{
  padding-left:0rem;
}
.not-configured-msg li{
  list-style-type: none; /* Remove default list style */
  margin-top:0.5rem;
  padding-left: 1rem; /* Space for custom dot */
  position: relative;
}
.not-configured-msg li::before{
  background-color: var(--text-secondary);
  border-radius: 50%;
  content: '';
  height: 0.5rem;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0.5rem;
}
</style>