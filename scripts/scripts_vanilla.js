(function(){
  var MTCHMD = {
    COUNT: 0,
    shared: {
      background: function(breakpoint) {
        document.documentElement.className = breakpoint;
      },
      count: function() {
        MTCHMD.COUNT += 1;

        document.querySelector("input").value = MTCHMD.COUNT;
      },
      mediaquery: function() {
        var viewport = window.innerWidth;
        var breakpoint = "xs";

        // if (viewport > 360 && viewport <= 480) {
        if (viewport > 400 && viewport <= 640) {
          breakpoint = "tablet";
        // } else if (viewport > 480 && viewport <= 960) {  
        } else if (viewport > 640 && viewport <= 960) {
          breakpoint = "small";
        } else if (viewport > 960 && viewport <= 1280) {
          breakpoint = "desktop";
        } else if (viewport > 1280) {
          breakpoint = "wide";
        }

        MTCHMD.shared.background(breakpoint);
      },
      mediaquerylist: function(mql, breakpoint) {
        if (mql && mql.matches) {
          MTCHMD.shared.count();
          MTCHMD.shared.background(breakpoint);
        }
      }
    },
    debounce: {
      listen: function() {
        window.onresize = _.debounce(MTCHMD.debounce.throttle, 150);
      },
      throttle: function() {
        MTCHMD.shared.count();
        MTCHMD.shared.mediaquery();
      },
      init: function() {
        MTCHMD.debounce.listen();
        MTCHMD.shared.mediaquery();
      }
    },
    matchmedia: {
      listen: function() {
        var listen = function(mql, index) {
          mql.addListener(function(){
            MTCHMD.shared.mediaquerylist(mql, viewports[index]);
          });
        }
        var viewports = ["xs", "tablet", "small", "desktop", "wide"];

        [ window.matchMedia("(max-width: 400px)"),
          window.matchMedia("(min-width: 401px) and (max-width: 640px)"),
          window.matchMedia("(min-width: 641px) and (max-width: 960px)"),
          window.matchMedia("(min-width: 961px) and (max-width: 1280px)"),
          window.matchMedia("(min-width: 1281px)")
        ].forEach(listen);
      },
      init: function() {
        MTCHMD.matchmedia.listen();
        MTCHMD.shared.mediaquery();
      }
    },
    resize: {
      listen: function() {
        window.onresize = function(event) {
          MTCHMD.shared.count();
          MTCHMD.shared.mediaquery();
        };
      },
      init: function() {
        MTCHMD.resize.listen();
        MTCHMD.shared.mediaquery();
      }
    },
    listen: function() {
      document.querySelector("input").addEventListener("focus", function(event){
        event.target.blur();
      }, false);
    },
    search: function() {
      var queries = document.location.search;

      if (queries.length) {
        var query = queries.substr(1);

        if (MTCHMD[query]) {
          MTCHMD[query].init();
        }
      }
    },
    init: function() {
      this.search();
      this.listen();
    }
  };

  window.MTCHMD = MTCHMD;
  MTCHMD.init();
}());
