class Audience < ApplicationRecord
  belongs_to :parent, class_name: 'Audience', optional: true, foreign_key: :audience_id

  has_many :children, class_name: 'Audience', dependent: :destroy

  validates :name, presence: true

  class << self
    def list_of_ancestors
      where(audience_id: nil)
    end

    def family_tree
      get_descentants(list_of_ancestors)
    end

    private

    def get_descentants(ancestor_audience)
      ancestor_audience.map do |audience|
        family_tree = { label: "#{audience.name}",
                        value: "#{audience.id}",
                        key: "#{audience.id}",
                        audience_id: audience.id }

        descentants = if audience&.children&.any?
                        get_descentants(audience&.children)
                      end

        family_tree[:children] = descentants

        family_tree
      end
    end
  end
end

