class ApplicationController < ActionController::API
  rescue_from CouchModel::RecordNotFound, with: :render_not_found

  private

  def render_not_found(error)
    render json: { error: error.message }, status: :not_found
  end
end
