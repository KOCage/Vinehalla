require "test_helper"

class VinesControllerTest < ActionDispatch::IntegrationTest
  test "should get view" do
    get vines_view_url
    assert_response :success
  end
end
