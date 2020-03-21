<template>
  <div>
    <div class="wrapper">
      <card
        :icon="claim.productId"
        :title="claim.productDescription"
        :text="claim.objectDescription"
        :text-bottom="`${texts.cardBottomTextDescriptionLabel} ${claim.caseDate}`"
        :ribbon-text="claim.status"
        link="/components/basic/card.html#example-source-code"
        :class="claim.statusCode === 'CL' ? 'card--faded-ribbon' : ''"
        >
      </card>

      <card
        icon="HU"
        title="Husforsikring"
        :text="claim.objectDescription"
        :text-bottom="`${texts.cardBottomTextDescriptionLabel} ${claim.caseDate}`"
        :ribbon-text="claim.status"
        class="card--faded-ribbon"
        >
      </card>

      <card
        icon="LA"
        title="Lønforsikring"
        :text="claim.objectDescription"
        :text-bottom="`${texts.cardBottomTextDescriptionLabel} ${claim.caseDate}`"
        :ribbon-text="claim.status"
        class="card--orange-ribbon"
        >
      </card>
    </div>

    <br>

    <div class="wrapper">
      <card
        icon="PE"
        title="Personbilforsikring"
        :text="claim.objectDescription"
        :text-bottom="`${texts.cardBottomTextDescriptionLabel} ${claim.caseDate}`"
        link="/components/basic/card.html#example-source-code"
        >
      </card>

      <card
        icon="PE"
        title="Personbilforsikring"
        :text="claim.objectDescription"
        :text-bottom="`${texts.cardBottomTextDescriptionLabel} ${claim.caseDate}`"
        :pageHeader="true"
        link="/components/basic/card.html#example-source-code"
        >
      </card>

      <card
        icon="PE"
        title="Personbilforsikring"
        :text="claim.objectDescription"
        :text-bottom="`${texts.cardBottomTextDescriptionLabel} ${claim.caseDate}`"
        :ribbon-text="claim.status"
        :pageHeader="true"
        >
      </card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
    return {
      claim: {
        productId: 'FF',
        productDescription: 'Indboforsikring',
        objectDescription: 'Vogtervej 12, 2300 København S',
        caseDate: '23.12.2019',
        status: 'Behandles',
        statusCode: 'OP'
      },
      texts: {
        cardBottomTextDescriptionLabel: 'Anmeldt:'
      }
    }
  },
  }
</script>

<style lang="scss" scoped>
.wrapper {
  .card {
    width: 90%;
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
