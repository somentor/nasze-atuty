(function () {
  "use strict";


  /* =========================================================
     START
     ========================================================= */

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }


  ready(function () {
    var root = document.querySelector("[data-ms-advantages]");

    if (!root || root.dataset.msAdvantagesReady === "1") {
      return;
    }

    root.dataset.msAdvantagesReady = "1";

    document.body.classList.add("ms-advantages-page");
    document.documentElement.classList.add(
      "ms-advantages-page-html"
    );

    initProductGalleryLightbox(root);
    init360Previews(root);
    initTechModal(root);
    initFaq(root);
  });

  /* =========================================================
     SEKCJA 2 — LIGHTBOX
     ZDJĘCIE / KEYSHOT XR
     ========================================================= */

  function initProductGalleryLightbox(root) {
    var lightbox = root.querySelector(
      "[data-ms-lightbox]"
    );

    var lightboxImg = root.querySelector(
      "[data-ms-lightbox-img]"
    );

    var keyshotHeader = root.querySelector(
      "[data-ms-lightbox-keyshot-header]"
    );

    var keyshotContainer = root.querySelector(
      "[data-ms-lightbox-keyshot]"
    );

    var closeButton = root.querySelector(
      "[data-ms-lightbox-close]"
    );

    var detailsViewer = root.querySelector(
      "[data-ms-details-viewer]"
    );

    var detailsStage = root.querySelector(
      "[data-ms-details-stage]"
    );

    var detailsMain = root.querySelector(
      "[data-ms-details-main]"
    );

    var detailsHotspots = root.querySelector(
      "[data-ms-details-hotspots]"
    );

    var detailsZoom = root.querySelector(
      "[data-ms-details-zoom]"
    );

    var detailsZoomImg = root.querySelector(
      "[data-ms-details-zoom-img]"
    );

    var detailsInfo = root.querySelector(
      "[data-ms-details-info]"
    );

    var detailsInfoTitle = root.querySelector(
      "[data-ms-details-info-title]"
    );

    var detailsInfoItems = root.querySelector(
      "[data-ms-details-info-items]"
    );

    var detailsProductTitle = root.querySelector(
      "[data-ms-details-product-title]"
    );

    var detailsProductSubtitle = root.querySelector(
      "[data-ms-details-product-subtitle]"
    );

    var detailsFeatures = root.querySelector(
      "[data-ms-details-features]"
    );

    var detailsFooterTitle = root.querySelector(
      "[data-ms-details-footer-title]"
    );

    var detailsFooterText = root.querySelector(
      "[data-ms-details-footer-text]"
    );

    var detailsQualityText = root.querySelector(
      "[data-ms-details-quality-text]"
    );

    var galleryButtons = Array.prototype.slice.call(
      root.querySelectorAll("[data-ms-gallery]")
    );


    if (
      !lightbox ||
      !lightboxImg ||
      !keyshotContainer ||
      !closeButton ||
      !galleryButtons.length
    ) {
      return;
    }


    var lastFocus = null;

    var activeDetailHotspot = null;


    /*
      =========================================================
      KONFIGURACJA HOTSPOTÓW
      =========================================================

      x = pozycja od lewej w %
      y = pozycja od góry w %

      image = zdjęcie, które pokaże się w dużym okręgu
    */

    var DETAILS_CONFIG = {

      drewno: [

        {
          x: 25,
          y: 36,
          image: "src/detale/drewno/slup-mocowanie.png",
          alt: "Detale mocowania",
          // title: "Detale mocowania",
          texts: [
            "Poprzeczka precyzyjnie osadzona w słupie na wpust",
            "Brak widocznych elementów montażowych",
            "Bezpiecznie schowane krawędzie tablicy"
          ]
        },
        {
          x: 55,
          y: 33,
          image: "src/detale/drewno/tabliczki.png",
          alt: "Detale tabliczek",
          texts: [
            "Tuleje dystansowe zapewniają równe i precyzyjne odstępy pomiędzy elementami obrotowymi wymagane normą",
            "Obracane tabliczki zamontowane w sposób uniemożliwiający przypadkowe skaleczenie lub zakleszczenie",
            "Dyskretny i estetyczny sposób montażu bez widocznych elementów mocujących"
          ]
        },
        {
          x: 40,
          y: 51,
          image: "src/detale/drewno/blat.png",
          alt: "Detale blatu ławostołu",
          texts: [
            "Edukacyjny blat ławostołu wkomponowany w drewnianą ramę wraz z zawiniętym fartuchem - podniesiony próg bezpieczeństwa",
            "Druk bezpośrednio w nośnik - litą blachę aluminiową - uniemożliwia usunięcie grafiki jak naklejki",
            "Powierzchnia stołu dodatkowo zabezpieczona lakierem ogniotrwałym dającym efekt tafli szkła"
          ]
        },
        {
          x: 64,
          y: 55,
          image: "src/detale/drewno/naroznik.png",
          alt: "Detale narożnika ławostołu",
          texts: [
            "Starannie zaoblone krawędzie zwiększają bezpieczeństwo użytkowania",
            "Precyzyjnie spasowane połączenia drewnianych elementów"
          ]
        },
        {
          x: 60,
          y: 68,
          image: "src/detale/drewno/siedzisko.png",
          alt: "Detale siedziska",
          texts: [
            "Starannie zaoblone narożniki eliminują ostre krawędzie",
            "Masywne drewniane siedzisko zapewnia trwałość i stabilność konstrukcji",
            "Dokładnie wyprofilowane zakończenia desek siedzisk gwarantują wysokie bezpieczeństwo",
            "Gładko wykończona powierzchnia podkreśla staranność wykonania i pozwala na wyeliminowanie skaleczeń"
          ]
        }

      ],
      
      alu: [
        {
          x: 14,
          y: 43,
          image: "src/detale/alu/labirynt.png",
          alt: "Detale labiryntu",
          texts: [
            "Precyzyjnie wykonane prowadnice zapewniają płynny ruch elementów interaktywnych",
            "Monolityczne kółka bez widocznych łączeń i elementów montażowych",
            "Kółka wykonane z materiałów o dużej odporności na ścieranie"
          ]
        },
        {
          x: 33,
          y: 35,
          image: "src/detale/alu/tabliczki.png",
          alt: "Detale tabliczek",
          texts: [
            "Tuleje dystansowe zapewniają równe i precyzyjne odstępy pomiędzy elementami obrotowymi wymagane normą",
            "Tabliczki obrotowe bezpiecznie osadzone w profilowanej, estetycznej ramie",
            "Zaoblone profile aluminiowe malowane proszkowo eliminują ostre i wystające krawędzie"
          ]
        },
        {
          x: 53,
          y: 36,
          image: "src/detale/alu/katowniki.png",
          alt: "Detale kątowników",
          texts: [
            "Mocowania zlicowane z powierzchnią konstrukcji",
            "Profile ramowe zabezpieczają krawędzie tablicy",
            "Dokładnie spasowane połączenia profili"
          ]
        },
        {
          x: 49,
          y: 50,
          image: "src/detale/alu/blat.png",
          alt: "Detale blatu",
          texts: [
            "Precyzyjnie osadzony blat w ramę ławostołu, tworzący stabilną konstrukcję",
            "Czterostronnie zagięte krawędzie blatu wpuszczone w profilowaną ramę stołu",
            "Druk bezpośrednio w nośnik - litą blachę aluminiową - uniemożliwia usunięcie grafiki jak naklejki",
          ]
        },
        {
          x: 84,
          y: 46,
          image: "src/detale/alu/totem.png",
          alt: "Detale Totemu",
          texts: [
            "Idealnie spasowane połączenia profili",
            "Estetyczne zaślepki dyskretnie maskujące elementy montażowe",
            "Równe łączenia podkreślają dokładność wykonania"
          ]
        },
        {
          x: 89,
          y: 58,
          image: "src/detale/alu/drzwiczki.png",
          alt: "Detale drzwi Totem",
          texts: [
            "Estetycznie zamontowany mechanizm zamykający",
            "Zadrukowane ścianki osadzone bez widocznych elementów montażowych",
            "Równe szczeliny świadczą o dokładnym spasowaniu elementów"
          ]
        }
      ]
    };
    var DETAILS_PRODUCT = {

  alu: {
    title: "Konstrukcje aluminiowe PREMIUM",
    subtitle: "Nasze konstrukcje aluminiowe łączą precyzję wykonania, trwałość, bezpieczeństwo i nowoczesne technologie.",
    qualityText: "",

    features: [
      {
        icon: "src/ikony/malowanie_proszkowe.webp",
        title: "Malowanie proszkowe",
        text: "Wszystkie konstrukcje aluminiowe są malowane proszkowo w kolorze RAL 7012 (standard) - inne kolory za dopłatą."
      },

      {
        icon: "src/ikony/odpornosc_atmosferyczna.webp",
        title: "Odporność w plenerze",
        text: "Konstrukcje są odporne na działania zmiennych warunków atmosferycznych."
      },

      {
        icon: "src/ikony/odpornosc_mechaniczna.webp",
        title: "Odporność mechaniczna",
        text: "Odporność powierzchni graficznych na zarysowania i codzienne użytkowanie."
      },

      {
        icon: "src/ikony/bezpieczne_w_dotyku_oble.webp",
        title: "Bezpieczne krawędzie",
        text: "Obłe krawędzie zapewniające bezpieczeństwo użytkowania."
      },
      
      {
        icon: "src/ikony/odpornosc_na_ogien.webp",
        title: "Odporność na ogień",
        text: "Stosujemy technologie w zakresie niepalności nadruków graficznych."
      },

      {
        icon: "src/ikony/gwarancja.webp",
        title: "Do 5 lat gwarancji",
        text: "Gwarancja producenta zapewnia wysoką jakość i trwałość naszych urządzeń."
      },

      {
        icon: "src/ikony/norma_pca.webp",
        title: "Normy i certyfikacja",
        text: "Wykonujemy konstrukcje, które posiadają certyfikat zgodności z normą PN-EN 1176-1+A1:2024-03, wydany przez niezależną jednostkę certyfikującą, akredytowaną przez Polskie Centrum Akredytacji (PCA)."
      }

    ],
    footerTitle: "",
    footerText: ""

  },

  drewno: {

    title: "Drewniane konstrukcje Mentor",
    subtitle: "Nasze konstrukcje łączą w sobie naturalne piękno drewna, nowoczesne technologie i najwyższe standardy jakości.",
    qualityText: "",

    features: [
      {
        icon: "src/ikony/drewno_certyfikat.webp",
        title: "Drewno z certyfikatem",
        text: "Elementy wykonane z wysokiej jakości drewna pochodzącego z certyfikowanych, odpowiedzialnie zarzadzanych źródeł - FSC® lub PEFC."
      },

      {
        icon: "src/ikony/odpornosc_atmosferyczna.webp",
        title: "Zabezpieczenie powierzchni",
        text: "Ochrona drewna przed zmiennymi warunkami atmosferycznymi - solidna impregnacja zewnętrzna lub ciśnieniowa."
      },

      {
        icon: "src/ikony/bezpieczne_w_dotyku_oble.webp",
        title: "Bezpieczne krawędzie",
        text: "Obłe krawędzie zapewniające bezpieczeństwo użytkowania."
      },

      {
        icon: "src/ikony/odpornosc_mechaniczna.webp",
        title: "Odporność mechaniczna",
        text: "Odporność powierzchni graficznych na zarysowania i codzienne użytkowanie."
      },

      {
        icon: "src/ikony/gwarancja.webp",
        title: "Do 5 lat gwarancji",
        text: "Gwarancja producenta zapewnia wysoką jakość i trwałość naszych urządzeń."
      },

      {
        icon: "src/ikony/norma_pca.webp",
        title: "Normy i certyfikacja",
        text: "Wykonujemy konstrukcje, które posiadają certyfikat zgodności z normą PN-EN 1176-1+A1:2024-03, wydany przez niezależną jednostkę certyfikującą, akredytowaną przez Polskie Centrum Akredytacji (PCA)."
      }


    ],

    footerTitle: "",
    footerText: ""

  }

};

    var previousHtmlOverflow = "";
    var previousBodyOverflow = "";

    function lockScroll() {
      previousHtmlOverflow = document.documentElement.style.overflow;

      previousBodyOverflow = document.body.style.overflow;

      document.documentElement.classList.add("ms-adv-lightbox-open");

      document.body.classList.add("ms-adv-lightbox-open");

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function unlockScroll() {
      document.documentElement.classList.remove("ms-adv-lightbox-open");

      document.body.classList.remove("ms-adv-lightbox-open");

      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    }

    /* =======================================================
      ZWYKŁE ZDJĘCIE
      ======================================================= */

    function showImage(button) {
      var image = button.querySelector("img");

      if (!image) return;

      if (keyshotHeader) {
        keyshotHeader.hidden = true;
      }

      /* Usuwamy ewentualny KeyShot. */
      keyshotContainer.innerHTML = "";
      keyshotContainer.hidden = true;


      /* Pokazujemy zdjęcie. */
      lightboxImg.src = image.currentSrc || image.src;
      lightboxImg.alt = image.alt || "Powiększone zdjęcie produktu";
      lightboxImg.hidden = false;
    }

    function hideDetailsZoom() {
      if (!detailsZoom || !detailsZoomImg) {
        return;
      }

      detailsZoom.classList.remove("is-active");

      detailsZoom.setAttribute("aria-hidden", "true");

      detailsZoomImg.src = "";
      detailsZoomImg.alt = "";

      if (activeDetailHotspot) {
        activeDetailHotspot.classList.remove("is-active");
        activeDetailHotspot = null;
      }

      if (detailsInfo) {
        detailsInfo.classList.remove("is-active");
        detailsInfo.setAttribute("aria-hidden", "true");
      }

      if (detailsInfoTitle) {
        detailsInfoTitle.textContent = "";
      }

      if (detailsInfoItems) {
        detailsInfoItems.innerHTML = "";
      }
    }
    if (detailsStage) {
      detailsStage.addEventListener("click", function (event) {
      /* Nie zamykamy, jeśli kliknięto hotspot */
      if (event.target.closest(".ms-adv-details__hotspot")) {
        return;
      }

      /* Kliknięcie poza hotspotemzamyka detal */
      hideDetailsZoom();
    });

    window.addEventListener("resize", function () {
      if (detailsViewer &&!detailsViewer.hidden) {
        requestAnimationFrame(syncDetailsHotspots);
      }
    }

    );
  }

//////////////////////////////////////////////////////
  function showDetailsZoom(point, hotspot) {

    if (!detailsZoom || !detailsZoomImg) {
      return;
    }

    /* Usuwamy aktywność ze starego punktu */
    if (activeDetailHotspot) {
      activeDetailHotspot.classList.remove("is-active");
    }

    activeDetailHotspot = hotspot;
    hotspot.classList.add("is-active");

    /* Ustawiamy zdjęcie zbliżenia */
    detailsZoomImg.src = point.image;
    detailsZoomImg.alt = point.alt || "Powiększony detal";

    /* Dodajemy tekt obok zbliżenia */
    if (detailsInfo && detailsInfoTitle && detailsInfoItems) {
      detailsInfoTitle.textContent = point.title || "";

      detailsInfoItems.innerHTML = "";

      var texts = point.texts || [];

      texts.forEach(function (text) {
        var item = document.createElement("div");

        item.className = "ms-adv-details__infoItem";
        item.textContent = text;
        detailsInfoItems.appendChild(item);
      });

      detailsInfo.classList.add("is-active");
      detailsInfo.setAttribute("aria-hidden","false");
    }

    /* Pokazujemy okrąg */
    detailsZoom.classList.add("is-active");
    detailsZoom.setAttribute("aria-hidden","false");

  }

function createDetailHotspot(point, index) {

  var hotspot = document.createElement("button");

  hotspot.type = "button";
  hotspot.className = "ms-adv-details__hotspot";

  /* pozycja hotspotu */
  hotspot.style.left = point.x + "%";
  hotspot.style.top = point.y + "%";

  hotspot.setAttribute("aria-label", point.alt || ("Pokaż detal " + (index + 1)));

  /* Sprawdzamy, czy urządzenie faktycznie obsługuje hover myszką.*/
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* =============================
     DESKTOP / MYSZ
     ============================= */

  if (canHover) {
    hotspot.addEventListener("mouseenter", function () {
      showDetailsZoom(point,hotspot);
    });

    hotspot.addEventListener("mouseleave", function () {
      hideDetailsZoom();
    });

  }


  /* =============================
     KLIK / TELEFON / TABLET
     ============================= */

  hotspot.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    /* Telefon / tablet: kliknięcie otwiera detal. */
    if (!canHover) {
      /* Jeśli klikamy drugi raz w TEN SAM aktywny punkt, zamykamy detal */

      if (activeDetailHotspot === hotspot && detailsZoom.classList.contains("is-active")) {
        hideDetailsZoom();

        return;
      }

      /* Pierwsze kliknięcie lub inny hotspot */
      showDetailsZoom(point, hotspot);

      return;
    }

    /* Desktop: click nie jest potrzebny, bo mamy hover. Zostawiamy jednak możliwość kliknięcia dla dostępności */
    showDetailsZoom(point, hotspot);

  });

  return hotspot;

}

    function renderDetailsProduct(detailsKey) {

      var product = DETAILS_PRODUCT[detailsKey];

      if (!product) {
        return;
      }

      /* wariant kolorystyczny modala */
      if (detailsViewer) {
        detailsViewer.classList.toggle("is-wood", detailsKey === "drewno");

        detailsViewer.classList.toggle("is-alu", detailsKey === "alu");
      }


      /* nagłówek */
      if (detailsProductTitle) {
        detailsProductTitle.textContent = product.title || "";
      }

      if (detailsProductSubtitle) {
        detailsProductSubtitle.textContent = product.subtitle || "";
      }

      /* ikonki */
      if (detailsFeatures) {

        detailsFeatures.innerHTML = "";

        var features = product.features || [];

        features.forEach(function (feature) {

          var item = document.createElement("div");
          item.className = "ms-adv-details__feature";

          var icon = document.createElement("div");
          icon.className = "ms-adv-details__featureIcon";

          var img = document.createElement("img");
          img.src = feature.icon;
          img.alt = "";

          icon.appendChild(img);

          var content = document.createElement("div");
          content.className = "ms-adv-details__featureContent";

          var title = document.createElement("strong");
          title.textContent = feature.title || "";

          var text = document.createElement("p");
          text.textContent = feature.text || "";

          content.appendChild(title);
          content.appendChild(text);

          item.appendChild(icon);
          item.appendChild(content);

          detailsFeatures.appendChild(item);
        });

      }

      /* komunikat jakościowy */
      if (detailsQualityText) {
        detailsQualityText.innerHTML = product.qualityText || "";
      }

      /* dolny panel */
      if (detailsFooterTitle) {
        detailsFooterTitle.textContent = product.footerTitle || "";
      }

      if (detailsFooterText) {
        detailsFooterText.textContent = product.footerText || "";
      }

    }

    function syncDetailsHotspots() {
      if (
        !detailsStage ||
        !detailsMain ||
        !detailsHotspots ||
        !detailsMain.naturalWidth ||
        !detailsMain.naturalHeight
      ) {
        return;
      }

      /* Rozmiar ELEMENTU img */
      var imageRect = detailsMain.getBoundingClientRect();
      var stageRect = detailsStage.getBoundingClientRect();

      /* Naturalne proporcje zdjęcia */
      var naturalWidth = detailsMain.naturalWidth;
      var naturalHeight = detailsMain.naturalHeight;

      /* Przy object-fit: contain zdjęcie mieści się w elemencie bez obcinania. Wyliczamy jego FAKTYCZNY rozmiar */
      var scale = Math.min(imageRect.width / naturalWidth, imageRect.height / naturalHeight);

      var renderedWidth = naturalWidth * scale;
      var renderedHeight = naturalHeight * scale;

      /* object-position: center center więc wolne miejsce dzielimy po połowie */
      var offsetX = (imageRect.width - renderedWidth) / 2;
      var offsetY = (imageRect.height - renderedHeight) / 2;

      /* Pozycja obrazu względem STAGE */
      var left = imageRect.left - stageRect.left + offsetX;
      var top = imageRect.top - stageRect.top + offsetY;

      /* Warstwa hotspotów ma teraz dokładnie wielkość widocznego zdjęcia */
      detailsHotspots.style.left = left + "px";
      detailsHotspots.style.top = top + "px";
      detailsHotspots.style.width = renderedWidth + "px";
      detailsHotspots.style.height = renderedHeight + "px";
    }

    if (typeof ResizeObserver !== "undefined" && detailsStage) {
      var detailsResizeObserver = new ResizeObserver(function () {
        if (detailsViewer && !detailsViewer.hidden) {
          requestAnimationFrame(syncDetailsHotspots);
        }
      });

      detailsResizeObserver.observe(detailsStage);
    }

    function showDetails(button) {
      var image = button.querySelector("img");

      var detailsKey = button.getAttribute("data-ms-details");

      renderDetailsProduct(detailsKey);

      /* VIDEO ALUMINIUM */
      var aluVideo = root.querySelector(".ms-adv-details__video--alu iframe");

      if (aluVideo) {
        if (detailsKey === "alu" && aluVideo.dataset.src) {
          aluVideo.src = aluVideo.dataset.src;
        } else {
          aluVideo.src = "about:blank";
        }
      }

      /* zdjęcie główne modala */
      var detailsImage = button.getAttribute("data-ms-details-image");
      var points = DETAILS_CONFIG[detailsKey] || [];

      if (
        !image ||
        !detailsViewer ||
        !detailsMain ||
        !detailsHotspots
      ) {

        showImage(button);

        return;
      }

      /* chowamy KeyShot */
      if (keyshotHeader) {
        keyshotHeader.hidden = true;
      }

      keyshotContainer.innerHTML = "";
      keyshotContainer.hidden = true;

      /* chowamy zwykłe zdjęcie lightboxa */
      lightboxImg.hidden = true;
      lightboxImg.src = "";
      lightboxImg.alt = "";


      /* =====================================================
        NAJPIERW POKAZUJEMY VIEWER
        ===================================================== */
      detailsViewer.hidden = false;

      /* =====================================================
        GENERUJEMY HOTSPOTY
        ===================================================== */
      detailsHotspots.innerHTML = "";

      points.forEach(function (point, index) {
        detailsHotspots.appendChild(createDetailHotspot(point,index));
      });

      /* =====================================================
        USTAWIAMY ZDJĘCIE
        ===================================================== */

      detailsMain.src = detailsImage || image.currentSrc || image.src;
      detailsMain.alt = image.alt || "Zdjęcie produktu";

      /* =====================================================
        DOPIERO TERAZ LICZYMY POZYCJE

        requestAnimationFrame daje przeglądarce
        czas na przeliczenie layoutu.
        ===================================================== */

      function updateHotspotsAfterLayout() {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            syncDetailsHotspots();
          });
        });
      }

      if (detailsMain.complete && detailsMain.naturalWidth) {
        updateHotspotsAfterLayout();
      } 
      else {
        detailsMain.addEventListener("load", updateHotspotsAfterLayout, { once: true });
      }

    }

    /* =======================================================
       KEYSHOT XR
       ======================================================= */

    function showKeyshot(url) {
      if (keyshotHeader) {
        keyshotHeader.hidden = false;
      }

      /* Ukrywamy zdjęcie */
      lightboxImg.hidden = true;
      lightboxImg.src = "";
      lightboxImg.alt = "";

      /* Tworzymy iframe KeyShotXR */
      keyshotContainer.innerHTML = "";
      keyshotContainer.hidden = false;

      var iframe = document.createElement("iframe");

      iframe.src = url;
      iframe.title = "Wizualizacja 3D produktu";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("scrolling", "no");

      keyshotContainer.appendChild(iframe);

    }

    function openLightbox(button) {

      lastFocus = button;

      var keyshotUrl = button.getAttribute("data-keyshot-url");
      var hasDetails = button.hasAttribute("data-ms-details");

      /* 1. Detale */
      if (hasDetails) {
        showDetails(button);
      }

      /* 2. KeyShot */
      else if (keyshotUrl) {
        showKeyshot(keyshotUrl);
      }

      /* 3. Zwykłe zdjęcie */
      else {
        showImage(button);
      }

      lightbox.hidden = false;

      lockScroll();

      closeButton.focus({preventScroll: true});
    }


    /* =======================================================
       ZAMYKANIE
       ======================================================= */

    function closeLightbox() {
      if (lightbox.hidden) {
        return;
      }

      lightbox.hidden = true;

      /* ZATRZYMANIE VIDEO */
      var aluVideo = root.querySelector(".ms-adv-details__video--alu iframe");

      if (aluVideo) {aluVideo.src = "about:blank";}

      /* Usunięcie KeyShotXR */
      keyshotContainer.innerHTML = "";
      keyshotContainer.hidden = true;

      /* Wyczyszczenie zdjęcia */
      lightboxImg.src = "";
      lightboxImg.alt = "";
      lightboxImg.hidden = true;

      /* Czyścimy tryb detali*/
      hideDetailsZoom();

      if (detailsViewer) {
        detailsViewer.hidden = true;
      }

      if (detailsMain) {
        detailsMain.src = "";
        detailsMain.alt = "";
      }

      if (detailsHotspots) {
        detailsHotspots.innerHTML = "";
      }

      /* Ukrywamy nagłówek 3D */
      if (keyshotHeader) {
        keyshotHeader.hidden = true;
      }

      unlockScroll();

      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus({preventScroll: true});
      }

      lastFocus = null;
    }


    /* =======================================================
       ZDARZENIA
       ======================================================= */

    galleryButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
          event.preventDefault();
          openLightbox(button);
        }
      );
    });

    closeButton.addEventListener("click", closeLightbox);

    /* ESC */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !lightbox.hidden) {
          closeLightbox();
        }
      }
    );

    /* Kliknięcie bezpośrednio w ciemne tło modala */
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      }
    );
  }

  /* =========================================================
   SEKCJA 4 — TECHNOLOGIE / MODAL
   ========================================================= */

function initTechModal(root) {

  var cards = Array.prototype.slice.call(
    root.querySelectorAll("[data-ms-tech-card]")
  );

  var modal = root.querySelector("[data-ms-tech-modal]");
  var modalImage = root.querySelector("[data-ms-tech-modal-image]");
  var modalTitle = root.querySelector("[data-ms-tech-modal-title]");
  var modalLabel = root.querySelector("[data-ms-tech-modal-label]");
  var modalColumns = root.querySelector("[data-ms-tech-modal-columns]");
  var closeButtons = root.querySelectorAll("[data-ms-tech-close]");

  if (
    !cards.length ||
    !modal ||
    !modalImage ||
    !modalTitle ||
    !modalColumns
  ) {
    return;
  }

  /*
   * Tutaj edytujesz całą zawartość modali.
   *
   * columns:
   * - 1 element = jedna kolumna
   * - 2 elementy = dwie kolumny
   * - 3 elementy = trzy kolumny
   */

  var TECH_DETAILS = {

    "druk-uv": {
      title: "Druk UV",
      image: "src/technologie/druk-uv.webp",
      imageAlt: "Technologia druku UV",

      columns: [
        {
          title: "Lita blacha aluminiowa",
          subtitle: "⭐⭐⭐⭐⭐",
          text: "Materiał klasy <strong>premium</strong>, zapewniający wyjątkową precyzję nadruku, niezwykłą sztywność, stabilność wymiarową i bardzo dużą trwałość. Możliwość zabezpieczenia tej blachy lakierem ogniotrwałym bardzo podnosi jej walory użytkowe."
        },
        {
          title: "Dibond",
          subtitle: "⭐⭐⭐⭐",
          text: "Wysokiej jakości płyta kompozytowa przeznaczona do zadruku jedno- i dwustronnego. Gładka, sztywna i stabilna powierzchnia pozwala uzyskać wysoką jakość odwzorowania grafiki i bardzo dobrą czytelność nadruku."
        },
        {
          title: "PCV",
          subtitle: "⭐⭐⭐",
          text: "Lekka, uniwersalna płyta zapewniająca dobrą jakość nadruku i estetyczny wygląd. Sprawdza się także na zewnątrz, jednak przy długotrwałej ekspozycji na zmienne warunki atmosferyczne jest mniej trwała niż DIBOND."
        }
      ]
    },


    "lakier-uv": {
      title: "Lakier UV",
      image: "src/technologie/lakier-uv.webp",
      imageAlt: "Zabezpieczenie powierzchni lakierem UV",

      columns: [
        {
          title: "Lakier UV",
          text: "Dodatkowa, bezbarwna warstwa ochronna nanoszona bezpośrednio w procesie druku i utwardzana UV. Zwiększa odporność powierzchni graficznej na ścieranie, drobne uszkodzenia mechaniczne, zabrudzenia oraz działanie czynników zewnętrznych. Lakier tworzy <strong>trwałą, jednolitą powłokę bez dodatkowej warstwy folii</strong>, dzięki czemu zachowana zostaje wysoka jakość, ostrość i estetyka grafiki. Proces nanoszenia i utwardzania odbywa się bezpośrednio z maszyny drukującej, co zapewnia bardzo dobrą przyczepność powłoki do zadrukowanej powierzchni."
        }
      ]
    },


    "laminat": {
      title: "Laminat",
      image: "src/technologie/laminat.webp",
      imageAlt: "Laminowanie powierzchni",

      columns: [
        {
          title: "Laminat",
          text: "<p>Ta dodatkowa, foliowa warstwa ochronna <strong>zwiększa odporność powierzchni graficznej na drobne uszkodzenia i zabrudzenia, w tym ślady po flamastrach, farbach w sprayu.</strong> Jest powłoką przeźroczystą, zmywalną, ale tylko dedykowanymi środkami i przy uwzględnieniu krótkotrwałej eksploatacji w warunkach zewnętrznych.</p><p>Laminat występuje w wersji mat lub połysk – w zależności od preferencji Klienta.</p><p>Nie ma zasadniczego wpływu na trwałość powierzchni graficznych. </p>"
        }
      ]
    },


    "niepalnosc-pca": {
      title: "Niepalność PCA",
      image: "src/technologie/niepalnosc-pca.webp",
      imageAlt: "Technologia niepalna i certyfikacja PCA",

      columns: [
        {
          title: "Niepalność PCA - innowacyjne technologie",
          text: "<p>W najbardziej wymagających realizacjach stosujemy <strong>specjalistyczne systemy zabezpieczania powierzchni graficznych.</strong> Technologia ta pozwala uzyskać trwałą, stabilną i <strong>niezwykle odporną</strong> powierzchnię przeznaczoną do intensywnej oraz długotrwałej eksploatacji.</p><p>Potwierdzeniem jakości naszych rozwiązań jest możliwość stosowania systemów zabezpieczenia powierzchni graficznych w <strong>klasie reakcji na ogień A2-s1,d0.</strong> Parametr ten jest potwierdzany niezależnymi badaniami i odpowiednią dokumentacją opracowaną przez kompetentne podmioty, posiadające <strong>akredytację PCA</strong> - Polskiego Centrum Akredytacji.</p>"
        }
      ]
    },


    "drewno-cnc": {
      title: "Drewno i CNC",
      image: "src/technologie/drewno-cnc.webp",
      imageAlt: "Obróbka drewna CNC",

      columns: [
        {
          title: "Iglaste",
          text: "Opis"
        },
        {
          title: "Liściaste",
          text: "Opis"
        },
        {
          title: "KVH",
          text: "Opis"
        }
      ]
    },


    "malowanie-proszkowe": {
      title: "Malowanie proszkowe",
      image: "src/technologie/malowanie-proszkowe.webp",
      imageAlt: "Malowanie proszkowe aluminium",

      columns: [
        {
          title: "Aluminium malowane proszkowo",
          text: "opis"
        }
      ]
    }

  };


  var lastFocus = null;

  function syncTechColumnTitles() {
    var titles = modalColumns.querySelectorAll(".ms-adv-techModal__columnTitle");

    if (!titles.length) {
      return;
    }

    /* Najpierw kasujemy poprzednie wartości, żeby poprawnie przeliczyć wysokość.*/
    Array.prototype.forEach.call(titles, function (title) {
      title.style.minHeight = "";
    });

    /* Na telefonie kolumny są jedna pod drugą, więc wyrównanie nie jest potrzebne */
    if (window.innerWidth <= 700) {
      return;
    }

    var maxHeight = 0;

    Array.prototype.forEach.call(titles, function (title) {
      maxHeight = Math.max(maxHeight, title.offsetHeight);
    });

    Array.prototype.forEach.call(titles, function (title) {
      title.style.minHeight = maxHeight + "px";
    });
  }

  function renderModal(key) {

    var data = TECH_DETAILS[key];

    if (!data) {
      return false;
    }

    modalImage.src = data.image || "";
    modalImage.alt = data.imageAlt || data.title || "";

    modalTitle.textContent = data.title || "";

    if (modalLabel) {
      modalLabel.textContent = data.label || "";
    }

    modalColumns.innerHTML = "";

    var columns = data.columns || [];

    /* Liczba kolumn ustalana automatycznie */
    modalColumns.style.setProperty("--tech-columns", Math.max(1, Math.min(columns.length, 3)));

    columns.forEach(function (column) {
      var item = document.createElement("div");
      item.className = "ms-adv-techModal__column";

      /* TYTUŁ */
      if (column.title) {
        var title = document.createElement("strong");
        title.className = "ms-adv-techModal__columnTitle";
        title.textContent = column.title;
        item.appendChild(title);
      }

      /* OPCJONALNY PODTYTUŁ — np. gwiazdki */
      if (column.subtitle) {
        var subtitle = document.createElement("span");
        subtitle.className = "ms-adv-techModal__columnSubtitle";
        subtitle.textContent = column.subtitle;
        item.appendChild(subtitle);
      }

      /* OPIS */
      if (column.text) {
        var text = document.createElement("p");
        text.className = "ms-adv-techModal__columnText";
        text.innerHTML = column.text;
        item.appendChild(text);
      }

      modalColumns.appendChild(item);
    });

    /* Wyrównujemy wysokość tytułów. Jeśli jeden tytuł ma 2 linie, pozostałe dostaną tę samą wysokość */
    requestAnimationFrame(syncTechColumnTitles);

    return true;
  }

  function openModal(card) {

    var key = card.getAttribute("data-tech-key");

    if (!renderModal(key)) {
      return;
    }

    lastFocus = card;

    modal.hidden = false;

    document.documentElement.classList.add("ms-adv-techModal-open");

    document.body.classList.add("ms-adv-techModal-open");

    var closeButton = modal.querySelector(".ms-adv-techModal__close");

    if (closeButton) {
      closeButton.focus({preventScroll: true});
    }
  }

  function closeModal() {

    if (modal.hidden) {
      return;
    }

    modal.hidden = true;

    document.documentElement.classList.remove("ms-adv-techModal-open");

    document.body.classList.remove("ms-adv-techModal-open");

    modalImage.src = "";
    modalImage.alt = "";

    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({preventScroll: true});
    }

    lastFocus = null;
  }


  cards.forEach(function (card) {

    card.addEventListener("click", function () {
      openModal(card);
    });

    /* Obsługa klawiatury */
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card);
      }

    });

  });

  Array.prototype.forEach.call(closeButtons, function (button) {
      button.addEventListener("click", closeModal);
    }
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }

  });

  window.addEventListener("resize", function () {
    if (!modal.hidden) {
      requestAnimationFrame(syncTechColumnTitles);
    }
  });

}


  /* =========================================================
     FAQ
     ========================================================= */

  function initFaq(root) {
    var faq = root.querySelector("[data-ms-faq]");

    if (!faq) return;

    var items = Array.prototype.slice.call(faq.querySelectorAll(".ms-adv-faq__item"));

    function setItem(item, open) {
      var button = item.querySelector("button");
      var panel = item.querySelector(".ms-adv-faq__panel");

      if (!button || !panel) {
        return;
      }

      button.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
      item.classList.toggle("is-open", open);
    }

    items.forEach(function (item) {
      var button = item.querySelector("button");
      var panel = item.querySelector(".ms-adv-faq__panel");

      if (!button || !panel) {
        return;
      }

      button.addEventListener("click", function () {
        var shouldOpen = button.getAttribute("aria-expanded") !== "true";
        items.forEach(function (otherItem) {
            setItem(otherItem, false);
          }
        );

        setItem(item, shouldOpen);
      });

    });
  }

function init360Previews(root) {
  var previews = Array.prototype.slice.call(root.querySelectorAll("[data-ms-360-preview]"));

  if (!previews.length) return;

  previews.forEach(function (preview) {
    var img = preview.querySelector("img");
    if (!img) return;

    var path = preview.getAttribute("data-ms-360-path") || "";
    var extension = preview.getAttribute("data-ms-360-ext") || ".jpg";
    if (!path) return;

    /* =====================================================
       KONFIGURACJA
       ===================================================== */

    var START_FRAME = 30;
    var FRAME_COUNT = 60;

    /*
      Czas pełnego obrotu 360°.
      1800 ms = szybki
      2200 ms = trochę spokojniejszy
      1500 ms = bardzo szybki
    */
    var ROTATION_TIME = 2200;

    /* Czas powrotu do pozycji początkowej.*/
    var RETURN_TIME = 450;

    /* =====================================================
       KOLEJNOŚĆ KLATEK

       start:
       0_30

       dalej:
       0_31
       ...
       0_59
       0_0
       ...
       0_29

       ===================================================== */

    var frameOrder = [];

    for (var i = START_FRAME; i < FRAME_COUNT; i++) {
      frameOrder.push(i);
    }

    for (var j = 0; j < START_FRAME; j++) {
      frameOrder.push(j);
    }

    /* =====================================================
       PRELOAD
       ===================================================== */

    var frames = [];

    frameOrder.forEach(function (frameNumber) {
      var frameImage = new Image();
      frameImage.src = path + "0_" + frameNumber + extension;
      frames.push(frameImage);
    });


    /* =====================================================
       STAN
       ===================================================== */

    var animationId = null;
    var mode = "idle";

    /* progress:
      0 = klatka startowa 0_30
      1 = pełny obrót
    */

    var progress = 0;
    var rotationStartTime = 0;
    var returnStartTime = 0;
    var returnStartProgress = 0;

    /* =====================================================
       WYŚWIETLENIE KLATKI
       ===================================================== */

    function renderProgress(value) {
      value = Math.max(0, Math.min(0.999999, value));

      /* BRAK EASINGU - Progress przechodzi liniowo przez wszystkie klatki.*/
      var index = Math.floor(value * frameOrder.length);
      index = Math.max(0, Math.min(frameOrder.length - 1, index));

      var frameImage = frames[index];

      if (frameImage && frameImage.complete && frameImage.naturalWidth) {
        img.src = frameImage.src;
      }
    }

    /* =====================================================
       OBRÓT
       ===================================================== */

    function rotationLoop(timestamp) {if (mode !== "rotation") {return;}
      var elapsed = timestamp - rotationStartTime;

      /* Dzięki modulo obrót może działać bez końca, jeśli użytkownik nadal trzyma kursor na zdjęciu. */
      progress = (elapsed % ROTATION_TIME) / ROTATION_TIME;
      renderProgress(progress);

      animationId =requestAnimationFrame(rotationLoop);
    }

    /* =====================================================
       START HOVER
       ===================================================== */

    function startRotation() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      mode = "rotation";

      /* Kontynuujemy od aktualnej pozycji, jeśli użytkownik ponownie najedzie podczas powrotu. */
      rotationStartTime = performance.now() - (progress * ROTATION_TIME);

      animationId = requestAnimationFrame(rotationLoop);
    }

    /* =====================================================
       POWRÓT DO POZYCJI 0_30
       ===================================================== */

    function returnLoop(timestamp) {
      if (mode !== "return") {return;}

      if (!returnStartTime) {returnStartTime = timestamp;}

      var elapsed = timestamp - returnStartTime;
      var t = Math.min(elapsed / RETURN_TIME, 1);

      /* Powrót liniowy. */
      progress = returnStartProgress * (1 - t);
      renderProgress(progress);

      if (t >= 1) {
        mode = "idle";
        progress = 0;
        animationId = null;

        /* Dokładnie ustawiamy klatkę początkową. */
        img.src = path + "0_" + START_FRAME + extension;

        return;
      }

      animationId = requestAnimationFrame(returnLoop);
    }

    /* =====================================================
       MOUSELEAVE
       ===================================================== */

    function returnToStart() {
      if (animationId) {
        cancelAnimationFrame(animationId);

        animationId = null;
      }

      /* Jeśli jesteśmy już prawie w pozycji startowej.*/
      if (progress < 0.01) {
        mode = "idle";
        progress = 0;
        img.src = path + "0_" + START_FRAME + extension;

        return;
      }

      mode = "return";

      returnStartProgress = progress;
      returnStartTime = 0;

      animationId = requestAnimationFrame(returnLoop);
    }


    /* =====================================================
       EVENTY
       ===================================================== */

    preview.addEventListener("mouseenter", startRotation);
    preview.addEventListener("mouseleave", returnToStart);
  });
}

/* =========================================================
   BOCZNA NAWIGACJA — AKTYWNA SEKCJA
   ========================================================= */

(function () {

  const nav = document.querySelector(".ms-adv-sideNav");

  if (!nav) return;

  const items = [...nav.querySelectorAll(".ms-adv-sideNav__item")];

  const progress = nav.querySelector(".ms-adv-sideNav__progress");

  const sections = items.map(item => {

      const id = item.dataset.section;
      const section = document.getElementById(id);

      return {item, section};
    })
    .filter(entry => entry.section);

  if (!sections.length) return;

  function setActive(index) {
    sections.forEach((entry, i) => {
      entry.item.classList.toggle("is-active", i === index);
    });

    /*
     * Pozycja zielonego suwaka.
     * Pierwsza sekcja = 0%
     * Ostatnia sekcja = 100%
     */

    const percent = sections.length > 1 ? index / (sections.length - 1) : 0;

    if (progress) {
      progress.style.height = `${percent * 100}%`;
    }

  }

  /* =========================================================
    WYKRYWANIE AKTYWNEJ SEKCJI — STABILNE
    ========================================================= */

  let ticking = false;
  let currentActiveIndex = 0;

  function updateActiveSection() {

  const markerY = window.innerHeight * 0.42;

  // zaczynamy od ostatnio aktywnej sekcji
  let activeIndex = currentActiveIndex;

  sections.forEach((entry, index) => {

    const rect = entry.section.getBoundingClientRect();

    if (rect.top <= markerY && rect.bottom > markerY) {
      activeIndex = index;
    }

  });

  // zmieniamy tylko jeśli faktycznie znaleziono nową sekcję
  if (activeIndex !== currentActiveIndex) {
    currentActiveIndex = activeIndex;
    setActive(activeIndex);
  }

  ticking = false;
}

  function requestNavUpdate() {

    if (ticking) return;

    ticking = true;
    requestAnimationFrame(updateActiveSection);
  }

  window.addEventListener("scroll", requestNavUpdate, { passive: true });
  window.addEventListener("resize", requestNavUpdate);

  /* ustawienie początkowe */
  updateActiveSection();


  /* =======================================================
     KLIKNIĘCIE W NAWIGACJĘ
     ======================================================= */

  items.forEach(item => {

    item.addEventListener("click", event => {

      const id = item.dataset.section;
      const target = document.getElementById(id);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({behavior: "smooth", block: "start"});
    });

  });

  /* pierwsza pozycja */
  setActive(0);

})();


/* =========================================================
   HERO — PORÓWNANIE DREWNO / ALUMINIUM
   AUTO + RĘCZNE PRZESUWANIE
   ========================================================= */

(function () {

  const slider = document.querySelector("[data-ms-compare-slider]");

  if (!slider) return;

  const overlay = slider.querySelector("[data-ms-compare-overlay]");

  const divider = slider.querySelector("[data-ms-compare-divider]");

  if (!overlay || !divider) return;

  let dragging = false;

  /*
   * Automat jest aktywny tylko do pierwszej
   * interakcji użytkownika.
   *
   * Nie zapisujemy tego do localStorage,
   * więc po odświeżeniu strony automat
   * ponownie będzie aktywny.
   */
  let autoEnabled = true;

  let autoTimer = null;

  /*
   * false = następny ruch w prawo
   * true  = następny ruch w lewo
   */
  let autoDirectionLeft = false;


  /* =======================================================
     USTAWIENIE POZYCJI
     ======================================================= */

  function setPosition(percent, animated = false) {

    percent = Math.max(0, Math.min(100, percent));

    /*
     * Przy automacie włączamy płynne przejście.
     * Przy ręcznym przesuwaniu transition wyłączamy,
     * żeby suwak był przyklejony do kursora/palca.
     */

    if (animated) {
      overlay.style.transition = "width 1.4s cubic-bezier(.22,.61,.36,1)";
      divider.style.transition = "left 1.4s cubic-bezier(.22,.61,.36,1)";
    } else {
      overlay.style.transition = "none";
      divider.style.transition = "none";
    }

    overlay.style.width = percent + "%";
    divider.style.left = percent + "%";
  }

  /* =======================================================
     POZYCJA Z KURSORA / PALCA
     ======================================================= */

  function updateFromPointer(clientX) {

    const rect = slider.getBoundingClientRect();

    let x = clientX - rect.left;

    x = Math.max(0, Math.min(rect.width, x));

    const percent = (x / rect.width) * 100;

    setPosition(percent, false);
  }


  /* =======================================================
     WYŁĄCZENIE AUTOMATU
     ======================================================= */

  function disableAuto() {

    if (!autoEnabled) return;

    autoEnabled = false;

    if (autoTimer) {

      clearInterval(autoTimer);
      autoTimer = null;

    }

    /* Usuwamy automatyczne transition, żeby ręczne przeciąganie było natychmiastowe */
    overlay.style.transition = "none";
    divider.style.transition = "none";
  }


  /* =======================================================
     AUTOMATYCZNY RUCH
     ======================================================= */

  function runAutoMove() {

    if (!autoEnabled) return;

    /*
     * Zakres:
     *
     * 20% <------------> 80%
     */

    const target = autoDirectionLeft ? 20 : 80;

    setPosition(target,true);

    autoDirectionLeft = !autoDirectionLeft;
  }

  /* =======================================================
     RĘCZNE PRZECIĄGANIE
     ======================================================= */

  slider.addEventListener(
    "pointerdown",
    function (event) {
      /* Kliknięcie w Drewno / Aluminium ma działać jak normalny link */
      if (event.target.closest(".ms-adv-compareSlider__link")) {
        disableAuto();
        return;
      }

      /* Kliknięcie w zdjęcie wyłącza automat i steruje suwakiem */
      disableAuto();

      dragging = true;

      slider.setPointerCapture(event.pointerId);

      updateFromPointer(event.clientX);
    }
  );


  slider.addEventListener(
    "pointermove",
    function (event) {

      if (!dragging) return;

      updateFromPointer(event.clientX);

    }
  );


  slider.addEventListener(
    "pointerup",
    function (event) {

      dragging = false;


      if (
        slider.hasPointerCapture &&
        slider.hasPointerCapture(event.pointerId)
      ) {

        slider.releasePointerCapture(
          event.pointerId
        );

      }

    }
  );


  slider.addEventListener(
    "pointercancel",
    function () {

      dragging = false;

    }
  );


  /* =======================================================
     SYNCHRONIZACJA SZEROKOŚCI OBRAZU
     ======================================================= */

  function syncWidth() {
    const rect = slider.getBoundingClientRect();
    slider.style.setProperty("--ms-compare-width", rect.width + "px");
  }

  window.addEventListener("resize", syncWidth);

  /* =======================================================
     START
     ======================================================= */

  syncWidth();

  /* start dokładnie na środku */

  setPosition(50,false);

  /* Pierwszy automatyczny ruch po 5 sekundach */
  autoTimer = setInterval(runAutoMove, 5000);

})();



})();