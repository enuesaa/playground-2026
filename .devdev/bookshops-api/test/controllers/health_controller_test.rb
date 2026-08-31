require "test_helper"

class HealthControllerTest < ActionDispatch::IntegrationTest
  test "GET /health returns ok status" do
    get "/health"

    assert_response :success
    assert_equal({ "status" => "ok" }, JSON.parse(response.body))
  end
end
