# frozen_string_literal: true
class DataStudiosController < ApplicationController
  def index
    @categories = Category.root
  end
end
