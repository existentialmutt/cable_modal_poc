# Cable Modal Proof of Concept

![Demo screencast](/demo.gif)

About 5 years ago I came up with an HTML-over-the-wire method for doing modal form workflows.  I released it as a gem called [ajax_modal_rails](http://github.com/existentialmutt/ajax_modal_rails).  I'm currently in the process of updating that gem to use mrujs, cable_car, and stimulus.

This is the proof of concept app, from which the new gem will be extracted.

The demo screencast shows a basic modal workflow:
1.  Open the modal and load content
2.  On validation error, reload content.
3.  On form success either:
  - dismiss the modal
  - OR
  - reload the underlying page.

All interactions are performed with mrujs decorated links and form submits that request CableReady custom operations from the server.
