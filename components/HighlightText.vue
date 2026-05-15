<!-- HighlightText.vue -->
<template>
  <span>
    <template v-for="(segment, index) in segments">
      <mark 
        v-if="segment.highlight" 
        :key="index" 
        class="highlight"
      >
        {{ segment.text }}
      </mark>
      <span v-else>
        {{ segment.text }}
      </span>
    </template>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    keyword: {
      type: String,
      default: ''
    },
    caseSensitive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    segments() {
      if (!this.keyword.trim()) {
        return [{ text: this.text, highlight: false }];
      }
      
      const flags = this.caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(`(${this.keyword})`, flags);
      const parts = this.text.split(regex);
      
      return parts.map(part => ({
        text: part,
        highlight: regex.test(part)
      }));
    }
  }
};
</script>
