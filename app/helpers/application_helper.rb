module ApplicationHelper
  def flash_class(type)
    {
      "notice" => "alert-primary",
      "alert" => "alert-danger"
    }[type]
  end
end
