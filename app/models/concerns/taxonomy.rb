require 'csv'

class Taxonomy
  def import
    CSV.foreach('tmp/axciom.csv', headers: true) do |row|
      row_hash = row.to_h
      provider = 'axciom'

      categories_array = row_hash['Segment Name'].split('>').map(&:strip)
      audience_description = row_hash['Segment Description']
      audience_name = categories_array.pop
      categories_length = categories_array.length - 1
      parent = nil

      categories_array.each_with_index do |category, index|
        parent = Category.find_or_create_by(name: category, category_id: parent&.id)

        if index == categories_length
          Audience.find_or_create_by(name: audience_name,
                                     description: audience_description,
                                     provider: provider,
                                     category_id: parent.id)
          parent.update(has_audience: true)
        end
      end
    end
  end
end
