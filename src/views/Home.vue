<template>
  <div class="home">
    <h1>Narrative Labeling</h1>
    <el-form label-width="100px">
      <el-form-item label="Time zone">
        <el-select @change="didTimeZoneChange" v-model="selectedTimeZone" placeholder="Select">
          <el-option
            v-for="item in timeZones"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Storage path">
        <el-input @change="didNarrativeStoragePathChange" placeholder="C:\Users\USER\Pictures\Narrative Clip\E-MAIL\DEVICE" v-model="narrativeStoragePath" clearable></el-input>
      </el-form-item>
      <el-form-item label="Date to label">
        <el-select v-model="selectedLabelDate" placeholder="Select">
          <el-option
            v-for="item in labelDates"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <p><el-button id="start-button" @click="startLabeling" :disabled="selectedLabelDate===''">Start Labeling</el-button></p>
  </div>
</template>

<script>

import Store from 'electron-store'
const electronStore = new Store()

if (typeof electronStore.get('narrativeStoragePath') === 'undefined') {
  electronStore.set('narrativeStoragePath', '')
  electronStore.set('selectedTimeZone', 'UTC+0900')
}

export default {
  name: 'home',
  components: {},
  data: function () {
    return {
      timeZones: [
        { 'label': 'JST (UTC+0900)', 'value': 'UTC+0900' },
        { 'label': 'CEST (UTC+0200)', 'value': 'UTC+0200' },
        { 'label': 'CET (UTC+0100)', 'value': 'UTC+0100' }
      ],
      selectedTimeZone: electronStore.get('selectedTimeZone'),
      labelDates: [
        { 'label': '2019/05/21', 'value': '2019/05/21' }
      ],
      selectedLabelDate: '',
      narrativeStoragePath: electronStore.get('narrativeStoragePath')
    }
  },
  methods: {
    startLabeling: function (e) {
      if (this.selectedLabelDate !== '') {
        this.$router.push({ name: 'label', params: { date: encodeURI(this.selectedLabelDate), path: encodeURI(this.selectedLabelDate) } })
      } else {
        alert('Select date to label')
      }
    },
    didTimeZoneChange: function (e) {
      electronStore.set('selectedTimeZone', e)
    },
    didNarrativeStoragePathChange: function (e) {
      electronStore.set('narrativeStoragePath', e)
      this.selectedLabelDate = ''
    }
  }
}
</script>

<style lang="scss">

#start-button {
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
}

</style>
