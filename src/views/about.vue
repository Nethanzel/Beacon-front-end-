<template>

  <div id="aBody">

    <div class="header">
      <h1>About</h1>
    </div>

    <div class="pageHeader">

      <div v-if="this.$store.getters.modeGetter" class="imgcontainer" id="imgcontent" >
        <img src="../assets/beaconAbt.png" class="img">
      </div>

      <div v-if="!this.$store.getters.modeGetter" class="imgcontainer" id="imgcontent" >
        <img src="../assets/beaconAbt-dark.png" class="img">
      </div>

      <h1 class="title"><span class="bold">B</span>eacon</h1>
    </div>

    <div class="pageBody">

      <div class="CardOne">

        <p>
          Beacon is a project that tries to automate some of the proccess of generating overwiews about taxes and billing state,
          for individuals or bussiness. Also pretends to become bolder through time and feedbacks in the future. 
        </p>

        
        <img src="../assets/Neth1.png" alt="Nethanzel" class="authorImg">

        <p class="author">
          Nethanzel Abad - 2020
        </p>

      </div>

    </div>
    
    <asideMenu />

</div>

</template>

<script>

import asideMenu from '../components/asidemenu.vue'

export default {
  name: 'about',
  title: 'Beacon | About',
  
  components: {
    asideMenu

  },

  created() {
    setTimeout(() => {

      let vR = 5;
      let vG = 5;
      let vB = 5;

      let vRGB = [0, 0, 0]; /* must be in a range betwen 0 - 255.
      If wanna change the range of colors, set a new range o numbers that must be a divisor of 5.
      */


      rainbowcolors();

      function rainbowcolors() {
        if (vRGB[0] >= 255) { //Here gets if the Red (R) component has reached the max allowed value (255).
          vR = - 5;
        } else if (vRGB[0] <= 0) { // if the Red (R) component is 0 (the lowest allowed value), then make the count increase.
          vR = 5;
        }

        if (vRGB[1] >= 255) { //The same than before but with the Green (G) component
          vG = - 5;
        } else if (vRGB[1] <= 0) { //Same than before but with Green (G) component
          vG = 5;
        }

        if (vRGB[2] >= 255) { //The same again
          vB = - 5;
        } else if (vRGB[2] <= 0) { //... and again...
          vB = 5;
        }

        vRGB[0] = vRGB[0] + vR; //Here you set the new value to the Red (R) component
        vRGB[1] = vRGB[1] + vG; //Here you set the new value to the Green (G) component
        vRGB[2] = vRGB[2] + vB; //Here you set the new value to the Blued (B) component

        let nRGB = "rgb(" + vRGB[0] + "," + vRGB[1] + "," + vRGB[2] + ")"; //Here you make up the RGB range to make sence before to be shown
        var crp = document.getElementById('imgcontent'); //Then you get the object you'd like to paint
        crp.style.background = nRGB; //And finally you give the new color RGB value to the property color

        setTimeout(rainbowcolors, 45); // Repeat all the code again and again every 35 miliseconds
      }


    }, 500)
  }
}

</script>


<style scoped>

*{
   font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;

}

.header {

    width: 100vw;
    height: 45px;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #8e8e8e8e;
    box-shadow: 0 2px 5px rgba(116, 115, 115, 0.5);
    background: rgba(136, 136, 136, 0.5);
    padding-left: 15px;

    display: flex;
    flex-direction: column;
    
    align-items: center;
}


#aBody {
  padding-left: 25px;
  padding-right: 25px;
 /* background: #222831;*/

}

.pageHeader{
  padding-top: 55px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

}

.imgcontainer {

    width: 480px;
    height: 320px;
    border-radius: 2%;
    /*display: block;
    background: #fff;*/
  }


.img {
    width: 480px;
    height: 320px;

}


.title .bold {
  font-weight: bold;
  color: #000;
  text-shadow: 4px 0 #000;
  letter-spacing:2px;
}

.title {
  font-size: 105px;
  text-align: center;
  font-weight: 100;
  color: rgb(97, 97, 97);
  margin-top: -20px;

}

.pageBody {

  width: auto;
  height: auto;

  padding-left: 25px;
  padding-right: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

}


.CardOne {

/*  display: flex;
  align-items: center;*/
  font-size: 16px;
  text-align: center;

  grid-area: cOne;

  height: 150px;
  width: 70vw;

/*   border: #888 solid 1px;

 background: linear-gradient(150deg, #000033, #ffffff);
  background-size: 300% 300%;
 -webkit-animation: AnimationName 15s ease infinite;
  -moz-animation: AnimationName 15s ease infinite;
  -o-animation: AnimationName 15s ease infinite;
  animation: AnimationName 15s ease infinite;*/
}

.author {
  font-size: 18px;
  font-weight: bold;
}

.authorImg {

  /*Neth1.png */
  width: 200px;
  height: 40px;
  margin-top: 25px;

  /*Neth2.png
  width: 150px;
  height: 150px;*/

}

/*
.CardThree {
  grid-area: cThree;
  height: 400px;
  border: #888 solid 1px;
  background: rgba(136, 136, 136, 0.15);

}

.CardThree:hover {
  background: linear-gradient(181deg, #000033, #ffffff);
  background-size: 100% 100%;

  -webkit-animation: AnimationName 10s ease infinite;
  -moz-animation: AnimationName 10s ease infinite;
  -o-animation: AnimationName 10s ease infinite;
  animation: AnimationName 10s ease infinite;
}

background: linear-gradient(181deg, #000033, #ffffff);
background-size: 400% 400%;

-webkit-animation: AnimationName 20s ease infinite;
-moz-animation: AnimationName 20s ease infinite;
-o-animation: AnimationName 20s ease infinite;
animation: AnimationName 20s ease infinite;
}
*/

@-webkit-keyframes AnimationName {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 51% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 51% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}
@-o-keyframes AnimationName {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 51% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 51% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}


</style>