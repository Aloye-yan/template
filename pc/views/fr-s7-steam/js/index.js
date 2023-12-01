
//监听滚动条滚动事件
const client = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
}


const setFixedImg = () => {
  const img = jQuery(".fixed-wrapper .right img")
  const show1 = jQuery(".fixed-wrapper .show-1")
  const show2 = jQuery(".fixed-wrapper .show-2")
  const wrapper = jQuery(".fixed-wrapper")
  const wrapperTop = wrapper.offset().top
  const rate = client.width / 1920
  if (wrapperTop <= 0 && wrapperTop >= -1800 * rate) {
    img.addClass("fixed")
    img.css("top", -wrapperTop + 'px')
    show1.addClass("fixed")
    show1.css("top", -wrapperTop + 134 * rate + 'px')
    show2.addClass("fixed")
    show2.css("top", -wrapperTop + 134 * rate + 'px')
    if (wrapperTop <= 0 && wrapperTop >= -600 * rate) {
      jQuery(".fixed-wrapper .img-1").show()
      jQuery(".fixed-wrapper .img-2").hide()
      show1.show()
      show2.hide()
    } else {
      jQuery(".fixed-wrapper .img-1").hide()
      jQuery(".fixed-wrapper .img-2").show()
      show1.hide()
      show2.show()
    }
  } else {
    img.removeClass("fixed")
    show1.removeClass("fixed")
    show2.removeClass("fixed")
  }
}

const setFadeInItemClass = (className, top, addClassName) => {
  const t = document.documentElement.scrollTop || document.body.scrollTop;
  const length = document.getElementsByClassName(className).length
  let item = []
  let itemTop = []
  for (let i = 0; i < length; i++) {
    item[i] = document.getElementsByClassName(className)[i]
    itemTop[i] = item[i].offsetTop
    if (itemTop[i] - top <= t) {
      item[i].classList.add(addClassName)
    } else if (t < itemTop[i] - client.height) {
      item[i].classList.remove(addClassName)
    }
  }
}

jQuery(function () {
  jQuery("body").scroll(function () {
    const rate = client.width / 1920
    setFadeInItemClass('showFadein', 300 * rate, 'show-fadein')
    setFixedImg()
  })
  jQuery(".step").hover(function () {
    const index = jQuery(this).index();
    jQuery(".show-step").eq(index).addClass("on").removeClass("off").siblings().addClass("off").removeClass("on");
    jQuery(".line-wrapper .circle").eq(index).addClass("on").removeClass("off").siblings().addClass("off").removeClass("on");
    jQuery(this).addClass("on").removeClass("off").siblings().addClass("off").removeClass("on");
  })
  jQuery(".movies .content").hover(function () {
    const index = jQuery(this).index();
    jQuery(".movies .content").eq(index).addClass("on").siblings().removeClass("on");
    jQuery(".movies .content .movie").eq(index).get(0).play();
    jQuery(this).mouseleave(function () {
      const index = jQuery(this).index();
      jQuery(".movies .content").eq(index).removeClass("on");
      jQuery(".movies .content .movie").eq(index).get(0).pause();
    })
  })
  const videoModal = jQuery("#videoModal")
  videoModal.on("show.bs.modal", function (event) {
    let button = jQuery(event.relatedTarget); // Button that triggered the modal
    let url = button.data("video"); // Extract url from data-video attribute
    const title = button.data("title");
    jQuery("#modal-title").html(title);
    jQuery(this).find("iframe").attr({
      src: url,
      allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    });
  });
  // Remove iframe attributes when the modal has finished being hidden from the user
  videoModal.on("hidden.bs.modal", function () {
    jQuery("#videoModal iframe").removeAttr("src allow");
  });

  jQuery(".b-left").mouseenter(function () {
    jQuery(this).addClass('on')
    jQuery(".desk-wrapper .left video").css("display", "block")
    jQuery(".desk-wrapper .left img").css("display", "none")
    $(this).mouseleave(function () {
      jQuery(this).removeClass('on')
      jQuery(".desk-wrapper .left video").css("display", "none")
      jQuery(".desk-wrapper .left img").css("display", "block")
    })
  })
  jQuery(".b-right").mouseenter(function () {
    jQuery(this).addClass('on')
    jQuery(".desk-wrapper .right video").css("display", "block")
    jQuery(".desk-wrapper .right img").css("display", "none")
    $(this).mouseleave(function () {
      jQuery(this).removeClass('on')
      jQuery(".desk-wrapper .right video").css("display", "none")
      jQuery(".desk-wrapper .right img").css("display", "block")
    })
  })

  jQuery(".include a").click(function () {
    jQuery(this).removeClass("active");
    jQuery(this).find("span.iconfont").addClass("icon-down-arrow").removeClass(
      "icon-up-arrow");
    const attrClass = jQuery(this).attr("class");
    if (attrClass !== 'collapsed') {
      jQuery(this).removeClass("active");
      jQuery(this).find("span.iconfont").addClass("icon-down-arrow").removeClass(
        "icon-up-arrow");
  
    } else {
      jQuery(this).addClass("active");
      jQuery(this).find("span.iconfont").removeClass("icon-down-arrow").addClass(
        "icon-up-arrow");
    }
  })
  
})

const swiper = new Swiper('.swiper-container', {
  loop: true,
  navigation: {
    nextEl: '.next',
    prevEl: '.prev',
  }
})


const ProductSwiper = new Swiper('.product-container', {
  loop: true,
})

