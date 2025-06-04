$(document).ready(function () {

  $(window).on('beforeunload', function () {
    $(window).scrollTop(0);
  });
  wrapperLazy();


  $("#videoModal").on("show.bs.modal", function (event) {
    let button = $(event.relatedTarget); // Button that triggered the modal
    let url = button.data("videofly"); // Extract url from data-video attribute
    let title = button.data("title");

    $("#modal-title").html(title);
    $(this).find("iframe").attr({
      src: url,
      allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    });
  });
  const OVERALL_LIST = window.OVERALL_LIST
  function initOverall () {
    const swiperWrapper = document.querySelector('.overall-wrapper .swiper-wrapper');
    let slidesHtml = '';

    OVERALL_LIST.forEach(item => {
      if (item.type === 'double') {
        // 处理类型为 double 的项目
        slidesHtml += `<div class="swiper-slide slide-item double">`;
        item.list.forEach(subItem => {
          slidesHtml += `
            <div class="double-item" data-to-wrapper="${subItem.id}">
              <img src="${subItem.bgSrc}" alt="" class="slide-item_bg">
              <div class="slide-item_content">
                <div class="slide-item_content_title">${subItem.title}</div>
                <div class="slide-item_content_desc">${subItem.desc}</div>
              </div>
            </div>`;
        });
        slidesHtml += `</div>`;
      } else {
        // 处理普通项目
        slidesHtml += `
        <div class="swiper-slide slide-item" data-to-wrapper="${item.id}">
          <img src="${item.bgSrc}" alt="" class="slide-item_bg">
          <div class="slide-item_content">
            <div class="slide-item_content_title">${item.title}</div>
            <div class="slide-item_content_desc">${item.desc}</div>
          </div>
        </div>`;
      }
    });

    swiperWrapper.innerHTML = slidesHtml;
    const overallSwiper = new Swiper('.overall-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 12,
      centeredSlides: true,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    swiperWrapper.addEventListener('click', function (event) {
      const slideItem = event.target.closest('.slide-item, .double-item');
      if (slideItem) {
        const targetId = slideItem.getAttribute('data-to-wrapper');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
  const gifVideo = document.querySelector('.gif-wrapper video');
  const GifContent = document.querySelector('.gif-wrapper .gif-wrapper_content');

  // 动态渲染每个item
  function createObserver (itemSelector, initDelay, delayIncrement) {
    const observerOptions = {
      root: null, // 默认为视口
      rootMargin: '0px',
      threshold: 0.1 // 10%的元素进入视口时触发回调
    };
    const items = document.querySelectorAll(itemSelector);
    let delay = initDelay; // 初始延迟时间
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }, delay);
          delay += delayIncrement; // 每个元素延迟200ms
        }
      });
    }, observerOptions);

    items.forEach(item => {
      observer.observe(item);
    });
  }
  const MEDIA_LIST = [
    "https://static-ussite.tineco.com/%E5%A5%96%E9%A1%B9-1.png_eea44313-2.png",
    "https://static-ussite.tineco.com/%E5%A5%96%E9%A1%B9-2.png_9a873b23-b.png",
    "https://static-ussite.tineco.com/%E5%A5%96%E9%A1%B9-3.png_f09ba8ca-c.png",
    "https://static-ussite.tineco.com/%E5%A5%96%E9%A1%B9-4.png_d71bbb93-b.png",
    "https://static-ussite.tineco.com/%E5%A5%96%E9%A1%B9-5.png_f4cf9226-9.png",
    "https://static-ussite.tineco.com/%E5%A5%96%E9%A1%B9-6.png_8deca155-d.png",
    "https://static-ussite.tineco.com/%E5%A5%96%E9%A1%B9-7.png_d2c35860-d.png",
  ]
  function initMedia () {
    let mediaItemsHTML = '';
    MEDIA_LIST.forEach((item) => {
      mediaItemsHTML += `
      <div class="media-item">
        <img src="${item}" alt="">
      </div>
    `;
    });
    $('.media-wrapper_content').html(mediaItemsHTML);
    createObserver('.media-item', 0, 100);
  }

  const AESTHETICS_LIST = window.AESTHETICS_LIST
  function initAesthetics () {
    let aestheticsItemsHTML = '';
    AESTHETICS_LIST.forEach((item) => {
      aestheticsItemsHTML += `
      <div class="aesthetics-item">
        <img src="${item.img}" alt="" class="aesthetics-item_img">
        <div class="aesthetics-item_title listting_base-subtitle">${item.title}</div>
      </div>
    `;
    });
    $('.aesthetics-wrapper').html(aestheticsItemsHTML);
    createObserver('.aesthetics-item', 0, 100);
  }


  let isVisible = false;
  function handleScrollModuleTitle (listtingWrapper) {
    const moduleHeader = $(listtingWrapper).find('.module-header');
    const moduleHeaderTitle = moduleHeader.find('.module-header_title');
    const listtingContent = $(listtingWrapper).find('.listting-module_content');
    const listtingChildContent = $(listtingWrapper).find('.listting-module_content .listting-content_content');
    const listtingMarks = $(listtingWrapper).find('.listting-content_marks');

    const wrapperBottom = listtingWrapper.getBoundingClientRect().bottom;
    const headerBottom = moduleHeader[0].getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;
    const distanceToWrapperBottom = wrapperBottom - headerBottom;

    if (distanceToWrapperBottom < 1.8 * viewportHeight && !isVisible) {
      isVisible = true;
      moduleHeaderTitle.css({
        transform: 'scale(3, 3)',
        opacity: '0'
      });
      setTimeout(() => {
        listtingContent.css('opacity', '1')
      }, 300);
      if (listtingChildContent.length > 0) {
        listtingChildContent.addClass('visible');
      }
      listtingMarks.each(function (index, element) {
        setTimeout(function () {
          $(element).addClass('visible');
        }, index * 300);
      });
    } else if (distanceToWrapperBottom >= 1.8 * viewportHeight && isVisible) {
      isVisible = false;
      listtingMarks.each(function (index, element) {
        $(element).removeClass('visible');
      });
      if (listtingChildContent.length > 0) {
        listtingChildContent.removeClass('visible');
      }
      listtingContent.css('opacity', '0');
      moduleHeaderTitle.css({
        transform: 'scale(1, 1)',
        opacity: '1'
      });

    }
  }

  const mainWrapper = document.querySelector('.mainpro-wrapper');
  const images = document.querySelectorAll('.product-item_img');
  const totalImages = images.length;
  const viewportHeight = window.innerHeight;
  const scrollStep = 0.5 * viewportHeight; // 50vh
  let hasEnteredView = false;

  function handleScrollMainPro () {
    const scrollTop = window.scrollY;
    const wrapperTop = mainWrapper.offsetTop;
    const scrolledViewportHeights = (scrollTop - wrapperTop) / scrollStep;
    let currentIndex = Math.floor(scrolledViewportHeights);
    currentIndex = Math.min(currentIndex, totalImages - 1);

    images.forEach((img, index) => {
      if (index <= currentIndex) {
        img.classList.add('show');
      }
    });
  }

  function initGifList () {
    const GIFT_LIST = window.GIFT_LIST
    const contentWrapper = document.querySelector('.giflist-wrapper_content');
    contentWrapper.innerHTML = ''; // 清空内容以避免重复添加
    let allItemsHtml = '';
    GIFT_LIST.forEach((item, index) => {
      const videoAttributes = `src="${item.videoSrc}" autoplay loop muted  playsinline class="giflist-wrapper_gif-item_video "`;
      allItemsHtml += `
        <div class="giflist-wrapper_gif-item">
          <video ${videoAttributes}></video>
          <div class="giflist-wrapper_gif-item_title">${item.title}</div>
          <div class="giflist-wrapper_gif-item_desc">${item.description}</div>
        </div>
      `;
    });
    contentWrapper.innerHTML = allItemsHtml;

    const items = contentWrapper.querySelectorAll('.giflist-wrapper_gif-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible'); 
      }, index * 200);
    });
  }
  function hideGifList () {
    const items = document.querySelectorAll('.giflist-wrapper_gif-item');
    items.forEach(item => {
      item.classList.remove('visible');
    });
  }
  let sellingSwiperInstance = false
  const SWIPER_LIST = window.SWIPER_LIST
  function initSelling () {
    const sellingContent = $('.selling-wrapper .swiper-wrapper');

    SWIPER_LIST.forEach(slide => {
      const slideItem =
        '<div class="swiper-slide selling-item">' +
        '<img src="' + slide.imgSrc + '" alt="" class="selling-item_img">' +
        '<div class="selling-item_content">' +
        '<div class="selling-item_content_title">' + slide.title + '</div>' +
        '<div class="selling-item_content_subtitle">' + slide.subtitle + '</div>' +
        '</div>' +
        '</div>';

      sellingContent.append(slideItem);
    });
    const sellingSwiper = new Swiper('.selling-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 12,
      centeredSlides: true,
      loop: false,
    });
    sellingSwiperInstance = true
  }

  function wrapperLazy () {
    const observerOptions = {
      root: null, // 默认为视口
      rootMargin: '0px',
      threshold: 0.1 // 10%的元素进入视口时触发回调
    };
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('media-wrapper') && entry.isIntersecting) {
          initMedia();
          observer.unobserve(entry.target);
        } else if (entry.target.classList.contains('overall-wrapper') && entry.isIntersecting) {
          initOverall();
          observer.unobserve(entry.target);
        } else if (entry.target.classList.contains('gif-wrapper')) {
          if (entry.isIntersecting) {
            gifVideo.play();
            GifContent.classList.add('in-view');
            GifContent.classList.remove('out-of-view');
          } else {
            gifVideo.pause();
            GifContent.classList.add('out-of-view');
            GifContent.classList.remove('in-view');
          }
        } else if (entry.target.classList.contains('aesthetics-wrapper') && entry.isIntersecting) {
          initAesthetics();
          observer.unobserve(entry.target);
        } else if (entry.target.classList.contains('listting-module-wrapper')) {
          if (entry.isIntersecting) {
            // 绑定滚动事件处理程序，传递当前的 listting-module-wrapper 元素
            $(document).on('scroll.listtingModule', () => handleScrollModuleTitle(entry.target));
          } else {
            // 解绑滚动事件处理程序
            $(document).off('scroll.listtingModule');
          }
        } else if (entry.target.classList.contains('listting-content_step')) {
          const stepTexts = entry.target.querySelectorAll('.listting-content_step_text');
          if (entry.isIntersecting) {
            stepTexts.forEach((stepText, index) => {
              const delay = index * 300; // 为每个元素设置不同的延迟
              setTimeout(() => {
                stepText.classList.add('visible');
              }, delay);
            });
          } else {
            // 当元素离开视口时，移除visible类
            stepTexts.forEach(stepText => {
              stepText.classList.remove('visible');
            });
          }
        } else if (entry.target.classList.contains('giflist-wrapper_content')) {
          if (entry.isIntersecting) {
            initGifList();
          } else {
            hideGifList();
          }
        } else if (entry.target.classList.contains('rotating-wrapper_top_img') || entry.target.classList.contains('runtime-wrapper_time') || entry.target.classList.contains('tips-content') || entry.target.classList.contains('listting-content_img_content') || entry.target.classList.contains('volume-wrapper_content_item')) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        } else if (entry.target.classList.contains('selling-wrapper')) {
          if (entry.isIntersecting) {
            if (!sellingSwiperInstance) {
              initSelling()
            }
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        } else if (entry.target.classList.contains('mainpro-wrapper')) {
          if (entry.isIntersecting && !hasEnteredView) {
            hasEnteredView = true;
            $(document).on('scroll.mainpro', handleScrollMainPro);
          } else if (!entry.isIntersecting && hasEnteredView) {
            $(document).off('scroll.mainpro', handleScrollMainPro);
            observer.unobserve(mainWrapper); // 停止观察
          }
        }
      })
    };

    const observerWrapper = new IntersectionObserver(observerCallback, observerOptions);
    // 选取所有包含懒加载元素
    $('.module-wrapper').each(function () {
      observerWrapper.observe(this);
    });
    $('.module-title').each(function () {
      observerWrapper.observe(this);
    });
  }
});