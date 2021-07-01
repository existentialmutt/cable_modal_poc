// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import mrujs from "mrujs";
mrujs.registerMimeTypes(
  [
    {shortcut: "cable-modal", header: "text/vnd.cable-modal.json"}
  ]
)
mrujs.start();

import Turbolinks from "turbolinks"
Turbolinks.start()

import "controllers"

import 'bootstrap/dist/css/bootstrap.min.css'
