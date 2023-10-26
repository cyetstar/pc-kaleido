<template>
  <div class="h-page-section">
    <div class="flex flex-col h-full">
      <a-form :model="searchForm" ref="formRef">
        <a-row :gutter="32">
          <h-col :span="6">
            <h-select
              required
              label="日志文件"
              name="fileName"
              v-model:value="searchForm.fileName"
              :columns="logFiles"
              @select="selectFiles"
            />
          </h-col>
          <h-col :span="4">
            <h-select
              required
              label="刷新频率"
              name="frequency"
              :disabled="!searchForm.auto"
              v-model:value="searchForm.frequency"
              :columns="frequencies"
              @change="onAutoRefresh"
            />
          </h-col>
          <h-col :span="4">
            <a-space>
              <a-switch
                v-model:checked="searchForm.auto"
                name="auto"
                un-checked-children="手动刷新"
                checked-children="自动刷新"
                @change="onAutoRefresh"
              />
              <h-button
                type="primary"
                :disabled="searchForm.auto"
                @click="onRefresh"
                >刷新</h-button
              >
            </a-space>
          </h-col>
        </a-row>
      </a-form>
      <div ref="consoleRef" class="console flex-1">
        <div v-for="(log, index) in logs" :key="index">
          <div v-html="log" style="margin-bottom: 5px; font-size: 16px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AnsiUp } from "ansi_up";
import { sysLogListApi, sysLogReadApi } from "@/api/sysadmin/sysLogApi";
import { onMounted, ref } from "vue";

let searchForm = ref({
  frequency: 1,
  auto: false,
});
let formRef = ref();
let consoleRef = ref();
let logs = ref([]);
let logFiles = ref([]);
let frequencies = ref([
  { text: "1秒", value: 1 },
  { text: "5秒", value: 5 },
  { text: "10秒", value: 10 },
]);
let interval;

const onAutoRefresh = () => {
  if (interval > 0) {
    clearInterval(interval);
  }
  if (searchForm.value.auto) {
    interval = setInterval(onRefresh, searchForm.value.frequency * 1000);
    scrollToBottom();
  }
};

const onRefresh = () => {
  formRef.value.validate().then(() => {
    const ansiUp = new AnsiUp();
    sysLogReadApi(searchForm.value).then((data) => {
      searchForm.value.lineNumber = data.lineNumber;
      for (const i in data.logs) {
        const log = ansiUp.ansi_to_html(data.logs[i]);
        logs.value.push(log);
      }
    });
    scrollToBottom();
  });
};
const scrollToBottom = () => {
  consoleRef.value.scrollTop = consoleRef.value.scrollHeight;
};
const selectFiles = (v) => {
  logs.value.splice(0);
  searchForm.value.lineNumber = 0;
  if (v.value) {
    onRefresh();
  }
};

const initData = () => {
  sysLogListApi().then((data) => {
    logFiles.value = data;
  });
};

onMounted(() => {
  initData();
});
</script>

<style lang="less" scoped>
.console {
  border: 1px solid #d9d9d9;
  overflow: scroll;
  padding: 10px 10px 20px;
}
</style>
