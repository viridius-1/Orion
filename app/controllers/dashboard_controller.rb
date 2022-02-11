# frozen_string_literal: true

class DashboardController < ApplicationController
  def index
    correct_paths = if current_user.agency_user?
                      agency_vendors_path(agency_id: current_user.company.id)
                    elsif current_user.advertiser_user?
                      vendor_campaigns_path(vendor_id: current_user.company.id)
                    end

    redirect_to correct_paths
  end
end
