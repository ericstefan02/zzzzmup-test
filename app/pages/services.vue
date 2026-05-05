<template>
  <div class="flex flex-col">
    <TextBanner
      :title="$t('pages.services.title')"
      :description="$t('pages.services.description')"
    />
    <div class="px-28 grid grid-cols-4 items-start gap-12 my-10">
      <nav
        class="rounded-xl border border-neutral-200 shadow-xs overflow-hidden"
        aria-label="Odeljenja"
      >
        <div class="p-4 flex items-center gap-2 border-b border-neutral-200">
          <Icon name="ion:layers" size="18" class="text-primary-400" />
          <h2 class="text-primary-900 text-lg font-bold">
            {{ $t('pages.services.departmentsLabel') }}
          </h2>
        </div>
        <DepartmentButton
          v-for="department in departments"
          :key="department.id"
          :department="department"
          :selected="selectedDepartment?.id === department.id"
          @select="selectedDepartment = $event"
        />
      </nav>
      <section class="col-span-3 flex flex-col gap-8">
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
