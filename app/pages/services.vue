<template>
  <div class="flex flex-col">
    <TextBanner
      :title="$t('pages.services.title')"
      :description="$t('pages.services.description')"
    />
    <div
      class="px-4 md:px-12 lg:px-28 flex flex-col lg:grid lg:grid-cols-4 items-start gap-6 lg:gap-12 my-6 md:my-10"
    >
      <nav
        class="w-full lg:w-auto flex lg:flex-col lg:rounded-xl lg:border lg:border-neutral-200 lg:shadow-xs overflow-x-auto lg:overflow-visible gap-2 lg:gap-0"
        aria-label="Odeljenja"
      >
        <div
          class="hidden lg:flex p-4 items-center gap-2 border-b border-neutral-200"
        >
          <Icon name="ion:layers" size="18" class="text-primary-400" />
          <h2 class="text-primary-900 text-lg font-bold">
            {{ $t('pages.services.departmentsLabel') }}
          </h2>
        </div>
        <button
          v-for="department in departments"
          :key="department.id"
          type="button"
          class="lg:hidden whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border"
          :class="
            selectedDepartment?.id === department.id
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-neutral-700 border-neutral-200 hover:bg-primary-50 hover:text-primary-500'
          "
          @click="selectedDepartment = department"
        >
          {{ department.title }}
        </button>
        <div class="hidden lg:block">
          <DepartmentButton
            v-for="department in departments"
            :key="department.id"
            :department="department"
            :selected="selectedDepartment?.id === department.id"
            @select="selectedDepartment = $event"
          />
        </div>
      </nav>
      <section class="lg:col-span-3 flex flex-col gap-8 w-full lg:w-auto">
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-bold text-primary-900">
            {{ selectedDepartment?.title }}
          </h2>
          <p class="text-lg text-neutral-500">
            {{ selectedDepartment?.description }}
          </p>
        </div>
        <div class="w-full h-px bg-neutral-200" />
        <ServicesList
          v-if="selectedDepartment"
          :department-id="selectedDepartment.id"
        />
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Department } from '~/types/services'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.services.title'),
  description: () => t('seo.services.description'),
  keywords: () => t('seo.services.keywords'),
  ogTitle: () => t('seo.services.title'),
  ogDescription: () => t('seo.services.description'),
  ogSiteName: () => t('seo.siteName'),
})

const selectedDepartment = ref<Department | null>({
  id: 1,
  title: 'Opšta medicina',
  description: 'Pregledi i konsultacije sa opštim lekarima.',
})

const departments: Department[] = [
  {
    id: 1,
    title: 'Opšta medicina',
    description: 'Pregledi i konsultacije sa opštim lekarima.',
  },
  {
    id: 2,
    title: 'Specijalistički pregledi',
    description:
      'Specijalistički pregledi i konsultacije sa različitim specijalistima.',
  },
  {
    id: 3,
    title: 'Dijagnostika',
    description: 'Dijagnostičke procedure i laboratorijske analize.',
  },
  {
    id: 4,
    title: 'Fizioterapija',
    description: 'Fizioterapijske usluge i rehabilitacija.',
  },
  {
    id: 5,
    title: 'Stomatologija',
    description: 'Stomatološke usluge i pregledi.',
  },
  {
    id: 6,
    title: 'Psihološka podrška',
    description: 'Psihološka podrška i savetovanje.',
  },
]
</script>
