module HasHumanizedEnums
  extend ActiveSupport::Concern

  # When serializing models using 'as_json', enum keys will be title-ized 
  # (under_review -> Under Review) if 'humanize_enums: true' is passed

  def as_json(options = {})
    super(options).tap do |json_result|
      json_result.merge!(humanized_enums) if options[:humanize_enums]
    end
  end

  def humanized_enums
    defined_enums.keys.map do |enum_field|
      [enum_field, send(enum_field).titleize]
    end.to_h
  end
end
