$(document).ready(function () {
  var animator = new Animator();
  animator.page1();
});

function Animator() {
  this.s = Snap("#svg");
  this.screenWidth = 360;
  this.screenHeight = 640;
}

function remove(element) {
  var dfd = $.Deferred();
  var currentY = element.getBBox().y;
  element.animate({
    "y": currentY - 1000,
    "opacity": 0
  }, 500, function () {
    element.remove();
    dfd.resolve();
  });
  return dfd.promise();
}

function showArrowNextPage(snap, callback) {
  var arrow = snap.image("/images/icon_bounce_arrow_100.gif", 155, 590, 50, 50);
  var touched = false;
  var nextPage = function () {
    if (touched) return;
    touched = true;
    snap.untouchmove(nextPage);
    remove(arrow).done(callback);
  };
  //g.touchmove(nextPage);
  snap.touchmove(nextPage);
}

Animator.prototype.page1 = function () {
  var self = this;
  var text = self.s.text(self.screenWidth / 2, self.screenHeight / 2, 'Start').attr({
    "font-size": "36",
    "text-anchor": "middle",
    "opacity": 0
  });
  text.animate({
    "opacity": 1
  }, 1000, function () {
    var arrow = self.s.image("/images/icon_bounce_arrow_100.gif", self.screenWidth / 2 - 25, self.screenHeight - 50, 50, 50);
    var touched = false;
    var nextPage = function () {
      if (touched) return;
      touched = true;
      self.s.untouchmove(nextPage);
      $.when(
        remove(text),
        remove(arrow)
      ).done(
        function () {
          self.page2();
        }
        );
    };
    self.s.touchmove(nextPage);
  });
};

Animator.prototype.page2 = function () {
  var self = this;
  var mapG = self.s.group().attr({
    "opacity": 0,
    "id": "map"
  });

  var showRole = function () {
    var paper = self.s.paper;
    var tu = paper.text(90, 90, "🐰").attr({ "font-size": "36", "id": "tuFace" });
    var gua = paper.text(110, 490, "🐸").attr({ "font-size": "36", "id": "guaFace" });
    var g = self.s.group(tu, gua).attr({
      "opacity": 0,
      "transform": "t0,-50"
    });
    g.attr({
      "opacity": 1
    }).animate({
      "transform": "t0,0"
    }, 500, mina.bounce, function () {
      showArrowNextPage(self.s, function () {
        self.page3();
      });
    });
  };

  Snap.load("/images/continentsLow.svg", function (fragment) {
    mapG.append(fragment.select("#g8").attr({ transform: "t-600,-50" }));
    mapG.animate({
      transform: "t-1000,-200s10,10",
      "opacity": 1
    }, 2000, showRole);
  });
};

Animator.prototype.page3 = function () {
  var self = this;

  var tu = self.s.select("#tuFace");
  var gua = self.s.select("#guaFace");
  tu.animate({
    "x": 190,
    "y": 170
  }, 2000, mina.backin);

  gua.animate({
    "x": 160,
    "y": 470
  }, 1000, mina.backin);

  setTimeout(function () {
    showArrowNextPage(self.s, function () {
      self.page4();
    });
  }, 2000);

};


Animator.prototype.page4 = function () {
  var self = this;

  var tu = self.s.select("#tuFace");
  var gua = self.s.select("#guaFace");
  var map = self.s.select("#map");

  map.animate({
    transform: "matrix(10,0,0,10,-2400,-2589.5698)",
  }, 2000);

  tu.animate({
    "x": 285,
    "y": 375
  }, 2000, mina.backin, function () {
    setTimeout(function () {
      tu.animate({
        "x": 265,
        "y": 500
      }, 1000);
    }, 3000);
  });

  gua.animate({
    "x": 315,
    "y": 375
  }, 2000, mina.backin, function () {
    setTimeout(function () {
      gua.animate({
        "x": 235,
        "y": 500
      }, 500);
    }, 2500);
  });

  setTimeout(function () {
    showArrowNextPage(self.s, function () {
      self.page5();
    });
  }, 5500);

};


Animator.prototype.page5 = function () {
  var self = this;

  var tu = self.s.select("#tuFace");
  var gua = self.s.select("#guaFace");
  var map = self.s.select("#map");

  map.animate({
    transform: "matrix(11,0,0,11,-2169,-3289.5698)",
  }, 2000);

  tu.animate({
    "x": 175,
    "y": 320
  }, 2000, mina.backin);

  gua.animate({
    "x": 145,
    "y": 320
  }, 2000, mina.backin);

  setTimeout(function () {
    showArrowNextPage(self.s, function () {
      self.page6();
    });
  }, 2000);

};

Animator.prototype.page6 = function () {
  var self = this;
  var text = self.s.text(self.screenWidth / 2, self.screenHeight / 2, 'Finish').attr({
    "font-size": "36",
    "text-anchor": "middle",
    "opacity": 0
  });
  var faces = self.s.select("#tuFace").parent();
  var map = self.s.select("#map");

  $.when(
    remove(faces),
    remove(map)
  ).done(
    function () {
      text.animate({
        "opacity": 1
      }, 1000, function () {
        //var arrow = self.s.image("/images/icon_bounce_arrow_100.gif", self.screenWidth/2-25, self.screenHeight-50, 50, 50);
      });
    }
    );

};