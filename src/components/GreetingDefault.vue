<template>
  <div
    :style="greetingStyle"
    class="columns medium-20 medium-centered greeting"
  >
    <h2>{{ $t('default.introPage.introTitle') }}</h2>
    <!-- <exclamation-callout
      :options="exclamationCalloutOptions"
    >
    </exclamation-callout> -->

    <!-- <p>{{ $t('default.introPage.p2') }}</p> -->

    <p>{{ $t('default.introPage.p3') }}</p>
    <div class="custom-section">
      <ul class="custom-ul">
        <li>{{ $t('default.introPage.ul1.li1') }}</li>
        <li>{{ $t('default.introPage.ul1.li2') }}</li>
        <li>{{ $t('default.introPage.ul1.li3') }}</li>
        <li>{{ $t('default.introPage.ul1.li4') }}</li>
        <li>{{ $t('default.introPage.ul1.li5') }}</li>
      </ul>
    </div>

    <!-- <p><b>{{ $t('default.introPage.p4_b') }}</b>{{ $t('default.introPage.p4') }}</p>

    <p class="border">
      {{ $t('default.introPage.p5') }}
    </p> -->

    <div
      class="section-header"
      :style="{ 'background-color': '#F0F0F0', 'color': 'black' }"
    >
      <b>{{ $t('default.introPage.relatedContent') }}</b>
    </div>
    <div class="custom-section">
      <ul class="custom-ul">
        <li><a target="_blank" href="https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx">{{ $t('default.introPage.link1') }}</a></li>
        <li><a target="_blank" href="https://www.pavoterservices.pa.gov/pages/ballottracking.aspx">{{ $t('default.introPage.link3') }}</a></li>
        <!-- <li><a target="_blank" href="https://www.pavoterservices.pa.gov/Pages/voterregistrationstatus.aspx">{{ $t('default.introPage.link4') }}</a></li> -->
      </ul>
    </div>

  </div>
</template>

<script>

import TopicComponent from '@phila/vue-comps/src/components/TopicComponent.vue';
// import ExclamationCallout from './ExclamationCallout.vue';

export default {
  components: {
    // ExclamationCallout,
  },
  mixins: [ TopicComponent ],
  props: {
    'message': {
      type: String,
      default: function() {
        return 'defaultMessage';
      },
    },
  },
  data() {
    let data = {
      greetingStyle: this.$props.options.style || {},
    };
    return data;
  },
  computed: {
    exclamationCalloutSlots() {
      return {
        text: 'default.introPage.p1',
      };
    },
    exclamationCalloutOptions() {
      return {
        components: [
          {
            type: 'exclamationContentGreeting',
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
  .mb-panel-topics-greeting {
    padding-top: 20px;
  }

  .greeting {
    font-size: 16px;
    color: #444;
    /* padding: 14px; */
  }

  .greeting-error {
    border-left-color: #ff0000;
  }

  .border {
    border-style: solid;
    border-width: 2px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .custom-section {
    margin-left: 8px;
    margin-top: 4px;
  }

  .custom-ul {
    margin-left: 2rem;
    /* font-size: 14px; */
  }

  .section-header {
    margin-top: 26px;
    padding-left: 4px;
  }

  /*medium*/
  @media screen and (min-width: 750px) {
    .mb-panel-topics-greeting {
      /*make this scroll on medium screens*/
      /*REVIEW this is a little hacky. the 120px shouldn't be hard-coded.*/
      height: calc(100vh - 120px);
      overflow: auto;
    }
  }
</style>
