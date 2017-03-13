$(document).ready(function () {
  var animator = new Animator();
  animator.page1();
});

function Animator(){
  this.s = Snap("#svg");
  this.screenWidth = $("#svg").width();
  this.screenHeight = $("#svg").height();
}

function remove(element){
  var dfd = $.Deferred();
  var currentY = element.getBBox().y;
  element.animate({
    "y": currentY - 1000,
    "opacity": 0
  },500, function (){
    element.remove();
    dfd.resolve();
  });
  return dfd.promise();
}

Animator.prototype.page1 = function (){
  var self = this;
  var text = self.s.text(self.screenWidth/2,self.screenHeight/2,'Start').attr({
      "font-size": "36",
      "text-anchor": "middle",
      "opacity": 0
    });
  text.animate({
    "opacity": 1
  }, 1000, function (){
    var arrow = self.s.image("/images/icon_bounce_arrow_100.gif", self.screenWidth/2-25, self.screenHeight-50, 50, 50);
    var touched = false;
    var nextPage = function(){
      if (touched) return;
      touched = true;
      self.s.untouchmove(nextPage);
      $.when(
        remove(text),
        remove(arrow)
      ).done(
        function (){
          self.page2();
        }
      );
    };
    self.s.touchmove(nextPage);
  });
};

Animator.prototype.page2 = function (){
  var self = this;
  var text = self.s.text(self.screenWidth/2,self.screenHeight/2,'Page2').attr({
      "font-size": "36",
      "text-anchor": "middle",
      "opacity": 0
    });
  text.animate({
    "opacity": 1
  }, 1000, function (){
    var arrow = self.s.image("/images/icon_bounce_arrow_100.gif", self.screenWidth/2-25, self.screenHeight-50, 50, 50);
    var touched = false;
    var nextPage = function(){
      if (touched) return;
      touched = true;
      self.s.untouchmove(nextPage);
      $.when(
        remove(text),
        remove(arrow)
      ).done(
        function (){
          self.page3();
        }
      );
    };
    self.s.touchmove(nextPage);
  });
};

Animator.prototype.page3 = function (){
  var dfd = $.Deferred();
  var self = this;
  var text = self.s.text(self.screenWidth/2,self.screenHeight/2,'Page3').attr({
      "font-size": "36",
      "text-anchor": "middle",
      "opacity": 0
    });
  text.animate({
    "opacity": 1
  }, 1000, function (){
    var arrow = self.s.image("/images/icon_bounce_arrow_100.gif", self.screenWidth/2-25, self.screenHeight-50, 50, 50);
    var touched = false;
    var nextPage = function(){
      if (touched) return;
      touched = true;
      self.s.untouchmove(nextPage);
      $.when(
        remove(text),
        remove(arrow)
      ).done(
        function (){
          self.page4();
        }
      );
    };
    self.s.touchmove(nextPage);
  });
};

Animator.prototype.page4 = function (){
  var dfd = $.Deferred();
  var self = this;
  var text = self.s.text(self.screenWidth/2,self.screenHeight/2,'Finish').attr({
      "font-size": "36",
      "text-anchor": "middle",
      "opacity": 0
    });
  text.animate({
    "opacity": 1
  }, 1000, function (){
    //var arrow = self.s.image("/images/icon_bounce_arrow_100.gif", self.screenWidth/2-25, self.screenHeight-50, 50, 50);
  });
};