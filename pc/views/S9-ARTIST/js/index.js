document.addEventListener('DOMContentLoaded', (event) => {

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
    createObserver('.media-item', 0, 150);
  }
  const OVERALL_LIST = window.OVERALL_LIST
  function initOverall () {
    const overallWrapperTop = document.querySelector('.overall-wrapper_top');
    const overallWrapperTopRight = overallWrapperTop.querySelector('.overall-wrapper_top_right');
    const overallWrapperTopRightTop = overallWrapperTopRight.querySelector('.overall-wrapper_top_right_top');
    const overallWrapperTopRightTopLeft = overallWrapperTopRightTop.querySelector('.overall-wrapper_top_right_top_left');
    const overallWrapperBottom = document.querySelector('.overall-wrapper_bottom');

    OVERALL_LIST.forEach(item => {
      const overallItem = document.createElement('div');
      overallItem.className = `overall-item ${item.type}`;
      overallItem.setAttribute('data-to-wrapper', item.id);

      overallItem.innerHTML = `
      <img src="${item.bgSrc}" alt="" class="overall-item_bg">
      <div class="overall-item_content">
        <div class="overall-item_content_title">${item.title}</div>
        <div class="overall-item_content_desc">${item.desc}</div>
      </div>
      <div class="overall-item_icon">
    `;

      switch (item.type) {
        case 'type1':
          overallWrapperTop.insertBefore(overallItem, overallWrapperTop.firstChild);
          break;
        case 'type2':
          overallWrapperTopRightTopLeft.appendChild(overallItem);
          break;
        case 'type3':
          overallWrapperTopRightTop.appendChild(overallItem);
          break;
        case 'type4':
          overallWrapperTopRight.appendChild(overallItem);
          break;
        case 'type5':
          overallWrapperBottom.appendChild(overallItem);
          break;
        default:
          console.warn(`Unknown type: ${item.type}`);
      }

      overallItem.addEventListener('click', function () {
        const targetId = this.getAttribute('data-to-wrapper');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offset = 70; // 根据固定导航栏的高度进行调整
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
         
        } else {
          console.warn(`No element found with id: ${targetId}`);
        }
      });
    });
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
  }
  const GIFT_LIST = window.GIFT_LIST
  function initGifList () {
    const contentWrapper = document.querySelector('.giflist-wrapper_content');
    contentWrapper.innerHTML = ''; // 清空内容以避免重复添加
    let allItemsHtml = '';
    GIFT_LIST.forEach((item, index) => {
      const videoAttributes = `src="${item.videoSrc}" loop muted  playsinline class="giflist-wrapper_gif-item_video" ${index === 0 ? 'autoplay' : ''}`;
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
        item.classList.add('visible'); // 添加可见类以应用 CSS 动画

        const videoElement = item.querySelector('video');
        item.addEventListener('mouseenter', () => {
          // 暂停所有视频
          items.forEach(otherItem => {
            const otherVideo = otherItem.querySelector('video');
            if (otherVideo && otherVideo !== videoElement) {
              otherVideo.pause();
            }
          });
          // 播放当前视频
          videoElement.play().catch(error => {
            console.error("Error attempting to play video:", error);
          });
        });
        item.addEventListener('mouseleave', () => {
          // 暂停当前视频
          videoElement.pause();
        });
      }, index * 200);
    });
  }
  function hideGifList () {
    const items = document.querySelectorAll('.giflist-wrapper_gif-item');
    items.forEach(item => {
      item.classList.remove('visible');
    });
  }
  let swiperInstance = false
  const SWIPER_LIST = window.SWIPER_LIST
  function initSelling () {
    const sellingContent = $('.selling-wrapper .selling-wrapper_content');

    SWIPER_LIST.forEach(slide => {
      const slideItem =
        '<div class="selling-item">' +
        '<img src="' + slide.imgSrc + '" alt="" class="selling-item_img">' +
        '<div class="selling-item_content">' +
        '<div class="selling-item_content_title">' + slide.title + '</div>' +
        '<div class="selling-item_content_subtitle">' + slide.subtitle + '</div>' +
        '</div>' +
        '</div>';

      sellingContent.append(slideItem);
    });
    swiperInstance = true
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

  const gifVideo = document.querySelector('.gif-wrapper video');
  const GifContent = document.querySelector('.gif-wrapper .gif-wrapper_content');
  // 模块懒加载
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
        } else if (entry.target.classList.contains('listting-content_content_step')) {
          const stepTexts = entry.target.querySelectorAll('.listting-content_content_step_text');
          if (entry.isIntersecting) {
            stepTexts.forEach((stepText, index) => {
              const delay = (index === 0 ? 1 : 0) * 300; 
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
        } else if (entry.target.classList.contains('rotating-wrapper_top_img') || entry.target.classList.contains('runtime-wrapper_content_time') || entry.target.classList.contains('tips-content') || entry.target.classList.contains('features-item_img') || entry.target.classList.contains('listting-content_img_content')) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        } else if (entry.target.classList.contains('volume-wrapper_content')) {
          const titles = entry.target.querySelectorAll('.volume-wrapper_content_item_title');
          const subtitles = entry.target.querySelectorAll('.volume-wrapper_content_item_subtitle');

          if (entry.isIntersecting) {
            // 元素进入视图
            titles.forEach(title => title.classList.add('visible'));
            subtitles.forEach(subtitle => subtitle.classList.add('visible'));
          } else {
            // 元素离开视图
            titles.forEach(title => title.classList.remove('visible'));
            subtitles.forEach(subtitle => subtitle.classList.remove('visible'));
          }
        } else if (entry.target.classList.contains('selling-wrapper_content')) {
          if (entry.isIntersecting) {
            if (!swiperInstance) {
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
        } else if (entry.target.classList.contains('rotating-wrapper_img')) {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
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