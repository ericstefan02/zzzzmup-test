<template>
  <div class="bg-neutral-50 flex flex-col min-h-screen">
    <InfoBar />
    <Navigation />
    <main class="grow">
      <slot />
    </main>
    <Footer />
    <EFormModal />
  </div>
</template>
