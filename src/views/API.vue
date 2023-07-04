<template>
    <app-header></app-header>
    <div class="flex flex-col md:flex-row">
        <div class="flex-1 flex flex-col items-left justify-end px-4 md:pb-12">
            <h2 class="text-4xl text-left mt-12 text-gradient leading-relaxed"
                :class="currentLanguage == 'CN' ? 'text-[1.8rem] md:text-3xl md:leading-loose' : ''">{{ $t(`message.Desc0`) }}
                <br>
                {{
                    $t(`message.Desc1`) }} <br> {{ $t(`message.Desc2`) }}
            </h2>
            <div class="btn mt-4" ref="btn">
                <div class="btn-back">
                    <div class="form__group field">
                        <input type="input" class="form__field" placeholder="Name" name="name" id='name' v-model="inputText"
                            required />
                        <label for="name" class="form__label">{{ $t(`message.Input`) }}</label>
                    </div>
                    <button class="yes mt-3 w-full" @click="yesClick">{{ $t(`message.Confirm`) }}</button>
                </div>
                <button class="btn-front text-white bg-black border-0 outline-none glow-on-hover" @click="frontClick"
                    ref="btn-front" type="button">{{ waitlist }}</button>
            </div>
        </div>
        <div class="flex-1 p-4">
            <img class="w-auto" src="@/assets/intro.gif" alt="logo" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api.js';
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const currentLanguage = computed(() => store.getters.currentLanguage);

const btn = ref(null);
var inputText = ref('');
var loading = ref(false);
var waitlist = ref('Join Waitlist');

function distance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

const frontClick = (event) => {
    var mx = event.clientX - btn.offsetLeft,
        my = event.clientY - btn.offsetTop;

    var w = btn.offsetWidth,
        h = btn.offsetHeight;

    var directions = [
        { id: 'top', x: w / 2, y: 0 },
        { id: 'right', x: w, y: h / 2 },
        { id: 'bottom', x: w / 2, y: h },
        { id: 'left', x: 0, y: h / 2 }
    ];

    directions.sort(function (a, b) {
        return distance(mx, my, a.x, a.y) - distance(mx, my, b.x, b.y);
    });

    btn.value.setAttribute('data-direction', directions.shift().id);
    btn.value.classList.add('is-open');
}

const yesClick = () => {
    loading = true;
    api.get('/email/' + inputText.value).then(res => {
        loading = false;
        btn.value.classList.remove('is-open');
        waitlist.value = 'You are in the list !';
    }).catch(err => {
        console.log(err);
    });
}

</script>

<style scoped>
.text-gradient {
    background: linear-gradient(90.13deg, #d1aad7 .11%, #c88bc4 25.06%, #7b8fdd 50%, #86bff2 74.8%, #bbdef2 99.76%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.btn.is-open~ {
    opacity: 0;
}

.btn {
    display: block;
    position: relative;
    width: 15rem;
    height: 4rem;
    transition: width 0.8s cubic-bezier(0.23, 1, 0.32, 1), height 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
}

.btn-front {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    cursor: pointer;
    backface-visibility: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transition: background 0.15s ease, line-height 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.btn-back {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 1rem;
    padding: 1rem;
    transform: translateZ(-2px) rotateX(180deg);
    overflow: hidden;
    transition: box-shadow 0.8s ease;
}

.btn-back button.yes {
    color: #fff;
    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}

.btn[data-direction="left"] .btn-back,
.btn[data-direction="right"] .btn-back {
    transform: translateZ(-2px) rotateY(180deg);
}

.btn.is-open {
    width: 20rem;
    height: 10rem;
}

.btn[data-direction="top"].is-open {
    transform: rotateX(180deg);
}

.btn[data-direction="right"].is-open {
    transform: rotateY(180deg);
}

.btn[data-direction="bottom"].is-open {
    transform: rotateX(-180deg);
}

.btn[data-direction="left"].is-open {
    transform: rotateY(-180deg);
}

@media (any-hover: hover) {
    .glow-on-hover:before {
        content: '';
        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
        position: absolute;
        top: -2px;
        left: -2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing 20s linear infinite;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        border-radius: 10px;
    }

    .glow-on-hover:after {
        z-index: -1;
        content: '';
        position: absolute;
        background: #111;
        left: 0;
        top: 0;
        border-radius: 10px;
    }

    .glow-on-hover:hover:before {
        opacity: 1;
    }

    button:hover {
        border-color: white;
    }
}



@keyframes glowing {
    0% {
        background-position: 0 0;
    }

    50% {
        background-position: 400% 0;
    }

    100% {
        background-position: 0 0;
    }
}


.form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 90%;
}

.form__field {
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    border-radius: 0;
    outline: 0;
    font-size: 1rem;
    padding: 15px 7px 7px 0;
    background: transparent;
    transition: border-color 0.2s;
}

.form__field::placeholder {
    color: transparent;
}

.form__field:placeholder-shown~.form__label {
    font-size: 1rem;
    cursor: text;
    top: 20px;
}

.form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;
}

.form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #c88bc4, #86bff2);
    border-image-slice: 1;
}

.form__field:focus~.form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #7b8fdd;
    font-weight: 700;
}

/* reset input */
.form__field:required,
.form__field:invalid {
    box-shadow: none;
}
</style>
