<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 z-80 flex items-start justify-center overflow-y-auto py-8 px-4"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="pb-16 flex flex-col gap-12 rounded-2xl shadow-md border border-neutral-200 bg-white w-full max-w-2xl relative"
          >
            <button
              type="button"
              class="absolute top-4 right-4 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 transition-colors cursor-pointer"
              @click="close"
            >
              <Icon name="ion:close" size="20" class="text-white" />
            </button>

            <div
              class="flex flex-col items-center justify-center gap-3 bg-primary-500 p-10 text-center rounded-t-2xl"
            >
              <div
                class="w-16 h-16 border border-white/20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <Icon name="ion:document-text" size="24" class="text-white" />
              </div>
              <h2 class="font-bold text-2xl md:text-3xl text-white">
                {{ $t('components.eFormModal.title') }}
              </h2>
              <p class="font-medium text-sm md:text-base text-primary-100">
                {{ $t('components.eFormModal.description') }}
                <br />
                {{ $t('components.eFormModal.descriptionLine2') }}
              </p>
            </div>

            <form
              class="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-10"
              novalidate
              @submit="onSubmit"
            >
              <Input
                v-model="fullName"
                :label="$t('components.eFormModal.fullNameLabel')"
                :placeholder="$t('components.eFormModal.fullNamePlaceholder')"
                :required="true"
                :error="errors.fullName"
              />
              <Input
                v-model="lbo"
                :label="$t('components.eFormModal.lboLabel')"
                :placeholder="$t('components.eFormModal.lboPlaceholder')"
                :required="true"
                :error="errors.lbo"
                inputmode="numeric"
              />
              <Input
                v-model="rzzzo"
                :label="$t('components.eFormModal.rzzzoLabel')"
                :placeholder="$t('components.eFormModal.rzzzoPlaceholder')"
                :required="true"
                :error="errors.rzzzo"
              />
              <Input
                v-model="jmbg"
                :label="$t('components.eFormModal.jmbgLabel')"
                :placeholder="$t('components.eFormModal.jmbgPlaceholder')"
                :required="true"
                :error="errors.jmbg"
                inputmode="numeric"
              />
              <div class="md:col-span-2">
                <Input
                  v-model="address"
                  :label="$t('components.eFormModal.addressLabel')"
                  :placeholder="$t('components.eFormModal.addressPlaceholder')"
                  :required="true"
                  :error="errors.address"
                />
              </div>
              <Input
                v-model="phone"
                :label="$t('components.eFormModal.phoneLabel')"
                :placeholder="$t('components.eFormModal.phonePlaceholder')"
                type="tel"
                :required="true"
                :error="errors.phone"
              />

              <div class="flex flex-col gap-3">
                <label class="text-sm font-medium text-neutral-700">
                  {{ $t('components.eFormModal.genderLabel') }}
                  <span class="text-red-500">*</span>
                </label>
                <div class="flex items-center gap-6">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="gender"
                      type="radio"
                      value="M"
                      class="accent-primary-500 w-4 h-4"
                    />
                    <span class="text-neutral-700">{{
                      $t('components.eFormModal.genderMale')
                    }}</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="gender"
                      type="radio"
                      value="Ž"
                      class="accent-primary-500 w-4 h-4"
                    />
                    <span class="text-neutral-700">{{
                      $t('components.eFormModal.genderFemale')
                    }}</span>
                  </label>
                </div>
                <div v-if="errors.gender" class="flex items-center gap-1.5">
                  <Icon name="ion:warning" size="14" class="text-accent" />
                  <p class="text-sm text-accent">{{ errors.gender }}</p>
                </div>
              </div>

              <div class="flex items-start gap-3 col-span-1 md:col-span-2">
                <input
                  id="eFormAgreeTerms"
                  v-model="agreeToTerms"
                  type="checkbox"
                  class="accent-primary-400 mt-1"
                />
                <label for="eFormAgreeTerms" class="text-sm text-neutral-700">
                  {{ $t('components.eFormModal.agreeTerms') }}
                  <NuxtLink
                    to="/privacy-policy"
                    class="text-primary-400 hover:text-primary-500"
                    @click="close"
                  >
                    {{ $t('components.eFormModal.agreeTermsLink') }}
                  </NuxtLink>
                </label>
              </div>

              <div
                class="col-span-1 md:col-span-2 flex flex-col items-center gap-4"
              >
                <Button
                  type="submit"
                  :text="$t('components.eFormModal.submitButton')"
                  prepend-icon="ion:download"
                  size="large"
                  :disabled="!agreeToTerms"
                />
                <p
                  class="text-sm text-neutral-500 text-center max-w-full md:max-w-1/2"
                >
                  {{ $t('components.eFormModal.footerNote') }}
                </p>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'

const { isOpen, close } = useEFormModal()
const { t } = useI18n()

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: {
    fullName: (v: string) => !!v?.trim() || t('validation.required'),
    lbo: (v: string) => {
      if (!v?.trim()) return t('validation.required')
      if (!/^\d{11}$/.test(v.trim())) return t('validation.lbo')
      return true
    },
    rzzzo: (v: string) => !!v?.trim() || t('validation.required'),
    address: (v: string) => !!v?.trim() || t('validation.required'),
    jmbg: (v: string) => {
      if (!v?.trim()) return t('validation.required')
      if (!/^\d{13}$/.test(v.trim())) return t('validation.jmbg')
      return true
    },
    phone: (v: string) => {
      if (!v?.trim()) return t('validation.required')
      if (!/^\+381\d{7,12}$/.test(v.trim().replace(/\s/g, '')))
        return t('validation.phone')
      return true
    },
    gender: (v: string) => !!v || t('validation.required'),
    agreeToTerms: () => true,
  },
})

const [fullName] = defineField('fullName')
const [lbo] = defineField('lbo')
const [rzzzo] = defineField('rzzzo')
const [address] = defineField('address')
const [jmbg] = defineField('jmbg')
const [phone] = defineField('phone')
const [gender] = defineField('gender')
const [agreeToTerms] = defineField('agreeToTerms')

const onSubmit = handleSubmit((values) => {
  // TODO: Povezati sa API-jem koji popunjava PDF i vraća ga za download
  console.log('E-Form submitted:', values)
})

watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    resetForm()
  }
})
</script>
