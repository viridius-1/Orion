class Audience::Category < ApplicationRecord
  belongs_to :provider, class_name: 'Audience::Provider'
  belongs_to :parent, class_name: 'Audience::Category', optional: true, foreign_key: :category_id

  has_many :children, class_name: 'Audience::Category', dependent: :destroy

  validates :name, presence: true

  class << self
    def list_of_ancestors
      where(category_id: nil)
    end

    def family_tree
      get_descentants(list_of_ancestors)
    end

    private

    def get_descentants(ancestor_category)
      ancestor_category.map do |category|
        family_tree = { label: "#{category.name}",
                        value: "#{category.id}",
                        key: "#{category.id}",
                        provider_id: category.provider_id }

        descentants = if category&.children&.any?
                        get_descentants(category&.children)
                      end

        family_tree[:children] = descentants

        family_tree
      end
    end
  end
end

