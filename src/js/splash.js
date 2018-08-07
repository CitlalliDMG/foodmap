// Control animation of splash and change between pages
const init = () => {
  const preload = document.getElementById('preload');
  let loading = 0;
  const frame = () => {
    if (loading == 100) {
      clearInterval(id);
      window.location.assign('../src/views/home.html');
    } else {
      loading = loading + 1;
      if (loading == 90) {
        preload.style.animation = 'fadeout 2s ease';
      }
    };
  };
  let id = setInterval(frame, 30);
};

window.onload = init();
