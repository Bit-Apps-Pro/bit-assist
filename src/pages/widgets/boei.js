let Boei = function (e) {
  (this.key = e.key),
    (this.brandcolor = e.brandcolor),
    (this.brandcolor_text = e.brandcolor_text),
    (this.button_image = e.button_image),
    (this.trigger_after_seconds = e.trigger_after_seconds),
    (this.trigger_message = e.trigger_message),
    (this.display_close_trigger_message = e.display_close_trigger_message),
    (this.close_trigger_after_seconds = e.close_trigger_after_seconds),
    (this.position = e.position),
    (this.icon_src = e.icon_src),
    (this.close_src = e.close_src),
    (this.loading_src = e.loading_src),
    (this.helpers = e.helpers),
    (this.send_form_to_url = e.send_form_to_url),
    (this.interaction_url = e.interaction_url),
    (this.display_watermark = e.display_watermark),
    (this.shape = e.shape),
    (this.hide_on_pages = e.hide_on_pages),
    (this.opacity = e.opacity),
    (this.allow_identifiers = e.allow_identifiers),
    (this.dom_button_id = this.setId("boei_button")),
    (this.dom_button_close_id = this.setId("boei_button_close")),
    (this.dom_close_trigger_message_id = this.setId(
      "boei_close_trigger_message"
    )),
    (this.dom_message_trigger_id = this.setId("boei_trigger_message")),
    (this.dom_background_fade_id = this.setId("boei_background_fade")),
    (this.helper_id_prefix = this.setId("boei_helper_id_")),
    (this.helper_class = this.setId("boei-helper")),
    (this.dom_form_email_id = this.setId("boei_form_email")),
    (this.dom_form_name_id = this.setId("boei_form_name")),
    (this.dom_form_subject_id = this.setId("boei_form_subject")),
    (this.dom_form_container_id = this.setId("boei_form")),
    (this.dom_form_loading_id = this.setId("boei_loading")),
    (this.dom_form_success_id = this.setId("boei_form_success")),
    (this.dom_form_helper_id = this.setId("boei_form_helper_id")),
    (this.dom_contact_form_id = this.setId("boei_contact_form_form")),
    (this.dom_form_message_id = this.setId("dom_form_message_id")),
    (this.dom_call_me_back_form_id = this.setId("boei_call_me_back_form")),
    (this.dom_call_me_back_phone_id = this.setId("boei_call_me_back_phone")),
    (this.dom_call_me_back_when_id = this.setId("boei_call_me_back_when")),
    (this.dom_form_custom1_id = this.setId("boei_custom1")),
    (this.dom_form_custom2_id = this.setId("boei_custom2")),
    (this.dom_form_custom3_id = this.setId("boei_custom3")),
    (this.dom_form_custom4_id = this.setId("boei_custom4")),
    (this.dom_form_custom5_id = this.setId("boei_custom5")),
    (this.dom_feedback_form_id = this.setId("boei_feedback_form")),
    (this.dom_feedback_selected_id = this.setId("boei_feedback_form_selected")),
    (this.dom_feedback_comment_id = this.setId("boei_feedback_comment")),
    (this.dom_newsletter_signup_id = this.setId("boei_newsletter_signup")),
    (this.dom_gdpr_consent_checkbox = this.setId("boei_gdpr_consent_checkbox")),
    (this.dom_gdpr_consent_label = this.setId("boei_gdpr_consent_label")),
    (this.dom_input_customer_email_field = "boei_prefill_customer_email"),
    (this.dom_input_customer_name_field = "boei_prefill_customer_name"),
    (this.fontfamily =
      "system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,Arial,sans-serif"),
    (this.fontsize = "16px"),
    (this.fontsize_small = "14px"),
    (this.z_index_base = 999997),
    (this.interaction_button_clicked = !1),
    (this.interaction_helper_clicked = []),
    (this.lastHelperHeight = null),
    (this.lastHelperMargin = null),
    (this.is_out_of_office = e.is_out_of_office),
    (this.dom_boei_open_handler = null),
    (this.dom_boei_close_handler = null),
    e.font_family &&
    ((this.fontfamily = e.font_family + "," + this.fontfamily),
      "inherit" == e.font_family && (this.fontfamily = "")),
    e.font_size &&
    ((this.fontsize = e.font_size + "px"),
      (this.fontsize_small = e.font_size - 2 + "px")),
    this.hideBotstar(),
    this.hideCrisp(),
    this.hideIntercom(),
    this.hideDrift(),
    this.hideFroged(),
    this.hideContinually(),
    this.hideLiveAgent(),
    this.hideTawk(),
    this.hideJivochat(),
    this.createButton(),
    this.listenToBoeiTriggers(),
    this.triggerMessage();
};
function jivo_onLoadCallback() {
  let e = document.querySelectorAll("jdiv");
  e.length > 0 && (e[0].style.display = "none");
}
function jivo_onClose() {
  let e = document.querySelectorAll("jdiv");
  e.length > 0 && (e[0].style.display = "none");
}
(Boei.prototype.setId = function (e) {
  return this.allow_identifiers ? e : Math.random().toString(36).substr(2, 5);
}),
  (Boei.prototype.createButton = function () {
    var e = document.createElement("button");
    (e.id = this.dom_button_id), e.setAttribute("tabindex", "0");
    let t =
      "border: 0; opacity: " +
      this.opacity +
      "; color: " +
      this.brandcolor_text +
      "; z-index: " +
      this.z_index_base +
      "; position: fixed; height: 60px; width: 60px; padding: 0; cursor: pointer; text-align: center; font-family: " +
      this.fontfamily +
      "; font-size: " +
      this.fontsize +
      "; line-height: 1; box-shadow: 0 5px 8px 0 rgba(0,0,0,.125); vertical-align: middle; ",
      o = "border-radius: 20px;";
    if (
      ("round" == this.shape && (o = "border-radius: 50%;"),
        "square" == this.shape && (o = "border-radius: 0px;"),
        (t += o),
        (t =
          null !== this.button_image
            ? t + 'background-image: url("' + this.button_image + '");'
            : t + "background-color: " + this.brandcolor + ";"),
        (e.style = t),
        this.displayBoei() || (e.style.display = "none"),
        void 0 !== this.helpers[0] &&
        e.setAttribute("aria-label", this.helpers[0].title),
        this.setPosition("boei_button", e),
        e.addEventListener("mouseover", this.mouseoverBoei.bind(this, e), !1),
        e.addEventListener("mouseout", this.mouseoutBoei.bind(this, e), !1),
        null === this.button_image)
    ) {
      var i = document.createElement("img");
      (i.src = this.icon_src),
        this.accessibilize("svg", i),
        (i.style = "height: 32px; width: 32px; display: inline;"),
        e.appendChild(i);
    }
    document.body.appendChild(e),
      (this.dom_boei_open_handler = this.openBoei.bind(this, e)),
      (this.dom_boei_close_handler = this.closeBoei.bind(this, e)),
      e.addEventListener("click", this.dom_boei_open_handler, !1);
  }),
  (Boei.prototype.showHelpers = function () {
    let e = 1;
    this.helpers.forEach((t) => {
      if (
        !this.is_out_of_office ||
        !("hide_out_of_office" in t.options) ||
        "true" !== t.options.hide_out_of_office
      ) {
        if (
          "chat_crisp" === t.type ||
          "chat_intercom" === t.type ||
          "chat_drift" === t.type ||
          "chat_froged" === t.type ||
          "chat_continually" === t.type ||
          "chat_liveagent" === t.type ||
          "chat_quriobot" === t.type ||
          "chat_jivochat" === t.type ||
          "chat_tawk" === t.type ||
          "chat_botstar" === t.type
        )
          var o = document.createElement("button");
        else o = document.createElement("a");
        (o.style =
          "box-sizing: border-box; border: 2px solid #ffffff; background-color: #ffffff; color: rgb(104, 104, 104); z-index: " +
          this.z_index_base +
          "; position: fixed; padding: 10px 20px 10px 20px; border-radius: 5px; cursor: pointer; font-family: " +
          this.fontfamily +
          "; font-size: " +
          this.fontsize +
          "; line-height: 1; text-decoration: none; box-shadow: 0 5px 8px 0 rgba(0,0,0,.125); transition: transform .15s ease-in-out; font-weight: normal; letter-spacing: normal; text-transform: none;"),
          (o.className = "boei-opened " + this.helper_class),
          (o.id = this.helper_id_prefix + e),
          "top_left" === this.position || "bottom_left" === this.position
            ? ((o.style.borderLeftColor = this.brandcolor),
              (o.style.borderTopLeftRadius = "0"),
              (o.style.borderBottomLeftRadius = "0"))
            : ((o.style.borderRightColor = this.brandcolor),
              (o.style.borderTopRightRadius = "0"),
              (o.style.borderBottomRightRadius = "0")),
          (o.options = t.options),
          this.setPosition("helper", o, e),
          null != t.icon_url &&
          ((o.style.backgroundImage = "url('" + t.icon_url + "')"),
            (o.style.backgroundSize = "18px 18px"),
            (o.style.backgroundRepeat = "no-repeat"),
            (o.style.backgroundPosition = "20px 50%"),
            (o.style.paddingLeft = "50px")),
          o.addEventListener("mouseover", this.mouseoverBoei.bind(this, o), !1),
          o.addEventListener("mouseout", this.mouseoutBoei.bind(this, o), !1),
          null != t.url && (o.href = this.replaceVariables(t.url)),
          "new_window" in t.options &&
          "true" === t.options.new_window &&
          o.setAttribute("target", "_blank"),
          "chat_botstar" === t.type &&
          o.addEventListener("click", this.openChatBotstar.bind(this, o), !1),
          "chat_drift" === t.type &&
          o.addEventListener("click", this.openChatDrift.bind(this, o), !1),
          "chat_continually" === t.type &&
          o.addEventListener(
            "click",
            this.openChatContinually.bind(this, o),
            !1
          ),
          "chat_quriobot" === t.type &&
          o.addEventListener(
            "click",
            this.openChatQuriobot.bind(this, o),
            !1
          ),
          "chat_liveagent" === t.type &&
          o.addEventListener(
            "click",
            this.openChatLiveAgent.bind(this, o),
            !1
          ),
          "chat_froged" === t.type &&
          o.addEventListener("click", this.openChatFroged.bind(this, o), !1),
          "chat_crisp" === t.type &&
          o.addEventListener("click", this.openChatCrisp.bind(this, o), !1),
          "chat_intercom" === t.type &&
          o.addEventListener(
            "click",
            this.openChatIntercom.bind(this, o),
            !1
          ),
          "chat_tawk" === t.type &&
          o.addEventListener("click", this.openChatTawk.bind(this, o), !1),
          "chat_jivochat" === t.type &&
          o.addEventListener(
            "click",
            this.openChatJivochat.bind(this, o),
            !1
          ),
          "contact_form" === t.type &&
          o.addEventListener("click", this.openMailForm.bind(this, o), !1),
          "newsletter_signup" === t.type &&
          o.addEventListener(
            "click",
            this.openNewsletterSignupForm.bind(this, o),
            !1
          ),
          "call_me_back" === t.type &&
          o.addEventListener(
            "click",
            this.openCallMeBackForm.bind(this, o),
            !1
          ),
          "feedback_form" === t.type &&
          o.addEventListener(
            "click",
            this.openFeedbackForm.bind(this, o),
            !1
          ),
          "markdown" === t.type &&
          o.addEventListener("click", this.openMarkdown.bind(this, o), !1),
          "html" === t.type &&
          o.addEventListener("click", this.openHtml.bind(this, o), !1),
          "youtube_widget" === t.type &&
          o.addEventListener(
            "click",
            this.openYoutubeWidget.bind(this, o),
            !1
          ),
          "iframe_widget" === t.type &&
          o.addEventListener(
            "click",
            this.openIframeWidget.bind(this, o),
            !1
          ),
          null != t.options.display_type &&
          "single_image" === t.options.display_type &&
          o.addEventListener(
            "click",
            this.openHelperDisplay.bind(this, t.options.image),
            !1
          ),
          o.addEventListener(
            "click",
            this.interactionHelperClicked.bind(this, t.interaction_url),
            !1
          );
        var i = document.createElement("span");
        i.style =
          "height: 18px; vertical-align: top; color: rgb(104, 104, 104);";
        var n = document.createTextNode(t.title);
        i.appendChild(n),
          o.appendChild(i),
          document.body.appendChild(o),
          (this.lastHelperHeight = o.offsetHeight),
          e++;
      }
    });
  }),
  (Boei.prototype.openHelperDisplay = function (e) {
    this.closeHelpers();
    let t = document.createElement("div");
    (t.className = "boei-opened"),
      (t.id = this.dom_form_container_id),
      (t.style =
        "box-sizing: border-box; max-width: 400px; border: 2px solid #ffffff; background-color: #ffffff; color: rgb(104, 104, 104); z-index: " +
        this.z_index_base +
        "; position: fixed; padding: 10px 20px 10px 20px; border-radius: 5px; font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize +
        "; line-height: 1; box-shadow: 0 5px 8px 0 rgba(0,0,0,.125); transition: transform .15s ease-in-out;"),
      this.setPosition("widget", t);
    let o = document.createElement("img");
    return (
      (o.src = e),
      (o.style = "max-width: 100%; height: auto;"),
      t.appendChild(o),
      document.body.appendChild(t),
      t
    );
  }),
  (Boei.prototype.openBoei = function () {
    this.showBoeiButton(), this.showHelpers();
    for (
      var e = document.getElementsByClassName("boei-pre-opened");
      e.length > 0;

    )
      e[0].parentNode.removeChild(e[0]);
    this.addBackgroundFade();
    let t = this.prepareCloseButton();
    t.setAttribute("tabindex", "0"),
      (t.id = this.dom_button_close_id),
      (t.className = "boei-opened"),
      t.setAttribute("aria-label", "Close"),
      this.setPosition("close_button", t),
      t.addEventListener("click", this.closeBoei.bind(this, t), !1);
    var o = document.getElementById(this.dom_button_id);
    if (
      (o.removeEventListener("click", this.dom_boei_open_handler, !1),
        o.addEventListener("click", this.dom_boei_close_handler, !1),
        this.display_watermark)
    ) {
      var i = document.createElement("a");
      (i.className = "boei-opened"),
        (i.style =
          "z-index: " +
          this.z_index_base +
          "1; color: #686868; text-decoration: none; position: fixed; padding: 0; height: 10px; width: 60px; text-align: center; cursor: pointer; font-family: " +
          this.fontfamily +
          "; font-size: 10px; background-color: transparent; border: 0; line-height: 1;"),
        (i.href =
          "https://www.boei.help/?utm_source=poweredby&utm_medium=banner&utm_campaign=" +
          this.key),
        i.setAttribute("target", "_blank"),
        this.setPosition("watermark", i);
      var n = document.createTextNode("by Boei");
      i.appendChild(n), document.body.appendChild(i);
    }
    this.interactionButtonClicked();
  }),
  (Boei.prototype.addBackgroundFade = function () {
    let e = document.createElement("div");
    (e.id = this.dom_background_fade_id),
      (e.className = "boei-opened"),
      (e.style =
        "background-color: #ffffff; opacity: 0.5; z-index: " +
        (this.z_index_base - 1) +
        "; position: fixed; top: 0; left: 0; height: 100%; width: 100%;"),
      e.addEventListener("click", this.closeBoei.bind(this, e), !1),
      document.body.appendChild(e);
  }),
  (Boei.prototype.listenToBoeiTriggers = function () {
    let e = this;
    document.addEventListener(
      "click",
      function (t) {
        if (
          void 0 !== t.target &&
          void 0 !== t.target.className &&
          void 0 !== t.target.className.includes &&
          t.target.className.includes("boei-embed-open")
        )
          return e.openBoei(), !1;
      },
      !1
    );
  }),
  (Boei.prototype.triggerMessage = function () {
    if (!this.displayBoei()) return !1;
    if (this.trigger_after_seconds > 0) {
      let e = this;
      setTimeout(function () {
        if (document.getElementsByClassName("boei-opened").length > 0)
          return !0;
        var t = document.createElement("div");
        (t.className = "boei-pre-opened"),
          (t.id = e.dom_message_trigger_id),
          (t.style =
            "box-sizing: border-box; border: 2px solid #ffffff; background-color: #ffffff; color: rgb(104, 104, 104); z-index: " +
            e.z_index_base +
            "; position: fixed; padding: 10px 20px 10px 20px; border-radius: 5px; cursor: pointer; font-family: " +
            e.fontfamily +
            "; font-size: " +
            e.fontsize +
            "; line-height: 1; box-shadow: 0 5px 8px 0 rgba(0,0,0,.125); transition: transform .15s ease-in-out;"),
          e.setPosition("trigger_message", t);
        var o = document.createElement("span");
        o.style = "height: 18px; vertical-align: top;";
        var i = document.createTextNode(e.trigger_message);
        if (
          (o.appendChild(i),
            t.appendChild(o),
            t.addEventListener("click", e.openBoei.bind(e, t), !1),
            t.addEventListener("mouseover", e.mouseoverBoei.bind(e, t), !1),
            t.addEventListener("mouseout", e.mouseoutBoei.bind(e, t), !1),
            e.display_close_trigger_message)
        ) {
          let t = e.prepareCloseButton();
          (t.id = e.dom_close_trigger_message_id),
            (t.className = "boei-pre-opened"),
            e.setPosition("close_trigger_message", t),
            t.addEventListener("click", e.closeTriggerMessage.bind(e, t), !1);
        }
        document.body.appendChild(t),
          e.close_trigger_after_seconds > 0 &&
          setTimeout(function () {
            e.closeTriggerMessage();
          }, 1e3 * e.close_trigger_after_seconds);
      }, 1e3 * this.trigger_after_seconds);
    }
  }),
  (Boei.prototype.closeTriggerMessage = function () {
    document.querySelectorAll(".boei-pre-opened").forEach(function (e) {
      e.parentNode.removeChild(e);
    });
  }),
  (Boei.prototype.closeHelpers = function () {
    let e = document.getElementsByClassName(this.helper_class);
    for (; e.length > 0;) e[0].parentNode.removeChild(e[0]);
  }),
  (Boei.prototype.closeBoei = function () {
    document
      .querySelectorAll(".boei-opened,.boei-pre-opened")
      .forEach(function (e) {
        e.parentNode.removeChild(e);
      }),
      (this.lastHelperMargin = null),
      (this.lastHelperHeight = null);
    var e = document.getElementById(this.dom_button_id);
    e.addEventListener("click", this.dom_boei_open_handler, !1),
      e.removeEventListener("click", this.dom_boei_close_handler, !1);
  }),
  (Boei.prototype.prepareCloseButton = function () {
    let e = document.createElement("button");
    e.style =
      "background-color: #494949; padding: 0; border: 2px solid #ffffff; z-index: " +
      this.z_index_base +
      "1; position: fixed; height: 32px; width: 32px; min-height: 32px; min-width: 32px; border-radius: 50%; cursor: pointer; font-size: 0; line-height: 0; text-align: center;";
    let t = document.createElement("img");
    return (
      (t.src = this.close_src),
      (t.style = "height: 12px; width: 12px; display: inline;"),
      e.appendChild(t),
      document.body.appendChild(e),
      e.addEventListener("mouseover", this.mouseoverBoei.bind(this, e), !1),
      e.addEventListener("mouseout", this.mouseoutBoei.bind(this, e), !1),
      e
    );
  }),
  (Boei.prototype.hideBoeiButton = function () {
    this.closeBoei(),
      (document.getElementById(this.dom_button_id).style.display = "none");
  }),
  (Boei.prototype.showBoeiButton = function () {
    document.getElementById(this.dom_button_id).style.display = "block";
  }),
  (Boei.prototype.mouseoverBoei = function (e) {
    (e.style.transform = "rotate(3deg) scale(1.05) perspective(1px)"),
      (e.style.filter = "brightness(95%)");
  }),
  (Boei.prototype.mouseoutBoei = function (e) {
    (e.style.transform = "rotate(0deg)"), (e.style.filter = "brightness(100%)");
  }),
  (Boei.prototype.accessibilize = function (e, t) {
    "svg" == e &&
      (t.setAttribute("aria-hidden", "true"),
        t.setAttribute("focusable", "false"),
        t.setAttribute("role", "img"));
  }),
  (Boei.prototype.setPosition = function (e, t, o = null) {
    let i, n;
    "helper" == e &&
      null !== o &&
      (null === this.lastHelperMargin &&
        (window.innerWidth < 1200
          ? (this.lastHelperMargin = 90)
          : (this.lastHelperMargin = 10)),
        (i = this.lastHelperMargin + this.lastHelperHeight + 20),
        (n = 130),
        window.innerWidth < 1200 && (n -= 100),
        (this.lastHelperMargin = i)),
      "widget" == e &&
      (window.innerWidth < 1200
        ? ((i = 110), (n = 30))
        : ((i = 30), (n = 130))),
      "trigger_message" == e &&
      (window.innerWidth < 1200
        ? ((i = 40), (n = 110))
        : ((i = 40), (n = 130))),
      "close_trigger_message" == e &&
      (window.innerWidth < 1200
        ? ((i = 60), (n = 100))
        : ((i = 60), (n = 120))),
      "bottom_right" == this.position &&
      ("boei_button" == e &&
        ((t.style.bottom = "30px"), (t.style.right = "30px")),
        ("trigger_message" != e && "close_trigger_message" != e) ||
        ((t.style.bottom = i + "px"), (t.style.right = n + "px")),
        "close_button" == e &&
        ((t.style.bottom = "75px"), (t.style.right = "20px")),
        ("helper" != e && "widget" != e) ||
        ((t.style.right = n + "px"),
          (t.style.marginLeft = "10px"),
          (t.style.bottom = i + "px")),
        "watermark" == e &&
        ((t.style.bottom = "15px"), (t.style.right = "30px"))),
      "bottom_left" == this.position &&
      ("boei_button" == e &&
        ((t.style.bottom = "30px"), (t.style.left = "30px")),
        ("trigger_message" != e && "close_trigger_message" != e) ||
        ((t.style.bottom = i + "px"), (t.style.left = n + "px")),
        "close_button" == e &&
        ((t.style.bottom = "75px"), (t.style.left = "70px")),
        ("helper" != e && "widget" != e) ||
        ((t.style.left = n + "px"),
          (t.style.marginRight = "10px"),
          (t.style.bottom = i + "px")),
        "watermark" == e &&
        ((t.style.bottom = "15px"), (t.style.left = "30px"))),
      "top_right" == this.position &&
      ("boei_button" == e &&
        ((t.style.top = "30px"), (t.style.right = "30px")),
        ("trigger_message" != e && "close_trigger_message" != e) ||
        ((t.style.top = i + "px"), (t.style.right = n + "px")),
        "close_button" == e &&
        ((t.style.top = "15px"), (t.style.right = "20px")),
        ("helper" != e && "widget" != e) ||
        ((t.style.right = n + "px"),
          (t.style.marginLeft = "10px"),
          (t.style.top = i + "px")),
        "watermark" == e && ((t.style.top = "95px"), (t.style.right = "30px"))),
      "top_left" == this.position &&
      ("boei_button" == e &&
        ((t.style.top = "30px"), (t.style.left = "30px")),
        ("trigger_message" != e && "close_trigger_message" != e) ||
        ((t.style.top = i + "px"), (t.style.left = n + "px")),
        "close_button" == e &&
        ((t.style.top = "15px"), (t.style.left = "70px")),
        ("helper" != e && "widget" != e) ||
        ((t.style.left = n + "px"),
          (t.style.marginRight = "10px"),
          (t.style.top = i + "px")),
        "watermark" == e && ((t.style.top = "95px"), (t.style.left = "30px")));
  }),
  (Boei.prototype.displayBoei = function () {
    path =
      "/" +
      (window.location.pathname + window.location.search)
        .substr(1)
        .toLowerCase();
    try {
      var e = new RegExp(this.hide_on_pages);
    } catch (e) {
      console.log("Boei: Hide on pages regex is not valid.");
    }
    return !e.test(path);
  }),
  (Boei.prototype.replaceVariables = function (e) {
    return (e = (e = e
      .split("%7B%7Bpage_title%7D%7D")
      .join(encodeURI(document.title)))
      .split("%7B%7Bpage_url%7D%7D")
      .join(encodeURI(window.location.hostname + window.location.pathname)));
  }),
  (Boei.prototype.isLoadedCrisp = function () {
    return void 0 !== window.$crisp;
  }),
  (Boei.prototype.openChatCrisp = function () {
    if (!this.isLoadedCrisp())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    this.closeBoei(),
      window.$crisp.push(["do", "chat:open"]),
      window.$crisp.push(["do", "chat:show"]);
    window.$crisp.push(["on", "chat:closed", this.hideCrisp.bind(this, this)]);
  }),
  (Boei.prototype.hideCrisp = function () {
    if (!this.isLoadedCrisp()) return null;
    window.$crisp.push(["do", "chat:hide"]);
  }),
  (Boei.prototype.isLoadedIntercom = function () {
    return "function" == typeof Intercom;
  }),
  (Boei.prototype.openChatIntercom = function () {
    if (!this.isLoadedIntercom())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    Intercom("show");
  }),
  (Boei.prototype.hideIntercom = function () {
    if (!this.isLoadedIntercom()) return null;
    Intercom("update", { hide_default_launcher: !0 });
    let e = this;
    Intercom("onShow", function () {
      e.closeBoei();
    });
  }),
  (Boei.prototype.isLoadedDrift = function () {
    return !(void 0 === window.drift);
  }),
  (Boei.prototype.hideDrift = function () {
    if (!this.isLoadedDrift()) return null;
    let e = this;
    drift.on("ready", function (t) {
      t.widget.hide(),
        drift.on("message", function (o) {
          t.widget.show(), e.closeBoei(), e.hideBoeiButton();
        }),
        drift.on("chatClose", function (o) {
          t.widget.hide(), e.showBoeiButton();
        });
    });
  }),
  (Boei.prototype.openChatDrift = function () {
    if (!this.isLoadedDrift())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    window.drift.api.widget.show(),
      window.drift.api.openChat(),
      this.closeBoei(),
      this.hideBoeiButton();
  }),
  (Boei.prototype.isLoadedFroged = function () {
    return !(void 0 === window.frogedSettings);
  }),
  (Boei.prototype.openChatFroged = function () {
    if (!this.isLoadedFroged())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    Froged("open");
  }),
  (Boei.prototype.hideFroged = function () {
    if (!this.isLoadedFroged()) return null;
    let e = this;
    Froged("hook", "onOpen", () => {
      e.closeBoei();
    });
  }),
  (Boei.prototype.isLoadedContinually = function () {
    return "undefined" != typeof continually;
  }),
  (Boei.prototype.openChatContinually = function (e) {
    if (!this.isLoadedContinually())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    e.style.backgroundImage = "url('" + this.loading_src + "')";
    let t = this;
    continually.on("startConversation", function (e) {
      t.closeBoei();
    }),
      continually.startConversation();
  }),
  (Boei.prototype.hideContinually = function () { }),
  (Boei.prototype.isLoadedLiveAgent = function () {
    return "undefined" != typeof liveAgentChatButton;
  }),
  (Boei.prototype.openChatLiveAgent = function (e) {
    if (!this.isLoadedLiveAgent())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    this.closeBoei(), liveAgentChatButton.onClick();
  }),
  (Boei.prototype.hideLiveAgent = function () {
    let e = document.querySelectorAll(
      ".circleContactButtonWrap,.circleChatButtonWrap"
    );
    var t;
    for (t = 0; t < e.length; t++) e[t].style.display = "none";
  }),
  (Boei.prototype.isLoadedQuriobot = function () {
    return "undefined" != typeof quriobot;
  }),
  (Boei.prototype.openChatQuriobot = function (e) {
    if (!this.isLoadedQuriobot())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    this.closeBoei(),
      void 0 !== e.options.bot_path
        ? quriobot.start(e.options.bot_path)
        : quriobot.start();
  }),
  (Boei.prototype.hideQuriobot = function () { }),
  (Boei.prototype.isLoadedBotstar = function () {
    return "undefined" != typeof BotStarApi;
  }),
  (Boei.prototype.openChatBotstar = function (e) {
    if (!this.isLoadedBotstar())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    BotStarApi("open"), this.closeBoei();
  }),
  (Boei.prototype.hideBotstar = function () {
    if (!this.isLoadedBotstar()) return !1;
    var e = document.head || document.getElementsByTagName("head")[0],
      t = document.createElement("style");
    t.appendChild(
      document.createTextNode(
        '[class^="bs-chatbot-fab"] { display: none !important; }'
      )
    ),
      e.appendChild(t);
    let o = this;
    BotStarApi("onOpen", function (e) {
      o.closeBoei();
    });
  }),
  (Boei.prototype.isLoadedTawk = function () {
    return "undefined" != typeof Tawk_API;
  }),
  (Boei.prototype.openChatTawk = function (e) {
    if (!this.isLoadedTawk())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    try {
      (Tawk_API = Tawk_API || {}),
        Tawk_API.showWidget(),
        Tawk_API.toggle(),
        this.closeBoei(),
        this.hideBoeiButton();
    } catch (e) {
      alert("Sorry, chat is not loaded. Please select alternative."),
        console.log(e.message),
        this.showBoeiButton();
    }
  }),
  (Boei.prototype.hideTawk = function () {
    if (!this.isLoadedTawk()) return !1;
    Tawk_API = Tawk_API || {};
    let e = this;
    (Tawk_API.onLoad = function () {
      Tawk_API.hideWidget();
    }),
      (Tawk_API.onChatStarted = function () {
        Tawk_API.showWidget(), e.closeBoei(), e.hideBoeiButton();
      }),
      (Tawk_API.onChatMessageAgent = function () {
        Tawk_API.showWidget(), e.closeBoei(), e.hideBoeiButton();
      }),
      (Tawk_API.onChatMessageSystem = function () {
        Tawk_API.showWidget(), e.closeBoei(), e.hideBoeiButton();
      }),
      (Tawk_API.onChatEnded = function () {
        Tawk_API.hideWidget(), e.showBoeiButton();
      }),
      (Tawk_API.onChatMinimized = function () {
        Tawk_API.hideWidget(), e.showBoeiButton();
      }),
      (Tawk_API.onStatusChange = function (e) {
        Tawk_API.hideWidget();
      });
  }),
  (Boei.prototype.isLoadedJivochat = function () {
    return void 0 !== window.jivo_api;
  }),
  (Boei.prototype.openChatJivochat = function () {
    if (!this.isLoadedJivochat())
      return (
        alert("Sorry, chat is not loaded. Please select alternative."), null
      );
    let e = document.querySelectorAll("jdiv");
    e.length > 0 && (e[0].style.display = "inline-block"),
      this.closeBoei(),
      jivo_api.open();
  }),
  (Boei.prototype.hideJivochat = function () { }),
  (Boei.prototype.interactionButtonClicked = function () {
    if (this.interaction_button_clicked) return !0;
    (this.interaction_button_clicked = !0),
      this.saveInteraction(this.interaction_url);
  }),
  (Boei.prototype.interactionHelperClicked = function (e) {
    if (e in this.interaction_helper_clicked) return !0;
    (this.interaction_helper_clicked[e] = !0), this.saveInteraction(e);
  }),
  (Boei.prototype.saveInteraction = function (e) {
    fetch(e, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer"
    }).catch((e) => {
      console.log("Error in saving interaction:", e);
    });
  }),
  (Boei.prototype.getPageInfo = function (e) {
    return {
      page_title: document.title,
      page_url: window.location.hostname + window.location.pathname
    };
  }),
  (Boei.prototype.processFormData = function (e, t) {
    let o = document.getElementById(this.dom_form_success_id),
      i = document.getElementById(this.dom_form_loading_id),
      n = document.getElementById(this.dom_form_container_id);
    i.style.display = "block";
    let s = document.createElement("p"),
      r = document.createTextNode(
        "Houston we have a problem. Sorry, an error occurred. Please use an alternative contact option."
      );
    s.appendChild(r),
      (s.style.display = "none"),
      n.appendChild(s),
      fetch(e, {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(t)
      })
        .then((e) => {
          e.ok ? (o.style.display = "block") : (s.style.display = "block"),
            (i.style.display = "none");
        })
        .catch((e) => {
          console.log("Error:", e),
            (s.style.display = "block"),
            (i.style.display = "none");
        });
  }),
  (Boei.prototype.createFormContainer = function () {
    this.closeHelpers();
    let e = document.createElement("div");
    return (
      (e.className = "boei-opened"),
      (e.id = this.dom_form_container_id),
      (e.style =
        "box-sizing: border-box; max-width: 400px; border: 2px solid #ffffff; background-color: #ffffff; color: rgb(104, 104, 104); z-index: " +
        this.z_index_base +
        "; position: fixed; padding: 10px 20px 10px 20px; border-radius: 5px; font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize +
        "; line-height: 1; box-shadow: 0 5px 8px 0 rgba(0,0,0,.125); transition: transform .15s ease-in-out;"),
      this.setPosition("widget", e),
      e
    );
  }),
  (Boei.prototype.createForm = function (e, t) {
    let o = document.createElement("div");
    o.id = e;
    let i = document.createElement("input");
    return (
      (i.id = this.dom_form_helper_id),
      (i.type = "hidden"),
      (i.value = t),
      o.appendChild(i),
      o
    );
  }),
  (Boei.prototype.createLoading = function () {
    let e = document.createElement("img");
    return (
      this.accessibilize("svg", e),
      (e.src = this.loading_src),
      (e.style = "height: 25px; width: 25px; margin: 0px; display: inline;"),
      (e.id = this.dom_form_loading_id),
      (e.style.display = "none"),
      e
    );
  }),
  (Boei.prototype.createSuccessMessage = function (e) {
    let t = document.createElement("p");
    return (
      (t.innerHTML = e),
      (t.id = this.dom_form_success_id),
      (t.style =
        "padding: 0; margin: 0; color: rgb(104, 104, 104); font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize +
        "; line-height: 1.4; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;"),
      (t.style.display = "none"),
      t
    );
  }),
  (Boei.prototype.createSubmitButton = function (e) {
    let t = document.createElement("button"),
      o = document.createTextNode(e);
    return (
      (t.style =
        "box-sizing: border-box; border: 0; display: block; width: 100%; margin-top: 15px; background-color: " +
        this.brandcolor +
        "; color: " +
        this.brandcolor_text +
        "; padding: 6px 12px; border-radius: 3px; cursor: pointer; text-align: center; font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize +
        "; line-height: 1; text-decoration: none; box-shadow: 0 5px 8px 0 rgba(0,0,0,.125); font-weight: normal; letter-spacing: normal; text-transform: none;"),
      t.appendChild(o),
      t
    );
  }),
  (Boei.prototype.createNameField = function (e) {
    var t = document.createElement("div"),
      o = document.createElement("input");
    (o.type = "text"),
      (o.placeholder = e),
      (o.required = !0),
      (o.id = this.dom_form_name_id),
      o.setAttribute("autocomplete", "name"),
      (o.style =
        "margin-bottom: 15px; width: 100%; box-sizing: border-box; border: 1px solid #e2e5ec; background-color: #ffffff; color: rgb(104, 104, 104); padding: 8px; border-radius: 5px; font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize +
        "; line-height: 1; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;"),
      t.appendChild(o);
    let i = document.getElementById(this.dom_input_customer_name_field);
    return null != i && (o.value = i.value), t;
  }),
  (Boei.prototype.createEmailField = function (e) {
    let t = document.createElement("div"),
      o = document.createElement("input");
    (o.type = "email"),
      (o.placeholder = e),
      (o.required = !0),
      (o.id = this.dom_form_email_id),
      o.setAttribute("autocomplete", "email"),
      (o.style =
        "margin-bottom: 15px; width: 100%; box-sizing: border-box; border: 1px solid #e2e5ec; background-color: #ffffff; color: rgb(104, 104, 104); padding: 8px; border-radius: 5px; font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize +
        "; line-height: 1; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;");
    let i = document.getElementById(this.dom_input_customer_email_field);
    return null != i && (o.value = i.value), t.appendChild(o), t;
  }),
  (Boei.prototype.createInputField = function (e, t, o, i, n = "", s = "") {
    var r = document.createElement("div"),
      d = document.createElement("input");
    return (
      (d.type = t),
      (d.placeholder = e),
      (d.required = o),
      (d.id = i),
      d.setAttribute("autocomplete", n),
      (d.style =
        "margin-bottom: 15px; width: 100%; box-sizing: border-box; border: 1px solid #e2e5ec; background-color: #ffffff; color: rgb(104, 104, 104); padding: 8px; border-radius: 5px; font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize +
        "; line-height: 1; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;" +
        s),
      r.appendChild(d),
      r
    );
  }),
  (Boei.prototype.createTextareaField = function (e, t, o) {
    var i = document.createElement("div"),
      n = document.createElement("textarea");
    return (
      (n.id = o),
      (n.required = t),
      (n.placeholder = e),
      (n.style =
        "width: 100%; box-sizing: border-box; border: 1px solid #e2e5ec; resize: none; height: 96px; background-color: #ffffff; color: rgb(104, 104, 104); padding: 8px; border-radius: 5px; font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize +
        "; line-height: 1; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;"),
      i.appendChild(n),
      i
    );
  }),
  (Boei.prototype.createParagraph = function (e) {
    let t = document.createElement("p");
    return (
      (t.innerHTML = e),
      (t.style =
        "padding: 8px; margin: 0; color: rgb(104, 104, 104); font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize +
        "; line-height: 1.4; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;"),
      t
    );
  }),
  (Boei.prototype.createGDPRCheckbox = function (e) {
    let t = document.createElement("div");
    t.style =
      "width: 100%; box-sizing: border-box; background-color: #ffffff; margin-top: 10px;";
    let o = document.createElement("input");
    (o.type = "checkbox"),
      (o.required = !0),
      (o.id = this.dom_gdpr_consent_checkbox),
      t.appendChild(o);
    let i = document.createElement("label");
    return (
      (i.id = this.dom_gdpr_consent_label),
      i.setAttribute("for", this.dom_gdpr_consent_checkbox),
      (i.innerHTML = e),
      (i.style =
        "padding: 8px; margin: 0; color: rgb(104, 104, 104); font-family: " +
        this.fontfamily +
        "; font-size: " +
        this.fontsize_small +
        "; line-height: 1.4; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;"),
      t.appendChild(i),
      t
    );
  }),
  (Boei.prototype.validGDPRCheckbox = function () {
    var e = document.getElementById(this.dom_gdpr_consent_checkbox);
    if (null != e) {
      var t = document.getElementById(this.dom_gdpr_consent_label);
      return e.checked
        ? ((t.style.color = ""), !0)
        : ((t.style.color = "red"), !1);
    }
    return !0;
  }),
  (Boei.prototype.validNameField = function () {
    let e = document.getElementById(this.dom_form_name_id);
    return e.value.length < 2
      ? ((e.style.borderColor = "red"), e.focus(), !1)
      : ((e.style.borderColor = ""), !0);
  }),
  (Boei.prototype.validInputField = function (e, t = 0, o = 1e4) {
    let i = document.getElementById(e);
    return i.value.length < t || i.value.length > o
      ? ((i.style.borderColor = "red"), i.focus(), !1)
      : ((i.style.borderColor = ""), !0);
  }),
  (Boei.prototype.validEmailField = function () {
    var e = document.getElementById(this.dom_form_email_id);
    return e.value.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
      ? ((e.style.borderColor = ""), !0)
      : ((e.style.borderColor = "red"), e.focus(), !1);
  }),
  (Boei.prototype.openCallMeBackForm = function (e) {
    let t = this.createFormContainer(),
      o = this.createForm(this.dom_call_me_back_form_id, e.options.helper_id);
    o.appendChild(this.createParagraph(e.options.call_me_back_intro)),
      void 0 !== e.options.label_name &&
      "" !== e.options.label_name &&
      null != e.options.label_name &&
      o.appendChild(this.createNameField(e.options.label_name));
    let i = document.createElement("div"),
      n = document.createElement("input");
    if (
      ((n.type = "tel"),
        (n.placeholder = e.options.call_me_back_phone),
        (n.required = !0),
        (n.id = this.dom_call_me_back_phone_id),
        n.setAttribute("autocomplete", "tel"),
        (n.style =
          "width: 100%; box-sizing: border-box; border: 1px solid #e2e5ec; background-color: #ffffff; color: rgb(104, 104, 104); padding: 8px; border-radius: 5px; font-family: " +
          this.fontfamily +
          "; font-size: " +
          this.fontsize +
          "; line-height: 1; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;"),
        i.appendChild(n),
        o.appendChild(i),
        void 0 !== e.options.call_me_back_when &&
        "" !== e.options.call_me_back_when &&
        null != e.options.call_me_back_when)
    ) {
      var s = document.createElement("div"),
        r = document.createElement("textarea");
      (r.id = this.dom_call_me_back_when_id),
        (r.required = !0),
        (r.placeholder = e.options.call_me_back_when),
        (r.style =
          "width: 100%; box-sizing: border-box; border: 1px solid #e2e5ec; resize: none; height: 96px; margin-top: 15px; background-color: #ffffff; color: rgb(104, 104, 104); padding: 8px; border-radius: 5px; font-family: " +
          this.fontfamily +
          "; font-size: " +
          this.fontsize +
          "; line-height: 1; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;"),
        s.appendChild(r),
        o.appendChild(s);
    }
    void 0 !== e.options.gdpr_message &&
      "" !== e.options.gdpr_message &&
      null != e.options.gdpr_message &&
      o.appendChild(this.createGDPRCheckbox(e.options.gdpr_message));
    let d = this.createSubmitButton(e.options.call_me_back_button);
    o.appendChild(d),
      d.addEventListener("click", this.sendCallMeBackForm.bind(this, d), !1),
      t.appendChild(o),
      t.appendChild(this.createLoading()),
      t.appendChild(this.createSuccessMessage(e.options.call_me_back_success)),
      document.body.appendChild(t);
  }),
  (Boei.prototype.sendCallMeBackForm = function (e) {
    let t = document.getElementById(this.dom_call_me_back_form_id);
    t.style.display = "none";
    let o = {
      type: "call_me_back",
      helper_id: document.getElementById(this.dom_form_helper_id).value,
      page_info: this.getPageInfo()
    };
    if (null != document.getElementById(this.dom_form_name_id)) {
      if (!this.validNameField()) return (t.style.display = "block"), !1;
      o.name = document.getElementById(this.dom_form_name_id).value;
    }
    let i = document.getElementById(this.dom_call_me_back_phone_id);
    if (null != i) {
      let e = /^([\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6})$/;
      if (!i.value.match(e))
        return (i.style.borderColor = "red"), (t.style.display = "block"), !1;
      (i.style.borderColor = ""), (o.phone = i.value);
    }
    let n = document.getElementById(this.dom_call_me_back_when_id);
    if (null != n) {
      if (!this.validInputField(this.dom_call_me_back_when_id, 2, 180))
        return (t.style.display = "block"), !1;
      o.when = n.value;
    }
    if (!this.validGDPRCheckbox()) return (t.style.display = "block"), !1;
    this.processFormData(this.send_form_to_url, o);
  }),
  (Boei.prototype.openMailForm = function (e) {
    let t = this.createFormContainer(),
      o = this.createForm(this.dom_contact_form_id, e.options.helper_id);
    o.appendChild(this.createParagraph(e.options.contact_form_text_intro)),
      void 0 !== e.options.label_subject &&
      "" !== e.options.label_subject &&
      null != e.options.label_subject &&
      o.appendChild(
        this.createInputField(
          e.options.label_subject,
          "text",
          !0,
          this.dom_form_subject_id
        )
      ),
      void 0 !== e.options.label_name &&
      "" !== e.options.label_name &&
      null != e.options.label_name &&
      o.appendChild(this.createNameField(e.options.label_name)),
      void 0 !== e.options.contact_form_text_email &&
      "" !== e.options.contact_form_text_email &&
      null != e.options.contact_form_text_email &&
      o.appendChild(this.createEmailField(e.options.contact_form_text_email)),
      void 0 !== e.options.label_custom1 &&
      "" !== e.options.label_custom1 &&
      null != e.options.label_custom1 &&
      o.appendChild(
        this.createInputField(
          e.options.label_custom1,
          "text",
          !0,
          this.dom_form_custom1_id
        )
      ),
      void 0 !== e.options.label_custom2 &&
      "" !== e.options.label_custom2 &&
      null != e.options.label_custom2 &&
      o.appendChild(
        this.createInputField(
          e.options.label_custom2,
          "text",
          !0,
          this.dom_form_custom2_id
        )
      ),
      void 0 !== e.options.label_custom3 &&
      "" !== e.options.label_custom3 &&
      null != e.options.label_custom3 &&
      o.appendChild(
        this.createInputField(
          e.options.label_custom3,
          "text",
          !0,
          this.dom_form_custom3_id
        )
      ),
      void 0 !== e.options.label_custom4 &&
      "" !== e.options.label_custom4 &&
      null != e.options.label_custom4 &&
      o.appendChild(
        this.createInputField(
          e.options.label_custom4,
          "text",
          !0,
          this.dom_form_custom4_id
        )
      ),
      void 0 !== e.options.label_custom5 &&
      "" !== e.options.label_custom5 &&
      null != e.options.label_custom5 &&
      o.appendChild(
        this.createInputField(
          e.options.label_custom5,
          "text",
          !0,
          this.dom_form_custom5_id
        )
      ),
      void 0 !== e.options.contact_form_text_message &&
      "" !== e.options.contact_form_text_message &&
      null != e.options.contact_form_text_message &&
      o.appendChild(
        this.createTextareaField(
          e.options.contact_form_text_message,
          !1,
          this.dom_form_message_id
        )
      ),
      void 0 !== e.options.gdpr_message &&
      "" !== e.options.gdpr_message &&
      null != e.options.gdpr_message &&
      o.appendChild(this.createGDPRCheckbox(e.options.gdpr_message));
    let i = this.createSubmitButton(e.options.contact_form_text_send);
    o.appendChild(i),
      i.addEventListener("click", this.sendMailForm.bind(this, i), !1),
      t.appendChild(o),
      t.appendChild(this.createLoading()),
      t.appendChild(
        this.createSuccessMessage(e.options.contact_form_text_success)
      ),
      document.body.appendChild(t);
  }),
  (Boei.prototype.sendMailForm = function (e) {
    var t = document.getElementById(this.dom_contact_form_id);
    t.style.display = "none";
    let o = {
      type: "contact_form",
      helper_id: document.getElementById(this.dom_form_helper_id).value,
      page_info: this.getPageInfo()
    },
      i = document.getElementById(this.dom_form_subject_id);
    if (null != i) {
      if (!this.validInputField(this.dom_form_subject_id, 2, 100))
        return (t.style.display = "block"), !1;
      o.subject = i.value;
    }
    let n = document.getElementById(this.dom_form_name_id);
    if (null != n) {
      if (!this.validNameField()) return (t.style.display = "block"), !1;
      o.name = n.value;
    }
    let s = document.getElementById(this.dom_form_email_id);
    if (null != s) {
      if (!this.validEmailField()) return (t.style.display = "block"), !1;
      o.email = s.value;
    }
    let r = document.getElementById(this.dom_form_custom1_id);
    if (null != r) {
      if (!this.validInputField(this.dom_form_custom1_id, 2, 180))
        return (t.style.display = "block"), !1;
      o.custom1 = r.value;
    }
    let d = document.getElementById(this.dom_form_custom2_id);
    if (null != d) {
      if (!this.validInputField(this.dom_form_custom2_id, 2, 180))
        return (t.style.display = "block"), !1;
      o.custom2 = d.value;
    }
    let l = document.getElementById(this.dom_form_custom3_id);
    if (null != l) {
      if (!this.validInputField(this.dom_form_custom3_id, 2, 180))
        return (t.style.display = "block"), !1;
      o.custom3 = l.value;
    }
    let a = document.getElementById(this.dom_form_custom4_id);
    if (null != a) {
      if (!this.validInputField(this.dom_form_custom4_id, 2, 180))
        return (t.style.display = "block"), !1;
      o.custom4 = a.value;
    }
    let c = document.getElementById(this.dom_form_custom5_id);
    if (null != c) {
      if (!this.validInputField(this.dom_form_custom5_id, 2, 180))
        return (t.style.display = "block"), !1;
      o.custom5 = c.value;
    }
    let p = document.getElementById(this.dom_form_message_id);
    if (null != p) {
      if (p.value.length < 10)
        return (
          (p.style.borderColor = "red"),
          p.focus(),
          (t.style.display = "block"),
          !1
        );
      (p.style.borderColor = ""), (o.message = p.value);
    }
    if (!this.validGDPRCheckbox()) return (t.style.display = "block"), !1;
    this.processFormData(this.send_form_to_url, o);
  }),
  (Boei.prototype.openFeedbackForm = function (e) {
    let t = this.createFormContainer(),
      o = this.createForm(this.dom_feedback_form_id, e.options.helper_id);
    o.appendChild(this.createParagraph(e.options.intro)),
      o.appendChild(
        this.createInputField("", "hidden", !0, this.dom_feedback_selected_id)
      );
    let i = document.createElement("div");
    (i.style = "margin-bottom: 15px; text-align: center;"),
      e.options.feedback_images.forEach((e) => {
        let t = document.createElement("img");
        (t.src = e.image),
          (t.style =
            "height: 30px; width: 30px; cursor: hand; margin-left: 5px; border: 2px solid #ffffff;"),
          (t.className = "boei-feedback-form-image"),
          i.appendChild(t),
          t.addEventListener(
            "click",
            this.clickFeedbackImage.bind(this, t, e.name),
            !1
          );
      }),
      o.appendChild(i),
      void 0 !== e.options.comment_label &&
      "" !== e.options.comment_label &&
      null != e.options.comment_label &&
      o.appendChild(
        this.createTextareaField(
          e.options.comment_label,
          !1,
          this.dom_feedback_comment_id
        )
      );
    let n = this.createSubmitButton(e.options.button_label);
    o.appendChild(n),
      n.addEventListener("click", this.sendFeedbackForm.bind(this, n), !1),
      t.appendChild(o),
      t.appendChild(this.createLoading()),
      t.appendChild(this.createSuccessMessage(e.options.success_message)),
      document.body.appendChild(t);
  }),
  (Boei.prototype.clickFeedbackImage = function (e, t) {
    (document.getElementById(this.dom_feedback_selected_id).value = t),
      Array.from(
        document.getElementsByClassName("boei-feedback-form-image")
      ).forEach(function (e, t, o) {
        e.style.borderColor = "#ffffff";
      }),
      (e.style.borderColor = this.brandcolor);
  }),
  (Boei.prototype.sendFeedbackForm = function (e) {
    let t = document.getElementById(this.dom_feedback_form_id);
    t.style.display = "none";
    let o = {
      type: "feedback_form",
      helper_id: document.getElementById(this.dom_form_helper_id).value,
      page_info: this.getPageInfo()
    },
      i = document.getElementById(this.dom_feedback_selected_id);
    if (i.value.length < 1)
      return (
        Array.from(
          document.getElementsByClassName("boei-feedback-form-image")
        ).forEach(function (e, t, o) {
          e.style.borderColor = "red";
        }),
        (t.style.display = "block"),
        !1
      );
    o.feedback = i.value;
    let n = document.getElementById(this.dom_feedback_comment_id);
    if (null != n) {
      if (!this.validInputField(this.dom_feedback_comment_id, 2, 180))
        return (t.style.display = "block"), !1;
      o.comment = n.value;
    }
    this.processFormData(this.send_form_to_url, o);
  }),
  (Boei.prototype.openHtml = function (e) {
    let t = this.createFormContainer();
    const o =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
      i =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    o > 512 &&
      i > 288 &&
      ((t.style.maxWidth = "512px"),
        (t.style.width = "512px"),
        (t.style.height = "288px")),
      (t.style.overflowY = "auto"),
      (t.style.overflowX = "hidden");
    let n = document.createElement("div");
    (n.style =
      "display: relative; width: 100%;  height: 100%; padding: 8px; margin: 0; color: rgb(104, 104, 104); font-family: " +
      this.fontfamily +
      "; font-size: " +
      this.fontsize +
      "; line-height: 1.4; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;"),
      (n.innerHTML = e.options.html),
      t.appendChild(n),
      document.body.appendChild(t);
  }),
  (Boei.prototype.openIframeWidget = function (e) {
    let t = this.createFormContainer();
    t.style.padding = "0";
    const o =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
      i =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    (o < 860 || i < 580) &&
      ((t.style.maxWidth = o - 60 + "px"),
        (t.style.width = o - 60 + "px"),
        (t.style.height = i - 30 - 40 - 30 - 30 + "px")),
      o > 860 &&
      i > 580 &&
      ((t.style.maxWidth = "800px"),
        (t.style.width = "800px"),
        (t.style.height = "450px")),
      (t.innerHTML =
        "<div style='position: relative; display: block; width: 100%; height: 100%; padding: 0; overflow: hidden;'><iframe style='width: 100%; height: 100%; border: 0; box-sizing: border-box;' src=\"" +
        e.options.url +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'),
      document.body.appendChild(t);
  }),
  (Boei.prototype.openMarkdown = function (e) {
    let t = this.createFormContainer();
    (t.style.overflowY = "auto"), (t.style.overflowX = "hidden");
    let o = document.createElement("div");
    (o.style =
      "display: relative; width: 100%; height: 100%; padding: 8px; margin: 0; color: rgb(104, 104, 104); font-family: " +
      this.fontfamily +
      "; font-size: " +
      this.fontsize +
      "; line-height: 1.4; text-decoration: none; font-weight: normal; letter-spacing: normal; text-transform: none;"),
      (o.innerHTML = e.options.body),
      t.appendChild(o),
      document.body.appendChild(t);
  }),
  (Boei.prototype.openNewsletterSignupForm = function (e) {
    let t = this.createFormContainer(),
      o = this.createForm(this.dom_newsletter_signup_id, e.options.helper_id);
    o.appendChild(this.createParagraph(e.options.newsletter_signup_intro)),
      void 0 !== e.options.label_name &&
      "" !== e.options.label_name &&
      null != e.options.label_name &&
      o.appendChild(this.createNameField(e.options.label_name)),
      o.appendChild(this.createEmailField(e.options.newsletter_signup_email)),
      void 0 !== e.options.gdpr_message &&
      "" !== e.options.gdpr_message &&
      null != e.options.gdpr_message &&
      o.appendChild(this.createGDPRCheckbox(e.options.gdpr_message));
    let i = this.createSubmitButton(e.options.newsletter_signup_button);
    o.appendChild(i),
      i.addEventListener(
        "click",
        this.sendNewsletterSignupForm.bind(this, i),
        !1
      ),
      t.appendChild(o),
      t.appendChild(this.createLoading()),
      t.appendChild(
        this.createSuccessMessage(e.options.newsletter_signup_success)
      ),
      document.body.appendChild(t);
  }),
  (Boei.prototype.sendNewsletterSignupForm = function (e) {
    var t = document.getElementById(this.dom_newsletter_signup_id);
    t.style.display = "none";
    let o = {
      type: "newsletter_signup",
      helper_id: document.getElementById(this.dom_form_helper_id).value,
      page_info: this.getPageInfo()
    };
    if (null != document.getElementById(this.dom_form_name_id)) {
      if (!this.validNameField()) return (t.style.display = "block"), !1;
      o.name = document.getElementById(this.dom_form_name_id).value;
    }
    return this.validEmailField()
      ? ((o.email = document.getElementById(this.dom_form_email_id).value),
        this.validGDPRCheckbox()
          ? void this.processFormData(this.send_form_to_url, o)
          : ((t.style.display = "block"), !1))
      : ((t.style.display = "block"), !1);
  }),
  (Boei.prototype.openYoutubeWidget = function (e) {
    let t = this.createFormContainer();
    t.style.padding = "0";
    const o =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
      i =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    o > 532 &&
      i > 318 &&
      ((t.style.maxWidth = "512px"),
        (t.style.width = "512px"),
        (t.style.height = "288px")),
      (t.innerHTML =
        "<div style='position: relative; display: block; width: 100%; height: 100%; padding: 0; overflow: hidden;'><iframe style='width: 100%; height: 100%; border: 0; box-sizing: border-box;' src=\"//www.youtube.com/embed/" +
        e.options.video_id +
        '?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'),
      document.body.appendChild(t);
  });
var boeiEmbed = new Boei({
  key: "b65c0871-855c-46d9-a729-c5f075867755",
  icon_src: "https://app.boei.help/button-icons/lifesaver.svg",
  button_image: null,
  brandcolor: "#713EEC",
  brandcolor_text: "#FFFFFF",
  close_src: "https://app.boei.help/close.svg",
  loading_src: "https://app.boei.help/loading.svg",
  trigger_after_seconds: 1,
  trigger_message:
    "Boei is installed on your site \ud83e\udd73 Continue here \ud83d\udc49",
  position: "bottom_right",
  font_family: null,
  font_size: null,
  shape: "square_round_edge",
  send_form_to_url:
    "https://app.boei.help/send_form/b65c0871-855c-46d9-a729-c5f075867755",
  interaction_url:
    "https://app.boei.help/interaction/b65c0871-855c-46d9-a729-c5f075867755",
  display_watermark: true,
  hide_on_pages: null,
  opacity: 1,
  is_out_of_office: false,
  allow_identifiers: true,
  display_close_trigger_message: false,
  close_trigger_after_seconds: 0,
  helpers: [
    {
      type: "link",
      title: "\u2705 Clear browser cache when you don't see results",
      url: "https://app.boei.help/docs/1.0/clear_cache",
      options: {
        helper_id: 3588,
        new_window: "true",
        hide_out_of_office: null
      },
      icon_url: null,
      interaction_url:
        "https://app.boei.help/interaction/b65c0871-855c-46d9-a729-c5f075867755/3588"
    },
    {
      type: "link",
      title: "\ud83e\udd14 Don't forget to add subdomains like www.",
      url: "https://app.boei.help/docs/1.0/setup_domain",
      options: {
        helper_id: 3587,
        new_window: "true",
        hide_out_of_office: null
      },
      icon_url: null,
      interaction_url:
        "https://app.boei.help/interaction/b65c0871-855c-46d9-a729-c5f075867755/3587"
    },
    {
      type: "link",
      title: "\ud83d\ude80 Add your domain in Boei. Read here how to do it.",
      url: "https://boei.help/docs/setup-domain",
      options: { helper_id: 46, new_window: "true" },
      icon_url: null,
      interaction_url:
        "https://app.boei.help/interaction/b65c0871-855c-46d9-a729-c5f075867755/46"
    },
    {
      type: "link",
      title: "\ud83d\ude35 Boei cannot find your domain",
      url: "https://boei.help/docs/setup-domain",
      options: { helper_id: 8031, new_window: null, hide_out_of_office: null },
      icon_url: null,
      interaction_url:
        "https://app.boei.help/interaction/b65c0871-855c-46d9-a729-c5f075867755/8031"
    }
  ]
});
