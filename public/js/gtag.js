function gtagSendEvent(url) {
    var callback = function () {
      if (typeof url === 'string') {
        window.location = url;
      }
    };
    gtag('event', 'conversion_event_submit_lead_form', {
      'event_callback': callback,
      'event_timeout': 2000,
      // <event_parameters>
    });
    return false;
  }