# frozen_string_literal: true
class DataStudiosController < ApplicationController
  def index
    @categories = Category.first(10)
  end
end
