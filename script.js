document.addEventListener('click', function (event) {
    const banners = document.querySelectorAll('.banner');
    
    let clickedInsideBanner = false;
    banners.forEach(function (banner) {
      if (banner.contains(event.target)) {
        clickedInsideBanner = true;
      }
    });

    if (!clickedInsideBanner) {
      banners.forEach(function (banner) {
        banner.classList.remove('active');
      });
    }
  });
  
  function bannerAppear(clickedBanner) {
    const isActive = clickedBanner.classList.contains('active');

    const allBanners = document.querySelectorAll('.banner');
    allBanners.forEach(function (banner) {
      banner.classList.remove('active');
    });
  
    if (!isActive) {
      clickedBanner.classList.add('active');
    }
  }
  