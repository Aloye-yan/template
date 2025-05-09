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
  const OVERALL_LIST = [
    {
      type: 'type1',
      bgSrc: 'https://static-ussite.tineco.com/%E7%BE%8E%E5%AD%A6.png_46ba4a38-9.png',
      title: 'Unique Design<br> Aesthetic',
      desc: '',
      id: ''
    },
    {
      type: 'type2',
      bgSrc: 'https://static-ussite.tineco.com/DUALBLOCK.png_3900d0c0-6.png',
      title: 'DualBlock',
      desc: 'Anti-Tangle',
      id: 'DualBlock'
    },
    {
      type: 'type2',
      bgSrc: 'https://static-ussite.tineco.com/MHCBS.png_089a2bc0-e.png',
      title: 'MHCBS',
      desc: 'Technology',
      id: 'MHCBS'
    },
    {
      type: 'type3',
      bgSrc: 'https://static-ussite.tineco.com/%E8%87%AA%E6%B8%85%E6%B4%81.png_a5f0d382-1.png',
      title: 'FlashDry',
      desc: 'Self-cleaning System',
      id: 'Self-cleaning'
    },
    {
      type: 'type3',
      bgSrc: 'https://static-ussite.tineco.com/SmoothDrive.png_5534a7ee-c.png',
      title: 'SmoothDrive',
      desc: 'Technology',
      id: 'SmoothDrive'
    },
    {
      type: 'type4',
      bgSrc: 'https://static-ussite.tineco.com/180.png_2fbd4162-5.png',
      title: '180°Lay-flat',
      desc: '',
      id: ''
    },
    {
      type: 'type5',
      bgSrc: 'https://static-ussite.tineco.com/3-1.png_500362aa-4.png',
      title: 'iLoop Smart Sensor',
      desc: '',
      id: ''
    },
    {
      type: 'type5',
      bgSrc: 'https://static-ussite.tineco.com/3-2.png_ef71ef6f-2.png',
      title: 'Up to 75 Minutes<br> Runtime',
      desc: '',
      id: ''
    },
    {
      type: 'type5',
      bgSrc: 'https://static-ussite.tineco.com/3-3.png_0f3951de-c.png',
      title: 'Upgraded <br>Pouch Cell',
      desc: '',
      id: 'Upgraded'
    }
  ];
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
          targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.warn(`No element found with id: ${targetId}`);
        }
      });
    });
  }

  const AESTHETICS_LIST = [
    {
      img: 'https://static-ussite.tineco.com/%E7%BE%8E%E5%AD%A6-1.png_5d309f1f-b.png',
      title: 'Ultra-thin Streamlined <br>Appearance'
    },
    {
      img: 'https://static-ussite.tineco.com/%E7%BE%8E%E5%AD%A6-2.png_73762a5b-4.png',
      title: '3D Dynamic Display'
    },
    {
      img: 'https://static-ussite.tineco.com/%E7%BE%8E%E5%AD%A6-3.png_4cb9e7f4-8.png',
      title: 'Crystal IMD Layer'
    },
    {
      img: 'https://static-ussite.tineco.com/%E7%BE%8E%E5%AD%A6-4.png_43974b71-0.png',
      title: 'Easy-to-see Thumb Screen'
    },
  ]
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

  function initGifList () {
    const GIFT_LIST = [
      {
        title: "Step 1: Self-cleaning with Heated Water",
        description: "Using fresh water heated by 85℃（185℉） hot air to effectively dissolve stains from the pipe to the brush roller, providing a superior self-cleaning result.",
        videoSrc: "https://static-ussite.tineco.com/%E7%83%AD%E6%B0%B4%E6%B4%97.mp4_d8462755-1.mp4"
      },
      {
        title: "Step 2: 5-minute Drying with 185℉ Air",
        description: "The upgraded 85℃  hot air effectively dries every part of the machine. Paired with a sealed base design, this ensures minimal heat loss and enhances drying efficiency",
        videoSrc: "http://static-ussite.tineco.com/%E7%83%AD%E9%A3%8E%E7%83%98.mp4_7f8abfb9-d.mp4"
      }
    ];
    const contentWrapper = document.querySelector('.giflist-wrapper_content');
    contentWrapper.innerHTML = ''; // 清空内容以避免重复添加
    let allItemsHtml = '';
    GIFT_LIST.forEach((item, index) => {
      const videoAttributes = `src="${item.videoSrc}" loop muted class="giflist-wrapper_gif-item_video" ${index === 0 ? 'autoplay' : ''}`;
      allItemsHtml += `
        <div class="giflist-wrapper_gif-item">
          <video ${videoAttributes}></video>
          <div class="giflist-wrapper_gif-item_title">
            <div class="step">${item.title}</div>
          </div>
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
  function initSelling () {
    const SWIPER_LIST = [
      {
        imgSrc: 'https://static-ussite.tineco.com/%E8%BD%AE%E6%92%AD-1.png_9b97d305-e.png',
        title: 'Upgraded<br> pouch cells',
        subtitle: 'Enhanced safety, exceptional battery life, stable and reliable power ensures uninterrupted cleaning.'
      },
      {
        imgSrc: 'https://static-ussite.tineco.com/%E8%BD%AE%E6%92%AD-2.png_139c976b-c.png',
        title: 'Charge Faster, Clean Longer',
        subtitle: '2A flash charging ensures you are always ready for the next cleaning session.'
      },
      {
        imgSrc: 'https://static-ussite.tineco.com/%E8%BD%AE%E6%92%AD-3.png_cb68b195-c.png',
        title: 'App Support <br>& Voice Assistant',
        subtitle: 'Seamless app control and instant voice assistance deliver ultimate convenience'
      },
      {
        imgSrc: 'https://static-ussite.tineco.com/%E8%BD%AE%E6%92%AD-4.png_3dd238cc-0.png',
        title: 'Easy-to-Read <br>Tumb Screen',
        subtitle: 'The LED screen with Tineco Assistant guides you through the cleaning process, offering real-time updates.'
      },
    ];
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
  function initSpec () {
    const SPEC_LIST = [
      {
        "title": "If Corded",
        "value": "Corded"
      },
      {
        "title": "Running Time",
        "value": "/"
      },
      {
        "title": "Charging Time",
        "value": "/"
      },
      {
        "title": "Self Cleaning Time",
        "value": "2 min"
      },
      {
        "title": "Brush Drying Time",
        "value": "5 min"
      },
      {
        "title": "Faster Drying Temp",
        "value": "167 ℉"
      },
      {
        "title": "Item Weight",
        "value": "22 pounds"
      },
      {
        "title": "iLoop Sensor",
        "value": "Yes"
      },
    ]
    const specWrapper = $('.spec-wrapper_content')
    let specItem = ''
    SPEC_LIST.forEach(item => {
      specItem += '<div class="spec-item">' +
        '<h3>' + item.title + '</h3>' +
        '<div class="spec-item_val">' + item.value + '</div>' +
        '</div>'
    })
    specWrapper.append(specItem)
  }
  function initIncluded () {
    const INCLUDED_OBJ = {
      includedTitle: "What's included",
      includedList: [
        {
          name: "FLOOR ONE STRETCH S6",
          desc: "Main Body",
          img: "https://static-ussite.tineco.com/STRETCH-S6.jpg_38af89ce-c.jpg"
        },
        {
          name: "Extra Brush Roller",
          desc: "High-performance soft-bristled microfiber roller head vacuums and washes floors at the same time, capturing small particles, large particles and liquids",
          img: "https://static-ussite.tineco.com/配件图-滚刷.jpg_318320d9-2.jpg"
        },
        {
          name: "Cleaning Solution",
          desc: "Removes stain and odor: Easily and effectively clean everyday messes in high-traffic areas.",
          img: "https://static-ussite.tineco.com/配件图-溶液.jpg_074bcd2e-6.jpg"
        },
        {
          name: "Dry Filter",
          desc: "Dry Filter traps foam and debris, and easy to remove, clean and replace.",
          img: "https://static-ussite.tineco.com/配件图-hepa.jpg_c51c494a-4.jpg"
        },
        {
          name: "Drying & Charging Dock",
          desc: "Conveniently charges and stores your FLOOR ONE STRETCH S6.",
          img: "https://static-ussite.tineco.com/配件图-底座.jpg_7d5a0d8a-3.jpg"
        },
        {
          name: "Cleaning Tool",
          desc: "A full brush to clean dirty water tank, brush chamber and the opening.",
          img: "https://static-ussite.tineco.com/配件图-清洁刷.jpg_5ef25cf4-c.jpg"
        }
      ],
    }
    let IncludedHtml = ''
    $(".included-container").html(IncludedHtml);

    if (INCLUDED_OBJ.includedTitle && INCLUDED_OBJ.includedTitle !== "") {
      let includedIndex = 0;
      let currentItem = INCLUDED_OBJ.includedList[includedIndex];
      const generateSlideHtml = function (group) {
        return '<div class="swiper-slide">' +
          group.map(function (item) {
            return '<div class="included-item ' + (item.name === currentItem.name ? 'active' : '') + '" desc="' + item.desc + '">' +
              '<h3 class="included-item-name">' + item.name + '</h3>' +
              '<img src="' + item.img + '" alt="' + item.name + '" class="included-item-img">' +
              '</div>';
          }).join('') +
          '</div>';
      };

      const slidesHtml = INCLUDED_OBJ.includedList.reduce(function (acc, item, index) {
        if (index % 2 === 0) acc.push([]);
        acc[acc.length - 1].push(item);
        return acc;
      }, []).map(generateSlideHtml).join('');

      IncludedHtml =
        '<h2 class="included-title">' + INCLUDED_OBJ.includedTitle + '</h2>' +
        '<div class="included-container_content">' +
        '<div class="current-included">' +
        '<img src="' + currentItem.img + '" alt="' + INCLUDED_OBJ.name + '">' +
        '</div>' +
        '<div class="included-list">' +
        '<div class="swiper included-list-swiper">' +
        '<div class="swiper-wrapper">' + slidesHtml + '</div>' +
        '</div>' +
        '</div>' +
        '<div class="included-right-icon">' +
        '<img src="https://static-ussite.tineco.com/74a5c351-e408-4348-85a9-84a6c8296949.svg" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="current-info">' +
        '<div class="current-name">' + currentItem.name + '</div>' +
        '<div class="current-desc">' + currentItem.desc + '</div>' +
        '</div>';

      $(".included-container").html(IncludedHtml);
      const includedSwiper = new Swiper('.included-list-swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
      });

      const includedItems = $('.included-item');
      const showItems = 6;
      const allView = Math.ceil(includedItems.length / showItems);

      if (includedItems.length > showItems) {
        $('.included-right-icon').show();
      }

      includedItems.click(function () {
        if (!$(this).hasClass('active')) {
          includedItems.removeClass('active');
          $(this).addClass('active');
          const currName = $(this).children('.included-item-name').html();
          const currDesc = $(this).attr('desc');
          const imgUrl = $(this).children('.included-item-img').attr('src');
          $('.current-info .current-name').html(currName);
          $('.current-info .current-desc').html(currDesc);
          $('.current-included img').fadeOut(200, function () {
            $(this).attr('src', imgUrl).fadeIn(200);
          });
        }
      });

      let isRight = true;
      $('.included-right-icon').click(function () {
        const currentPage = includedSwiper.activeIndex;
        if (currentPage >= allView) {
          isRight = false;
        }
        if (currentPage === 0) {
          isRight = true;
        }
        isRight ? includedSwiper.slideNext() : includedSwiper.slidePrev();
      });
    }
  }
  function initProdImg () {
    const images = document.querySelectorAll('.product-item_img');
    images.forEach((img, index) => {
      setTimeout(() => {
        img.classList.add('show');
      }, index * 500); // 500ms 的间隔
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
            $(document).on('scroll', () => handleScrollModuleTitle(entry.target));
          } else {
            // 解绑滚动事件处理程序
            $(document).off('scroll');
          }
        } else if (entry.target.classList.contains('listting-content_content_step_text')) {
          const stepTexts = document.querySelectorAll('.listting-content_content_step_text');
          const index = Array.from(stepTexts).indexOf(entry.target);

          if (entry.isIntersecting) {
            const delay = index === 1 ? 0 : 300;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
          } else {
            entry.target.classList.remove('visible');
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
        } else if (entry.target.classList.contains('spec-wrapper') && entry.isIntersecting) {
          initSpec();
          observer.unobserve(entry.target);
        } else if (entry.target.classList.contains('included-wrapper') && entry.isIntersecting) {
          initIncluded();
          observer.unobserve(entry.target);
        } else if (entry.target.classList.contains('mainpro-wrapper') && entry.isIntersecting) {
          initProdImg();
          observer.unobserve(entry.target);
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