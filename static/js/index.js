document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  reveals.forEach((node) => observer.observe(node));

  // ── Video Gallery ──
  if (document.querySelector("#videos")) {
    initVideoGallery();
  }

  function initVideoGallery() {
    const VIDEO_CONFIG = {
      real: {
        single: [
          "fly_kick_1",
          "a_person_is_jogging_in_place",
          "a_man_is_waving_his_right_hand",
          "fly_kick_2",
          "squat_down",
          "a_person_moves_an_object_from_the_left_side_and_moves_it_to_the_right_side",
          "a_person_is_walking_forward",
          "a_person_is_playing_a_violin",
          "a_person_is_jumping_forward",
          "jumps_up_in_a_tight_twirl",
          "the_person_is_throwing_a_baseball",
          "a_person_is_walking_backward",
          "a_person_claps_his_hands",
          "a_man_is_waving_his_left_hand",
          "a_person_walks_in_a_circle"
        ],
        stream: [
          "stream_jogging_in_place_210_stand_150_walk_forward_240_throwing_baseball",
          "stream_violin_240_wave_right_hand_210_stand_210_squats_down_240"
        ]
      },
      sim: {
        single: [
          "fly_kick_1",
          "a_person_is_jogging_in_place",
          "a_man_is_waving_his_right_hand",
          "fly_kick_2",
          "squat_down",
          "a_person_moves_an_object_from_the_left_side_and_moves_it_to_the_right_side",
          "a_person_is_walking_forward",
          "a_person_is_playing_a_violin",
          "a_person_is_jumping_forward",
          "jumps_up_in_a_tight_twirl",
          "the_person_is_throwing_a_baseball",
          "a_person_is_walking_backward",
          "a_person_claps_his_hands",
          "a_man_is_waving_his_left_hand",
          "a_person_walks_in_a_circle"
        ],
        stream: [
          "stream_jogging_in_place_210_stand_150_walk_forward_240_throwing_baseball",
          "stream_violin_240_wave_right_hand_210_stand_210_squats_down_240"
        ]
      }
    };

    var STREAMING_CAPTIONS = {
      "stream_jogging_in_place_210_stand_150_walk_forward_240_throwing_baseball": [
        "Jogging in Place", "Stand", "Walking Forward", "Throwing Baseball"
      ],
      "stream_violin_240_wave_right_hand_210_stand_210_squats_down_240": [
        "Playing Violin", "Waving Right Hand", "Stand", "Squatting Down"
      ]
    };

    function filenameToCaption(name) {
      var caption = name
        .replace(/\.mp4$/i, "")
        .replace(/^stream_/, "")
        .replace(/_\d+$/g, "")
        .replace(/_+/g, " ")
        .trim();
      return caption.charAt(0).toUpperCase() + caption.slice(1);
    }

    function buildStreamingCard(filename, domain) {
      var path = "static/videos/" + domain + "/stream/" + filename + ".mp4";
      var steps = STREAMING_CAPTIONS[filename] || [filenameToCaption(filename)];
      var chipsHtml = steps
        .map(function(step, i) {
          var arrow = i < steps.length - 1
            ? '<span class="chip-arrow"><i class="fas fa-arrow-right"></i></span>'
            : "";
          return '<span class="chip">' + step + "</span>" + arrow;
        })
        .join("");

      return '\n    <article class="streaming-card reveal">\n      <div class="streaming-player">\n        <video class="gallery-video streaming-video"\n          data-src="' + path + '"\n          preload="none" loop muted playsinline>\n        </video>\n        <div class="video-overlay">\n          <button class="play-btn" aria-label="Play streaming demo"></button>\n          <div class="video-gradient"></div>\n        </div>\n      </div>\n      <div class="streaming-meta">\n        <div class="instruction-chips">' + chipsHtml + '</div>\n      </div>\n    </article>';
    }

    function buildVideoCard(filename, domain) {
      var path = "static/videos/" + domain + "/" + filename + ".mp4";
      var caption = filenameToCaption(filename);
      return '\n    <article class="video-card reveal" data-caption="' + caption + '">\n      <div class="video-card__player">\n        <video class="gallery-video"\n          data-src="' + path + '"\n          preload="none" loop muted playsinline>\n        </video>\n        <div class="video-overlay">\n          <button class="play-btn" aria-label="Play: ' + caption + '"></button>\n          <div class="video-gradient"></div>\n        </div>\n      </div>\n      <div class="video-card__caption">\n        <span class="video-card__command">' + caption + '</span>\n      </div>\n    </article>';
    }

    function renderTabPanel(domain) {
      var config = VIDEO_CONFIG[domain];
      var streamHtml = config.stream
        .map(function(f) { return buildStreamingCard(f, domain); })
        .join("");
      var singleHtml = config.single
        .map(function(f) { return buildVideoCard(f, domain); })
        .join("");

      return '\n    <div class="streaming-section">\n      <h3 class="sub-section-title">Streaming Instruction Following</h3>\n      <p style="text-align:center;color:var(--text-muted);margin-bottom:1.5rem;max-width:680px;margin-left:auto;margin-right:auto">Long-horizon instruction sequences with mid-rollout command switches. Each chip represents a language instruction active during that segment.</p>\n      <div class="streaming-grid">' + streamHtml + '</div>\n    </div>\n    <div class="single-instruction-section">\n      <h3 class="sub-section-title">Single-Instruction Generation</h3>\n      <div class="video-grid">' + singleHtml + '</div>\n    </div>';
    }

    var tabBtns = document.querySelectorAll(".tab-btn");
    var videosSection = document.querySelector("#videos .container");

    var realPanel = document.createElement("div");
    realPanel.className = "tab-panel";
    realPanel.id = "tabpanel-real";
    realPanel.setAttribute("role", "tabpanel");
    realPanel.setAttribute("aria-labelledby", "tab-btn-real");

    var simPanel = document.createElement("div");
    simPanel.className = "tab-panel";
    simPanel.id = "tabpanel-sim";
    simPanel.setAttribute("role", "tabpanel");
    simPanel.setAttribute("aria-labelledby", "tab-btn-sim");
    simPanel.hidden = true;

    realPanel.innerHTML = renderTabPanel("real");
    simPanel.innerHTML = renderTabPanel("sim");

    var switcher = document.querySelector(".tab-switcher");
    switcher.insertAdjacentElement("afterend", realPanel);
    switcher.insertAdjacentElement("afterend", simPanel);

    var isCompactViewport = window.matchMedia("(max-width: 720px)").matches;
    var MAX_AUTOPLAYING_VIDEOS = isCompactViewport ? 4 : 8;
    var VIDEO_PRIME_TIME = 0.8;
    var AUTOPLAY_LEAD = isCompactViewport ? "520px 0px 520px 0px" : "900px 0px 900px 0px";
    var PRELOAD_LEAD = isCompactViewport ? "900px 0px 900px 0px" : "1400px 0px 1400px 0px";
    var visibleAutoplayVideos = new Set();
    var manuallyPausedVideos = new WeakSet();
    var autoplayUpdateId = 0;

    function getVideoCard(video) {
      return video.closest(".video-card, .streaming-card");
    }

    function setCardPlaying(video, isPlaying) {
      var card = getVideoCard(video);
      if (!card) return;
      card.classList.toggle("is-playing", isPlaying);
    }

    function setCardLoading(video, isLoading) {
      var card = getVideoCard(video);
      if (!card) return;
      card.classList.toggle("is-loading", isLoading);
    }

    function ensureVideoSource(video) {
      if (video.getAttribute("src") || !video.dataset.src) return;
      video.preload = "auto";
      video.setAttribute("preload", "auto");
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.playsInline = true;
      video.src = video.dataset.src;
      video.load();
    }

    function primeVideoFrame(video) {
      if (video.dataset.framePrimed === "true" || video.dataset.framePrimed === "pending") return;
      if (!Number.isFinite(video.duration) || video.duration <= 0.2) return;
      video.dataset.framePrimed = "pending";
      try {
        video.currentTime = Math.min(VIDEO_PRIME_TIME, Math.max(video.duration - 0.05, 0));
      } catch (err) {
        video.dataset.framePrimed = "true";
      }
    }

    function preparePanelVideos(panel) {
      if (!panel || panel.hidden) return;
      panel.querySelectorAll(".gallery-video").forEach(function(video) {
        ensureVideoSource(video);
      });
    }

    function pauseVideo(video) {
      if (!video.paused) {
        video.pause();
      }
      setCardPlaying(video, false);
      setCardLoading(video, false);
    }

    function playVideo(video, options) {
      options = options || {};
      if (!video || video.closest("[hidden]")) return;
      if (!options.manual && manuallyPausedVideos.has(video)) return;

      ensureVideoSource(video);
      if (video.dataset.framePrimed !== "true") {
        video.dataset.pendingPlay = options.manual ? "manual" : "auto";
        if (video.readyState >= 1) {
          primeVideoFrame(video);
        }
        setCardLoading(video, true);
        return;
      }

      if (video.readyState < 2) {
        setCardLoading(video, true);
      }

      video.play().then(function() {
        setCardLoading(video, false);
        setCardPlaying(video, true);
      }).catch(function() {
        setCardLoading(video, false);
        setCardPlaying(video, false);
      });
    }

    function scheduleAutoplayUpdate() {
      if (autoplayUpdateId) return;
      autoplayUpdateId = window.requestAnimationFrame(updateAutoplay);
    }

    function updateAutoplay() {
      autoplayUpdateId = 0;

      if (document.hidden) {
        document.querySelectorAll(".gallery-video").forEach(function(video) {
          pauseVideo(video);
        });
        return;
      }

      var viewportCenter = (window.innerHeight || document.documentElement.clientHeight) / 2;
      var candidates = Array.from(visibleAutoplayVideos)
        .filter(function(video) {
          return !video.closest("[hidden]") && !manuallyPausedVideos.has(video);
        })
        .sort(function(a, b) {
          var aRect = a.getBoundingClientRect();
          var bRect = b.getBoundingClientRect();
          var aCenter = aRect.top + aRect.height / 2;
          var bCenter = bRect.top + bRect.height / 2;
          return Math.abs(aCenter - viewportCenter) - Math.abs(bCenter - viewportCenter);
        });

      candidates.forEach(function(video, index) {
        if (index < MAX_AUTOPLAYING_VIDEOS) {
          playVideo(video);
        } else {
          pauseVideo(video);
        }
      });
    }

    var autoplayObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          var video = entry.target;
          if (entry.isIntersecting) {
            ensureVideoSource(video);
            visibleAutoplayVideos.add(video);
          } else {
            visibleAutoplayVideos.delete(video);
            pauseVideo(video);
          }
        });
        scheduleAutoplayUpdate();
      },
      { threshold: 0.01, rootMargin: AUTOPLAY_LEAD }
    );

    var preloadObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            ensureVideoSource(entry.target);
            preloadObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: PRELOAD_LEAD }
    );

    document.querySelectorAll(".gallery-video").forEach(function(video) {
      video.addEventListener("loadedmetadata", function() {
        primeVideoFrame(video);
      });
      video.addEventListener("seeked", function() {
        if (video.dataset.framePrimed === "pending") {
          video.dataset.framePrimed = "true";
        }
        setCardLoading(video, false);

        if (video.dataset.pendingPlay) {
          var wasManual = video.dataset.pendingPlay === "manual";
          delete video.dataset.pendingPlay;
          playVideo(video, { manual: wasManual });
        } else {
          scheduleAutoplayUpdate();
        }
      });
      video.addEventListener("loadeddata", function() {
        setCardLoading(video, false);
      });
      preloadObserver.observe(video);
      autoplayObserver.observe(video);
    });

    document.addEventListener("visibilitychange", scheduleAutoplayUpdate);
    window.addEventListener("resize", scheduleAutoplayUpdate);
    preparePanelVideos(realPanel);
    scheduleAutoplayUpdate();

    // Tab switching
    tabBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        var tab = btn.dataset.tab;
        tabBtns.forEach(function(b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        // Pause all videos when switching tabs
        document.querySelectorAll(".gallery-video").forEach(function(v) {
          pauseVideo(v);
        });

        document.querySelectorAll(".tab-panel").forEach(function(p) {
          p.hidden = p.id !== "tabpanel-" + tab;
        });
        preparePanelVideos(document.querySelector("#tabpanel-" + tab));
        scheduleAutoplayUpdate();
      });
    });

    // Click-to-play on cards
    var tabPanelContainer = videosSection.parentNode.querySelector(".tab-switcher");
    (tabPanelContainer.closest(".section")).addEventListener("click", function(e) {
      var card = e.target.closest(".video-card, .streaming-card");
      if (!card) return;

      var player = card.querySelector(".video-card__player, .streaming-player");
      if (!player) return;

      var video = player.querySelector(".gallery-video");
      if (!video || !video.dataset.src) return;

      // Don't intercept clicks on the play button itself
      if (video.paused || video.ended) {
        manuallyPausedVideos.delete(video);
        playVideo(video, { manual: true });
      } else {
        manuallyPausedVideos.add(video);
        pauseVideo(video);
      }
    });

    // Reveal observer for injected elements
    var videoObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            videoObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    (tabPanelContainer.closest(".section")).querySelectorAll(".reveal:not(.is-visible)").forEach(function(el) {
      videoObserver.observe(el);
    });
  }
});
