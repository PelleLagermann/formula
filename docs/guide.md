# Getting Started

Alka Vue-Components is a VueJS Plugin Library for reusable Alka specivic Vue Components. 

## Install

``` bash
npm install @alka/vue-components --save
```

## Usage

Adding Alka Vue-Components to your project is easy:

``` javascript
import Vue from 'vue'


// Import Alka Vue-Components.
import AlkaVueComponents from '@alka/vue-components'

// Add all CSS Styles to the project.
import '@alka/vue-components/dist/vue-components.css'

// Use the AlkaVueComponents Plugin
Vue.use(AlkaVueComponents)


Vue.config.productionTip = false
new Vue({
router,
render: h => h(App)
}).$mount('#app')
```

## Contribute

Alka Vue-Components relies on YOU! to add more components to this project. 

<p style="text-align: center; font-weight: bold">
    <a href="http://tfs.alkait.net:8080/tfs/defaultcollection/_versionControl?path=%24%2FMinSys%2FJavascript%2FAlka.Vue.Components" target="_blank" title="TFS Repository">Help us, help YOU!</a>
</p>
