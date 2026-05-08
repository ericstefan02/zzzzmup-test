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
              @submit.prevent="handleSubmit"
            >
              <Input
                v-model="form.fullName"
                :label="$t('components.eFormModal.fullNameLabel')"
                :placeholder="$t('components.eFormModal.fullNamePlaceholder')"
                :required="true"
              />
              <Input
                v-model="form.lbo"
                :label="$t('components.eFormModal.lboLabel')"
                :placeholder="$t('components.eFormModal.lboPlaceholder')"
                :required="true"
              />
              <Input
                v-model="form.rzzzo"
                :label="$t('components.eFormModal.rzzzoLabel')"
                :placeholder="$t('components.eFormModal.rzzzoPlaceholder')"
                :required="true"
              />
              <Input
                v-model="form.jmbg"
                :label="$t('components.eFormModal.jmbgLabel')"
                :placeholder="$t('components.eFormModal.jmbgPlaceholder')"
                :required="true"
              />
              <div class="md:col-span-2">
                <Input
                  v-model="form.address"
                  :label="$t('components.eFormModal.addressLabel')"
                  :placeholder="$t('components.eFormModal.addressPlaceholder')"
                  :required="true"
                />
              </div>
              <Input
                v-model="form.phone"
                :label="$t('components.eFormModal.phoneLabel')"
                :placeholder="$t('components.eFormModal.phonePlaceholder')"
                type="tel"
                :required="true"
              />

              <div class="flex flex-col gap-3">
                <label class="text-sm font-medium text-neutral-700">
                  {{ $t('components.eFormModal.genderLabel') }}
                  <span class="text-red-500">*</span>
                </label>
                <div class="flex items-center gap-6">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="form.gender"
                      type="radio"
                      value="M"
                      class="accent-primary-500 w-4 h-4"
                      required
                    />
                    <span class="text-neutral-700">{{
                      $t('components.eFormModal.genderMale')
                    }}</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="form.gender"
                      type="radio"
                      value="Ž"
                      class="accent-primary-500 w-4 h-4"
                    />
                    <span class="text-neutral-700">{{
                      $t('components.eFormModal.genderFemale')
                    }}</span>
                  </label>
                </div>
              </div>

              <div class="flex items-start gap-3 col-span-1 md:col-span-2">
                <input
                  id="eFormAgreeTerms"
                  v-model="form.agreeToTerms"
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
                  :disabled="!form.agreeToTerms"
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
const { isOpen, close } = useEFormModal()

const form = ref({
  fullName: '',
  lbo: '',
  rzzzo: '',
  address: '',
  jmbg: '',
  phone: '',
  gender: '',
  agreeToTerms: false,
})

const handleSubmit = () => {
  // TODO: Povezati sa API-jem koji popunjava PDF i vraća ga za download
  console.log('E-Form submitted:', form.value)
}

watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>
