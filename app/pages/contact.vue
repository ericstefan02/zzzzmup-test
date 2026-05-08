<template>
  <div>
    <TextBanner
      :title="$t('pages.contact.title')"
      :description="$t('pages.contact.description')"
    />
    <div
      class="px-4 md:px-12 lg:px-28 py-6 md:py-12 flex flex-col gap-8 md:gap-16"
    >
      <section
        class="rounded-2xl px-4 md:px-8 py-8 md:py-10 bg-white -mt-12 md:-mt-22 relative shadow-lg"
      >
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-3">
            <h2 class="font-bold text-3xl text-primary-900">
              {{ $t('pages.contact.formTitle') }}
            </h2>
            <p class="text-neutral-500">
              {{ $t('pages.contact.formDescription') }}
              <NuxtLink to="tel:194" class="font-bold text-accent">
                <span>194</span>
              </NuxtLink>
            </p>
          </div>
          <form method="POST" @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <Input
                v-model="form.name"
                :label="$t('pages.contact.formNameLabel')"
                :placeholder="$t('pages.contact.formNamePlaceholder')"
                :required="true"
              />
              <Input
                v-model="form.lastName"
                :label="$t('pages.contact.formLastNameLabel')"
                :placeholder="$t('pages.contact.formLastNamePlaceholder')"
                :required="true"
              />
              <Input
                v-model="form.email"
                :label="$t('pages.contact.formEmailLabel')"
                :placeholder="$t('pages.contact.formEmailPlaceholder')"
                type="email"
                :required="true"
              />
              <Input
                v-model="form.phoneNumber"
                :label="$t('pages.contact.formPhoneLabel')"
                :placeholder="$t('pages.contact.formPhonePlaceholder')"
                type="tel"
              />
              <Select
                v-model="form.inquiryType"
                :label="$t('pages.contact.formInquiryLabel')"
                :placeholder="$t('pages.contact.formInquiryPlaceholder')"
                :options="INQUIRY_TYPE_OPTIONS"
                required
              />
              <FileInput
                v-model="form.file"
                :label="$t('pages.contact.formFileLabel')"
                :placeholder="$t('pages.contact.formFilePlaceholder')"
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
              <div class="col-span-1 md:col-span-2">
                <Textarea
                  v-model="form.message"
                  :label="$t('pages.contact.formMessageLabel')"
                  :placeholder="$t('pages.contact.formMessagePlaceholder')"
                  :required="true"
                  :rows="6"
                />
              </div>
              <div class="flex items-start gap-3 col-span-1 md:col-span-2">
                <input
                  id="agreeToTerms"
                  v-model="form.agreeToTerms"
                  type="checkbox"
                  class="accent-primary-400 mt-2"
                />
                <div class="flex flex-col gap-1">
                  <label for="agreeToTerms" class="text-sm text-neutral-700">
                    {{ $t('pages.contact.formAgreeTerms') }}
                    <NuxtLink to="/terms-of-use"
                      ><span class="text-primary-400">{{
                        $t('pages.contact.formTermsLink')
                      }}</span></NuxtLink
                    >
                    {{ $t('common.and') }}
                    <NuxtLink to="/privacy-policy"
                      ><span class="text-primary-400">{{
                        $t('pages.contact.formPrivacyLink')
                      }}</span></NuxtLink
                    >
                  </label>
                  <p class="text-sm text-neutral-500">
                    {{ $t('pages.contact.formAgreeDescription') }}
                  </p>
                </div>
              </div>
              <div
                class="h-px bg-primary-200 w-full col-span-1 md:col-span-2"
              />
              <Button
                prepend-icon="ion:ios-send"
                type="submit"
                :text="$t('pages.contact.formSubmit')"
                size="large"
                :disabled="!form.agreeToTerms"
                :shrinked="true"
              />
            </div>
          </form>
        </div>
      </section>

      <section
        class="rounded-2xl border border-neutral-200 shadow-xs overflow-hidden"
      >
        <div class="p-4 md:p-8 bg-primary-100 flex flex-col gap-1">
          <div class="flex items-center gap-3">
            <Icon
              name="ion:business"
              size="30"
              class="text-primary-400 shrink-0"
            />
            <h2 class="text-xl md:text-3xl font-bold text-primary-900">
              {{ $t('pages.contact.headquarters') }}
            </h2>
          </div>
          <p class="text-neutral-500">
            {{ $t('pages.contact.headquartersDescription') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <address class="flex flex-col gap-6 p-4 md:p-8 bg-white">
            <div class="flex items-start gap-4 not-italic">
              <div
                class="flex items-center justify-center h-10 w-10 shrink-0 bg-primary-100 rounded-lg"
              >
                <Icon
                  name="ion:location-sharp"
                  size="18"
                  class="text-primary-400"
                />
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-sm text-primary-900 font-medium">
                  {{ $t('pages.contact.addressLabel') }}
                </p>
                <NuxtLink
                  class="text-neutral-700 hover:text-primary-900 transition-colors text-sm sm:text-base"
                  :to="MAPS_EMBED_URL"
                  target="_blank"
                >
                  {{ $t('pages.contact.addressValue') }}<br />
                  {{ $t('pages.contact.addressCity') }}
                </NuxtLink>
              </div>
            </div>
            <div class="flex items-start gap-4 not-italic">
              <div
                class="flex items-center justify-center h-10 w-10 shrink-0 bg-primary-100 rounded-lg"
              >
                <Icon name="ion:call" size="18" class="text-primary-400" />
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-sm text-primary-900 font-medium">
                  {{ $t('pages.contact.phoneLabel') }}
                </p>
                <NuxtLink
                  class="text-neutral-700 hover:text-primary-900 transition-colors text-sm sm:text-base"
                  :to="PHONE_NUMBER_URL"
                >
                  +381 11 3615 665
                </NuxtLink>
              </div>
            </div>
            <div class="flex items-start gap-4 not-italic">
              <div
                class="flex items-center justify-center h-10 w-10 shrink-0 bg-primary-100 rounded-lg"
              >
                <Icon name="ion:mail" size="18" class="text-primary-400" />
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-sm text-primary-900 font-medium">
                  {{ $t('pages.contact.emailLabel') }}
                </p>
                <NuxtLink
                  class="text-neutral-700 hover:text-primary-900 transition-colors text-sm sm:text-base"
                  :to="EMAIL_ADDRESS_URL"
                >
                  info@zzzzmup.rs
                </NuxtLink>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex items-center justify-center h-10 w-10 shrink-0 bg-primary-100 rounded-lg"
              >
                <Icon
                  name="ion:android-time"
                  size="18"
                  class="text-primary-400"
                />
              </div>
              <div class="flex flex-col gap-1 not-italic">
                <p class="text-sm text-primary-900 font-medium">
                  {{ $t('pages.contact.workingHoursLabel') }}
                </p>
                <div class="flex flex-col">
                  <template
                    v-for="(item, index) in GROUPED_WORKING_HOURS"
                    :key="index"
                  >
                    <div
                      class="flex items-center gap-4 justify-between text-sm sm:text-base"
                    >
                      <p class="text-neutral-700">{{ $t(item.title) }}</p>
                      <p class="text-primary-900 font-medium">
                        {{ item.time }}
                      </p>
                    </div>
                    <p
                      v-if="item.tag === 'weekend'"
                      class="text-xs italic! text-neutral-500"
                    >
                      {{ $t('workingHours.weekendNote') }}
                    </p>
                  </template>
                </div>
              </div>
            </div>
          </address>
          <iframe
            class="w-full h-full min-h-75 object-cover"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.0051345017073!2d20.4527815!3d44.801084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a70041e7e8ff5%3A0x3a698cc75646e810!2z0JTRg9GA0LzQuNGC0L7RgNGB0LrQsCA5LCDQkdC10L7Qs9GA0LDQtCAxMTIwMDY!5e0!3m2!1ssr!2srs!4v1776199775875!5m2!1ssr!2srs"
            :title="$t('pages.contact.mapTitle')"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section class="flex flex-col gap-8">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3">
            <Icon
              name="ion:medical-sharp"
              size="30"
              class="text-primary-400 shrink-0"
            />
            <h2 class="text-xl md:text-3xl font-bold text-primary-900">
              {{ $t('pages.contact.detachedClinicsTitle') }}
            </h2>
          </div>
          <p class="text-neutral-500">
            {{ $t('pages.contact.detachedClinicsDescription') }}
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetachedClinicCard
            v-for="clinic in detachedClinics"
            :key="clinic.id"
            :clinic="clinic"
          />
        </div>
      </section>
      <section
        class="rounded-2xl border-t border-x border-neutral-200 shadow-xs overflow-hidden"
      >
        <div class="p-4 md:p-8 flex flex-col gap-1">
          <div class="flex items-center gap-3">
            <Icon
              name="ion:help-circle"
              size="30"
              class="text-primary-400 shrink-0"
            />
            <h2 class="text-xl md:text-3xl font-bold text-primary-900">
              {{ $t('pages.contact.faqTitle') }}
            </h2>
          </div>
          <p class="text-neutral-500">
            {{ $t('pages.contact.faqDescription') }}
          </p>
        </div>
        <FAQItem
          v-for="(item, index) in faqItems"
          :key="index"
          :faq-item="item"
        />
      </section>
      <section
        class="rounded-2xl border border-neutral-200 shadow-xs overflow-hidden"
      >
        <div class="p-4 md:p-8 flex flex-col gap-1">
          <div class="flex items-center gap-3">
            <Icon
              name="ion:shield-checkmark"
              size="30"
              class="text-primary-400 shrink-0"
            />
            <h2 class="text-xl md:text-3xl font-bold text-primary-900">
              {{ $t('pages.contact.legalTitle') }}
            </h2>
          </div>
          <p class="text-neutral-500">
            {{ $t('pages.contact.legalDescription') }}
          </p>
        </div>
        <div
          class="p-4 md:p-8 gap-6 md:gap-8 grid grid-cols-1 md:grid-cols-2 bg-white"
        >
          <div
            class="p-4 md:p-8 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col gap-6"
          >
            <div class="flex items-center gap-4">
              <div
                class="h-8 w-8 sm:h-10 sm:w-10 shrink-0 bg-primary-400 rounded-lg items-center justify-center flex"
              >
                <span aria-hidden="true" class="text-white font-bold sm:text-lg"
                  >1</span
                >
              </div>
              <div class="flex flex-col gap-1.5">
                <h3 class="text-lg md:text-xl font-bold text-primary-900">
                  {{ $t('pages.contact.rfzoTitle') }}
                </h3>
                <p class="text-neutral-700 text-sm">
                  {{ $t('pages.contact.rfzoDescription') }}
                </p>
              </div>
            </div>
            <div class="w-full h-px bg-neutral-200" />
            <div class="flex flex-col gap-5">
              <div class="flex items-start gap-4">
                <Icon
                  name="ion:location-sharp"
                  class="text-primary-400 shrink-0"
                  size="18"
                />
                <div class="flex flex-col gap-2">
                  <p class="text-neutral-700 text-xs font-bold uppercase">
                    {{ $t('pages.contact.locationLabel') }}
                  </p>
                  <p
                    class="font-semibold text-primary-900 text-sm md:text-base"
                  >
                    {{ $t('pages.contact.rfzoLocation') }}
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <Icon
                  name="ion:call"
                  class="text-primary-400 shrink-0"
                  size="18"
                />
                <div class="flex flex-col gap-2">
                  <p class="text-neutral-700 text-xs font-bold uppercase">
                    {{ $t('pages.contact.phoneContactLabel') }}
                  </p>
                  <NuxtLink
                    to="tel:+381648522717"
                    class="font-semibold text-primary-900 text-sm md:text-base"
                  >
                    +381 64 85 22 717
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div
            class="p-4 md:p-8 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col gap-6"
          >
            <div class="flex items-center gap-4">
              <div
                class="h-8 w-8 sm:h-10 sm:w-10 shrink-0 bg-primary-400 rounded-lg items-center justify-center flex"
              >
                <span aria-hidden="true" class="text-white font-bold sm:text-lg"
                  >2</span
                >
              </div>
              <div class="flex flex-col gap-1.5">
                <h3 class="text-lg md:text-xl font-bold text-primary-900">
                  {{ $t('pages.contact.patientAdviserTitle') }}
                </h3>
                <p class="text-neutral-700 text-sm">
                  {{ $t('pages.contact.patientAdviserDescription') }}
                </p>
              </div>
            </div>
            <div class="w-full h-px bg-neutral-200" />
            <div class="flex flex-col gap-5">
              <div class="flex items-start gap-4">
                <Icon
                  name="ion:location-sharp"
                  class="text-primary-400 shrink-0"
                  size="18"
                />
                <div class="flex flex-col gap-2">
                  <p class="text-neutral-700 text-xs font-bold uppercase">
                    {{ $t('pages.contact.locationLabel') }}
                  </p>
                  <p
                    class="font-semibold text-primary-900 text-sm md:text-base"
                  >
                    {{ $t('pages.contact.patientAdviserLocation') }}
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <Icon
                  name="ion:call"
                  class="text-primary-400 shrink-0"
                  size="18"
                />
                <div class="flex flex-col gap-2">
                  <p class="text-neutral-700 text-xs font-bold uppercase">
                    {{ $t('pages.contact.phoneContactLabel') }}
                  </p>
                  <NuxtLink
                    to="tel:+381113605634"
                    class="font-semibold text-primary-900 text-sm md:text-base"
                  >
                    +381 11 360 5634
                  </NuxtLink>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <Icon
                  name="ion:mail"
                  class="text-primary-400 shrink-0"
                  size="18"
                />
                <div class="flex flex-col gap-2">
                  <p class="text-neutral-700 text-xs font-bold uppercase">
                    {{ $t('pages.contact.emailContactLabel') }}
                  </p>
                  <NuxtLink
                    to="mailto:savetnik.pacijent@beograd.gov.rs"
                    class="font-semibold text-primary-900 text-sm md:text-base break-all"
                  >
                    savetnik.pacijent@beograd.gov.rs
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-px bg-neutral-200 col-span-1 md:col-span-2" />
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 col-span-1 md:col-span-2"
          >
            <div class="flex items-center gap-2">
              <Icon
                name="ion:alert-circle"
                size="18"
                class="text-yellow-500 shrink-0"
              />
              <p class="text-neutral-500">
                {{ $t('pages.contact.legalNote') }}
              </p>
            </div>
            <NuxtLink
              to="https://www.rfzo.rs/index.php/osiguranalica/osiguranici"
              target="_blank"
            >
              <Button
                :text="$t('pages.contact.legalLearnMore')"
                variant="outlined"
                prepend-icon="ion:book-outline"
              />
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FAQItem } from '~/types/common'
import type { DetachedClinic } from '~/types/detached-clinic'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description'),
  keywords: () => t('seo.contact.keywords'),
  ogTitle: () => t('seo.contact.title'),
  ogDescription: () => t('seo.contact.description'),
  ogSiteName: () => t('seo.siteName'),
})

const INQUIRY_TYPE_OPTIONS = [
  { label: t('pages.contact.inquiryGeneral'), value: 'general' },
  { label: t('pages.contact.inquiryCareer'), value: 'career' },
  { label: t('pages.contact.inquiryMedicalDocs'), value: 'medical_docs' },
  { label: t('pages.contact.inquiryComplaint'), value: 'complaint' },
  { label: t('pages.contact.inquiryPatientRights'), value: 'patient_rights' },
  { label: t('pages.contact.inquiryOther'), value: 'other' },
]

const form = ref({
  name: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  inquiryType: '',
  message: '',
  agreeToTerms: false,
  file: null,
})

const handleSubmit = () => {
  // Handle form submission logic here
}

const detachedClinics: DetachedClinic[] = [
  {
    id: 1,
    name: 'Ambulanta Novi Beograd',
    address: 'Bulevar Arsenija Čarnojevića 58, Novi Beograd',
    phoneNumber: '+381 11 1234 567',
    workingHoursStart: '08:00',
    workingHoursEnd: '16:00',
  },
  {
    id: 2,
    name: 'Ambulanta Zemun',
    address: 'Ulica Cara Dušana 45, Zemun',
    phoneNumber: '+381 11 2345 678',
    workingHoursStart: '08:00',
    workingHoursEnd: '16:00',
  },
  {
    id: 3,
    name: 'Ambulanta Voždovac',
    address: 'Bulevar kralja Aleksandra 300, Voždovac',
    phoneNumber: '+381 11 3456 789',
    workingHoursStart: '08:00',
    workingHoursEnd: '16:00',
  },
  {
    id: 4,
    name: 'Ambulanta Palilula',
    address: 'Ulica Vojvode Stepe 150, Palilula',
    phoneNumber: '+381 11 4567 890',
    workingHoursStart: '08:00',
    workingHoursEnd: '16:00',
  },
  {
    id: 5,
    name: 'Ambulanta Rakovica',
    address: 'Bulevar patrijarha Pavla 20, Rakovica',
    phoneNumber: '+381 11 5678 901',
    workingHoursStart: '08:00',
    workingHoursEnd: '16:00',
  },
  {
    id: 6,
    name: 'Ambulanta Zvezdara',
    address: 'Ulica Dimitrija Tucovića 60, Zvezdara',
    phoneNumber: '+381 11 6789 012',
    workingHoursStart: '08:00',
    workingHoursEnd: '16:00',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Kako mogu zakazati termin?',
    answer:
      'Termine možete zakazati pozivom naše centrale na broj +381 11 3615 665 ili putem emaila info@zavodmup.rs.',
  },
  {
    question: 'Koje usluge pružaju detaširane ambulante?',
    answer:
      'Detaširane ambulante pružaju širok spektar usluga, uključujući opštu medicinu, specijalističke preglede, laboratorijske analize i hitnu medicinsku pomoć.',
  },
  {
    question: 'Kako mogu dobiti kopiju moje medicinske dokumentacije?',
    answer:
      'Za zahtev za medicinskom dokumentacijom, molimo vas da popunite kontakt formu na ovoj stranici ili nas kontaktirate direktno putem emaila.',
  },
  {
    question: 'Koja su moja prava kao pacijenta?',
    answer:
      'Kao pacijent, imate pravo na kvalitetnu zdravstvenu zaštitu, informisanost o svom zdravstvenom stanju, privatnost i poverljivost vaših podataka, kao i pravo na prigovor ukoliko niste zadovoljni uslugom.',
  },
]
</script>
