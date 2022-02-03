module CampaignsHelper
  def options
    {
        goal_options: goal_options,
        kpi_options: kpi_options
    }
  end

  def data_providers_nested
    providers_nested = File.read('./lib/data_providers/acxiom-data-nested.json')
    JSON.parse(providers_nested)
  end

  def data_providers_key_value
    providers_key_value = File.read('./lib/data_providers/acxiom-data-key-value.json')
    JSON.parse(providers_key_value)
  end
  private

  def goal_options
    %w[Reach Awareness Acquisition]
  end

  def kpi_options
    ['Impressions',
     'Click Through Rate (CTR)',
     'Cost Per Acquisition (CPA)',
     'Video Completion Rate']
  end

  def education_options
    ['Less than high school graduate',
     'High school graduate',
     'Some college or associates degree',
     'Bachelor’s degree',
     'Graduate or professional degree',
     'N/A']
  end

  def income_options
    %w[<$50k $50-100k $100-200k $200-500k $500k+ N/A]
  end
end
