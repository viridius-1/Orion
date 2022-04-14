module Objectives
  module DependentFields
    def self.mapping
      {
        goal_options: { # based on media_channel
          'CTV/OTT' => ['Reach', 'Awareness'],
          'Digital Out-of-Home' => ['Reach'],
          'Digital Video' => ['Reach', 'Awareness'],
          'In-Email Display' => ['Reach', 'Awareness'],
          'Native Display' => ['Reach', 'Awareness', 'Acquisition'],
          'Native Video' => ['Reach', 'Awareness'],
          'Programmatic Display' => ['Reach', 'Awareness', 'Acquisition'],
          'Site Skins' => ['Reach', 'Awareness'],
          'Streaming Audio' => ['Reach', 'Awareness'],
          'Youtube' => ['Reach', 'Awareness']
        },
        kpi_options: { # based on goal
          'Reach' => ['Impressions'],
          'Awareness' => ['Click Through Rate (CTR)', 'Video Completion Rate (VCR)'],
          'Acquisition' => ['Cost Per Acquisition (CPA)', 'Return on Ad Spend (ROAS)']
        },
        field_options: { # based on kpi
          'Impressions' => %i(budget desired_dcpm),
          'Click Through Rate (CTR)' => %i(budget desired_dcpm target_ctr),
          'Video Completion Rate (VCR)' => %i(budget desired_dcpm video_completion_rate),
          'Cost Per Acquisition (CPA)' => %i(budget desired_dcpm),
          'Return on Ad Spend (ROAS)' => %i(budget desired_dcpm target_cpa average_order_value target_roas)
        }
      }
    end

    def self.all_media_channel_options
      mapping[:goal_options].keys
    end

    def self.all_goal_options
      mapping[:kpi_options].keys
    end

    def self.all_kpi_options
      mapping[:field_options].keys
    end

    def self.all_fields
      mapping[:field_options].values.flatten.uniq
    end

    def self.kpi_options_for(goal)
      mapping.dig(:kpi_options, goal) || []
    end

    def self.goal_options_for(media_channel)
      mapping.dig(:goal_options, media_channel) || []
    end

    def self.fields_for(kpi)
      mapping.dig(:field_options, kpi) || []
    end
  end
end
