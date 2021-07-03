import { Controller } from "stimulus"
import CableReady from 'cable_ready'
import {Modal} from "bootstrap"


export default class extends Controller {
  static targets = ["content"]

  connect() {
    document.addEventListener("ajax:success", this.performOperations)
    this.modal = new Modal(this.element)
    CableReady.operations.openModal = this.openModal
    CableReady.operations.closeModal = this.closeModal
    CableReady.operations.updateModal = this.updateModal
  }

  disconnect() {
    document.removeEventListener("ajax:success", this.performOperations)
    delete CableReady.operations.openModal
    delete CableReady.operations.closeModal
    delete CableReady.operations.updateModal
  }

  performOperations = async event => {
    if (!event.detail.response.headers.get("Content-Type").match(/text\/vnd\.cable-modal\.json/)) { return }
    const operations = JSON.parse(await event.detail.fetchResponse.responseText)
    CableReady.perform(operations)
  }

  openModal = operation => {
    this.modal.show()
  }

  updateModal = operation => {
    this.contentTarget.innerHTML = operation.html
    this.modal.handleUpdate()
  }

  closeModal = operation => {
    this.modal.hide()
  }
}

CableReady.operations.visit = operation => {
  if (window.Turbolinks) {
    window.Turbolinks.visit(operation.url)
  } else if (window.Turbo) {
    window.Turbo.visit(operation.url)
  } else {
    window.location.href = operation.url
  }
}
