<template>
<div>
  <div class="wrapper">
    <div>
      <click-zone
        style="max-width:250px; margin-top: 15rem;"
        :backgroundImageUrl="teeth.backgroundImageUrl"
        :zones="teeth.zones"
      ></click-zone>
    </div>
    <div>
      <click-zone
        style="max-width:250px;"
        :backgroundImageUrl="car.backgroundImageUrl"
        :zones="car.zones"
        @toggled-zone="toggleHandler"
        @selected-zones="selectedHandler"
        @is-loading="loadingHandler"
        :loadingIndicator="false"
      ></click-zone>
    </div>
    <div class="data">
      <b>All Selected Zones on Car Here:</b>
      <br>
      <div v-for="zone in selectedZones">
        {{zone.key}} - {{zone.description}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data () {
      return {
        teeth: {
          backgroundImageUrl: '/click-zone-demo/teeth/All_desktop.png',
          zones: [
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-17.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-18.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-19.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-20.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-21.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-22.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-23.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-24.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-25.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-26.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-27.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-28.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-29.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-30.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-31.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Minus/Single_desktop-32.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop_01.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-02.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-03.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-04.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-05.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-06.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-07.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-08.png',
              selected: true
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-09.png',
              selected: true
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-10.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-11.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-12.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-13.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-14.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-15.png',
              selected: false
            },
            {
              imageUrl: '/click-zone-demo/teeth/Plus/Single_desktop-16.png',
              selected: false
            }
          ]
        },
        car: {
          backgroundImageUrl: '/click-zone-demo/car/car.png',
          zones: [
            {
              key: 'VSF',
              description: 'Venstre side forrest',
              imageUrl: '/click-zone-demo/car/leftfront.png',
              selected: false
            },
            {
              key: 'FRONT',
              description: 'Front',
              imageUrl: '/click-zone-demo/car/front.png',
              selected: false
            },
            {
              key: 'HSF',
              description: 'Højre side forrest',
              imageUrl: '/click-zone-demo/car/rightfront.png',
              selected: false
            },
            {
              key: 'VSM',
              description: 'Venstre side midtfor',
              imageUrl: '/click-zone-demo/car/leftside.png',
              selected: false
            },
            {
              key: 'FRONTRUDE',
              description: 'Forrude',
              imageUrl: '/click-zone-demo/car/frontwindow.png',
              selected: false
            },
            {
              key: 'HSM',
              description: 'Højre side midtfor',
              imageUrl: '/click-zone-demo/car/rightside.png',
              selected: false
            },
            {
              key: 'TAG',
              description: 'Tag',
              imageUrl: '/click-zone-demo/car/roof.png',
              selected: false
            },
            {
              key: 'BAGRUDE',
              description: 'Bagrude',
              imageUrl: '/click-zone-demo/car/backwindow.png',
              selected: false
            },
            {
              key: 'VSB',
              description: 'Venstre side bagest',
              imageUrl: '/click-zone-demo/car/leftback.png',
              selected: false
            },
            {
              key: 'BAG',
              description: 'Bagpå',
              imageUrl: '/click-zone-demo/car/centerback.png',
              selected: false
            },
            {
              key: 'HSB',
              description: 'Højre side bagest',
              imageUrl: '/click-zone-demo/car/rightback.png',
              selected: false
            }
          ]
        },
        selectedZones: [],
      }
    },
    methods: {
      toggleHandler (toggledZone, index) {
        // eslint-disable-next-line no-console
        console.log(`You toggled zone "${toggledZone.key}" (index: ${index} in list) ${toggledZone.selected ? 'on' : 'off'}`)
      },
      selectedHandler (selectedZones) {
        this.selectedZones = selectedZones
      },
      loadingHandler (isLoading) {
        console.log(`Car Canvas is Loading: ${isLoading}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrapper {
  .data {
    margin-top: 15rem;
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
