ymaps3.ready.then(() => {
  ymaps3.import.registerCdn("https://cdn.jsdelivr.net/npm/{package}", [
    "@yandex/ymaps3-default-ui-theme@0.0",
  ]);
});
