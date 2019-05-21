<template>
  <div class="label">
    <h2>{{ imageFileList[fileCount].time }} <span :style="{color: labelColor(labels[fileCount])}">{{labelName(labels[fileCount])}}</span></h2>
    <img id="narrative" :src="'file://'+imageFileList[fileCount].path" :style="{borderWidth: '6px', borderColor: labelColor(labels[fileCount]), borderStyle: 'solid', boxSizing: 'border-box'}">
    <p>
      <el-row :gutter="6">
        <el-col :span="6"><el-button class="button" @click="label('v')" type="danger">Japanese (↕)</el-button></el-col>
        <el-col :span="6"><el-button class="button" @click="label('h')" type="danger">Japanese (↔)</el-button></el-col>
        <el-col :span="6"><el-button class="button" @click="label('e')" type="primary">English</el-button></el-col>
        <el-col :span="6"><el-button class="button" @click="label('n')" type="info">Not Reading</el-button></el-col>
      </el-row>
    </p>
    <p>
      <el-row :gutter="6">
        <el-col :span="12"><el-button class="button" @click="previous">&lt; Previous</el-button></el-col>
        <el-col :span="12"><el-button class="button" @click="next">Next &gt;</el-button></el-col>
      </el-row>
    </p>
    <p><el-button class="button" @click="stopLabeling">Stop Labeling</el-button></p>
  </div>
</template>

<script>

import Store from 'electron-store'
const electronStore = new Store()
const path = require('path')
const fs = require('fs')
const moment = require('moment')

require('moment-timezone')

export default {
  name: 'label',
  components: {},
  data: function () {
    return {
      date: decodeURI(this.$route.params.date),
      imageFileList: [],
      fileCount: 0,
      labels: []
    }
  },
  created: function () {
    this.imageFileList = this.getImageFileList()
    this.labels = Array(this.imageFileList.length)
    this.labels.fill('')
  },
  methods: {
    stopLabeling: function (e) {
      this.$router.push({ name: 'home' })
    },
    label: function (label) {
      this.labels[this.fileCount] = label
      this.fileCount += 1
    },
    labelName: function (label) {
      switch (label) {
        case 'v':
          return 'Japanese (↕)'
        case 'h':
          return 'Japanese (↔)'
        case 'e':
          return 'English'
        case 'n':
          return 'Not Reading'
      }
      return ''
    },
    labelColor: function (label) {
      switch (label) {
        case 'v':
          return '#F56C6C'
        case 'h':
          return '#F56C6C'
        case 'e':
          return '#66b1ff'
        case 'n':
          return '#909399'
      }
      return '#f6f6f6'
    },
    previous: function (e) {
      if (this.fileCount == 0) {
        return
      }
      this.fileCount -= 1
    },
    next: function (e) {
      if (this.fileCount == this.fileCount.length-1) {
        this.stopLabeling()
      }
      this.fileCount += 1
    },
    getImageFileList: function () {
      const targetPath = path.join(electronStore.get('narrativeStoragePath'), decodeURI(this.$route.params.storagePath))
      const timeZone = electronStore.get('selectedTimeZone')

      var fileList = []
      for (const f of fs.readdirSync(targetPath)) {
        const stats = fs.statSync(path.join(targetPath, f))
        if (stats.isFile() && path.extname(f) === '.jpg') {
          const dt = moment.utc(f.slice(0, 15), 'YYYYMMDD_HH:mm:ss')
          fileList.push({
            'time': dt.utcOffset(timeZone).format('MM/DD HH:mm:ss'),
            'path': path.join(targetPath, f) })
        }
      }
      return fileList
    }
  }
}
</script>

<style lang="scss">

#narrative {
  width: 100%;
}

.button {
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
}

</style>
