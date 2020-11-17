class ImportAudience
  require 'csv'

  def initialize(file_name)
    @file_name = file_name
  end

  def import
    CSV.foreach("tmp/#{@file_name}", headers: true) do |row|
      row_hash = {}

      row.to_h.each do |key, value|
        new_key = key.downcase.split(' ').join('_').to_sym
        row_hash[new_key] = value
      end

      provider = Audience::Provider.find_or_create_by!(name: row_hash[:provider])


      list_of_audiences = row_hash[:segment_name].split(' > ').drop(1)

      # Some audiences has 1 layer to pull from
      # This will recreate the 2nd layer for Audience Catgeory and Segment
      list_of_audiences = list_of_audiences * 2 if list_of_audiences.count <= 1

      segment_name = list_of_audiences.pop

      parent_category = nil

      list_of_audiences.map do |name|
        parent_category = Audience::Category.find_or_create_by!(name: name,
                                                                category_id: parent_category&.id,
                                                                provider_id: provider&.id)
      end

      segment = Audience::Segment.find_or_create_by!(name: segment_name,
                                                     description: row_hash[:segment_description],
                                                     category_id: parent_category&.id)

    end
  end
end

