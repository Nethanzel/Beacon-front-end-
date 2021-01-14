<template>

<div id="cBody">

    <span class="l" v-on:click="spamLess()">{{this.spChar}}</span>
    <span class="spam">{{this.cPosStr}}</span>
    <span class="r" v-on:click="spamPlus()">></span>

</div>

</template>


<script>
export default {

    name: 'spamPicker',

    data() {
        return{
            spam: [],
            cPosStr: "",
            position: this.pos,
            spChar: "<"
        }
    },

    props: {
        list: Array,
        pos: Number
    },

    watch: {
        cPosStr() {
            this.$emit('spamChanged', this.cPosStr)
        }
    },

    methods: {

        spamPlus() {

            this.position++

            if(this.position > this.spam.length -1){
                this.position = 0
            }

            this.cPosStr = this.spam[this.position]

        },

        spamLess() {

           this.position--

           if(this.position < 0){
                this.position = this.spam.length -1
            }

            this.cPosStr = this.spam[this.position];

        }
    },

    created() {

        this.spam = this.list;
        this.cPosStr = this.spam[this.position];

    },

}
</script>


<style scoped>

* {

    font-size: 15px;
}

#cBody {

    display: inline-block;
    border: 1px solid #636363;

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    padding: 3px 4px 2px 4px;

    margin: 10px;
    margin-top: 0;
    margin-bottom: 0;

    position: relative;
    top: -3px;

}

.l {

    margin-right: 5px;

    padding: 0 5px 0 5px;

    color:  #c4c4c4;

    font-weight: bold;
    font-family: fantasy;

    cursor: pointer;
    border-radius: 100%;
    border: 1px solid #c2c2c2;
}

.l:hover {

    border-radius: 100%;
    color: #fff;
    background: #414141;

}

.r {
    margin-left: 5px;

    padding: 0 5px 0 5px;

    color:  #c4c4c4;

    font-weight: bold;
    font-family: fantasy;

    cursor: pointer;
    border-radius: 100%;
    border: 1px solid #c2c2c2;
}

.r:hover {

    border-radius: 100%;
    color: #fff;
    background: #414141;

}


.spam {
    cursor: default;
    display: inline-block;
    width: 85px;
    text-align: center;

}

</style>