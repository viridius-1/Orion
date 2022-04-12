class Creative < ApplicationRecord
  belongs_to :campaign
  mount_uploader :file, CreativeUploader

  def filetype
    return 'image' if file.content_type.include?('image')
    return 'video' if file.content_type.include?('video')
    return 'audio' if file.content_type.include?('audio')
    'other'
  end

  def name
    file.url.gsub(/^.*[\\\/]/, "").split('?')[0]
  end

  def shortname
    n = name
    if n.length > 25
      return n[0..24] + "..."
    end
    n
  end

  def full_url
    "#{Rails.application.config.action_mailer.asset_host}#{file.url}"
  end
end
