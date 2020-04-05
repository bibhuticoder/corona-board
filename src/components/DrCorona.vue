<template>
  <div>
    <div class="show-handler" v-if="hidden">
      <img src="@/assets/images/corona-tip.png" class="animated bounceInUp" @click="toggle()" />
    </div>

    <div v-else class="dr-corona d-flex">
      <div class="image animated bounceInLeft">
        <!-- Doctor Corona -->
        <img src="@/assets/images/doctor-corona.png" />
      </div>

      <div class="messages">
        <div class="message-bubble font-weight-bold animated bounceInUp">
          <h6 class="mb-0 font-weight-bold">Did you know ?</h6>
        </div>
        <div class="message-bubble mb-1 animated bounceInUp">{{currentTip}}</div>

        <button
          class="btn btn-info btn-sm text-sm --btn-circle animated bounceInUp"
          @click="toggle()"
        >X</button>

        <div class="text-center">
          <button class="btn btn-info btn-sm text-sm animated bounceInLeft" @click="nextTip()">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { random } from "@/helpers/core";

export default {
  name: "DrCorona",
  data() {
    return {
      hidden: true,
      currentTip: null,
      tips: [
        "Several dogs and cats have tested positive to COVID-19, having close contact with infected humans.",
        "The virus was not manufactured in a lab and was cent percent biological.",
        "The first human cases of COVID-19 were identified in Wuhan City, China in December 2019.",
        "Currently, the source of the coronavirus (CoV) causing COVID-19 is unknown.",
        "The likelihood of an infected person contaminating commercial goods is low.",
        "Corona virus may persist on surfaces for a few hours or up to several days.",
        "There’s currently no vaccine to prevent coronavirus disease (COVID-19).",
        "Antibiotics only work for bacteria, not viruses. So it's not possible to cure the new corona virus disease with antibiotics.",
        "Droplets spread virus. By following good respiratory hygiene you protect the people around you from the virus",
        "Almost 80% of people recover from the virus without special treatment or cure.",
        "The coronavirus pandemic won’t end once warmer weather arrives.",
        "Vaccines against pneumonia won't protect you against COVID-19.",
        "Even if you don’t have symptoms, you can still be contagious.",
        "If you’re younger, you can still get coronavirus.",
        "No home remedies will kill the COVID-19 virus.",
        "Hand dryers are not effective in killing the virus.",
        "Regularly rinsing your nose with saline won't help prevent COVID-19 infection.",
        "There is no evidence to suggest that mosquitoes can transmit the virus. ",
        "Thermal scanners can not detect those who are infected with the new coronavirus.",
        "The COVID-19 virus and SARS(2003) are related to each other genetically, but the diseases they cause are quite different."
      ]
    };
  },

  created() {
    this.randomTip();

    setTimeout(() => (this.hidden = false), 60 * 1000);
  },

  methods: {
    toggle() {
      this.hidden = !this.hidden;
    },

    nextTip() {
      this.randomTip();
    },

    randomTip() {
      this.currentTip = this.tips[random(0, this.tips.length - 1)];
    }
  }
};
</script>

<style scoped>
.dr-corona {
  position: fixed;
  bottom: -15px;
  left: 20px;
  z-index: 1000000;
}

.dr-corona img {
  height: 200px;
}

.messages {
  position: relative;
}

.--btn-circle {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -35px;
  margin-right: -15px;
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}

.message-bubble {
  position: relative;
  background-color: #17a2b8;
  border-color: #17a2b8;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  width: 200px;
  height: auto;
  color: white;
  font-size: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.message-bubble:after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 12px solid transparent;
  border-right-color: #17a2b8;
  border-left: 0;
  border-bottom: 0;
  margin-top: -5px;
  margin-left: -12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.show-handler {
  position: fixed;
  bottom: -15px;
  left: -15px;
  transform: rotate(40deg);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.show-handler:hover {
  bottom: -10px;
  left: -12px;
}
</style>