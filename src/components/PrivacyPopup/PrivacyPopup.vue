<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { basicProps } from './props'

interface ParsedContent {
  type: 'link' | 'text'
  content: string
  url?: string
}

type OnNeedPrivacyAuthorizationCallback = (params: {
  event: 'agree' | 'disagree'
  buttonId?: string
}) => void

const props = defineProps(basicProps)
const $emits = defineEmits(['agree', 'disagree'])

const visibleRef = ref(false)
const parsedContentRef = ref<ParsedContent[]>([])
const privacyResolvesRef = ref(new Set<OnNeedPrivacyAuthorizationCallback>())

function handleAgree() {
  visibleRef.value = false

  // #ifdef MP-WEIXIN
  privacyResolvesRef.value.forEach((resolver) => {
    resolver({
      event: 'agree',
      buttonId: 'agree-btn',
    })
  })
  privacyResolvesRef.value.clear()
  // #endif

  $emits('agree', {
    close: () => {
      visibleRef.value = false
    },
  })
}

function exit() {
  // #ifdef MP-WEIXIN
  wx.exitMiniProgram()
  // #endif

  $emits('disagree', {
    close: () => {
      visibleRef.value = false
    },
  })
}

function privacyHandler(resolver: OnNeedPrivacyAuthorizationCallback) {
  parsedContentRef.value = parseContent()
  privacyResolvesRef.value.add(resolver)
  visibleRef.value = true
}

onBeforeMount(() => {
  // #ifdef MP-WEIXIN
  if (wx.onNeedPrivacyAuthorization) {
    wx.onNeedPrivacyAuthorization((resolver: unknown) => {
      if (typeof resolver === 'function') {
        privacyHandler(resolver as OnNeedPrivacyAuthorizationCallback)
      }
    })
  }
  // #endif
})

/**
 * protocols -> [{ name: '《用户隐私保护指引》' }]
 * content   -> 同意$0该条款内容
 *
 * output: ParsedContent[]
 *
 * 同意、《用户隐私保护指引》、该条款内容
 */
function parseContent(): ParsedContent[] {
  const { content, protocols } = props
  const result: ParsedContent[] = []

  // Find all placeholders in the content
  const placeholderRegex = /\$(\d+)/g
  const matches = Array.from(content.matchAll(placeholderRegex))

  if (matches.length === 0) {
    // No placeholders, return content as single text item
    return [{ type: 'text', content }]
  }

  let lastIndex = 0

  matches.forEach((match) => {
    const placeholderIndex = Number.parseInt(match[1])
    const matchStart = match.index!
    const matchEnd = matchStart + match[0].length

    // Add text before placeholder
    if (matchStart > lastIndex) {
      const textContent = content.slice(lastIndex, matchStart)
      if (textContent) {
        result.push({ type: 'text', content: textContent })
      }
    }

    // Add protocol link
    if (protocols[placeholderIndex]) {
      result.push({
        type: 'link',
        content: protocols[placeholderIndex].name,
        url: protocols[placeholderIndex].url,
      })
    }

    lastIndex = matchEnd
  })

  // Add remaining text after last placeholder
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex)
    if (remainingText) {
      result.push({ type: 'text', content: remainingText })
    }
  }

  return result
}
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <view>
    <wd-popup
      v-model="visibleRef"
      position="center"
      :close-on-click-modal="false"
      lock-scroll
      :closable="false"
      custom-class="privacy-popup"
    >
      <view class="wrapper">
        <view class="title">
          {{ title }}
        </view>
        <view class="content">
          <text
            v-for="(p, idx) in parsedContentRef"
            :key="idx"
            class="text"
            :class="[p.type === 'link' ? 'link' : '']"
          >
            {{ p.content }}
          </text>
        </view>
        <view class="actions">
          <button
            id="agree-btn"
            class="btn btn-agree"
            open-type="agreePrivacyAuthorization"
            @agreeprivacyauthorization="handleAgree"
          >
            {{ agreeText }}
          </button>
          <button id="disagree-btn" class="btn btn-disagree" @click="exit">
            {{ disagreeText }}
          </button>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
:deep(.privacy-popup) {
  width: 600rpx;
  box-sizing: border-box;
  border-radius: 12rpx;
  overflow: hidden;
}

.privacy-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .wrapper {
    padding: 32rpx 40rpx;
    text-align: center;

    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      padding: 12rpx 0;
      margin-bottom: 24rpx;
    }

    .content {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      margin-bottom: 24rpx;
      text-align: left;
      max-height: 30vh;
      overflow-y: auto;
      display: inline-block;

      .text {
        display: inline;

        &.link {
          color: #007aff;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 24rpx;
      width: 100%;

      .btn {
        height: 80rpx;
        border-radius: 8rpx;
        font-size: 28rpx;
        border: none;
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;

        &.btn-agree {
          background-color: #007aff;
          color: white;
        }

        &.btn-disagree {
          background-color: transparent;
          color: #666;
          height: 40rpx;
          font-size: 20rpx;

          &::after {
            border: 0;
          }
        }
      }
    }
  }
}
</style>
