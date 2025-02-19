(function () {
  // Wait for the DOM to load
  document.addEventListener("DOMContentLoaded", function () {
    // Read configuration from window.ghalaWhatsAppConfig (if set)
    var config = window.ghalaWhatsAppConfig || {};

    // Use provided configuration or fall back to defaults
    var phoneNumber = config.phoneNumber || "+255757624146";
    var greeting = config.greeting || "Hello";
    var title = config.title || "Shop on WhatsApp";
    var description =
      config.description ||
      "Enjoy a seamless purchasing experience. Chat with our sales team and order your favorites instantly!";
    var buttonLabel = config.buttonLabel || "Order Now";
    var backgroundColor = config.backgroundColor || "#FF7F50";
    var textColor = config.textColor || "#ffffff";
    var buttonColor = config.buttonColor || "#25D366";
    var position = config.position || "bottom_right"; // Options: bottom_right, top_right, bottom_left, top_left
    var delay = typeof config.delay !== "undefined" ? config.delay : 0; // in seconds
    var isLive = config.isLive !== undefined ? config.isLive : true;
    var showOnAllPages =
      config.showOnAllPages !== undefined ? config.showOnAllPages : true;
    var specificPages = config.specificPages || "";

    // If popup is not live, do nothing
    if (!isLive) {
      return;
    }

    // (Optional) If you want to only show on specific pages when showOnAllPages is false:
    // if (!showOnAllPages && specificPages) {
    //   var pages = specificPages.split(",").map(function (p) {
    //     return p.trim();
    //   });
    //   var currentPage = window.location.pathname;
    //   if (pages.indexOf(currentPage) === -1) return;
    // }

    // Wait for the specified delay before showing the popup
    setTimeout(function () {
      // Determine positioning based on the config
      var posTop = position.indexOf("top") > -1 ? "top: 20px;" : "";
      var posBottom = position.indexOf("bottom") > -1 ? "bottom: 20px;" : "";
      var posLeft = position.indexOf("left") > -1 ? "left: 20px;" : "";
      var posRight = position.indexOf("right") > -1 ? "right: 20px;" : "";

      // Build CSS styles dynamically based on config values
      var css = `
        /* Popup container */
        #ghala-popup-container {
          position: fixed;
          ${posTop}
          ${posBottom}
          ${posLeft}
          ${posRight}
          z-index: 9999;
          font-family: 'Arial', sans-serif;
        }

        /* Popup style */
        #ghala-popup {
          background: ${backgroundColor};
          color: ${textColor};
          padding: 20px 20px 30px 20px;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
          width: 320px;
          animation: fadeInUp 0.5s ease-out;
          position: relative;
          overflow: hidden;
        }

        /* Fade in animation */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Title style */
        #ghala-popup h2 {
          margin: 0 0 10px;
          font-size: 22px;
          text-align: center;
        }

        /* Description style */
        #ghala-popup p {
          margin: 0 0 20px;
          font-size: 16px;
          line-height: 1.4;
          text-align: center;
        }

        /* WhatsApp button style */
        #ghala-popup .ghala-btn {
          background: ${buttonColor};
          color: ${textColor};
          border: none;
          padding: 12px 20px;
          font-size: 18px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          display: block;
          margin: 0 auto;
        }

        #ghala-popup .ghala-btn:hover {
          filter: brightness(90%);
          transform: scale(1.05);
        }

        /* Close button style */
        #ghala-popup .close-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: transparent;
          border: none;
          color: ${textColor};
          font-size: 22px;
          cursor: pointer;
          line-height: 1;
        }

        /* Shopping icon style */
        #ghala-popup .shopping-icon {
          font-size: 40px;
          text-align: center;
          margin-bottom: 10px;
        }
      `;

      // Inject CSS into the document head
      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);

      // Create the container div for the popup
      var container = document.createElement("div");
      container.id = "ghala-popup-container";

      // Create the popup div
      var popup = document.createElement("div");
      popup.id = "ghala-popup";

      // Create a close button to dismiss the popup
      var closeBtn = document.createElement("button");
      closeBtn.className = "close-btn";
      closeBtn.innerHTML = "&times;";
      closeBtn.setAttribute("aria-label", "Close Popup");
      closeBtn.onclick = function () {
        container.style.display = "none";
      };

      // Create a shopping icon element
      var icon = document.createElement("div");
      icon.className = "shopping-icon";
      icon.textContent = "🛒";

      // Create the title element
      var titleEl = document.createElement("h2");
      titleEl.textContent = title;

      // Create the description element
      var descriptionEl = document.createElement("p");
      descriptionEl.textContent = description;

      // Create the WhatsApp chat button
      var chatBtn = document.createElement("button");
      chatBtn.className = "ghala-btn";
      chatBtn.textContent = buttonLabel;
      chatBtn.onclick = function () {
        // Construct WhatsApp URL using the phone number and greeting text
        var message = encodeURIComponent(greeting);
        // Remove any non-digit characters from the phone number
        var sanitizedPhone = phoneNumber.toString().replace(/\D/g, "");
        var url = "https://wa.me/" + sanitizedPhone + "?text=" + message;
        window.open(url, "_blank");
      };

      // Assemble the popup elements
      popup.appendChild(closeBtn);
      popup.appendChild(icon);
      popup.appendChild(titleEl);
      popup.appendChild(descriptionEl);
      popup.appendChild(chatBtn);
      container.appendChild(popup);

      // Append the popup container to the document body
      document.body.appendChild(container);
    }, delay * 1000);
  });
})();
