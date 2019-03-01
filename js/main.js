
function get(id) {
    object = document.getElementById(id)
    return object
}

for (var headshot of document.querySelectorAll("tiana-headshot")) {
    headshot.addEventListener('mouseover', function (event) {
      headshot.src = headshot.dataset['gif']
    })
    headshot.addEventListener('mouseout', function (event) {
       headshot.src = headshot.dataset['src']
    })
  }

function(){e.hide()}}),t("tiana-headshot[data-gif]").hover(function(){var e=t(this);e.attr("src",e.data("gif"))},)
