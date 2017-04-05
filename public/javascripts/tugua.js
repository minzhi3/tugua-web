$(document).ready(function () {
  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false); 
  var animator = new Animator();
  animator.imageName.preload();
  animator.page1();
});

function ImageToBase64(img, mime_type) {
    // New Canvas
    var canvas = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;
    // Draw Image
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // To Base64
    return canvas.toDataURL(mime_type);
}

function Animator() {
  this.s = Snap("#svg");
  this.screenWidth = 360;
  this.screenHeight = 640;
  this.prefix = "/images/thumbs/";
  this.imageName = new ImageName();
}

function ImageName() {
  //Page 1 Tu
  this.N11 = [
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

  this.P11 = [];
  //Page 1 gua
  this.N12 = [
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
  this.P12 = [];

  //page 2 tu
  this.N21 = [
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
  this.P21 = [];
  //page 2 gua
  this.N22 = [
    "31.jpg",
    "32.jpg",
    "33.jpg",
    "34.jpg",
    "35.jpg",
    "36.jpg",
    "37.jpg",
    "38.jpg",
    "39.jpg",
    "40.jpg"
  ];
  this.P22 = [];
  //page 3 sendai
  this.N31 = [
    "41.jpg",
    "42.jpg",
    "43.jpg",
    "44.jpg",
    "45.jpg",
    "46.jpg",
    "47.jpg",
    "48.jpg",
    "49.jpg",
    "50.jpg"
  ];
  this.P31 = [];

  //page 3 tokyo
  this.N32 = [
    "51.jpg",
    "52.jpg",
    "53.jpg",
    "54.jpg",
    "55.jpg",
    "56.jpg",
    "57.jpg",
    "58.jpg",
    "59.jpg",
    "60.jpg"
  ];
  this.P32 = [];
}
ImageName.prototype.preload = function (){
  var self = this;
  function preloadArray(names, images){
    for (var i=0;i<names.length;i++){
      images[i] = new Image();
      images[i].src = "/images/thumbs/" + names[i];
    }
  }
  preloadArray(this.N11, this.P11);
  preloadArray(this.N12, this.P12);
  preloadArray(this.N21, this.P21);
  preloadArray(this.N22, this.P22);
  preloadArray(this.N31, this.P31);
  preloadArray(this.N32, this.P32);
};

Animator.prototype.drawPhoto = function (images, x, y) {
  var self = this;
  var g = self.s.select("#photo");
  if (!g) {
    g = self.s.group().attr({
      "id": "photo"
    });
  }
  var gClick = self.s.select("#photoClick");

  function showPhotoIndex(index) {
    if (index == images.length)
      return;
    else {
      var imageSource = images[index];
      var height = 80;
      var iw = imageSource.width;
      var ih = imageSource.height;
      var width = 1.0 * iw * height / ih;
      var ix = Math.random() * width + x;
      var iy = Math.random() * height + y;
      var deltaXY = 112.5;
      var angel = Math.random() * 30 - 15;
      var b64 = ImageToBase64(imageSource, "image/jpeg");
      var image = g.image(b64, ix, iy, width, height).attr({
        "opacity": 0,
        "transform": "r" + angel
      });
      image.animate({
        "opacity": 1
      }, 1000);
      image.drag(function (dx, dy, x, y){
        this.attr({
          "x": x - deltaXY,
          "y": y - deltaXY
        });
      },function (x,y){
        this.animate({
          "x": x - deltaXY,
          "y": y - deltaXY,
          "width": width * 3,
          "height": height * 3,
          "transform": "r0"
        }, 200);
        this.appendTo(g);
      },function (event){
        var that = this;
        setTimeout(function (){
          that.animate({
            "x": event.changedTouches[0].clientX - deltaXY / 4,
            "y": event.changedTouches[0].clientY - deltaXY / 4,
            "width": width,
            "height": height,
            "transform": "r" + angel
          }, 1000);
        }, 1000);

      }
      );
    }
    setTimeout(function () {
      showPhotoIndex(index + 1);
    }, 300);
  }
  showPhotoIndex(0);
};

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
    "transform": "t320,560"
  });
  var touched = false;
  var nextPage = function () {
    var photo = snap.select("#photo");
    var text = snap.select("#text");

    console.log(photo);
    if (touched) return;
    touched = true;
    group.untouchend(nextPage);
    //group.unclick(nextPage);
    $.when(
      remove(photo), remove(group), remove(text)
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
  var image = self.s.image("images/cover.jpg", 0, 144, 360, 415);
  var textG = self.s.group().attr({ "opacity": 0 });
  textG.image("images/ring.png", 50, 0, 262, 268);
  textG.image("images/name1.png", 135, 100, 90, 20);
  textG.image("images/name2.png", 135, 160, 90, 20);
  textG.image("images/diamond.png", 170, 130, 20, 20);
  textG.image("images/time.png", 85, 300, 200, 20);

  textG.image("images/line.png", 85, 330, 200, 20);
  textG.image("images/place.png", 55, 360, 250, 50);
  textG.animate({
    "opacity": 1
  }, 1000, function () {
    var text = self.s.text(200, 560, '点这里是我们的故事').attr({
      "font-size": "20",
      "text-anchor": "middle"
    });
    showArrowNextPage(self.s, 10, function () {
      $.when(
        remove(textG),
        remove(image),
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

  var text = self.s.paper.text({ text: ["啊啊啊啊", "啊啊啊啊啊啊", "啊啊啊啊啊啊啊"] })
    .attr({ fill: "black", fontSize: "16px", "opacity": 0, "id": "text" });

  text.selectAll("tspan").forEach(function (tspan, i) {
    tspan.attr({ x: 20, y: 500 + 25 * (i + 1) });
  });

  var drawPhoto = function () {
    self.drawPhoto(self.imageName.P11, 130, 60);
    self.drawPhoto(self.imageName.P12, 140, 350);
    text.animate({
      "opacity": 1
    }, 1000);
  };
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

  var text = self.s.paper.text({ text: ["啊啊啊啊", "啊啊啊啊啊啊", "啊啊啊啊啊啊啊"] })
    .attr({ fill: "black", fontSize: "16px", "opacity": 0, "id": "text" });

  text.selectAll("tspan").forEach(function (tspan, i) {
    tspan.attr({ x: 20, y: 500 + 25 * (i + 1) });
  });

  var drawPhoto = function () {
    self.drawPhoto(self.imageName.P21, 10, 80);
    self.drawPhoto(self.imageName.P22, 20, 390);
    text.animate({
      "opacity": 1
    }, 1000);
  };
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

  var text = self.s.paper.text({ text: ["啊啊啊啊", "啊啊啊啊啊啊", "啊啊啊啊啊啊啊"] })
    .attr({ fill: "black", fontSize: "16px", "opacity": 0, "id": "text" });

  text.selectAll("tspan").forEach(function (tspan, i) {
    tspan.attr({ x: 20, y: 500 + 25 * (i + 1) });
  });

  map.animate({
    transform: "matrix(10,0,0,10,-2400,-2589.5698)",
  }, 2000);

  tu.animate({
    "x": 285,
    "y": 375
  }, 2000, mina.backin, function () {
    self.drawPhoto(self.imageName.P31, 20, 90);
    setTimeout(function () {
      tu.animate({
        "x": 265,
        "y": 500
      }, 1000);

      self.drawPhoto(self.imageName.P32, 20, 290);
      text.animate({
        "opacity": 1
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

  showArrowNextPage(self.s, 5500, function () {
    self.page5();
  });

};


Animator.prototype.page5 = function () {
  var self = this;

  var tu = self.s.select("#tuFace");
  var gua = self.s.select("#guaFace");
  var map = self.s.select("#map");

  var textG = self.s.group().attr({ "id": "text" });
  var text = textG.text({ text: ["最后，我们郑重邀请您参加我们的婚礼", "感谢您的支持与鼓励", "点此关注我们的婚礼公共号"] })
    .attr({ fill: "blue", fontSize: "16px", "opacity": 0 });

  text.selectAll("tspan").forEach(function (tspan, i) {
    tspan.attr({ x: 50, y: 350 + 25 * (i + 1) });
  });

  text.touchstart(function (){
    window.location.href = "http://mp.weixin.qq.com/s/Py11O4PZhogteG_Vk8QmyA";
  });

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
    text.animate({
      "opacity": 1
    }, 1000);
    textG.text(250, 620, '回到首页').attr({
      "font-size": "20",
      "text-anchor": "middle"
    });
  }, 2000);

  showArrowNextPage(self.s, 2000, function () {
    self.replay();
  });

};

Animator.prototype.replay = function () {
  var self = this;

  var faces = self.s.select("#tuFace").parent();
  var map = self.s.select("#map");

  $.when(
    remove(faces),
    remove(map)
  ).done(
    function () {
      self.page1();
    }
    );

};