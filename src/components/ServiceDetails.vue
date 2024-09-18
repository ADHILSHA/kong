<template>
  <div>
    <div class="text-md text-headings font-semibold">
      Versions {{ `(${service.versions?.length})` }}
    </div>
    <div class="" v-if="service.versions?.length">
      <table>
        <tbody>
          <tr
            v-for="version in service.versions"
            :key="version.id"
          >
            <td class="text-sm font-semibold">
              v{{ version.name }}
            </td>
            <td class="text-xs text-subtext description-cell">
              {{ version.description }}
            </td>
            <td class="text-xs text-subtext type-cell">
              <div>
                <span
                  class="chip-label text-active"
                  :class="service?.type=='HTTP'?'chip-label-active':'chip-label-inactive'"
                >
                  HTTP
                </span>
                <span
                  class="chip-label text-active"
                  :class="service?.type=='REST'?'chip-label-active':'chip-label-inactive'"
                >
                  REST
                </span>
              </div>
            </td>
            <td class="text-right developer-cell">
              <div class="developer flex">
                <UserAvatar
                  :size="1.25"
                  :user-image="version.developer?.avatar"
                />
                <div class="developer-details">
                  <div class="text-sm font-semibold">
                    {{ version.developer?.name||"Unknown User" }}
                  </div>
                  <div class="text-xs text-subtext">
                    {{ getTimeAgo(version.updated_at) }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-lg flex justify-center">
        No Versions found
    </div>
  </div>
</template>
<script lang="ts">
import type { Service } from '@/types/Service'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import UserAvatar from './UserAvatar.vue'
import { useTimeAgo } from '@/composables/useTimeAgo'
export default defineComponent({
  components:{
    UserAvatar,
  },
  props:{
    service:{
      type:Object as PropType<Service>,
      required:true,
    },
  },
  setup() {
    const { timeAgo } = useTimeAgo()
    const getTimeAgo=(date:string)=>{
      return timeAgo(date)
    }
    return {
      getTimeAgo,
    }
  },
})

</script>
<style scoped>
.table-container {
  overflow-x: auto;
  width: 100%;
}

/* Allow other columns to take more space */
td:not(.developer-cell) {
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis for overflow text */
}

table {
  border-collapse: collapse;
  table-layout: auto; /* Allow columns to adjust their width based on content */
  width: 100%;
}

th, td {
  border-bottom: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
/* Remove border-bottom from the last tr in the table */
tr:last-child td {
  border-bottom: none;
}

th {
  background-color: #f4f4f4;
}

.developer {
  align-items: start;
  display: flex;
}

.avatar {
  border-radius: 50%;
  height: 40px;
  margin-right: 10px;
  width: 40px;
}

.developer-details{
    margin-left:4px;
}
.type-cell{
    width:30%;
}

/* Developer column should only take the necessary space */
.developer-cell {
  white-space: nowrap; /* Prevent line breaks */

}
.chip-label{
    border-radius: 0.25rem;
    margin-left:0.25rem;

    padding:0.375rem;
}
.chip-label-inactive{
    background: var(--background-color);
}
.chip-label-active{
    background: #BDD3F9;
}

@media (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    left: -9999px;
    position: absolute;
    top: -9999px;
  }

  tr {
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    margin-bottom:
 0.625rem;
  }

  td {
    border: none;
    padding-left: 50%;
    position: relative;
    text-align: right;
  }

  td::before {
    content: attr(data-label);
    font-weight: bold;
    left: 0;
    padding-right: 10px;
    position: absolute;
    text-align: left;
    white-space: nowrap;
    width: 45%;
  }
  /* Remove border from the last td in each row */
td:last-child {
  border-bottom: none;
}
}
</style>