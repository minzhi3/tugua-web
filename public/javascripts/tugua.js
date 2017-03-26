$(document).ready(function () {
  var animator = new Animator();
  animator.page1();
});

function Animator() {
  this.s = Snap("#svg");
  this.screenWidth = 360;
  this.screenHeight = 640;
  this.prefix = "/images/thumbs/";
  this.imageName = new ImageName();
}

function ImageName() {
  this.P11 = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg"
  ];
  this.P12 = [
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg"
  ];
  this.P21 = [
    "21.jpg",
    "22.jpg",
    "23.jpg",
    "24.jpg",
    "25.jpg",
    "26.jpg",
    "27.jpg",
    "28.jpg",
    "29.jpg",
    "30.jpg"
  ];
  this.P22 = [
    "31.jpg",
    "32.jpg",
    "33.jpg",
    "34.jpg",
    "35.jpg",
    "36.jpg",
    "37.jpg",
    "01.jpg",
    "02.jpg",
    "03.jpg"
  ];
  this.P31 = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg"
  ];
  this.P32 = [
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg"
  ];
}
Animator.prototype.drawPhoto = function (imageName, x, y, width, height) {
  var self = this;
  var g = self.s.select("#photo")
  if (!g) {
    g = self.s.group().attr({
      "id": "photo"
    });
  }


  function showPhotoIndex(index) {
    if (index == imageName.length)
      return
    else {
      var imageSource = self.prefix + imageName[index];
      var ix = Math.random() * width + x;
      var iy = Math.random() * height + y;
      var angel = Math.random() * 30 - 15;
      var image = g.image(imageSource, ix, iy, 75, 75).attr({
        "opacity": 0,
        "transform": "r" + angel
      });
      image.animate({
        "opacity": 1
      }, 1000);
    }
    setTimeout(function () {
      showPhotoIndex(index + 1)
    }, 300);
  }
  showPhotoIndex(0);
}

function remove(element) {
  var dfd = $.Deferred();
  if (!element) {
    dfd.resolve();
  } else {
    var currentY = element.getBBox().y;
    element.animate({
      //"y": currentY - 1000,
      "opacity": 0
    }, 500, function () {
      element.remove();
      dfd.resolve();
    });
  }

  return dfd.promise();
}

function showArrowNextPage(snap, time, callback) {
  var triangle = snap.polyline([10, 0, -5, 8.66, -5, -8.66]).attr({
    "opacity": 0
  });
  var circle = snap.path("M0,-20A20,20 0 0,1 0,20A20,20 0 0,1 0,-20z").attr({
    "fill-opacity": "0",
    "stroke-opacity": "1",
    "stroke-width": "5",
    "stroke": "black",
    "stroke-dasharray": "126px",
    "stroke-dashoffset": "126px"
  });
  var group = snap.group(triangle, circle).attr({
    "transform": "t320,590"
  });
  var touched = false;
  var nextPage = function () {
    var photo = snap.select("#photo");

    console.log(photo);
    if (touched) return;
    touched = true;
    group.untouchend(nextPage);
    //group.unclick(nextPage);
    $.when(
      remove(photo), remove(group)
    ).done(callback);
  };
  circle.animate({
    "stroke-dashoffset": "0px"
  }, time, function () {
    triangle.attr({
      "opacity": 1
    });
    group.touchend(nextPage);
    //group.click(nextPage);
  });
  //circle.click(nextPage);
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
    showArrowNextPage(self.s, 10, function () {
      $.when(
        remove(text)
      ).done(
        function () {
          self.page2();
        }
        );
    });
  });
};

Animator.prototype.page2 = function () {
  var self = this;
  var mapG = self.s.group().attr({
    "opacity": 0,
    "id": "map"
  });

  var drawPhoto = function () {
    self.drawPhoto(self.imageName.P11, 100, 80, 150, 150);
    self.drawPhoto(self.imageName.P12, 110, 390, 150, 150);
  }
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
    }, 500, mina.bounce, drawPhoto);
  };

  Snap.load("/images/continentsLow.svg", function (fragment) {
    showArrowNextPage(self.s, 6500, function () {
      self.page3();
    });

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

  var drawPhoto = function () {
    self.drawPhoto(self.imageName.P21, 10, 80, 150, 150);
    self.drawPhoto(self.imageName.P22, 20, 390, 150, 150);
  }
  tu.animate({
    "x": 190,
    "y": 170
  }, 2000, mina.backin, drawPhoto);

  gua.animate({
    "x": 160,
    "y": 470
  }, 1000, mina.backin);

  showArrowNextPage(self.s, 2000, function () {
    self.page4();
  });

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
    self.drawPhoto(self.imageName.P31, 20, 90, 150, 150);
    setTimeout(function () {
      tu.animate({
        "x": 265,
        "y": 500
      }, 1000);
      
      console.log("photo 2");
      self.drawPhoto(self.imageName.P32, 20, 290, 150, 150);
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

  showArrowNextPage(self.s, 5500, function () {
    self.page5();
  });

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

  showArrowNextPage(self.s, 2000, function () {
    self.page6();
  });

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