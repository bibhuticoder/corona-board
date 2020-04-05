<template>
  <div class="awareness-quiz">
    <div class="card">
      <div class="card-body">
        <!-- Start -->
        <div class="start-mode text-center" v-if="mode === 0">
          <h2>🤓Are you interested🤓</h2>

          <img src="@/assets/images/owl.png" class="mt-2 mb-4" />

          <p class="lead">Check your Corona Awareness Level</p>

          <button
            class="btn btn-success mt-4 animated bounce pulse infinite delay-1s"
            @click="mode = 1"
          >Start Test</button>
        </div>
        <!-- Running -->
        <div class="running-mode d-flex" v-else-if="mode === 1">
          <div class="question-container d-flex flex-column">
            <div
              class="toolbar w-100 d-flex flex-wrap justify-content-center flex-md-nowrap justify-md-content-start"
            >
              <img
                src="@/assets/images/owl.png"
                width="64"
                height="64"
                class="align-self-center animated bounceInDown mb-4 mr-4 mb-md-0"
                @click="mode = 0"
              />
              <div class="w-100 text-center">
                <h3>Corona Awareness</h3>
                <AwarenessBar :awarenessLevel="awarenessLevel" />
              </div>
            </div>

            <div class="question p-2 m-2">
              <h5
                class="question-text text-center font-weight-bold mt-4"
              >{{currentQuestion.question}}</h5>

              <div
                v-if="showNextQuestion"
                class="alert explanation-alert mt-4 mb-4 animated fadeIn faster"
                :class="{'alert-success': currentQuestion.selectedAnswer === currentQuestion.answer, 'alert-danger': currentQuestion.selectedAnswer != currentQuestion.answer}"
              >
                <p
                  class="lead"
                >{{currentQuestion.selectedAnswer === currentQuestion.answer ? '😀😀😀' : '😔😔😔'}}</p>
                {{currentQuestion.explanation}}
                <hr />
                <button
                  class="btn btn-sm"
                  :class="{'btn-success': currentQuestion.selectedAnswer === currentQuestion.answer, 'btn-danger': currentQuestion.selectedAnswer != currentQuestion.answer}"
                  @click="nextQuestion()"
                >
                  <span v-if="answered.length === 5">Finish</span>
                  <span v-else>Next Question</span>
                </button>
              </div>

              <div class="options d-flex mt-4 justify-content-center">
                <button
                  class="option true mr-2"
                  @click="submitAnswer(true)"
                  :disabled="showNextQuestion"
                >
                  <span class="emoji">😏</span> &nbsp; Its true
                </button>
                <button
                  class="option false ml-2"
                  @click="submitAnswer(false)"
                  :disabled="showNextQuestion"
                >
                  <span class="emoji">😒</span>
                  &nbsp; Nope
                </button>
              </div>

              <div class="question-pagination d-flex justify-content-center mt-4">
                <button
                  class="btn --btn-circle mr-2 font-weight-bold"
                  v-for="i in 5"
                  :key="i"
                  :class="{'btn-danger': i <= answered.length, 'btn-outline-danger': i > answered.length}"
                  :disabled="true"
                >{{i}}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- End -->
        <div class="end-mode text-center" v-else-if="mode === 2">
          <h1>Congratulations!</h1>
          <div class="alert alert-info">
            <div class="d-flex">
              <img src="@/assets/images/owl.png" class="align-self-center mr-4" />
              <p class="info mb-0 align-self-center text-left" v-html="awarenessMessage"></p>
            </div>
          </div>

          <p class="lead">
            You have successfully completed the test
            <br />You corona awareness level is
            <span class="font-weight-bold">{{awarenessLevel}} %</span>
          </p>
          <button class="btn btn-success mt-4" @click="restart()">Test Again</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { random } from "@/helpers/core";
import AwarenessBar from "@/components/AwarenessBar";

export default {
  name: "DrCorona",
  components: { AwarenessBar },
  data() {
    return {
      mode: 0, //0: start, 1: running, 2: end
      maxQuestions: 5,
      currentQuestion: null,
      questions: [
        {
          question:
            "Face masks are recommended for the general public in stopping the spread of COVID-19.",
          answer: true,
          explanation:
            "The CDC does not recommend face masks for the general public. You don't need to stock up on them, but they can in fact be helpful for health workers and very at-risk people"
        },

        {
          question:
            "Can you catch the coronavirus disease (COVID-19) from your pet ?",
          answer: false,
          explanation:
            "No. There is no evidence to date that pets such as cats and dogs can spread the virus that causes COVID-19."
        },

        {
          question: "Can humans transmit COVID-19 virus to animals ?",
          answer: true,
          explanation:
            "Yes. Several dogs and cats have tested positive to COVID-19 virus following close contact with infected humans."
        },

        {
          question:
            "Catching the new coronavirus mean you will have it for life.",
          answer: false,
          explanation:
            "No. Most of the people who catch COVID-19 can recover and eliminate the virus from their bodies."
        },

        {
          question:
            "Taking a hot bath does not prevent the coronavirus disease.",
          answer: true,
          explanation:
            "Yes. aking a hot bath will not prevent you from catching COVID-19. Your normal body temperature remains around 36.5°C to 37°C, regardless of the temperature of your bath or shower."
        },

        {
          question:
            "Thermal scanners are effective in detecting people infected with the coronavirus disease.",
          answer: false,
          explanation:
            "Thermal scanners are effective in detecting people who have developed a fever.However, they cannot detect people who are infected but are not yet sick with fever."
        },

        {
          question:
            "Being able to hold your breath for 10 seconds or more without coughing or feeling discomfort does not mean you are free from the coronavirus disease (COVID-19) ",
          answer: true,
          explanation:
            "The best way to confirm if you have  the virus producing COVID-19 disease is with a laboratory test. You cannot confirm it with this breathing exercise."
        },

        {
          question:
            "Can eating garlic helps prevent infection with the new coronavirus?",
          answer: false,
          explanation:
            "Garlic is a healthy food that may have some antimicrobial properties. However, there is no evidence from the current outbreak that eating garlic has protected people from the new coronavirus."
        },

        {
          question:
            "Drinking alcohol does not protect you against COVID-19 and can be dangerous.",
          answer: true,
          explanation:
            "Damn True. Frequent or excessive alcohol consumption can increase your risk of health problems."
        },

        {
          question:
            "Can an ultraviolet disinfection lamp kill the new coronavirus?",
          answer: false,
          explanation:
            "UV lamps should not be used to sterilize hands or other areas of skin as UV radiation can cause skin irritation."
        },

        {
          question: "Mosquito bite doesn’t transmit Covid-19.",
          answer: true,
          explanation:
            "To date there has been no information nor evidence to suggest that the new coronavirus could be transmitted by mosquitoes."
        },

        {
          question: "Is there a vaccine for a novel coronavirus?",
          answer: false,
          explanation:
            "When a disease is new, there is no vaccine until one is developed. It can take a number of years for a new vaccine to be developed."
        },

        {
          question:
            "Can COVID-19 virus can be transmitted in areas with hot and humid climates?",
          answer: true,
          explanation:
            "From the evidence so far, the COVID-19 virus can be transmitted in ALL AREAS, including areas with hot and humid weather."
        },

        {
          question: "The new coronavirus affect only older people",
          answer: false,
          explanation:
            "People of all ages can be infected by the novel coronavirus. Older people, and people with pre-existing medical conditions appear to be more vulnerable to becoming severely ill with the virus."
        }
      ],
      showNextQuestion: false,
      answered: [],
      score: 0,
      startTime: 0,
      endTime: 0
    };
  },

  created() {
    this.restart();
  },

  methods: {
    submitAnswer(value) {
      if (value === this.currentQuestion.answer) this.score++;
      this.currentQuestion.selectedAnswer = value;
      this.showNextQuestion = true;
      this.answered.push(this.currentQuestion);
    },

    toggle() {
      this.hidden = !this.hidden;
    },

    nextQuestion() {
      // end game
      if (this.answered.length === this.maxQuestions) {
        this.mode = 2;
        this.endTime = Date.now();
      }

      // load next unique question
      this.randomQuestion();
      while (
        this.answered.find(q => q.question === this.currentQuestion.question)
      ) {
        this.randomQuestion();
      }
      this.showNextQuestion = false;
    },

    randomQuestion() {
      this.currentQuestion = this.questions[
        random(0, this.questions.length - 1)
      ];
    },

    restart() {
      this.mode = 0;
      this.score = 0;
      this.randomQuestion();
      this.answered = [];
      this.showNextQuestion = false;
      this.startTime = Date.now();
    }
  },

  computed: {
    awarenessLevel() {
      if (this.score === 0) return 0;
      return (this.score / 5) * 100;
    },

    awarenessMessage() {
      let A = this.awarenessLevel;
      let P = (this.endTime - this.startTime) / 1000;
      let r; //response
      if (A < 40)
        r = `You don't have enough knowledge on Corona Virus. Please go to <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/" target="_blank"> this </a> link to learn more 😅`;
      else if (A > 40 && A < 85)
        r =
          "You have pretty good knowledge on this domain. Keep it up and stay safe 😉";
      else if (A > 85 && P > 30)
        r =
          "You seem highly knowledgeable. Please share your knowledge with you family and friends 😮";
      else if (A > 85 && P < 30)
        r =
          "Wow you answered so fast. Maybe you just got lucky or You are a true genius 🤔";
      else if (A < 50 && P < 30)
        r =
          "Ooo you answered so fast but your awareness level is low. Please take it seriously 😒";
      else if (P > 5 * 60)
        r = "How can you be so slow to answer just 5 questions 😴";
      else r = "Thanks for your time 🙂";
      return r;
    }
  }
};
</script>

<style lang="scss" scoped>
$light: #ff2261;
$dark: #b7305d;

.card {
  border-color: $dark;
}

.question-container {
  width: 100%;
  position: relative;
  .toolbar {
    width: 100%;
  }

  .question {
    background-color: lighten($dark, 50%);
    border-radius: 5px;

    .explanation-alert {
      position: absolute;
      height: auto;
      width: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      text-align: center;
    }
  }
}

.options {
  .option {
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    border: 1px solid $dark;
    background-color: white;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;

    &:hover {
      background-color: $dark;
      color: white;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}

.emoji {
  font-size: 18px;
}

.--btn-circle {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}
</style>

