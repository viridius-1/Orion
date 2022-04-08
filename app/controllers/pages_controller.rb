class PagesController < ApplicationController
  def redirect_landing
  end

  def redirect
  end

  def creative_studios
  end

  def platforms
  end

  def download
    creative = Creative.find_by(id: params[:creative])
    data = open(creative.full_url)
    send_data data.read, filename: creative.file.file.filename, type: creative.file.content_type, disposition: 'attachment'
  end
end
