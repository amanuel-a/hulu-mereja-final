<template>
  <div class="wrapper">
    <div class="overviewInfo">
      <div class="actions"></div>

      <div class="productinfo">
        <div class="grouptext">
          <h2 style="text-transform: uppercase">{{ feature.title }}</h2>
        </div>
        <div class="grouptext">
          <h3>RELEASE</h3>
          <p>Fall 2020</p>
        </div>

        <div class="productImage">
          <img :src="feature.img" alt="product: ps5 controller image" />
        </div>
      </div>
    </div>
    <!-- overview info -->

    <div class="productSpecifications">
      <h1>{{ feature.subTitle }}</h1>
      <p>
        {{ feature.text }}
      </p>
    </div>
    <!-- product specificaiton -->
  </div>
  <!-- wrapper-->
</template>

<script>
export default {
  name: "Card",
  props: ["feature", "index"],

  data() {
    return {};
  },
};
</script>

<style lang="sass" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap")

*,
button,
input
  margin: 0px
  padding: 0px
  box-sizing: border-box

  font-family: "Roboto", sans-serif

.wrapper
 
  min-width:390px
  max-width: 450px
  border-radius: .5rem
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px
  background-color:#E4D9FF
  overflow: hidden
  height: 100%
  display: flex
  flex-direction: column

.overviewInfo,
.productSpecifications
  padding: 24px

.productSpecifications
  background-color:#fff
  flex-grow: 1

.overviewInfo
  // background-image: linear-gradient(176deg, #3d9dea, #4a4eee)

.actions
  display: flex
  justify-content: space-between
  margin-bottom: 32px

  .cartbutton
    position: relative

  &::after
    content: ""
    display: block
    width: 8px
    height: 8px
    background-image: linear-gradient(90deg, #489be2, #0f629c)
    border-radius: 50%
    position: absolute
    top: 11px
    right: 8px

  & svg
    color: #ababab73

  .backbutton,
  .cartbutton
    width: 40px
    height: 40px
    border-radius: 50%

.productinfo
  display: flex
  flex-direction: column
  justify-content: space-between
  position: relative
  min-height: 200px
  margin-bottom: 50px

.productImage
  position: absolute
  right: 0
  width: 250px
  height: auto
  transform: rotate(-90deg) translate(-56px, 66px)

  // animation: updowncontroller infinite 3s alternate;
  img
    width: 100%
    height: auto

    transition: ease 2s all
  &:hover
    transition: ease 2s all
    animation: none
    transform: rotate(-70deg) translate(10px, 66px)

h1
  font-family: "Michroma", sans-serif

.grouptext
  h2
  color: black
  h3
    letter-spacing: 3.2px
    font-size: 14px
    font-weight: 500
    margin-bottom: 8px
    color: #6C63FF

  p
    font-size: 12px
    opacity: 0.8
    color: #6C63FF

/* product specifications */
.featureIcon
  width: 40px
  height: 40px
  background-image: linear-gradient(120deg, #343a4f, #0f1620)
  border-radius: 8px
  margin-right: 16px

.productSpecifications
  h1
    margin-top: 10px
    margin-bottom: 16px
    font-size: 32px
    color: #6C63FF

  p
    opacity: 0.8
    font-size: 15px
    line-height: 1.5

  .productFeatures
    display: grid
    grid-template-columns: 1fr 1fr
    margin-top: 20px
    grid-row-gap: 16px
    .feature
      display: flex

.priceTag
  display: flex
  align-items: center
  font-size: 32px

  & span
    color: #488dc7
    font-size: 20px

/* checkout button*/
button.preorder
  outline: 0
  border: 0
  border-radius: 6px
  display: flex
  align-items: center
  overflow: hidden
  background-image: linear-gradient(85deg, #61c7ef, #4833fb)
  color: white

.preorder p
  padding: 8px 17px
  border-right: 1px solid rgba(0, 0, 0, 0.4)

.buttonaction
  border-left: 1px solid rgba(255, 255, 255, 0.2)
  padding: 5px 5px
  display: flex
  align-items: center
  justify-content: center
  color: rgba(255, 255, 255, 0.7)

/* animation */

@keyframes updowncontroller
  0%
    transform: rotate(-90deg) translate(-56px, 66px)

  80%,
  100%
    transform: rotate(-70deg) translate(10px, 66px)
</style>