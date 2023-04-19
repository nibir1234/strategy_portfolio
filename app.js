function init() {
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds = [
    `radial-gradient(#2B3760, #0B1023)`,
    `radial-gradient(#4E3022, #161616)`,
    `radial-gradient(#4E4342, #161616)`
  ];
  //Tracker
  let current = 0;
  let scrollSlide = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      changeDots(this);
      nextSlide(index);
      scrollSlide = index;
    });
  });

  function changeDots(dot) {
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  }

  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector(".hero .model-left");
    const nextRight = nextPage.querySelector(".hero .model-right");
    const currentLeft = currentPage.querySelector(".hero .model-left");
    const currentRight = currentPage.querySelector(".hero .model-right");
    const nextText = nextPage.querySelector(".details");
    const portofolio = document.querySelector(".portofolio");

    const tl = new TimelineMax({
      onStart: function () {
        slides.forEach(slide => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function () {
        slides.forEach(slide => {
          slide.style.pointerEvents = "all";
        });
      }
    });

    tl.fromTo(currentLeft, 0.3, {
        y: "-10%"
      }, {
        y: "-100%"
      })
      .fromTo(currentRight, 0.3, {
        y: "10%"
      }, {
        y: "-100%"
      }, "-=0.2")
      .to(portofolio, 0.3, {
        backgroundImage: backgrounds[pageNumber]
      })
      .fromTo(
        currentPage,
        0.3, {
          opacity: 1,
          pointerEvents: "all"
        }, {
          opacity: 0,
          pointerEvents: "none"
        }
      )
      .fromTo(
        nextPage,
        0.3, {
          opacity: 0,
          pointerEvents: "none"
        }, {
          opacity: 1,
          pointerEvents: "all"
        },
        "-=0.6"
      )
      .fromTo(nextLeft, 0.3, {
        y: "-100%"
      }, {
        y: "-10%"
      }, "-=0.6")
      .fromTo(nextRight, 0.3, {
        y: "-100%"
      }, {
        y: "10%"
      }, "-=0.8")
      .fromTo(nextText, 0.3, {
        opacity: 0,
        y: 0
      }, {
        opacity: 1,
        y: 0
      })
      .set(nextLeft, {
        clearProps: "all"
      })
      .set(nextRight, {
        clearProps: "all"
      });

    current = pageNumber;
  }

  //OPTIONAL
  // document.addEventListener("wheel", throttle(scrollChange, 1500));
  // document.addEventListener("touchmove", throttle(scrollChange, 1500));

  // function switchDots(dotNumber) {
  //   const activeDot = document.querySelectorAll(".slide")[dotNumber];
  //   slides.forEach(slide => {
  //     slide.classList.remove("active");
  //   });
  //   activeDot.classList.add("active");
  // }

  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }

    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    switchDots(scrollSlide);
    nextSlide(scrollSlide);
    console.log(scrollSlide);
  }


  var footer_links_2 = document.querySelector(".footer_links_2");
  var footer_links_3 = document.querySelector(".footer_links_3");
  document.addEventListener("mousemove", function (e) {
    footer_links_2.style.cssText = footer_links_3.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
  });

  const hamburger = document.querySelector(".menu");
  const hamburgerLines = document.querySelectorAll(".menu line");
  const navOpen = document.querySelector(".nav-open");
  const contact = document.querySelector(".contact");
  const social = document.querySelector(".social");
  const home = document.querySelector(".home");
  const services = document.querySelector(".services");
  const about = document.querySelector(".about");
  const logo = document.querySelector(".logo");


  const tl = new TimelineMax({
    paused: true,
    reversed: true
  });

  tl.to(navOpen, 0.3, {
      y: 0
    })
    .fromTo(home, 0.3, {
      opacity: 0,
      y: 10
    }, {
      opacity: 1,
      y: 0
    }, "-=.1")
    .fromTo(services, 0.3, {
      opacity: 0,
      y: 10
    }, {
      opacity: 1,
      y: 0
    }, "-=.13")
    // .fromTo(about, 0.3, {
    //   opacity: 0,
    //   y: 10
    // }, {
    //   opacity: 1,
    //   y: 0
    // }, "-=.16")
    .fromTo(contact, 0.3, {
      opacity: 0,
      y: 10
    }, {
      opacity: 1,
      y: 0
    }, "-=0.19")
    .fromTo(social, 0.3, {
      opacity: 0,
      y: 10
    }, {
      opacity: 1,
      y: 0
    }, "-=0.22")

    .fromTo(logo, 0.2, {
      color: "white"
    }, {
      color: "black"
    }, "-=1")
    .fromTo(
      hamburgerLines,
      0.2, {
        stroke: "black"
      }, {
        stroke: "white"
      },
      "-=1"
    )
    .fromTo(
      hamburger,
      0.2, {
        background: "#f8f8f8"
      }, {
        background: "black"
      },
      "-=1"
    );

  hamburger.addEventListener("click", () => {
    tl.reversed() ? tl.play() : tl.reverse();
  });
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

init();


var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid blue}";
  document.body.appendChild(css);
};





let path = document.querySelector('path')
let pathLength = path.getTotalLength()
path.style.strokeDasharray = pathLength + ' ' + pathLength;
path.style.strokeDashoffset = pathLength

window.addEventListener('scroll', () => {
  var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
  var drawLength = pathLength * (scrollPercentage)
  path.style.strokeDashoffset = pathLength - drawLength
})