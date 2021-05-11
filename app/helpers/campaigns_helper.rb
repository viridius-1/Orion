module CampaignsHelper
  def options
    {
        goal_options: goal_options,
        kpi_options: kpi_options,
        education_options: education_options,
        parental_options: parental_options
    }
  end

  private

  def goal_options
    ['Reach',
     'Awareness',
     'Acquisition']
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

  def parental_options
    ['Parent',
     'Not Parent',
     'N/A']
  end

  def income_options
    ['<$50k',
     '$50-100k',
     '$100-200k',
     '$200-500k',
     '$500k+',
     'N/A']
  end
end
