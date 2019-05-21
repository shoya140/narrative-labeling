<template>
  <div class="home">
    <h2>Narrative Labeling</h2>
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
    <p><el-button class="button" @click="startLabeling" :disabled="selectedLabelDate===''">Start Labeling</el-button></p>
    <p>
      <el-row :gutter="6">
        <el-col :span="12"><el-button class="button" @click="exportLabels()">Export labels</el-button></el-col>
        <el-col :span="12"><el-button class="button" @click="resetLabels()">Reset Labels</el-button></el-col>
      </el-row>
    </p>
  </div>
</template>

<script>

import Store from 'electron-store'
const electronStore = new Store()

if (typeof electronStore.get('narrativeStoragePath') === 'undefined') {
  electronStore.set('narrativeStoragePath', '')
  electronStore.set('selectedTimeZone', 'UTC+0900')
  electronStore.set('labelAll', {})
}

export default {
  name: 'home',
  components: {},
  data: function () {
    return {
      timeZones: [
        { 'label': 'JST (UTC+0900)', 'value': '+0900' },
        { 'label': 'CEST (UTC+0200)', 'value': '+0200' },
        { 'label': 'CET (UTC+0100)', 'value': '+0100' }
      ],
      selectedTimeZone: electronStore.get('selectedTimeZone'),
      labelDates: [
        { 'label': '2019/05/19', 'value': '2019/05/19' },
        { 'label': '2019/05/20', 'value': '2019/05/20' },
        { 'label': '2019/05/21', 'value': '2019/05/21' }
      ],
      selectedLabelDate: '',
      narrativeStoragePath: electronStore.get('narrativeStoragePath')
    }
  },
  methods: {
    startLabeling: function (e) {
      if (this.selectedLabelDate !== '') {
        this.$router.push({ name: 'label', params: { date: encodeURI(this.selectedLabelDate), storagePath: encodeURI(this.selectedLabelDate) } })
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
    },
    exportLabels: function () {
      const labelAll = electronStore.get('labelAll')
      const sortedLabelAll = {}
      Object.keys(labelAll).sort().forEach(function (key) {
        sortedLabelAll[key] = labelAll[key]
      })
      var csv = ''
      for (const key in sortedLabelAll) {
        for (const row of sortedLabelAll[key]) {
          csv += key + ',' + row.join(',') + '\n'
        }
      }
      var bl = new Blob([csv], { type: 'text/csv' })
      var a = document.createElement('a')
      a.href = URL.createObjectURL(bl)
      a.download = 'label.csv'
      document.body.appendChild(a)
      a.hidden = true
      a.click()
    },
    resetLabels: function () {
      var result = confirm('Do you want to delete all labels?')
      if (result) {
        electronStore.set('labelAll', {})
      }
    }
  }
}
</script>

<style lang="scss">

</style>
