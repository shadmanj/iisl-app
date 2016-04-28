class WelcomeController < ApplicationController
  def index
  end

  # Update database based on keyboard
	def update_images
		respond_to do |format|
		if @image.update(:image, "damaged")
			format.html {redirect_to @image, notice: "Image was successfully updated"}
			format.json{render :show, status: :ok, location: @image}
		else
			format.html {render :edit}
			format.json{ render json: @image.errors, status: :unprocessable_entity}
		end
	end
end
end