$(document).ready(function () {
  var s = Snap("#svg");
  var bigCircle = s.circle(150, 150, 100);
  var text = s.text(50, 50, 'Start').attr({ "font-size": "36" });
  Snap.load("/images/arrow.svg", function (svg) {
    console.log(this);
    console.log(svg);
  }, $("#svg"));
});
