<template>
  <table class="w-full text-sm">
    <thead>
      <tr class="bg-neutral-50 border-t border-neutral-200">
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wide w-12"
        >
          {{ $t('components.documentTable.type') }}
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wide"
        >
          {{ $t('components.documentTable.documentName') }}
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wide"
        >
          {{ $t('components.documentTable.date') }}
        </th>
        <th
          scope="col"
          class="px-6 py-3 text-right text-xs font-semibold text-neutral-400 uppercase tracking-wide"
        >
          {{ $t('components.documentTable.download') }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="doc in documents"
        :key="doc.title"
        class="border-t border-neutral-100 hover:bg-neutral-50 transition-colors"
      >
        <td class="px-6 py-4">
          <Icon name="ion:document-text" class="text-red-400" size="20" />
        </td>
        <td class="px-6 py-4 font-medium text-primary-900">{{ doc.title }}</td>
        <td class="px-6 py-4 text-neutral-400">
          {{ formatDate(doc.created_at) }}
        </td>
        <td class="px-6 py-4 text-right">
          <a
            :href="doc.url"
            :aria-label="
              $t('components.documentTable.downloadAria', { title: doc.title })
            "
            class="inline-flex items-center justify-center text-primary-400 hover:text-primary-500 transition-colors"
          >
            <Icon name="ion:download-outline" size="20" />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { DocumentItem } from '~/types/common'

const { documents } = defineProps<{
  documents: DocumentItem[]
}>()

const { locale } = useI18n()

const formatDate = (date: string) => formatDateSerbian(date, locale.value)
</script>
