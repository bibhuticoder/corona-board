<template>
  <div class="symptoms">
    <div class="top d-flex">
      <img src="@/assets/images/doctor.png" class="mr-2" width="32" height="32" />
      <p
        class="lead text-center font-weight-bold"
      >Feel like you are infected ? Compare your symptoms with similar health issues.</p>
    </div>

    <div class="disease-list d-flex justify-content-center">
      <div
        v-for="(disease, index) in diseases"
        :key="index"
        class="disease-list-item"
        :class="{'--active': activeDisease === disease}"
        @click="selectActiveDisease(disease)"
      >{{disease.name}}</div>
    </div>

    <div class="symptom-list d-flex justify-content-center flex-wrap">
      <div
        class="symptom-list-item"
        :class="'--level-' + symptom"
        v-for="(symptom, index) in getSymptoms(activeDisease)"
        :key="index"
      >
        <div class="info">
          <span class="symptom-name">{{getSymptomNames()[index]}}</span>
          <span class="symptom-level">{{getLevel(symptom)}}</span>
        </div>
      </div>
    </div>

    <p class="source text-center mt-4">
      <span class="font-weight-bold">*In case of Flu, children can sometimes have Diarrhea</span>

      <br />Sources: CDC, WHO, American College of Allergy, Asthma and Immunology
    </p>
  </div>
</template>

<script>
import { random } from "@/helpers/core";

export default {
  name: "DrCorona",
  data() {
    return {
      diseases: [
        { name: "COVID-19" },
        { name: "Common Cold" },
        { name: "Flu" },
        { name: "Allergies" }
      ],
      activeDisease: null
    };
  },

  created() {
    this.activeDisease = this.diseases[0];
  },

  methods: {
    getLevel(level) {
      const levels = ["Common", "Sometimes", "Mild", "Rare", "No"];
      return levels[level];
    },

    getSymptomNames() {
      return [
        "Fever",
        "Dry Cough",
        "Shortness of breath",
        "Headaches",
        "Aches & pains",
        "Sore Throat",
        "Fatigue",
        "Diarrhea",
        "Runny nose",
        "Sneezing"
      ];
    },

    getSymptoms(disease) {
      const symptoms = {
        "COVID-19": [0, 0, 0, 1, 1, 1, 1, 3, 3, 4],
        "Common Cold": [3, 2, 4, 3, 0, 0, 1, 4, 0, 0],
        Flu: [0, 0, 4, 0, 0, 0, 0, 1, 1, 4],
        Allergies: [1, 1, 0, 1, 4, 4, 1, 4, 0, 0]
      };
      return symptoms[disease.name];
    },

    selectActiveDisease(disease) {
      this.activeDisease = disease;
    }
  }
};
</script>

<style lang="scss" scoped>
$green: #28a745;
$color-common: #bd2130;
$color-sometimes: #17a2b8;
$color-mild: #ffc107;
$color-rare: lightsalmon;
$color-no: grey;

// $color-common: #b71c1c;
// $color-sometimes: #d32f2f;
// $color-mild: #ef5350;
// $color-rare: #ef9a9a;
// $color-no: #ffebee;

.disease-list-item {
  margin: 0.5rem;
  cursor: pointer;
  border-bottom: 2px solid whitesmoke;
  transition: all 0.5s ease-in-out;
  text-align: center;

  &.--active {
    border-color: #373737;
  }
}

.symptom-list-item {
  width: 150px;
  height: 50px;
  text-align: center;
  border-radius: 10px;
  position: relative;
  font-size: 14px;
  margin: 0.75rem 1rem;
  transition: all 0.5s ease-in-out;
  background-color: whitesmoke;
  padding-bottom: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &.--level-0 {
    border-color: $color-common;
    color: $color-common;

    .symptom-level {
      background-color: $color-common;
    }
  }

  &.--level-1 {
    border-color: $color-sometimes;
    color: $color-sometimes;

    .symptom-level {
      background-color: $color-sometimes;
    }
  }

  &.--level-2 {
    border-color: $color-mild;
    color: $color-mild;

    .symptom-level {
      background-color: $color-mild;
    }
  }

  &.--level-3 {
    border-color: $color-rare;
    color: $color-rare;

    .symptom-level {
      background-color: $color-rare;
    }
  }

  &.--level-4 {
    border-color: $color-no;
    color: $color-no;

    .symptom-level {
      background-color: $color-no;
    }
  }

  .symptom-name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .symptom-level {
    position: absolute;
    bottom: 0;
    left: 50%;
    font-size: 12px;
    transform: translate(-50%, 50%);
    background-color: #373737;
    color: white;
    padding: 0.1rem 0.5rem;
    border-radius: 5px;
    transition: all 0.5s ease-in-out;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}
.source {
  font-size: 10px;
}
</style>