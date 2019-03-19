let searchButton = document.getElementById('search-button')
let searchField = document.getElementById('search-field')

//event listeners for search
searchButton.addEventListener('click', function (event) {
    searchApi()
})

searchField.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      searchApi()
    }
  })

function searchApi (event) {
    $.ajax({
        url: 'https://api.civil.services/v1/geolocation/zipcode/apikey=apikey',
        data: {
            apikey: 'ADF9577E-4D21-6774-C97E-BFB2464AF4F9',
            zipcode: searchField.value
        },
        dataType: "json",
        success: function (reps) {
            let searchResults = document.getElementById('search-results')
            searchResults.innerHTML= ''
            
            let houseRep = document.createElement('div')
            let repCity = document.createElement('div')
            let repCounty = document.createElement('div')

            repCity.innerText = reps.city
            repCounty.innerText = reps.county

            houseRep.appendChild(repCity)
            houseRep.appendChild(repCounty)
            searchResults.appendChild(houseRep)
            
          
        }
    })
}




// Word Carousel

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};


// var Menu = {
//   el: {
//     menu: $('.menu'),
//     menuTop: $('.menu-top'),
//     menuClose: $('.menu-close'),
//     menuMiddle: $('.menu-middle'),
//     menuBottom: $('.menu-bottom'),
//     menuText: $('.menu-text')
//   },
  
//   init: function() {
//     Menu.bindUIactions();
//   },
  
//   bindUIactions: function() {
//     Menu.el.menu
//         .on(
//           'click',
//         function(event) {
//         Menu.activateMenu(event);
//         event.preventDefault();
//       }
//     );
//   },
  
//   activateMenu: function() {
//     Menu.el.menuTop.toggleClass('menu-top-expand expand');
//     Menu.el.menuMiddle.toggleClass('menu-middle-expand expand');
//     Menu.el.menuBottom.toggleClass('menu-bottom-expand expand'); 
//     Menu.el.menuText.toggleClass('menu-text-expand');
//     Menu.el.menuClose.toggleClass('menu-close-visible');
//   }
// };
  
//   //Stop menu item click closing the menu
//   $(".menu .menu-global").click(function(e) {
//       e.stopPropagation();
// });

// Menu.init();




