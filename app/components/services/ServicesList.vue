<template>
  <section
    class="rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
  >
    <div
      class="bg-neutral-50 border-b border-neutral-200 px-3 md:px-6 py-4 flex items-center justify-between uppercase font-bold text-xs text-neutral-500"
      aria-hidden="true"
    >
      <p>{{ $t('components.servicesList.serviceLabel') }}</p>
      <p class="pr-6 md:pr-11">
        {{ $t('components.servicesList.priceLabel') }}
      </p>
    </div>
    <ul class="divide-y divide-neutral-200">
      <ServiceListItem
        v-for="service in services"
        :key="service.id"
        :service="service"
      />
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { Service } from '~/types/services'

// TODO: dodati fetch servisa po departmentId i prikazati ih
const { departmentId } = defineProps<{
  departmentId: number
}>()

// Ovo je samo dummy data, treba zameniti sa pravim podacima iz baze
const services = ref<Service[]>([
  {
    id: 1,
    title: 'Pregled opšte medicine',
    description: 'Konsultacija sa opštim lekarom.',
    price: 1000,
    departmentId: 1,
  },
  {
    id: 2,
    title: 'Krvna slika',
    description: 'Laboratorijska analiza krvi.',
    price: 500,
    departmentId: 1,
  },
  {
    id: 3,
    title: 'Pregled kardiologa',
    description: 'Konsultacija sa kardiologom.',
    price: 1500,
    departmentId: 2,
  },
  {
    id: 4,
    title: 'Pregled dermatologa',
    description: 'Konsultacija sa dermatologom.',
    price: 1200,
    departmentId: 2,
  },
  {
    id: 5,
    title: 'Ultrazvuk abdomena',
    description: 'Dijagnostička procedura ultrazvukom.',
    price: null,
    departmentId: 3,
  },
  {
    id: 6,
    title: 'Fizioterapija - 30 minuta',
    description: 'Fizioterapijska sesija od 30 minuta.',
    price: 800,
    departmentId: 4,
  },
  {
    id: 7,
    title: 'Stomatološki pregled',
    description: 'Konsultacija sa stomatologom.',
    price: 700,
    departmentId: 5,
  },
  {
    id: 8,
    title: 'Psihološka konsultacija',
    description: 'Savetovanje sa psihologom.',
    price: 1200,
    departmentId: 6,
  },
  {
    id: 9,
    title: 'RTG snimak pluća',
    description: 'Dijagnostička procedura RTG snimkom.',
    price: 1500,
    departmentId: 3,
  },
])
</script>
