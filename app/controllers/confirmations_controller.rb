class ConfirmationsController < ApplicationController
  include CableReady::Broadcaster

  def index
  end

  def new
    @confirmation = Confirmation.new

    respond_to do |format|
      format.cable_modal do
        logger.debug "Cable Modal Format"
        render operations: cable_car.update_modal(
          html: self.class.render(
            template: "confirmations/new",
            assigns: {confirmation: @confirmation},
            layout: "cable_modal",
            format: "cable_modal"
          )).open_modal
      end
    end


  end

  def create
    @confirmation = Confirmation.new(confirmation_params)
    respond_to do |format|
      format.cable_modal do
        if @confirmation.valid?
          if params[:commit] == "Submit And Close"
            render operations: cable_car.close_modal
          else
            render operations: cable_car.visit(url: confirmations_path)
          end
        else
          render operations: cable_car.update_modal(
            html: self.class.render(
              template: "confirmations/new",
              assigns: {confirmation: @confirmation},
              layout: "cable_modal",
              format: "cable_modal"
            ))
        end
      end
    end
  end

  private

  def confirmation_params
    params.require(:confirmation).permit(:tos)
  end
end
