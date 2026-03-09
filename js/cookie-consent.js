(function() {
  'use strict';

  var STORAGE_KEY = 'kt_cookie_preferences';

  var defaults = {
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  };

  function getPreferences() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  }

  function savePreferences(prefs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {}
  }

  function injectStyles() {
    var css = ''
      + '.cookie-overlay {'
      + '  position: fixed;'
      + '  top: 0; left: 0; right: 0; bottom: 0;'
      + '  background: rgba(0,0,0,0.5);'
      + '  z-index: 9998;'
      + '  opacity: 0;'
      + '  transition: opacity 0.3s ease;'
      + '  pointer-events: none;'
      + '}'
      + '.cookie-overlay.is-visible {'
      + '  opacity: 1;'
      + '  pointer-events: auto;'
      + '}'
      + '.cookie-popup {'
      + '  position: fixed;'
      + '  bottom: 2rem;'
      + '  left: 50%;'
      + '  transform: translateX(-50%) translateY(20px);'
      + '  background: #fff;'
      + '  border-radius: 16px;'
      + '  width: 90%;'
      + '  max-width: 540px;'
      + '  max-height: 85vh;'
      + '  overflow-y: auto;'
      + '  z-index: 9999;'
      + '  padding: 2.5rem 2rem 2rem;'
      + '  box-shadow: 0 12px 48px rgba(0,0,0,0.18);'
      + '  opacity: 0;'
      + '  transition: opacity 0.3s ease, transform 0.3s ease;'
      + '  pointer-events: none;'
      + '  font-family: Satoshi, Verdana, sans-serif;'
      + '  color: #1d1d1d;'
      + '}'
      + '.cookie-popup.is-visible {'
      + '  opacity: 1;'
      + '  transform: translateX(-50%) translateY(0);'
      + '  pointer-events: auto;'
      + '}'
      + '.cookie-popup_header {'
      + '  display: flex;'
      + '  align-items: center;'
      + '  justify-content: space-between;'
      + '  margin-bottom: 0.75rem;'
      + '}'
      + '.cookie-popup_title {'
      + '  font-family: Georgia, Times, "Times New Roman", serif;'
      + '  font-size: 1.5rem;'
      + '  font-weight: 400;'
      + '  line-height: 1.3;'
      + '}'
      + '.cookie-popup_close {'
      + '  background: none;'
      + '  border: none;'
      + '  cursor: pointer;'
      + '  padding: 4px;'
      + '  color: #1d1d1d;'
      + '  opacity: 0.5;'
      + '  transition: opacity 0.2s;'
      + '}'
      + '.cookie-popup_close:hover { opacity: 1; }'
      + '.cookie-popup_description {'
      + '  font-size: 0.9375rem;'
      + '  line-height: 1.6;'
      + '  color: #444;'
      + '  margin-bottom: 1.5rem;'
      + '}'
      + '.cookie-popup_categories {'
      + '  display: flex;'
      + '  flex-direction: column;'
      + '  gap: 0;'
      + '}'
      + '.cookie-category {'
      + '  display: flex;'
      + '  align-items: flex-start;'
      + '  justify-content: space-between;'
      + '  padding: 1rem 0;'
      + '  border-top: 1px solid #e5decf;'
      + '}'
      + '.cookie-category:last-child {'
      + '  border-bottom: 1px solid #e5decf;'
      + '}'
      + '.cookie-category_info {'
      + '  flex: 1;'
      + '  padding-right: 1rem;'
      + '}'
      + '.cookie-category_name {'
      + '  font-size: 0.9375rem;'
      + '  font-weight: 700;'
      + '  margin-bottom: 0.25rem;'
      + '}'
      + '.cookie-category_desc {'
      + '  font-size: 0.8125rem;'
      + '  line-height: 1.5;'
      + '  color: #7b7b7b;'
      + '}'
      + '.cookie-category_badge {'
      + '  font-size: 0.6875rem;'
      + '  font-weight: 700;'
      + '  text-transform: uppercase;'
      + '  letter-spacing: 0.5px;'
      + '  color: #7b7b7b;'
      + '  background: #f2eee5;'
      + '  padding: 3px 8px;'
      + '  border-radius: 4px;'
      + '  white-space: nowrap;'
      + '  margin-top: 2px;'
      + '}'
      /* Toggle switch */
      + '.cookie-toggle {'
      + '  position: relative;'
      + '  width: 44px;'
      + '  min-width: 44px;'
      + '  height: 24px;'
      + '  margin-top: 2px;'
      + '}'
      + '.cookie-toggle input {'
      + '  opacity: 0;'
      + '  width: 0;'
      + '  height: 0;'
      + '  position: absolute;'
      + '}'
      + '.cookie-toggle_track {'
      + '  position: absolute;'
      + '  cursor: pointer;'
      + '  top: 0; left: 0; right: 0; bottom: 0;'
      + '  background-color: #ccc;'
      + '  transition: background-color 0.25s;'
      + '  border-radius: 24px;'
      + '}'
      + '.cookie-toggle_track:before {'
      + '  content: "";'
      + '  position: absolute;'
      + '  height: 18px;'
      + '  width: 18px;'
      + '  left: 3px;'
      + '  bottom: 3px;'
      + '  background-color: #fff;'
      + '  transition: transform 0.25s;'
      + '  border-radius: 50%;'
      + '}'
      + '.cookie-toggle input:checked + .cookie-toggle_track {'
      + '  background-color: #c9a87f;'
      + '}'
      + '.cookie-toggle input:checked + .cookie-toggle_track:before {'
      + '  transform: translateX(20px);'
      + '}'
      + '.cookie-toggle input:disabled + .cookie-toggle_track {'
      + '  background-color: #c9a87f;'
      + '  opacity: 0.6;'
      + '  cursor: default;'
      + '}'
      + '.cookie-toggle input:disabled:checked + .cookie-toggle_track:before {'
      + '  transform: translateX(20px);'
      + '}'
      /* Buttons */
      + '.cookie-popup_actions {'
      + '  display: flex;'
      + '  gap: 0.75rem;'
      + '  margin-top: 1.5rem;'
      + '}'
      + '.cookie-btn {'
      + '  flex: 1;'
      + '  border: 1px solid #1d1d1d;'
      + '  border-radius: 90px;'
      + '  padding: 0.75rem 1.5rem;'
      + '  font-family: Satoshi, Verdana, sans-serif;'
      + '  font-size: 0.875rem;'
      + '  font-weight: 500;'
      + '  cursor: pointer;'
      + '  text-align: center;'
      + '  white-space: nowrap;'
      + '  transition: all 0.3s cubic-bezier(.86,0,.07,1);'
      + '}'
      + '.cookie-btn:hover {'
      + '  transform: translateY(-4px);'
      + '}'
      + '.cookie-btn.is-primary {'
      + '  background-color: #1d1d1d;'
      + '  color: #fff;'
      + '}'
      + '.cookie-btn.is-secondary {'
      + '  background-color: transparent;'
      + '  color: #1d1d1d;'
      + '}'
      + '.cookie-btn.is-accent {'
      + '  background-color: #c9a87f;'
      + '  border-color: #c9a87f;'
      + '  color: #1d1d1d;'
      + '}'
      + '@media screen and (max-width: 479px) {'
      + '  .cookie-popup {'
      + '    padding: 2rem 1.25rem 1.5rem;'
      + '    bottom: 1rem;'
      + '    width: 94%;'
      + '  }'
      + '  .cookie-popup_actions {'
      + '    flex-direction: column;'
      + '  }'
      + '  .cookie-popup_title {'
      + '    font-size: 1.25rem;'
      + '  }'
      + '}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createPopup() {
    var prefs = getPreferences() || defaults;

    var overlay = document.createElement('div');
    overlay.className = 'cookie-overlay';

    var popup = document.createElement('div');
    popup.className = 'cookie-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-label', 'Cookie preferences');

    popup.innerHTML = ''
      + '<div class="cookie-popup_header">'
      + '  <div class="cookie-popup_title">Cookie Preferences</div>'
      + '  <button class="cookie-popup_close" aria-label="Close">'
      + '    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + '      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
      + '    </svg>'
      + '  </button>'
      + '</div>'
      + '<div class="cookie-popup_description">'
      + '  We use cookies to improve your experience on our website. You can choose which categories of cookies you allow below. For more details, see our <a href="privacy-policy.html" style="color:#c9a87f;text-decoration:underline;">Privacy Policy</a>.'
      + '</div>'
      + '<div class="cookie-popup_categories">'
      + '  <div class="cookie-category">'
      + '    <div class="cookie-category_info">'
      + '      <div class="cookie-category_name">Essential Cookies</div>'
      + '      <div class="cookie-category_desc">Required for the website to function. These cannot be disabled.</div>'
      + '    </div>'
      + '    <div class="cookie-category_badge">Always on</div>'
      + '  </div>'
      + '  <div class="cookie-category">'
      + '    <div class="cookie-category_info">'
      + '      <div class="cookie-category_name">Analytics Cookies</div>'
      + '      <div class="cookie-category_desc">Help us understand how visitors interact with our website to improve content and performance.</div>'
      + '    </div>'
      + '    <label class="cookie-toggle">'
      + '      <input type="checkbox" data-cookie="analytics"' + (prefs.analytics ? ' checked' : '') + '>'
      + '      <span class="cookie-toggle_track"></span>'
      + '    </label>'
      + '  </div>'
      + '  <div class="cookie-category">'
      + '    <div class="cookie-category_info">'
      + '      <div class="cookie-category_name">Functional Cookies</div>'
      + '      <div class="cookie-category_desc">Enable enhanced features like remembering your preferences and settings.</div>'
      + '    </div>'
      + '    <label class="cookie-toggle">'
      + '      <input type="checkbox" data-cookie="functional"' + (prefs.functional ? ' checked' : '') + '>'
      + '      <span class="cookie-toggle_track"></span>'
      + '    </label>'
      + '  </div>'
      + '  <div class="cookie-category">'
      + '    <div class="cookie-category_info">'
      + '      <div class="cookie-category_name">Marketing Cookies</div>'
      + '      <div class="cookie-category_desc">Used to deliver relevant communications and track engagement across platforms.</div>'
      + '    </div>'
      + '    <label class="cookie-toggle">'
      + '      <input type="checkbox" data-cookie="marketing"' + (prefs.marketing ? ' checked' : '') + '>'
      + '      <span class="cookie-toggle_track"></span>'
      + '    </label>'
      + '  </div>'
      + '</div>'
      + '<div class="cookie-popup_actions">'
      + '  <button class="cookie-btn is-secondary" data-action="decline">Decline All</button>'
      + '  <button class="cookie-btn is-primary" data-action="save">Save Preferences</button>'
      + '  <button class="cookie-btn is-accent" data-action="accept">Accept All</button>'
      + '</div>';

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Show with animation
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        overlay.classList.add('is-visible');
        popup.classList.add('is-visible');
      });
    });

    function close() {
      overlay.classList.remove('is-visible');
      popup.classList.remove('is-visible');
      setTimeout(function() {
        overlay.remove();
        popup.remove();
      }, 300);
    }

    // Close button
    popup.querySelector('.cookie-popup_close').addEventListener('click', close);

    // Overlay click
    overlay.addEventListener('click', close);

    // Accept all
    popup.querySelector('[data-action="accept"]').addEventListener('click', function() {
      savePreferences({ essential: true, analytics: true, functional: true, marketing: true });
      close();
    });

    // Decline all
    popup.querySelector('[data-action="decline"]').addEventListener('click', function() {
      savePreferences({ essential: true, analytics: false, functional: false, marketing: false });
      close();
    });

    // Save preferences
    popup.querySelector('[data-action="save"]').addEventListener('click', function() {
      var checkboxes = popup.querySelectorAll('[data-cookie]');
      var newPrefs = { essential: true };
      for (var i = 0; i < checkboxes.length; i++) {
        newPrefs[checkboxes[i].getAttribute('data-cookie')] = checkboxes[i].checked;
      }
      savePreferences(newPrefs);
      close();
    });
  }

  // Initialize
  injectStyles();

  // Bind to all "Cookies" footer links
  document.addEventListener('click', function(e) {
    var link = e.target.closest('.cookie-trigger');
    if (link) {
      e.preventDefault();
      createPopup();
    }
  });
})();
