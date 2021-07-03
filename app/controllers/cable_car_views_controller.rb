class CableCarViewsController < ApplicationController

  def index
    respond_to do |format|
      format.html
      format.cablecar { @message = "Hello World!"}
    end
  end

end
