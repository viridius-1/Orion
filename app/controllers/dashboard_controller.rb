# frozen_string_literal: true

class DashboardController < ApplicationController
  def index
    company_type = current_user.company_type.downcase.to_sym
    correct_paths = if company_type == :agency
                      agency_vendors_path(agency_id: current_user.company.id)
                    elsif company_type == :advertiser
                      vendor_campaigns_path(vendor_id: current_user.company.id)
                    end

    redirect_to correct_paths
  end
end
