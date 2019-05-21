<template>
  <div class="label">
    <h2>{{ '(' + (fileCount+1) + '/' + imageFileList.length + ') ' + labels[fileCount][0] }} <span :style="{color: labelColor(labels[fileCount][1])}">{{labelName(labels[fileCount][1])}}</span></h2>
    <img id="narrative" :src="'file://'+imageFileList[fileCount]" :style="{borderWidth: '6px', borderColor: labelColor(labels[fileCount][1]), borderStyle: 'solid', boxSizing: 'border-box'}">
    <p>
      <el-row :gutter="6">
        <el-col :span="6"><el-button class="button" @click="label('v')" type="danger">Japanese ↕ [1]</el-button></el-col>
        <el-col :span="6"><el-button class="button" @click="label('h')" type="danger">Japanese ↔ [2]</el-button></el-col>
        <el-col :span="6"><el-button class="button" @click="label('e')" type="primary">English [3]</el-button></el-col>
        <el-col :span="6"><el-button class="button" @click="label('n')" type="info">Not Reading [4]</el-button></el-col>
      </el-row>
    </p>
    <p>
      <el-row :gutter="6">
        <el-col :span="12"><el-button class="button" @click="previous()">Previous [←]</el-button></el-col>
        <el-col :span="12"><el-button class="button" @click="next()">Next [→]</el-button></el-col>
      </el-row>
    </p>
    <p><el-button class="button" @click="stopLabeling">Stop Labeling</el-button></p>
  </div>
</template>

<script>

import { ipcRenderer } from 'electron'
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
      labelAll: electronStore.get('labelAll'),
      labels: [],
      imageFileList: [],
      fileCount: 0
    }
  },
  created: function () {
    const targetPath = path.join(electronStore.get('narrativeStoragePath'), decodeURI(this.$route.params.date))
    const timeZone = electronStore.get('selectedTimeZone')
    var fileList = []
    var labels = []
    for (const f of fs.readdirSync(targetPath)) {
      const stats = fs.statSync(path.join(targetPath, f))
      if (stats.isFile() && path.extname(f) === '.jpg') {
        const dt = moment.utc(f.slice(0, 15), 'YYYYMMDD_HH:mm:ss')
        const dtLocal = dt.utcOffset(timeZone).format('HH:mm:ss')
        fileList.push(path.join(targetPath, f))
        labels.push([dtLocal, ''])
      }
    }
    this.imageFileList = fileList
    if (this.date in this.labelAll) {
      this.labels = this.labelAll[this.date]
    } else {
      this.labels = labels
    }

    ipcRenderer.on('1', (msg) => {
      this.label('v')
    })
    ipcRenderer.on('2', (msg) => {
      this.label('h')
    })
    ipcRenderer.on('3', (msg) => {
      this.label('e')
    })
    ipcRenderer.on('4', (msg) => {
      this.label('n')
    })
    ipcRenderer.on('left', (msg) => {
      this.previous()
    })
    ipcRenderer.on('right', (msg) => {
      this.next()
    })
  },
  methods: {
    stopLabeling: function (e) {
      this.$router.push({ name: 'home' })
    },
    label: function (l) {
      this.labels[this.fileCount][1] = l
      this.labelAll[this.date] = this.labels
      electronStore.set('labelAll', this.labelAll)
      this.next()
    },
    labelName: function (label) {
      switch (label) {
        case 'v':
          return 'Japanese ↕'
        case 'h':
          return 'Japanese ↔'
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
    previous: function () {
      if (this.fileCount === 0) {
        return
      }
      this.fileCount -= 1
    },
    next: function () {
      if (this.fileCount === this.imageFileList.length - 1) {
        this.stopLabeling()
      }
      this.fileCount += 1
    }
  }
}
</script>

<style lang="scss">

#narrative {
  width: 100%;
}

</style>
