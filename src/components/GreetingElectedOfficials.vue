<template>
  <div
    :style="greetingStyle"
    class="columns medium-20 medium-centered greeting"
  >
    <h2>{{ $t('electedOfficials.introPage.introTitle') }}</h2>
    <!-- <exclamation-callout
      :options="exclamationCalloutOptions"
    >
    </exclamation-callout> -->

    <!-- <p>{{ $t('electedOfficials.introPage.p2') }}</p> -->

    <p>{{ $t('electedOfficials.introPage.p3') }}</p>
    <div class="custom-section">
      <ul class="custom-ul">
        <li>{{ $t('electedOfficials.introPage.ul1.li1') }}</li>
        <li>{{ $t('electedOfficials.introPage.ul1.li2') }}</li>
        <li>{{ $t('electedOfficials.introPage.ul1.li3') }}</li>
      </ul>
    </div>

    <!-- <p><b>{{ $t('electedOfficials.introPage.p4_b') }}</b>{{ $t('electedOfficials.introPage.p4') }}</p>

    <p
      class="border"
      v-html="$t('electedOfficials.introPage.p5')"
    /> -->

    <div
      class="section-header"
      :style="{ 'background-color': '#F0F0F0', 'color': 'black' }"
    >
      <b>{{ $t('default.introPage.relatedContent') }}</b>
    </div>
    <div class="custom-section">
      <ul class="custom-ul">
        <li><a target="_blank" href="https://vote.phila.gov/voting/current-elected-officials/">{{ $t('default.introPage.link9') }}</a></li>
        <li><a href="/polling-place">{{ $t('default.introPage.link2') }}</a></li>
        <li><a target="_blank" href="https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx">{{ $t('default.introPage.link1') }}</a></li>
        <li><a href="/ballot">{{ $t('default.introPage.link7') }}</a></li>
        <li><a target="_blank" href="https://vote.phila.gov/candidates-campaigns/campaign-finance/">{{ $t('default.introPage.link10') }}</a></li>
        <!-- <li><a target="_blank" href="https://vote.phila.gov/voting/vote-by-mail/vote-by-mail/">{{ $t('default.introPage.link8') }}</a></li>
        <li><a target="_blank" href="https://www.pavoterservices.pa.gov/pages/electedOfficialstracking.aspx">{{ $t('default.introPage.link3') }}</a></li> -->
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
        text: 'electedOfficials.introPage.p1',
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
