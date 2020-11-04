class ImportAudience
  require 'csv'

  def import(file_name)
    CSV.foreach("tmp/#{file_name}", headers: true) do |row|
      row_hash = row.to_h
      # Audience::Provider
      # Audience::Category
      # Audience::Segment
      segment_description = row_hash['Segment Description']

    end
  end
end

