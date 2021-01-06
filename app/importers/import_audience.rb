class ImportAudience
  require 'csv'

  def initialize(file_name)
    @file_name = file_name
  end

  def import
    CSV.foreach("#{@file_name}", headers: true) do |row|
      row_hash = {}

      row.to_h.each do |key, value|
        new_key = key&.downcase&.split(' ')&.join('_')&.to_sym
        row_hash[new_key] = value
      end

      list_of_audiences = row_hash[:segment_name].split('>').map(&:strip)

      # Some audiences has 1 layer to pull from
      # This will recreate the 2nd layer for Audience Catgeory and Segment
      list_of_audiences = list_of_audiences * 2 if list_of_audiences.count <= 1

      parent_category = nil

      list_of_audiences.map do |name|
        parent_category = Audience.find_or_create_by!(name: name, audience_id: parent_category&.id)
      end
    end
  end
end
